import lbcsCodes from '../../styles/lbcs';

var LAYERS = {
  //Flood Hazard Extents
  'FLDHVE': {
    group_no: '0',
    label: 'Hazard VE',
    layer_id: 'FLDHVE',
    type: 'fill',
    source: {
      name: 'mapbox',
      type: 'vector',
      data: 'b0mn3fbb',
      layer: 'FLDHVE',
    },
    paint: {
      'fill-color': '#31aade',
      'fill-opacity': 0
    },
    render_opacity: 1, //Use for base layers which are required to remain visible
    tooltip_text: 'A high-risk area where storms drive waves landward at heights of 3 feet or more.',
    visibility: 'visible'
  },
  'FLDHAO': {
    group_no: '0',
    label: 'Hazard AO',
    layer_id: 'FLDHAO',
    type: 'fill',
    source: {
      name: 'mapbox',
      type: 'vector',
      data: '1eqmjn9o',
      layer: 'FLDHAO',
    },
    paint: {
      'fill-color': '#31aade',
      'fill-opacity': 0
    },
    render_opacity: 0.9, //Use for base layers which are required to remain visible
    tooltip_text: 'A high-risk area subject to waves less than 1.5 feet in height. This will be separated from the Coastal AE zone by the Limit of Moderate Wave Action (LiMWA). A LiMWA may not always be present, in which case, only Zone AE is shown.',
    visibility: 'visible'
  },
  'FLDHAE': {
    group_no: '0',
    label: 'Hazard AE',
    layer_id: 'FLDHAE',
    type: 'fill',
    source: {
      name: 'mapbox',
      type: 'vector',
      data: '4cou1y2j',
      layer: 'FLDHAE',
    },
    paint: {
      'fill-color': '#31aade',
      'fill-opacity': 0
    },
    render_opacity: 0.7, //Use for base layers which are required to remain visible
    tooltip_text: 'An area subject 1% annual change of flooding (usually an area of ponding), for which BFEs have been determined; flood depths range from 1 to 3 feet.',
    visibility: 'visible'
  },
  'FLDHAH': {
    group_no: '0',
    label: 'Hazard AH',
    layer_id: 'FLDHAH',
    type: 'fill',
    source: {
      name: 'mapbox',
      type: 'vector',
      data: '758t0cbw',
      layer: 'FLDHAH',
    },
    paint: {
      'fill-color': '#31aade',
      'fill-opacity': 0
    },
    render_opacity: 0.4, //Use for base layers which are required to remain visible
    tooltip_text: 'An area inundated by 1% annual chance flooding (usually sheet flow on sloping terrain), for which average depths have been determined; flood depths range from 1 to 3 feet.',
    visibility: 'visible'
  },
  'FLDHX': {
    group_no: '0',
    label: 'Hazard X',
    layer_id: 'FLDHX',
    type: 'fill',
    source: {
      name: 'mapbox',
      type: 'vector',
      data: '44qg0o2f',
      layer: 'FLDHX',
    },
    paint: {
      'fill-color': '#31aade',
      'fill-opacity': 0
    },
    render_opacity: 0.1, //Use for base layers which are required to remain visible
    tooltip_text: 'Areas of moderate risk (shown as a shaded zone X) or low risk (zone X). While the risk is reduced, nearly 25 percent of all flood claims come from these zones.',
    visibility: 'visible'
  },
  //Water Infrastructure
  'water_bodies': {
    group_no: '1',
    label: 'Water bodies',
    layer_id: 'water_bodies',
    type: 'fill',
    source: {
      name: 'mapbox',
      type: 'vector',
      data: 'c5vfi3yr',
      layer: 'S_WTR',
    },
    paint: {
      'fill-color': '#1a1a1a',
      'fill-outline-color': '#31aade'
    },
    tooltip_text: 'Water Body',
    visibility: 'none'
  },
  'salt_water': {
    group_no: '1',
    label: 'Salt water intrusion',
    layer_id: 'salt_water',
    type: 'line',
    source: {
      name: 'geojson_url',
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/stl-florida/data-layers/master/saltwaterFlorida.geojson',
      layer: '',
    },
    paint: {
      'line-color': '#c1272d',
      'line-width': 3
    },
    tooltip_text: 'Extent of salt-water intrusion into fresh water aquifers that can lead to cantamination of drinking water sources.',
    visibility: 'visible'
  },
  //City data
  'landuse': {
    group_no: '2',
    label: 'Future landuse',
    layer_id: 'landuse',
    type: 'fill',
    source: {
      name: 'mapbox',
      type: 'vector',
      data: '2kwgic7s',
      layer: 'landuse',
    },
    paint: {
      'fill-color': lbcsCodes,
      'fill-opacity': 0
    },
    render_opacity: 0.8, //Use for base layers which are required to remain visible
    tooltip_text: 'The data set indicates the Broward County Land Use Plan designation for all parcels in Broward County.(updated September 27, 2016.)',
    visibility: 'visible'
  },
  'city_boundaries': {
    group_no: '2',
    label: 'City boundaries',
    layer_id: 'city_boundaries',
    type: 'line',
    source: {
      name: 'geojson_url',
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/stl-florida/data-layers/master/cities.geojson',
      layer: '',
    },
    paint: {
      'line-color': '#aaaaaa'
    },
    tooltip_text: 'Municipal boundries for the city limits within Broward county.',
    visibility: 'none'
  },
  //Physical Infrastructure
  'red_cross': {
    group_no: '3',
    label: 'Red cross locations',
    layer_id: 'red_cross',
    type: 'circle',
    source: {
      name: 'geojson_url',
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/stl-florida/data-layers/master/redCross.geojson',
      layer: '',
    },
    paint: {
      'circle-color': '#c1272d',
      'circle-radius': 6,
      'circle-opacity': 0.8
    },
    tooltip_text: 'American Red Cross operated regional emergency shelters',
    visibility: 'none'
  },
  'buildings': {
    group_no: '3',
    label: '3D buildings',
    layer_id: 'buildings',
    type: 'fill-extrusion',
    source: {
      name: null,
      type: null,
      data: null,
      layer: null,
    },
    paint: {
      'fill-extrusion-color': '#aaaaaa',
      'fill-extrusion-height': {
        'type': 'identity',
        'property': 'height'
      },
      'fill-extrusion-base': {
        'type': 'identity',
        'property': 'min_height'
      },
      'fill-extrusion-opacity': 0.8
    },
    tooltip_text: 'Building footprints and 3d volumes',
    visibility: 'none'
  }
};

module.exports = LAYERS;
