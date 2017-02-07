import mapboxgl from 'mapbox-gl';
import {HttpClient} from 'aurelia-http-client';
import * as topojson from 'topojson-client';

export class Landing {
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

  addFldHazLayer(map, code, layer_name) {
    return map.addLayer({
      'id': layer_name,
      'type': 'fill',
      'source': {
        'type': 'vector',
        'url': 'mapbox://asbarve.' + code //TODO: catch get tile error, shows in console when viewing tiles outside of layer bounds
      },
      'source-layer': layer_name,
      'paint': {
        'fill-color': '#31aade',
        'fill-opacity': 0.75
      }
    });
  }

  attached() {
    var self = this;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w';
    self.map = new mapboxgl.Map({
      container: 'mapContainer',
      center: [-80.25, 26.00],
      zoom: 10,
      style: 'mapbox://styles/mapbox/dark-v9',
      hash: false
    });
    self.map.on('load', () => {
      self.addFldHazLayer(self.map, '0gca7i8n', 'FLDHAZ_AE');
    });
  }
}
