import lbcsCodes from '../../styles/lbcs';
import CONFIG from '../../config';

var WMS = {
  usgs_water: {
    gw_wells: {
      static: {
        "255807080224301": {"station_nm":"G  -1636","dec_lat_va":25.9685,"dec_long_va":-80.3784167,"map_nm":"","alt_va":6.2,"construction_dt":null,"inventory_dt":null,"well_depth_va":24},
        "260010080085001": {"station_nm":"F  - 291","dec_lat_va":26.0031611,"dec_long_va":-80.1468528,"map_nm":"FT LAUDERDALE SOUTH","alt_va":9.16,"construction_dt":19390101,"inventory_dt":null,"well_depth_va":109},
        "260032080135701": {"station_nm":"G  -1225","dec_lat_va":26.00925738,"dec_long_va":-80.2322705,"map_nm":"FT LAUDERDALE SOUTH","alt_va":9.1,"construction_dt":19621130,"inventory_dt":null,"well_depth_va":20},
        "260040080104401": {"station_nm":"G  -2035","dec_lat_va":26.01147934,"dec_long_va":-80.1786577,"map_nm":"FT LAUDERDALE SOUTH","alt_va":13.2,"construction_dt":19710101,"inventory_dt":null,"well_depth_va":52},
        "260053080105701": {"station_nm":"G  -1226","dec_lat_va":26.01509033,"dec_long_va":-80.1822689,"map_nm":"FT LAUDERDALE SOUTH","alt_va":9.1,"construction_dt":null,"inventory_dt":19621130,"well_depth_va":20},
        "260219080141101": {"station_nm":"G  -1223","dec_lat_va":26.0393368,"dec_long_va":-80.2361012,"map_nm":"FT LAUDERDALE SOUTH","alt_va":6.31,"construction_dt":19621120,"inventory_dt":null,"well_depth_va":20},
        "260325080113901": {"station_nm":"G  -2900","dec_lat_va":26.05777778,"dec_long_va":-80.19388889,"map_nm":"Fort Lauderdale Sout","alt_va":5.98,"construction_dt":19971201,"inventory_dt":19991013,"well_depth_va":114.5},
        "260458080134801": {"station_nm":"G  -1221","dec_lat_va":26.08314348,"dec_long_va":-80.2297703,"map_nm":"FT LAUDERDALE SOUTH","alt_va":7.1,"construction_dt":19621120,"inventory_dt":null,"well_depth_va":20},
        "260515080202101": {"station_nm":"G  - 617","dec_lat_va":26.08777778,"dec_long_va":-80.3385556,"map_nm":"COOPER CITY","alt_va":6.6,"construction_dt":19501115,"inventory_dt":19501115,"well_depth_va":29},
        "260545080082001": {"station_nm":"G  - 561","dec_lat_va":26.09619829,"dec_long_va":-80.13865628,"map_nm":"FT LAUDERDALE SOUTH","alt_va":8.5,"construction_dt":19480209,"inventory_dt":19480209,"well_depth_va":20.3},
        "260653080184901": {"station_nm":"G  -2034","dec_lat_va":26.0341111,"dec_long_va":-80.3853056,"map_nm":"COOPER CITY SW","alt_va":6.3,"construction_dt":19720101,"inventory_dt":null,"well_depth_va":22},
        "260657080122301": {"station_nm":"S  - 329","dec_lat_va":26.11567778,"dec_long_va":-80.2063333,"map_nm":"FT LAUDERDALE SOUTH","alt_va":9.2,"construction_dt":1926,"inventory_dt":19400921,"well_depth_va":68},
        "260752080084701": {"station_nm":"G  -1220","dec_lat_va":26.1310611,"dec_long_va":-80.14625,"map_nm":"FT LAUDERDALE NORTH","alt_va":7,"construction_dt":19621121,"inventory_dt":19621121,"well_depth_va":20},
        "260821080185101": {"station_nm":"G  -2032","dec_lat_va":26.1386111,"dec_long_va":-80.3138611,"map_nm":"COOPER CITY","alt_va":6.6,"construction_dt":19720101,"inventory_dt":null,"well_depth_va":22},
        "261141080163401": {"station_nm":"G  -2033","dec_lat_va":26.1956111,"dec_long_va":-80.2759167,"map_nm":"COOPER CITY NE","alt_va":11,"construction_dt":19720101,"inventory_dt":null,"well_depth_va":23},
        "261147080114501": {"station_nm":"G  -2395","dec_lat_va":26.1965,"dec_long_va":-80.1958056,"map_nm":"FT LAUDERDALE NORTH","alt_va":9.4,"construction_dt":19840201,"inventory_dt":null,"well_depth_va":73},
        "261434080071901": {"station_nm":"G  - 853","dec_lat_va":26.24319444,"dec_long_va":-80.1218333,"map_nm":"POMPANO BEACH","alt_va":19.7,"construction_dt":19600101,"inventory_dt":null,"well_depth_va":27},
        "261441080111301": {"station_nm":"G  -1316","dec_lat_va":26.24480556,"dec_long_va":-80.1865833,"map_nm":"FT LAUDERDALE NORTH","alt_va":15.2,"construction_dt":null,"inventory_dt":null,"well_depth_va":15},
        "261501080060701": {"station_nm":"G  -2147","dec_lat_va":26.25044444,"dec_long_va":-80.10125,"map_nm":"BOCA RATON","alt_va":9.1,"construction_dt":19740401,"inventory_dt":19740401,"well_depth_va":46},
        "261534080165801": {"station_nm":"G  -2031","dec_lat_va":26.25944444,"dec_long_va":-80.26625,"map_nm":"CORAL SPRINGS NE","alt_va":12.65,"construction_dt":19720101,"inventory_dt":null,"well_depth_va":22},
        "261641080064801": {"station_nm":"G  -2866","dec_lat_va":26.27805556,"dec_long_va":-80.11313889,"map_nm":"BOCA RATON","alt_va":17.24,"construction_dt":19960516,"inventory_dt":19960716,"well_depth_va":20},
        "261708080090801": {"station_nm":"G  -1315","dec_lat_va":26.28533333,"dec_long_va":-80.1522222,"map_nm":"WEST DIXIE BEND","alt_va":15.4,"construction_dt":19690101,"inventory_dt":null,"well_depth_va":14},
        "261734080111301": {"station_nm":"G  -1213","dec_lat_va":26.29294444,"dec_long_va":-80.18625,"map_nm":"WEST DIXIE BEND","alt_va":18.3,"construction_dt":19621120,"inventory_dt":null,"well_depth_va":15},
        "261831080151301": {"station_nm":"G  -2739","dec_lat_va":26.30825,"dec_long_va":-80.253,"map_nm":"CORAL SPRINGS NE","alt_va":12.3,"construction_dt":null,"inventory_dt":19911207,"well_depth_va":21},
        "261903080065601": {"station_nm":"G  -1260","dec_lat_va":26.31780556,"dec_long_va":-80.1153333,"map_nm":"BOCA RATON","alt_va":10.9,"construction_dt":19610801,"inventory_dt":null,"well_depth_va":90},
        "261938080101001": {"station_nm":"G  -2852","dec_lat_va":26.32766667,"dec_long_va":-80.16925,"map_nm":"WEST DIXIE BEND","alt_va":15.82,"construction_dt":19791015,"inventory_dt":19791016,"well_depth_va":140}
      },
      dynamic: new Map([
        ['cb_62610', 'on'],
        ['format', 'rdb'],
        ['site_no', null],
        ['period', '2'],
        ['begin_date', '2017-04-04'],
        ['end_date', '2017-04-06']
      ])
    },
    gauges: {
      static: {
        "255828080401301": {"station_nm":"SITE 64 IN CONSERVATION AREA 3A NR COOPERTOWN FL.","dec_lat_va":25.97513889,"dec_long_va":-80.6696111},
        "260007080464401": {"station_nm":"W-18 IN WATER CONSERVATION AREA 3-A","dec_lat_va":26.00194444,"dec_long_va":-80.77888889},
        "260037080303401": {"station_nm":"SITE 76 IN CONSERVATION AREA 3B NR ANDYTOWN, FL","dec_lat_va":26.0076472,"dec_long_va":-80.48236389},
        "260042080351701": {"station_nm":"EDEN 12 IN WATER CONSERVATION AREA 3-A","dec_lat_va":26.01166667,"dec_long_va":-80.5880556},
        "260051080404001": {"station_nm":"W-15 IN WATER CONSERVATION AREA 3-A","dec_lat_va":26.01416667,"dec_long_va":-80.6777778},
        "260324080421900": {"station_nm":"3A-5 IN WATER CONSERVATION AREA 3A","dec_lat_va":26.05666667,"dec_long_va":-80.7052778},
        "260410080452701": {"station_nm":"EDEN 14 IN WATER CONSERVATION AREA 3-A","dec_lat_va":26.06944444,"dec_long_va":-80.7575},
        "260536080302501": {"station_nm":"EDEN 4 IN WATER CONSERVATION AREA 3-A","dec_lat_va":26.09333333,"dec_long_va":-80.5069444},
        "260725080451001": {"station_nm":"EDEN 5 IN WATER CONSERVATION AREA 3-A","dec_lat_va":26.1236111,"dec_long_va":-80.7527778},
        "260810080222001": {"station_nm":"SITE 99 NR L-35A IN CONS AREA 2B NR SUNRISE, FL","dec_lat_va":26.13644444,"dec_long_va":-80.3670833},
        "261023080443001": {"station_nm":"SITE 62 IN CONSERVATION AREA 3A NR ANDYTOWN, FL","dec_lat_va":26.17421944,"dec_long_va":-80.75075},
        "261035080221701": {"station_nm":"EDEN 13 IN WATER CONSERVATION AREA 2-B","dec_lat_va":26.17638889,"dec_long_va":-80.37138889},
        "261117080315201": {"station_nm":"SITE 63 IN CONSERVATION AREA NO. 3A NR ANDYTOWN FL","dec_lat_va":26.1884722,"dec_long_va":-80.531},
        "261150080270001": {"station_nm":"N. NEW RIVER CANAL AT S-11-A NR ANDYTOWN, FL","dec_lat_va":26.17814028,"dec_long_va":-80.44783128},
        "261200080275001": {"station_nm":"N. NEW RIVER CANAL AT S-11-B NR ANDYTOWN, FL","dec_lat_va":26.2025838,"dec_long_va":-80.45338689},
        "261300080280001": {"station_nm":"N. NEW RIVER CANAL AT S-11-C NR ANDYTOWN, FL","dec_lat_va":26.2289717,"dec_long_va":-80.4600536},
        "261319080353201": {"station_nm":"EDEN 9 IN WATER CONSERVATION AREA 3-A","dec_lat_va":26.22194444,"dec_long_va":-80.5922222},
        "261543080495000": {"station_nm":"L-28 CANAL ABOVE S-140 NEAR CLEWISTON, FL","dec_lat_va":26.26230464,"dec_long_va":-80.83034079},
        "261710080190001": {"station_nm":"SITE 19 IN CONSERVATION AREA 2A NR CORAL SPRINGS","dec_lat_va":26.2814722,"dec_long_va":-80.30663889},
        "262240080258001": {"station_nm":"SITE 17 NR L-38, CONS AREA 2A NR CORAL SPRINGS, FL","dec_lat_va":26.28674729,"dec_long_va":-80.4108855}
      },
      dynamic: new Map([
        ['cb_00065', 'on'],
        ['format', 'rdb'],
        ['site_no', null],
        ['period', '2'], //parametric
        ['begin_date', '2017-04-04'], //parametric
        ['end_date', '2017-04-06'] //calculate
      ])
    }
  }
};

var getWMS_data = (feature_list, identifiers, marker_icon) => {
  //Use dbgeo / dbgeo_gen lib to parse into geojson
  let features = [];
  for (let feature in feature_list) {
    features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [feature_list[feature][identifiers.long], feature_list[feature][identifiers.lat]]
      },
      "properties": {
        "uid": feature,
        "icon": marker_icon
      }
    });
  }
  return {
    "type": "FeatureCollection",
    "features": features
  };
};

var LAYERS = {
  //Flood Hazard Extents
  'FLDHVE': {
    group_no: '0',
    label: 'Hazard VE',
    layer_id: 'FLDHVE',
    type: 'fill',
    source: {
      name: 'mapbox_user',
      type: 'vector',
      data: 'b0mn3fbb',
      layer: 'FLDHVE'
    },
    paint: {
      'fill-color': '#fccf23',
      'fill-opacity': 0
    },
    render_opacity: 0.9, //Use for base layers which are required to remain visible
    tooltip_text: 'A high-risk area where storms drive waves landward at heights of 3 feet or more.',
    visibility: 'visible'
  },
  'FLDHAO': {
    group_no: '0',
    label: 'Hazard AO',
    layer_id: 'FLDHAO',
    type: 'fill',
    source: {
      name: 'mapbox_user',
      type: 'vector',
      data: '1eqmjn9o',
      layer: 'FLDHAO'
    },
    paint: {
      'fill-color': '#fc610b',
      'fill-opacity': 0
    },
    render_opacity: 0.8, //Use for base layers which are required to remain visible
    tooltip_text: 'A high-risk area subject to waves less than 1.5 feet in height. This will be separated from the Coastal AE zone by the Limit of Moderate Wave Action (LiMWA). A LiMWA may not always be present, in which case, only Zone AE is shown.',
    visibility: 'visible'
  },
  'FLDHAE': {
    group_no: '0',
    label: 'Hazard AE',
    layer_id: 'FLDHAE',
    type: 'fill',
    source: {
      name: 'mapbox_user',
      type: 'vector',
      data: '4cou1y2j',
      layer: 'FLDHAE'
    },
    paint: {
      'fill-color': '#c44d3f',
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
      name: 'mapbox_user',
      type: 'vector',
      data: '758t0cbw',
      layer: 'FLDHAH'
    },
    paint: {
      'fill-color': '#6576a5',
      'fill-opacity': 0
    },
    render_opacity: 0.5, //Use for base layers which are required to remain visible
    tooltip_text: 'An area inundated by 1% annual chance flooding (usually sheet flow on sloping terrain), for which average depths have been determined; flood depths range from 1 to 3 feet.',
    visibility: 'visible'
  },
  'FLDHX': {
    group_no: '0',
    label: 'Hazard X',
    layer_id: 'FLDHX',
    type: 'fill',
    source: {
      name: 'mapbox_user',
      type: 'vector',
      data: '44qg0o2f',
      layer: 'FLDHX'
    },
    paint: {
      'fill-color': '#368bd8',
      'fill-opacity': 0
    },
    render_opacity: 0.25, //Use for base layers which are required to remain visible
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
      name: 'mapbox_user',
      type: 'vector',
      data: 'c5vfi3yr',
      layer: 'S_WTR'
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
      name: 'geojson_format',
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/stl-florida/data-layers/master/saltwaterFlorida.geojson',
      layer: ''
    },
    paint: {
      'line-color': '#c1272d',
      'line-width': 3
    },
    tooltip_text: 'Extent of salt-water intrusion into fresh water aquifers that can lead to cantamination of drinking water sources.',
    visibility: 'none'
  },
  //City data
  'landuse': {
    group_no: '2',
    label: 'Future landuse',
    layer_id: 'landuse',
    type: 'fill',
    source: {
      name: 'mapbox_user',
      type: 'vector',
      data: '2kwgic7s',
      layer: 'landuse'
    },
    paint: {
      'fill-color': lbcsCodes,
      'fill-opacity': 0
    },
    render_opacity: 0.5, //Use for base layers which are required to remain visible
    tooltip_text: 'The data set indicates the Broward County Land Use Plan designation for all parcels in Broward County.(updated September 27, 2016.)',
    visibility: 'visible'
  },
  'city_boundaries': {
    group_no: '2',
    label: 'City boundaries',
    layer_id: 'city_boundaries',
    type: 'line',
    source: {
      name: 'geojson_format',
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/stl-florida/data-layers/master/cities.geojson',
      layer: ''
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
      name: 'geojson_format',
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
      layer: null
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
  },
  'stormsurge': {
    group_no: '1',
    label: 'Storm surge heights',
    layer_id: 'stormsurge',
    type: 'fill',
    source: {
      name: 'mapbox_user',
      type: 'vector',
      data: '41947bz4',
      layer: 'stormsurge'
    },
    paint: {
      'fill-color': {
        'property': 'CAT',
        'type': 'categorical',
        'stops': [
          ['1', '#c1272d'],
          ['2', '#cd5257'],
          ['3', '#d97d81'],
          ['4', '#e6a8ab'],
          ['5', '#f2d3d5']
        ]
      },
      'fill-opacity': {
        'property': 'CAT',
        'type': 'categorical',
        'stops': [
          ['1', 0.7],
          ['2', 0.6],
          ['3', 0.5],
          ['4', 0.4],
          ['5', 0.3]
        ]
      }
    },
    tooltip_text: 'Storm surge heights based on SLOSH model',
    visibility: 'none'
  },
  'gw_wells': {
    group_no: '4',
    label: 'USGS monitoring wells',
    layer_id: 'gw_wells',
    type: 'symbol',
    source: {
      name: 'geojson_format',
      type: 'geojson',
      data: getWMS_data(WMS.usgs_water.gw_wells.static, {lat: 'dec_lat_va', long: 'dec_long_va'}, 'circle-11'),
      layer: null
    },
    tooltip_text: 'Realtime ground water monitoring feed',
    visibility: 'visible'
  },
  'gauges': {
    group_no: '4',
    label: 'USGS gauges',
    layer_id: 'gauges',
    type: 'symbol',
    source: {
      name: 'geojson_format',
      type: 'geojson',
      data: getWMS_data(WMS.usgs_water.gauges.static, {lat: 'dec_lat_va', long: 'dec_long_va'}, 'triangle-stroked-15'),
      layer: null
    },
    tooltip_text: 'Realtime gauge height monitoring feed',
    visibility: 'visible'
  },
  'sewer_mains': {
    group_no: '1',
    label: 'Sewer mains',
    layer_id: 'sewer_mains',
    type: 'line',
    source: {
      name: 'geojson_format',
      type: 'geojson',
      data: null,
      layer: ''
    },
    'paint': {
      'line-color': {
        'property': 'year_instl',
        'type': 'exponential',
        'stops': [
          [1955, '#85551b'],
          [2015, '#1f78b4']
        ]
      },
      'line-width': 1.5/*{ --not supported as yet in gl-js
        'property': 'DIAMETER',
        'type': 'categorical',
        'stops': [
          [4, 0.2],
          [6, 0.4],
          [8, 0.6],
          [10, 0.8],
          [12, 1],
          [14, 1.2],
          [15, 1.3],
          [16, 1.4],
          [18, 1.6],
          [20, 1.8],
          [21, 1.9],
          [24, 2.2],
          [99, 2.5]
        ]
      }*/
    },
    tooltip_text: 'Sewer lines & gravity mains by age & diameter',
    visibility: 'none'
  },
  'contours': {
    group_no: '1',
    label: 'Contours',
    layer_id: 'contours',
    type: 'line',
    source: {
      name: 'mapbox_user',
      type: 'vector',
      data: '1uj351nf',
      layer: 'contours'
    },
    'paint': {
      'line-color': {
        'property': 'elev',
        'type': 'exponential',
        'stops': [
          [-4, '#28211d'],
          [4, '#563b1b'],
          [12, '#638251'],
          [20, '#cde29f']
        ]
      },
      'line-width': 0.25
    },
    tooltip_text: 'Contour lines at 1 ft interval',
    visibility: 'none'
  },
  'hillshade': {
    group_no: '4',
    label: 'Hillshade',
    layer_id: 'hillshade',
    type: 'fill',
    source: {
      name: 'mapbox_global',
      type: 'vector',
      data: 'mapbox://mapbox.mapbox-terrain-v2',
      layer: 'hillshade'
    },
    paint: {
      'fill-color': {
        'property': 'class',
        'type': 'categorical',
        'stops': [
          ['shadow', '#ff0000'],
          ['highlight', '#ffff00']
        ]
      },
      'fill-opacity': {
        'property': 'class',
        'type': 'categorical',
        'stops': [
          ['shadow', 0.4],
          ['highlight', 0.8]
        ]
      }
    },
    tooltip_text: 'Hillshade',
    visibility: 'visible'
  }
};

module.exports = {
  LAYERS,
  WMS
};
