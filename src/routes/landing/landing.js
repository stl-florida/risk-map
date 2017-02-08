import mapboxgl from 'mapbox-gl';
import {HttpClient} from 'aurelia-http-client';
import * as topojson from 'topojson-client';

export class Landing {
  constructor() {
    this.controlGroups = [];
    this.controls = [];
  }
  /*
  // Get topojson data from server, return geojson
  getData(file_name) {
    var self = this,
        url = 'https://raw.githubusercontent.com/stl-florida/data-layers/master/' + file_name + '.json';
    let client = new HttpClient();
    return new Promise((resolve, reject) => {
      client.get(url)
      .then(data => {
        var topology = JSON.parse(data);
        console.log(topology);
        if (topology.statusCode === 200) {
          var result = topology.result;
          if (result && result.objects) {
            resolve(topojson.feature(result, result.objects[file_name]));
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }).catch(err => reject(err));
    });
  }
  */

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

  toggleLayer(layer_id) {
    $('#toggle_'+layer_id).toggleClass('active');
    var visibility = this.map.getLayoutProperty(layer_id, 'visibility');
    if (visibility === 'visible') {
      this.map.setLayoutProperty(layer_id, 'visibility', 'none');
    } else {
      this.map.setLayoutProperty(layer_id, 'visibility', 'visible');
    }
  }

  addFillLayer(group_no, label, code, layer_id, color, opacity, toggleable, visibility) {
    if (toggleable) {
      this.controlGroups[group_no].controls.push({name: label, id: layer_id});
    }
    return this.map.addLayer({
      'id': layer_id,
      'type': 'fill',
      'source': {
        'type': 'vector',
        'url': 'mapbox://asbarve.' + code //TODO: catch get tile error, shows in console when viewing tiles outside of layer bounds
      },
      'source-layer': layer_id,
      'layout': {
        'visibility': visibility
      },
      'paint': {
        'fill-color': color,
        'fill-opacity': opacity
      }
    });
  }

  attached() {
    var self = this;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w';
    self.map = new mapboxgl.Map({
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
      self.addFillLayer('0', 'Hazard AO', '1eqmjn9o', 'FLDHAO', '#31aade', 1, true, 'visible');
      self.addFillLayer('0', 'Hazard AE', '4cou1y2j', 'FLDHAE', '#31aade', 0.8, true, 'visible');
      self.addFillLayer('0', 'Hazard AH', '758t0cbw', 'FLDHAH', '#31aade', 0.5, true, 'visible');
      self.addFillLayer('0', 'Hazard X', '44qg0o2f', 'FLDHX', '#31aade', 0.2, true, 'visible');
      self.addFillLayer('0', 'Hazard VE', 'b0mn3fbb', 'FLDHVE', '#31aade', 0.1, true, 'visible');

      //Control group '1'
      self.controlGroups.push({name: 'Water infrastructure', id: 'wtr_inf', controls: []});
      self.addFillLayer('1', 'Water bodies', 'c5vfi3yr', 'S_WTR', '#1a1a1a', 1, true, 'visible'); //Match mapbox style water color
    });
  }

  toggleGroup(group_name) {
    $('.groupWrapper:not(#group_' + group_name + ')').slideUp("fast");
    $('#group_' + group_name).slideToggle("fast");
    if ($('.groupToggle:not(#toggle_' + group_name + ') > i.icon-up-open').hasClass('active')) {
      $('.groupToggle:not(#toggle_' + group_name + ') > i.icon-up-open').removeClass('active');
      $('.groupToggle:not(#toggle_' + group_name + ') > i.icon-down-open').addClass('active');
    }
    $('#toggle_' + group_name + ' > i').toggleClass("active");
  }
}
