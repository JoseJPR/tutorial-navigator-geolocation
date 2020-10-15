/**
 * @name Map
 * @description With this class you can create a new instance of a Map element with Open Layers.
 */
class Map {

  constructor() {
    this.map = undefined;
  }

  /**
   * @name create
   * @description Method for create a new map instance with Open Layer library.
   * @return {object} Native Open Layer map object.
   */
  create(target, longitude, latitude, zoom) {
    this.map = new ol.Map({
      target,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([longitude, latitude]),
        zoom,
      }),
    });
    return this.map;
  }

  /**
   * @name addMarker
   * @description Method for create and add a marker into map.
   * @return {object} Native Marker object.
   */
  addMarker(longitude, latitude) {
    // Create html element.
    const element = document.createElement('div')
    element.setAttribute('class', 'marker');
    document.body.appendChild(element);
    // Instance Overlay for set add into map and set longitude and latitude position.
    const marker = new ol.Overlay({
      element,
    });
    // Add the overlay to the map.
    this.map.addOverlay(marker);
    // Assign a latitude and longitude to the marker.
    marker.setPosition(ol.proj.fromLonLat([longitude, latitude]));
    return marker;
  }

  /**
   * @name setPositionMarker
   * @description Method for change the actual position of marker object.
   * @return {object} Native Marker object.
   */
  setPositionMarker(marker, longitude, latitude) {
    // Assign a latitude and longitude to the marker.
    marker.setPosition(ol.proj.fromLonLat([longitude, latitude]));
    return marker;
  }
};

export default new Map();