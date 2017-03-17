import {LAYERS, WMS} from './layers';
import CONFIG from '../../config';
import {HttpClient} from 'aurelia-http-client';
import * as topojson from 'topojson-client';
import Chart from 'chart';
import $ from 'jquery';

export class LandingUtility {
  constructor() {
    this.map = null;
    this.controlGroups = [];
    this.mapView = '2d'; //TODO: DELETE
    this.area_query = ['age', 'hazard', 'storage', 'retention'];
    this.sel_query_setting = 'age';
  }

  getWMS(type, params) {
    let queries = '';
    let baseUrl;
    let client = new HttpClient();
    if (type === 'usgs_gw_monitoring') {
      baseUrl = 'https://waterdata.usgs.gov/fl/nwis/uv?';
      for (let [key, val] of params) {
        queries = queries + key + '=' + val + '&';
      }
    }
    return new Promise((resolve, reject) => {
      client.createRequest(queries)
        .asGet()
        .withBaseUrl(baseUrl)
        .withInterceptor({
          request(msg) {
            // console.log(msg);
          },
          requestError(err) {
            reject(err);
          },
          response(msg) {
            // console.log(msg);
            let rows = msg.response.split('\n');
            let remove = [];
            for (let row in rows) {
              if (rows[row].indexOf('#') === 0) {
                remove.push(row);
              }
            }
            rows.splice(0, remove.length); //remove lines beginning with #
            let keys = rows[0].split('\t'); //store headers
            rows.splice(0, 2); //headers (2 rows)
            for (let row in rows) {
              let cols = rows[row].split('\t');
              rows[row] = cols;
            }
            rows.splice(rows.length - 1, 1); //last row
            let readings = [];
            for (let i in rows) {
              let single_entry = {};
              for (let j in keys) {
                single_entry[keys[j]] = rows[i][j];
              }
              readings.push(single_entry);
            }
            resolve(readings);
          },
          responseError(err) {
            reject(err);
          }
        })
        .send();
    });
  }

  getData(end_point) {
    let client = new HttpClient();
    return new Promise((resolve, reject) => {
      client.createRequest(end_point)
        .asGet()
        .withBaseUrl(CONFIG.data_server)
        .withInterceptor({
          request(msg) {
            console.log(msg);
          },
          requestError(err) {
            reject(err);
          },
          response(msg) {
            // Get topojson, return geojson
            var res = JSON.parse(msg.response);
            // console.log(res);
            resolve(topojson.feature(res, res.objects.output));
          },
          responseError(err) {
            reject(err);
          }
        })
        .send();
    });
  }

  resolveData(end_point, properties) {
    var self = this;
    var new_properties = properties;
    return new Promise((resolve, reject) => {
      self.getData(end_point)
      .then(geojson_data => {
        new_properties.source.data = geojson_data;
      })
      .then(() => {
        resolve(new_properties);
      });
    });
  }

  setSource(name, type, data) {
    switch (name) {
      case 'mapbox_user': return {
        'type': type,
        'url': 'mapbox://asbarve.' + data
      };
      case 'geojson_format': return {
        'type': type,
        'data': data
      };
      case 'mapbox_global': return {
        'type': type,
        'url': data
      };
    }
  }

  applySettings(properties) {
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
      case 'symbol': return self.map.addLayer({
        'id': properties.layer_id,
        'type': properties.type,
        'source': self.setSource(properties.source.name, properties.source.type, properties.source.data),
        'layout': {
          'icon-image': '{icon}',
          'visibility': properties.visibility
        },
      });
      // for contours, hillshade
      /*case 'vector': return self.map.addLayer({
        'id': properties.layer_id,
        'type': properties.type,
        'source': self.setSource(properties.source.name, properties.source.type, properties.source.data),
        'source-layer': properties.source.layer,
        'layout': {
          'visibility': properties.visibility
        },
        'paint': properties.paint
      });*/
    }
  }

  addLayer(end_point, layer_properties) {
    var self = this;
    if (end_point !== null) {
      self.resolveData(end_point, layer_properties)
      .then(properties => {
        self.applySettings(properties);
      });
    } else {
      self.applySettings(layer_properties);
    }
  }

  loadLayers() {
    var self = this;
    //TODO: Structure LAYERS by group_no, use for.. of loop
    // Push object to self.controlGroups only if atleast one layer is toggleable
    //Control group '0'
    self.controlGroups.push({group_no: '0', name: 'Flood Hazard Extents', id: 'fld_haz_ext', controls: []});
    self.addLayer(null, LAYERS.FLDHVE);
    self.addLayer(null, LAYERS.FLDHAO);
    self.addLayer(null, LAYERS.FLDHAE);
    self.addLayer(null, LAYERS.FLDHAH);
    self.addLayer(null, LAYERS.FLDHX);

    //Control group '1'
    self.controlGroups.push({group_no: '1', name: 'Water Infrastructure', id: 'wtr_inf', controls: []});
    self.addLayer(null, LAYERS.water_bodies);
    self.addLayer(null, LAYERS.salt_water);

    //Control group '2'
    self.controlGroups.push({group_no: '2', name: 'City Data', id: 'city_data', controls: []});
    self.addLayer(null, LAYERS.landuse);
    self.addLayer(null, LAYERS.city_boundaries);

    //Control group '3'
    self.controlGroups.push({group_no: '3', name: 'Physical Infrastructure', id: 'phy_inf', controls: []});
    self.addLayer(null, LAYERS.red_cross);
    self.addLayer(null, LAYERS.buildings);

    //Control group '4'
    self.controlGroups.push({group_no: '4', name: 'Local db test', id: 'lcl_db', controls: []});
    self.addLayer('/slosh', LAYERS.storm_surge);
    self.addLayer(null, LAYERS.gw_wells);
    //self.addLayer(null, LAYERS.contours);
    //self.addLayer(null, LAYERS.hillshade);
  }

  pointQuery(end_point, data, content_type) {
    let client = new HttpClient();
    return new Promise((resolve, reject) => {
      client.createRequest(end_point)
        .asPost()
        .withBaseUrl(CONFIG.data_server)
        .withHeader('Content-Type', content_type)
        .withContent(data)
        .withInterceptor({
          request(msg) {
            console.log(msg);
          },
          requestError(err) {
            reject(err);
          },
          response(msg) {
            var res = JSON.parse(msg.response);
            resolve(res);
          },
          responseError(err) {
            reject(err);
          }
        })
        .send();
    });
  }

  areaQuery(end_point, data, content_type) {
    let client = new HttpClient();
    return new Promise((resolve, reject) => {
      client.createRequest(end_point)
        .asPost()
        .withBaseUrl(CONFIG.data_server)
        .withHeader('Content-Type', content_type)
        .withContent(data)
        .withInterceptor({
          request(msg) {
            console.log(msg);
          },
          requestError(err) {
            reject(err);
          },
          response(msg) {
            var res = JSON.parse(msg.response);
            console.log(res);
            resolve(res);
          },
          responseError(err) {
            reject(err);
          }
        })
        .send();
    });
  }

  drawChart(popup, well, wms_map) {
    var self = this;
    popup.setLngLat([well.dec_long_va, well.dec_lat_va])
         .setHTML('<canvas id="chart"></canvas>')
         .addTo(self.map);
    var chart_data = {
      labels : [],
      datasets : [{
        label: 'Ground water level',
        fill: 'bottom',
        lineTension: 0,
        spanGaps: true,
        backgroundColor: "rgba(151,187,205,0.2)",
        borderColor: "rgba(151,187,205,1)",
        pointRadius: 0,
        data: []
      }]
    };
    self.getWMS('usgs_gw_monitoring', wms_map)
    .then(data => {
      var chart_ctx = $('#chart').get(0).getContext('2d');

      for (let entry in data) {
        if (data[entry].datetime) {
          chart_data.labels.push(data[entry].datetime);
          var ts; // check with usgs what ts parameter stands for...
          for (let key in data[entry]) {
            if (key !== 'agency_cd' && key !== 'datetime' && key !== 'site_no' && key !== 'tz_cd') {
              ts = key.toString().split('_')[0];
              break;
            }
          }
          chart_data.datasets[0].data.push(data[entry][ts + '_62610']); //code for broward
        }
      }
      //console.log(chart_data);
      var well_chart = new Chart(chart_ctx, {
        type: 'line',
        data: chart_data,
        options: {
          title: {
            text: well.station_nm,
            display: true
          },
          legend: {
            display: false,
            position: 'bottom'
          },
          bezierCurve: false,
          scales: {
            yAxes: [{
              scaleLabel: {
                labelString: 'm',
              },
              gridLines: {
                zeroLineColor: 'rgba(0,0,0,1)'
              },
              ticks: {
                max: well.alt_va,
                min: well.alt_va - well.well_depth_va
              }
            }],
            xAxes: [{
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                minRotation: 40,
                maxRotation: 40
              },
              type: 'time',
              time: {
                unit: 'hour',
                unitStepSize: 6,
                displayFormats: {
                  'millisecond': 'HH:mm',
                  'second': 'HH:mm',
                  'minute': 'HH:mm',
                  'hour': 'HH:mm',
                  'day': 'HH:mm',
                  'week': 'HH:mm',
                  'month': 'HH:mm',
                  'quarter': 'HH:mm',
                  'year': 'HH:mm'
                }
              }
            }]
          },
          tooltips: {
            enabled: false
          }
        }
      });
    });
  }

  showPopup(e, popup) {
    var self = this;
    var features = self.map.queryRenderedFeatures(e.point, {layers: ['red_cross', 'buildings']});
    var landuse = self.map.queryRenderedFeatures(e.point, {layers: ['landuse']});
    var fldhaz = self.map.queryRenderedFeatures(e.point, {layers: ['FLDHVE', 'FLDHAO', 'FLDHAE', 'FLDHAH', 'FLDHX']});
    var markers = self.map.queryRenderedFeatures(e.point, {layers: ['gw_wells']});
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
    } else if (markers.length) {
      var well = WMS.usgs_water.gw_wells.static[markers[0].properties.uid];
      var wms_map = WMS.usgs_water.gw_wells.dynamic;
      wms_map.set('site_no', markers[0].properties.uid);
      var date;
      if (well.construction_dt) {
        date = well.construction_dt.toString().slice(0,4);
      } else if (well.inventory_dt) {
        date = well.inventory_dt.toString().slice(0,4);
      } else {
        date = "Unknown";
      }
      //.setHTML('Name: ' + well.station_nm + ', ' + well.map_nm + '<br>Ground surface altitude: ' + well.alt_va + ' m<br>Construction date: ' + date + '<br>Well depth: ' + well.well_depth_va + ' m')

      self.drawChart(popup, well, wms_map);
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
      //TEMPORARY switch between query types
      self.mapView = '2d';
    } else if (view === '3d') {
      self.map.easeTo({
        center: center,
        zoom: zoom,
        bearing: -30,
        pitch: 60
      });
      //TEMPORARY switch between query types
      self.mapView = '3d';
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
        var latlng_obj = {
          lat: center[1],
          long: center[0]
        };

        if (self.mapView === '2d') {
          popup.setLngLat(center).setHTML('Loading...');
          self.pointQuery('/point/zone', latlng_obj, 'application/json')
          .then(res => {
            var popupContent = {fld_hzd: res[0].fld_zone, lnd_use: res[1].land_use};
            popup.setHTML('Landuse: ' + popupContent.lnd_use + '<br>Flood vulnerability: Hazard ' + popupContent.fld_hzd);
          }).catch((err) => {
            popup.setHTML('Out of bounds');
            console.log(err);
          });
        } else if (self.mapView === '3d') {
          popup.setLngLat(center).setHTML('Loading...');
          self.pointQuery('/point/elev', latlng_obj, 'application/json')
          .then(res => {
            var popupContent = {elev: res[0].elev};
            //popup.setLngLat(center)
            popup.setHTML('Elevation: ' + popupContent.elev + ' m');
          }).catch((err) => {
            popup.setHTML('Out of bounds');
            console.log(err);
          });
        }

        //Mapbox query rendered features - front-end analysis
        /*
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
        */

      } else if (feature.features[0].geometry.type === 'Polygon') {
        center = turf.centroid(feature.features[0]).geometry.coordinates;
        self.map.flyTo({center: center});
        var poly_coords = feature.features[0].geometry.coordinates[0];
        var line_string = 'LINESTRING(';
        // loop works with closed polygon, when user hits 'RETURN' after 3 or more points
        // check 'key' for open poly? catch
        for (let i in poly_coords) {
          if (i < poly_coords.length - 1) {
            line_string = line_string + poly_coords[i][0] + ' ' + poly_coords[i][1] + ', ';
          } else if (i < poly_coords.length) {
            line_string = line_string + poly_coords[i][0] + ' ' + poly_coords[i][1] + ')';
          }
        }
        if (self.sel_query_setting === 'age') {
          self.map.removeLayer('age');
          self.areaQuery('/area/age', {coords: line_string}, 'application/json')
          .then(topo_data => {
            var geo_data = topojson.feature(topo_data, topo_data.objects.output);
            self.map.addLayer({
              'id': 'age',
              'type': 'fill',
              'source': {
                'type': 'geojson',
                'data': geo_data
              },
              'source-layer': '',
              'layout': {
                'visibility': 'visible'
              },
              'paint': {
                'fill-color': {
                  'property': 'year_built',
                  'type': 'exponential',
                  'stops': [
                    [1900, '#49321a'],
                    [1945, '#b78916'],
                    [2000, '#8ad35f']
                  ]
                },
                'fill-opacity': {
                  'property': 'year_built',
                  'type': 'interval',
                  'stops': [
                    [0, 0],
                    [1, 0.6]
                  ]
                }
              }
            });
          });
        } else if (self.sel_query_setting === 'hazard') {
          self.map.removeLayer('hazard');
          self.areaQuery('/area/hazard', {coords: line_string}, 'application/json')
          .then(topo_data => {
            var geo_data = topojson.feature(topo_data, topo_data.objects.output);
            self.map.addLayer({
              'id': 'hazard',
              'type': 'fill',
              'source': {
                'type': 'geojson',
                'data': geo_data
              },
              'source-layer': '',
              'layout': {
                'visibility': 'visible'
              },
              'paint': {
                'fill-color': {
                  'property': 'fld_zone',
                  'type': 'categorical',
                  'stops': [
                    ['VE', '#c1272d'],
                    ['AO', '#cd5257'],
                    ['AE', '#d97d81'],
                    ['AH', '#e6a8ab'],
                    ['X', '#f2d3d5']
                  ]
                },
                'fill-opacity': 0.8,
                'fill-outline-color': '#f7f7f7'
              }
            });
          });
        } else if (self.sel_query_setting === 'storage') {
          self.map.removeLayer('storage');
          self.areaQuery('/area/storage', {coords: line_string}, 'application/json')
          .then(topo_data => {
            var geo_data = topojson.feature(topo_data, topo_data.objects.output);
            self.map.addLayer({
              'id': 'storage',
              'type': 'fill',
              'source': {
                'type': 'geojson',
                'data': geo_data
              },
              'source-layer': '',
              'layout': {
                'visibility': 'none'
              },
              'paint': {
                'fill-color': {
                  'property': 'elev',
                  'type': 'exponential',
                  'stops': [
                    [1, '#c7dcef'],
                    [30, '#08306b']
                  ]
                },
                'fill-opacity': 1
              }
            });
          });
        } else if (self.sel_query_setting === 'retention') {
          self.map.removeLayer('retention');
          self.areaQuery('/area/retention', {coords: line_string}, 'application/json')
          .then(topo_data => {
            var geo_data = topojson.feature(topo_data, topo_data.objects.output);
            self.map.addLayer({
              'id': 'retention',
              'type': 'fill',
              'source': {
                'type': 'geojson',
                'data': geo_data
              },
              'source-layer': '',
              'layout': {
                'visibility': 'visible'
              },
              'paint': {
                'fill-color': {
                  'property': 'val',
                  'type': 'exponential',
                  'stops': [
                    [0, '#c7dcef'],
                    [20, '#08306b']                  ]
                },
                'fill-opacity': {
                  'property': 'val',
                  'type': 'exponential',
                  'stops': [
                    [0, 0.1],
                    [20, 1]
                  ]
                }
              }
            });
          });
        }

        /*
        landuse = self.map.queryRenderedFeatures(self.map.project(center), {layers: ['landuse']});
        fldhaz = self.map.queryRenderedFeatures(self.map.project(center), {layers: ['FLDHVE', 'FLDHAO', 'FLDHAE', 'FLDHAH', 'FLDHX']});

        if (landuse.length) {
          landuse_info = landuse[0].properties.LAND_USE;
        }
        if (fldhaz.length) {
          fldhaz_info = LAYERS[fldhaz[0].layer.id].label;
        }
        popup.setLngLat(center)
             .setHTML('Area: ' + Math.round(turf.area(feature.features[0])) + ' sqm<br>Landuse: ' + landuse_info + '<br>Flood vulnerability: ' + fldhaz_info);
        */
      }
      //popup.addTo(self.map);
    }
  }
}
