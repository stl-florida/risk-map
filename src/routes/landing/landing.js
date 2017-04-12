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
    this.picked_source = null;
  }

  activateDirections(pick, status) {
    if (status === 'active') {
      if (pick === 'source') {
        this.pick_source = true;
        $('#dir_source').addClass('active');
      } else if (pick === 'destination') {
        this.pick_destination = true;
        $('#dir_source').removeClass('active');
        $('#dir_destination').addClass('active');
      }
    }
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

    var popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false
    });
    self.utility.map.on('click', (e) => {
      if (self.pick_source && !self.pick_destination) {
        self.picked_source = e.lngLat;
      } else if (self.pick_source && self.pick_destination) {
        self.pick_source = false;
        self.pick_destination = false;
        var coords = {source: self.picked_source, destination: e.lngLat};
        self.utility.addDirectionsLayer(coords);
        self.picked_source = null;
        $('#dir_source').removeClass('active');
      } else {
        self.utility.showPopup(e, popup);
      }
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

    // suffices for map.on('load' => {}); as well
    self.utility.map.on('style.load', () => {
      self.utility.loadLayers();
    });

    self.utility.map.on('draw.delete', () => {
      popup.remove();
    });

    self.utility.map.on('zoom', (e) => {
      self.utility.updateSections();
    });

    self.utility.map.on('draw.selectionchange', feature => {
      self.utility.drawSelectionChange(feature, popup);
    });

    self.utility.map.on('mousemove', (e) => {
      if (self.utility.map.getLayer('red_cross') || self.utility.map.getLayer('buildings')) {
        var features;
        if (self.utility.sel_map_style === 'satellite-v9') {
          features = self.utility.map.queryRenderedFeatures(e.point, {layers: ['red_cross', 'gauges', 'gw_wells', 'sewer_mains']});
        } else {
          features = self.utility.map.queryRenderedFeatures(e.point, {layers: ['buildings', 'red_cross', 'gauges', 'gw_wells', 'sewer_mains']});
        }
        self.utility.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      }
    });

    self.utility.map.on('moveend', e => {
      self.utility.updateSections();
    });

    $(window).resize(() => {
      this.utility.map.resize();
    });

    //utility.sel_query_setting = 'age' DEFAULT
    $('#query_tab_age').addClass("active");
  }

  switchQueryMode(query) {
    $('.qryTabs').removeClass("active");
    $('#query_tab_' + query).addClass("active");
  }
}
