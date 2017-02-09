import mapboxgl from 'mapbox-gl';
import {HttpClient} from 'aurelia-http-client';
import * as topojson from 'topojson-client';
import lbcsCodes from '../../styles/lbcs';

export class Landing {
  constructor() {
    this.controlGroups = [];
    this.controls = [];
  }

  setSource(source, source_type, source_data) {
    switch (source) {
      case 'mapbox':
        return {
          'type': source_type,
          'url': 'mapbox://asbarve.' + source_data
        };
      case 'geojson_url':
        return {
          'type': source_type,
          'data': source_data
        };
    }
  }

  addLayer(group_no, label, layer_id, type, source, source_type, source_data, source_layer, paint_properties, visibility) {
    var self = this;
    if (visibility === 'visible') {
      self.controlGroups[group_no].controls.push({name: label, id: layer_id, class: 'layerControls active'});
    } else {
      self.controlGroups[group_no].controls.push({name: label, id: layer_id, class: 'layerControls'});
    }
    switch (type) {
      case 'fill':
        return self.map.addLayer({
          'id': layer_id,
          'type': type,
          'source': self.setSource(source, source_type, source_data),
          'source-layer': source_layer,
          'layout': {
            'visibility': visibility
          },
          'paint': paint_properties
        });
      case 'line':
        return self.map.addLayer({
          'id': layer_id,
          'type': type,
          'source': self.setSource(source, source_type, source_data),
          'source-layer': source_layer,
          'layout': {
            'visibility': visibility
          },
          'paint': paint_properties
        });
      case 'circle':
        return self.map.addLayer({
          'id': layer_id,
          'type': type,
          'source': self.setSource(source, source_type, source_data),
          'source-layer': source_layer,
          'layout': {
            'visibility': visibility
          },
          'paint': paint_properties
        });
      case 'fill-extrusion':
        return self.map.addLayer({
          'id': layer_id,
          'type': type,
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'minzoom': 10,
          'layout': {
            'visibility': visibility
          },
          'paint': paint_properties
        });
    }
  }

  attached() {
    var self = this;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w';
    self.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'map_wrapper',
      center: [-80.25, 26.15],
      zoom: 10,
      style: 'mapbox://styles/mapbox/dark-v9',
      hash: false
    });
    self.map.on('load', () => {
      // Push object to self.controlGroups only if atleast one layer is toggleable
      //Control group '0'
      self.controlGroups.push({name: 'Flood Hazard Extents', id: 'fld_haz_ext', controls: []});
      self.addLayer('0', 'Hazard AO', 'FLDHAO', 'fill', 'mapbox', 'vector', '1eqmjn9o', 'FLDHAO', {'fill-color': '#31aade', 'fill-opacity': 1}, 'none');
      self.addLayer('0', 'Hazard AE', 'FLDHAE', 'fill', 'mapbox', 'vector', '4cou1y2j', 'FLDHAE', {'fill-color': '#31aade', 'fill-opacity': 0.8}, 'none');
      self.addLayer('0', 'Hazard AH', 'FLDHAH', 'fill', 'mapbox', 'vector', '758t0cbw', 'FLDHAH', {'fill-color': '#31aade', 'fill-opacity': 0.5}, 'none');
      self.addLayer('0', 'Hazard X', 'FLDHX', 'fill', 'mapbox', 'vector', '44qg0o2f', 'FLDHX', {'fill-color': '#31aade', 'fill-opacity': 0.2}, 'none');
      self.addLayer('0', 'Hazard VE', 'FLDHVE', 'fill', 'mapbox', 'vector', 'b0mn3fbb', 'FLDHVE', {'fill-color': '#31aade', 'fill-opacity': 0.1}, 'none');

      //Control group '1'
      self.controlGroups.push({name: 'Water infrastructure', id: 'wtr_inf', controls: []});
      self.addLayer('1', 'Water bodies', 'S_WTR', 'fill', 'mapbox', 'vector', 'c5vfi3yr', 'S_WTR', {'fill-color': '#1a1a1a'}, 'none'); //Match mapbox style water color
      self.addLayer('1', 'City boundaries', 'city_boundary', 'line', 'geojson_url', 'geojson', 'https://raw.githubusercontent.com/stl-florida/data-layers/master/cities.geojson', '', {'line-color': '#aaaaaa'}, 'none');
      self.addLayer('1', 'Salt water intrusion', 'salt_water', 'line', 'geojson_url', 'geojson', 'https://raw.githubusercontent.com/stl-florida/data-layers/master/saltwaterFlorida.geojson', '', {'line-color': '#c1272d', 'line-width': 3}, 'visible');

      //Control group '2'
      self.controlGroups.push({name: 'Physical infrastructure', id: 'phy_inf', controls: []});
      self.addLayer('2', '3D buildings', '3d_buildings', 'fill-extrusion', null, null, null, null, {'fill-extrusion-color': '#aaaaaa', 'fill-extrusion-height': {'type': 'identity', 'property': 'height'}, 'fill-extrusion-base': {'type': 'identity', 'property': 'min_height'}, 'fill-extrusion-opacity': 0.8}, 'none');
      self.addLayer('2', 'Future landuse', 'landuse', 'fill', 'mapbox', 'vector', '2kwgic7s', 'landuse', {'fill-color': lbcsCodes, 'fill-opacity': 0.8}, 'none');
      self.addLayer('2', 'RedCross locations', 'red_cross', 'circle', 'geojson_url', 'geojson', 'https://raw.githubusercontent.com/stl-florida/data-layers/master/redCross.geojson', '', {'circle-color': '#c1272d', 'circle-radius': 6, 'circle-opacity': 0.8}, 'none');
    });
  }

  //Show / hide toolbar
  toggleToolbar() {
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
      }, toggleSpeed);
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
      }, toggleSpeed);
    }
  }

  //Toggle layer visibility parameter & toggle buttons appearance
  toggleLayer(layer_id) {
    $('#toggle_'+layer_id).toggleClass('active');
    var visibility = this.map.getLayoutProperty(layer_id, 'visibility');
    if (visibility === 'visible') {
      this.map.setLayoutProperty(layer_id, 'visibility', 'none');
    } else {
      this.map.setLayoutProperty(layer_id, 'visibility', 'visible');
    }
  }

  //Toggle toolbar layer groups
  toggleGroup(group_name) {
    $('#group_' + group_name).slideToggle("fast");
    $('#toggle_' + group_name + ' > i').toggleClass("active");
  }
}
