import {inject} from 'aurelia-framework';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from 'mapbox-gl-draw';
import * as topojson from 'topojson-client';
import {LandingUtility} from './landing-utility';
import CONFIG from '../../config';

//start-non-standard
@inject(LandingUtility)
//end-non-standard
export class Landing {
  constructor(util) {
    this.utility = util;
  }

  attached() {
    var self = this;
    mapboxgl.accessToken = CONFIG.map_token;
    self.utility.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'map_wrapper',
      center: [-80.25, 26.15],
      zoom: 10,
      style: CONFIG.map_style,
      hash: false
    });

    self.utility.map.addControl(new mapboxgl.NavigationControl());

    self.utility.map.on('load', () => {
      self.utility.loadLayers();
    });

    var popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false
    });
    self.utility.map.on('click', (e) => {
      self.utility.showPopup(e, popup);
    });

    var draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        point: true,
        polygon: true,
        trash: true
      }
    });
    self.utility.map.addControl(draw);

    self.utility.map.on('draw.delete', () => {
      popup.remove();
    });

    self.utility.map.on('draw.selectionchange', feature => {
      self.utility.drawSelectionChange(feature, popup);
    });

    self.utility.map.on('mousemove', (e) => {
      if (self.utility.map.getLayer('red_cross') || self.utility.map.getLayer('buildings')) {
        var features = self.utility.map.queryRenderedFeatures(e.point, {layers: ['red_cross', 'buildings']});
        self.utility.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      }
    });

    $(window).resize(() => {
      this.utility.map.resize();
    });
  }
}
