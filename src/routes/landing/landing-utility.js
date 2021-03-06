import LAYERS from './layers';

export class LandingUtility {
  constructor() {
    this.map = null;
    this.controlGroups = [];
  }

  setSource(name, type, data) {
    switch (name) {
      case 'mapbox': return {
        'type': type,
        'url': 'mapbox://asbarve.' + data
      };
      case 'geojson_url': return {
        'type': type,
        'data': data
      };
    }
  }

  addLayer(properties) {
    var self = this;
    if (properties.render_opacity) {
      //Always on base layers (flood hazard & landuse)
      self.controlGroups[properties.group_no].controls.push({name: properties.label, id: properties.layer_id, tooltip: properties.tooltip_text, class: 'layerControls'});
    } else {
      if (properties.visibility === 'visible') {
        self.controlGroups[properties.group_no].controls.push({name: properties.label, id: properties.layer_id, tooltip: properties.tooltip_text, class: 'layerControls active'});
      } else {
        self.controlGroups[properties.group_no].controls.push({name: properties.label, id: properties.layer_id, tooltip: properties.tooltip_text, class: 'layerControls'});
      }
    }
    switch (properties.type) {
      case 'fill': return self.map.addLayer({
        'id': properties.layer_id,
        'type': properties.type,
        'source': self.setSource(properties.source.name, properties.source.type, properties.source.data),
        'source-layer': properties.source.layer,
        'layout': {
          'visibility': properties.visibility
        },
        'paint': properties.paint
      });
      case 'line': return self.map.addLayer({
        'id': properties.layer_id,
        'type': properties.type,
        'source': self.setSource(properties.source.name, properties.source.type, properties.source.data),
        'source-layer': properties.source.layer,
        'layout': {
          'visibility': properties.visibility
        },
        'paint': properties.paint
      });
      case 'circle': return self.map.addLayer({
        'id': properties.layer_id,
        'type': properties.type,
        'source': self.setSource(properties.source.name, properties.source.type, properties.source.data),
        'source-layer': properties.source.layer,
        'layout': {
          'visibility': properties.visibility
        },
        'paint': properties.paint
      });
      case 'fill-extrusion': return self.map.addLayer({
        'id': properties.layer_id,
        'type': properties.type,
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'minzoom': 1,
        'layout': {
          'visibility': properties.visibility
        },
        'paint': properties.paint
      });
    }
  }

  loadLayers() {
    var self = this;
    // Push object to self.controlGroups only if atleast one layer is toggleable
    //Control group '0'
    self.controlGroups.push({group_no: '0', name: 'Flood Hazard Extents', id: 'fld_haz_ext', controls: []});
    self.addLayer(LAYERS.FLDHVE);
    self.addLayer(LAYERS.FLDHAO);
    self.addLayer(LAYERS.FLDHAE);
    self.addLayer(LAYERS.FLDHAH);
    self.addLayer(LAYERS.FLDHX);

    //Control group '1'
    self.controlGroups.push({group_no: '1', name: 'Water Infrastructure', id: 'wtr_inf', controls: []});
    self.addLayer(LAYERS.water_bodies);
    self.addLayer(LAYERS.salt_water);

    //Control group '2'
    self.controlGroups.push({group_no: '2', name: 'City Data', id: 'city_data', controls: []});
    self.addLayer(LAYERS.landuse);
    self.addLayer(LAYERS.city_boundaries);

    //Control group '3'
    self.controlGroups.push({group_no: '3', name: 'Physical Infrastructure', id: 'phy_inf', controls: []});
    self.addLayer(LAYERS.red_cross);
    self.addLayer(LAYERS.buildings);
  }

  showPopup(e, popup) {
    var self = this;
    var features = self.map.queryRenderedFeatures(e.point, {layers: ['red_cross', 'buildings']});
    var landuse = self.map.queryRenderedFeatures(e.point, {layers: ['landuse']});
    var fldhaz = self.map.queryRenderedFeatures(e.point, {layers: ['FLDHVE', 'FLDHAO', 'FLDHAE', 'FLDHAH', 'FLDHX']});
    if (features.length) {
      var feature = features[0];
      var landuse_info = 'Undefined';
      var fldhaz_info = 'Undefined';
      if (landuse.length) {
        landuse_info = landuse[0].properties.LAND_USE;
      }
      if (fldhaz.length) {
        fldhaz_info = LAYERS[fldhaz[0].layer.id].label;
      }
      switch (feature.layer.id) {
        case 'red_cross':
          self.map.flyTo({center: feature.geometry.coordinates});
          popup.setLngLat(feature.geometry.coordinates)
               .setHTML('Name: ' + feature.properties.NAMES_ + '<br>Address: ' + feature.properties.ADDRESSES + '<br>Capacity: ' + feature.properties.CAPACITY + '<br>Phone: ' + feature.properties.PHONE + '<br>Flood vulnerability: ' + fldhaz_info);
          break;
        case 'buildings':
          self.map.flyTo({center: e.lngLat});
          popup.setLngLat(e.lngLat)
               .setHTML('Building type: ' + feature.properties.type + '<br>Landuse: ' + landuse_info + '<br>Flood vulnerability: ' + fldhaz_info);
          break;
        default:
          popup.setHTML('');
      }
      popup.addTo(self.map);
    }
  }

  //Show / hide toolbar
  toggleToolbar() {
    var self = this;
    var toggleSpeed = 200;
    var toolBarWidth = $('#toolbar_wrapper').width();
    if ($('#toolbar_wrapper').hasClass('active')) {
      //Close
      $('.buttonIcon').toggleClass('active');
      $('#toolbar_wrapper').animate({
        left: -toolBarWidth + 'px'
      }, toggleSpeed, () => {
        $('#toolbar_wrapper').removeClass('active');
      });
      $('#toolbar_control_wrapper').animate({
        left: '0px'
      }, toggleSpeed);
      $('#map_wrapper').animate({
        width: '100%'
      }, toggleSpeed, () => {
        self.map.resize();
      });
    } else {
      //Open
      $('.buttonIcon').toggleClass('active');
      $('#toolbar_wrapper').addClass('active');
      $('#toolbar_wrapper').animate({
        left: '0px'
      }, toggleSpeed);
      $('#toolbar_control_wrapper').animate({
        left: toolBarWidth + 'px'
      }, toggleSpeed);
      $('#map_wrapper').animate({
        width: (($(window).width() - toolBarWidth) * 100 / $(window).width()) + '%'
      }, toggleSpeed, () => {
        self.map.resize();
      });
    }
  }

  toggleMapview(view) {
    var self = this;
    var center = self.map.getCenter();
    var zoom = self.map.getZoom();
    $('.setView').toggleClass('active');
    if (view === '2d') {
      self.map.easeTo({
        center: center,
        zoom: zoom,
        bearing: 0,
        pitch: 0
      });
    } else if (view === '3d') {
      self.map.easeTo({
        center: center,
        zoom: zoom,
        bearing: -30,
        pitch: 60
      });
    }
  }

  //Toggle layer visibility parameter & toggle buttons appearance
  toggleLayer(layer_id) {
    var self = this;
    $('#toggle_'+layer_id).toggleClass('active');
    if (LAYERS[layer_id].render_opacity) {
      var opacity = self.map.getPaintProperty(layer_id, 'fill-opacity');
      if (opacity === 0) {
        self.map.setPaintProperty(layer_id, 'fill-opacity', LAYERS[layer_id].render_opacity);
      } else {
        self.map.setPaintProperty(layer_id, 'fill-opacity', 0);
      }
    } else {
      var visibility = self.map.getLayoutProperty(layer_id, 'visibility');
      if (visibility === 'visible') {
        self.map.setLayoutProperty(layer_id, 'visibility', 'none');
      } else {
        self.map.setLayoutProperty(layer_id, 'visibility', 'visible');
      }
    }
  }

  //Toggle toolbar layer groups
  toggleGroup(group_name) {
    $('#group_' + group_name).slideToggle("fast");
    $('#toggle_' + group_name + ' > i').toggleClass('active');
  }

  toggleAll(group_no) {
    var self = this;
    for (let i in self.controlGroups[group_no].controls) {
      var layer_id = self.controlGroups[group_no].controls[i].id;
      if (LAYERS[layer_id].render_opacity) {
        if ($('#toggle_all_' + group_no + ' > i.icon-check-empty').hasClass('active')) {
          $('#toggle_' + layer_id).removeClass('active');
          $('#toggle_' + layer_id).addClass('active');
          self.map.setPaintProperty(layer_id, 'fill-opacity', LAYERS[layer_id].render_opacity);
        } else {
          $('#toggle_' + layer_id).removeClass('active');
          self.map.setPaintProperty(layer_id, 'fill-opacity', 0);
        }
      } else {
        if ($('#toggle_all_' + group_no + ' > i.icon-check-empty').hasClass('active')) {
          $('#toggle_' + layer_id).removeClass('active');
          $('#toggle_' + layer_id).addClass('active');
          self.map.setLayoutProperty(layer_id, 'visibility', 'visible');
        } else {
          $('#toggle_' + layer_id).removeClass('active');
          self.map.setLayoutProperty(layer_id, 'visibility', 'none');
        }
      }
    }
    $('#toggle_all_' + group_no + ' > i').toggleClass('active');
  }

  toggleTooltip(text) {
    this.tooltip_text = text;
  }

  drawSelectionChange(feature, popup) {
    var self = this;
    popup.remove();
    if (feature.features.length) {
      var center;
      var landuse;
      var fldhaz;
      var landuse_info = 'Undefined';
      var fldhaz_info = 'Undefined';
      if (feature.features[0].geometry.type === 'Point') {
        center = feature.features[0].geometry.coordinates;
        landuse = self.map.queryRenderedFeatures(self.map.project(center), {layers: ['landuse']});
        fldhaz = self.map.queryRenderedFeatures(self.map.project(center), {layers: ['FLDHVE', 'FLDHAO', 'FLDHAE', 'FLDHAH', 'FLDHX']});
        self.map.flyTo({center: center});
        if (landuse.length) {
          landuse_info = landuse[0].properties.LAND_USE;
        }
        if (fldhaz.length) {
          fldhaz_info = LAYERS[fldhaz[0].layer.id].label;
        }
        popup.setLngLat(center)
             .setHTML('Landuse: ' + landuse_info + '<br>Flood vulnerability: ' + fldhaz_info);
      } else if (feature.features[0].geometry.type === 'Polygon') {
        center = turf.centroid(feature.features[0]).geometry.coordinates;
        landuse = self.map.queryRenderedFeatures(self.map.project(center), {layers: ['landuse']});
        fldhaz = self.map.queryRenderedFeatures(self.map.project(center), {layers: ['FLDHVE', 'FLDHAO', 'FLDHAE', 'FLDHAH', 'FLDHX']});
        self.map.flyTo({center: center});
        if (landuse.length) {
          landuse_info = landuse[0].properties.LAND_USE;
        }
        if (fldhaz.length) {
          fldhaz_info = LAYERS[fldhaz[0].layer.id].label;
        }
        popup.setLngLat(center)
             .setHTML('Area: ' + Math.round(turf.area(feature.features[0])) + ' sqm<br>Landuse: ' + landuse_info + '<br>Flood vulnerability: ' + fldhaz_info);
      }
      popup.addTo(self.map);
    }
  }
}
