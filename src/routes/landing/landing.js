import mapboxgl from 'mapbox-gl';
import {HttpClient} from 'aurelia-http-client';
import * as topojson from 'topojson-client';

export class Landing {
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

  toggleButton() {
    var toggleSpeed = 200;
    if ($('#toolBar').hasClass('active')) {
      //Close
      $('.buttonIcon').toggleClass('active');
      $('#toolBar').animate({
        left: '-300px'
      }, toggleSpeed, () => {
        $('#toolBar').removeClass('active');
      });
      $('#toggleButton').animate({
        left: '0px'
      }, toggleSpeed);
      $('#mapContainer').animate({
        width: '100%'
      }, toggleSpeed);
    } else {
      //Open
      $('.buttonIcon').toggleClass('active');
      $('#toolBar').addClass('active');
      $('#toolBar').animate({
        left: '0px'
      }, toggleSpeed);
      $('#toggleButton').animate({
        left: '300px'
      }, toggleSpeed);
      $('#mapContainer').animate({
        width: (($(window).width() - 300) * 100 / $(window).width()) + '%'
      }, toggleSpeed);
    }
  }

  addFillLayer(map, code, layer_name, color, opacity) {
    return map.addLayer({
      'id': layer_name,
      'type': 'fill',
      'source': {
        'type': 'vector',
        'url': 'mapbox://asbarve.' + code //TODO: catch get tile error, shows in console when viewing tiles outside of layer bounds
      },
      'source-layer': layer_name,
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
      container: 'mapContainer',
      center: [-80.25, 26.15],
      zoom: 10,
      style: 'mapbox://styles/mapbox/dark-v9',
      hash: false
    });
    self.map.on('load', () => {
      self.addFillLayer(self.map, '4cou1y2j', 'FLDHAE', '#c1272d', 0.8);
      self.addFillLayer(self.map, '758t0cbw', 'FLDHAH', '#c1272d', 0.5);
      self.addFillLayer(self.map, '44qg0o2f', 'FLDHX', '#c1272d', 0.2);
      self.addFillLayer(self.map, '1eqmjn9o', 'FLDHAO', '#c1272d', 1);
      self.addFillLayer(self.map, 'b0mn3fbb', 'FLDHVE', '#c1272d', 0.1);
      self.addFillLayer(self.map, 'c5vfi3yr', 'S_WTR', '#31aade', 1);
    });
  }
}
