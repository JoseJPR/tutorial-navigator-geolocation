/** Import Main Dependencies */
import geolocation from './geolocation.js';
import map from './map.js';

// Init local references of html elements.
let leyendGeolocation, getCurrentPosition, watchPosition;

/* 
 * Init static configuration in order to a maker element reference,
 * watcher geolocation and if is or not available the API.
 */
let marker;
const mapRef = 'map';
const mapZoom = 3;
const mapInitLatitude = 0;
const mapInitLongitude = 0;
const watcher = {
  enableHighAccuracy: true, timeout: 5000, maximumAge: 0
}
const titleStartWatch = 'Start Watch Position';
const titleStopWatch = 'Stop Watch Position';
const titleGetPosition = 'Get Position';
const titleAPIAvailable = '✅ Good! the geolocation API is available.';
const titleAPINotAvailable = '❌ Oops! It seems that the geolocation API is NOT available.';

/** 
 * Block Init and Set local reference to html elements.
 */
// Set listener for get if the windows is loaded.
window.addEventListener("load", () => {
  // Save local references of html elements.
  leyendGeolocation = document.querySelector('#leyend');
  getCurrentPosition = document.querySelector('#getCurrentPosition');
  watchPosition = document.querySelector('#watchPosition');

  // Assign dynamic texts.
  getCurrentPosition.innerHTML = titleGetPosition;
  watchPosition.innerHTML = titleStartWatch;

  // Check if Geolocation Api is available for show specific text.
  leyendGeolocation.innerHTML = geolocation.checkApiAvailable() 
    ? titleAPIAvailable
    : titleAPINotAvailable;

  // Init Map instance with initual setting.
  map.create(mapRef, mapInitLongitude, mapInitLatitude, mapZoom);

  /** 
   * Block Current Position
   */
  // Set listener to button for launch get current position method.
  getCurrentPosition.addEventListener('click', async () => {
    geolocation.getCurrentPosition();
  });
  // Init document listener for get success or error.
  document.addEventListener('getCurrentPositionSuccess', (data) => {
    const { coords, timestamp } = data.details;
    const { latitude, longitude } = coords;
    leyendGeolocation.innerHTML = `🌎 Lng: ${longitude.toFixed(4)} \ Lat: ${latitude.toFixed(4)} | 🕜: ${timestamp}`;
    // Create Map with Singleton Instance.
    marker = map.addMarker(longitude, latitude);
  });
  document.addEventListener('getCurrentPositionError', (event) => {
    console.error('getCurrentPositionError', event);
    leyendGeolocation.innerHTML = event.error.message;
  });

  /** 
   * Block Watch Position
   */
  // Set listener to button for launch init watcher and watch position method.
  watchPosition.addEventListener('click', () => {
    const { enableHighAccuracy, timeout, maximumAge } = watcher;
    geolocation.get().watchId
      ? geolocation.clearWatch()
      : geolocation.watchPosition(enableHighAccuracy, timeout, maximumAge);

    watchPosition.innerHTML =
      geolocation.get().watchId
      ? titleStopWatch
      : titleStartWatch;
  });
  // Init document listener for get success or error.
  document.addEventListener('watchPositionSuccess', (data) => {
    console.log('watchPositionSuccess', data);
    const { coords, timestamp } = data.details;
    const { latitude, longitude } = coords;
    leyendGeolocation.innerHTML = `🌎 Lng: ${longitude} \ Lat: ${latitude} | 🕜: ${timestamp}`;
    map.setPositionMarker(marker, longitude, latitude);
  });
  document.addEventListener('watchPositionError', (event) => {
    console.error('watchPositionError', event);
    leyendGeolocation.innerHTML = event.error.message;
  });
});