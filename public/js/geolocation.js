/**
 * @name Geolocation
 * @description With this class you can create a new instance of a geolocation API.
 */
class Geolocation {

  constructor() {
    this.watchId = undefined;
    this.enableHighAccuracy = true;
    this.timeout = 1000;
    this.maximumAge = 0;
    this.getCurrentPositionSuccess = document.createEvent('Event');
    this.getCurrentPositionSuccess.initEvent('getCurrentPositionSuccess', true, true);
    this.getCurrentPositionError = document.createEvent('Event');
    this.getCurrentPositionError.initEvent('getCurrentPositionError', true, true);
    this.watchPositionSuccess = document.createEvent('Event');
    this.watchPositionSuccess.initEvent('watchPositionSuccess', true, true);
    this.watchPositionError = document.createEvent('Event');
    this.watchPositionError.initEvent('watchPositionError', true, true);
  }

  /**
   * @name checkApiAvailable
   * @description Method for get if geolocation api is available in the navigator or not.
   * @return {boolean} True is available, false not.
   */
  checkApiAvailable() {
    return "geolocation" in navigator;
  }

  /**
   * @name getCurrentPosition
   * @description Method for active geolocation api and dispatch an events with current position or error.
   * @return {object} Native object of getCurrentPosition method.
   */
  getCurrentPosition() {
    this.checkApiAvailable()
    && (() => { 
      navigator.geolocation.getCurrentPosition(
        (success) => {
          this.getCurrentPositionSuccess.details = success;
          document.dispatchEvent(this.getCurrentPositionSuccess);
        },
        (error) => {
          this.getCurrentPositionError.error = error;
          document.dispatchEvent(this.getCurrentPositionError);
        },
      );
    })();
  }

  /**
   * @name watchPosition
   * @description This method is used a watcher that will be called automatically each time
   *              the position of the device changes and dispatch an events with current position or error.
   *              More info: https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
   * @param {boolean} enableHighAccuracy Is a Boolean that indicates the application would like to receive the best possible results.
   * @param {number} timeout Is a positive long value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position.
   * @param {number} maximumAge Is a positive long value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return.
   * @return {string} Watcher Id.
   */
  watchPosition(enableHighAccuracy = this.enableHighAccuracy, timeout = this.timeout, maximumAge = this.maximumAge) {
    this.checkApiAvailable() 
    && (() => { 
      if(enableHighAccuracy) this.enableHighAccuracy = enableHighAccuracy;
      if(timeout) this.timeout = timeout;
      if(maximumAge) this.maximumAge = maximumAge;
      this.watchId = navigator.geolocation.watchPosition(
        (success) => {
          this.watchPositionSuccess.details = success;
          document.dispatchEvent(this.watchPositionSuccess);
        },
        (error) => {
          this.watchPositionError.error = error;
          document.dispatchEvent(this.watchPositionError);
        },
        { enableHighAccuracy, timeout, maximumAge },
      );
    })();
  }

  /**
   * @name clearWatch
   * @description This method is used to unregister location/error monitoring handlers previously installed using Geolocation.watchPosition().
   * @return {boolean} Returns true if the watcher is cleared or false to not.
   */
  clearWatch() {
    this.checkApiAvailable()
    && this.watchId
    && (() => {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = undefined;
    })();
  }

  /**
   * @name get
   * @description This method return all properties of this instance.
   * @return {object} Returns object with watchId, latitude and longitude values.
   */
  get() {
    const { watchId, enableHighAccuracy, timeout, maximumAge } = this;
    return {
      watchId, enableHighAccuracy, timeout, maximumAge,
    }
  }
}

export default new Geolocation();
