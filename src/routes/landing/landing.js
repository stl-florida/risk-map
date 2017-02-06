import mapboxgl from 'mapbox-gl';

export class Landing {
  attached() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w';
    this.map = new mapboxgl.Map({
      container: 'mapContainer',
      center: [-80.25, 26.00],
      zoom: 10,
      style: 'mapbox://styles/mapbox/dark-v9',
      hash: false
    });
  }
}
