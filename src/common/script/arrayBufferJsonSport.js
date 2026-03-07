Object.defineProperty(ArrayBuffer.prototype, 'toBase64', {
  /**
   * Converts an array of bytes to a base64 encoded string.
   *
   * @return {string} The base64 encoded string.
   */
  value: function () {
    return btoa(String.fromCharCode(...new Uint8Array(this)));
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
Object.defineProperty(ArrayBuffer.prototype, 'toJSON', {
  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  value: function () {
    return this.toBase64();
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
Object.defineProperty(Uint8Array.prototype, 'toBase64', {
  /**
   * Converts an array of bytes to a base64 encoded string.
   *
   * @return {string} The base64 encoded string.
   */
  value: function () {
    return btoa(String.fromCharCode(...this));
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
/**
 * Converts a string to a Uint8Array.
 *
 * @param {string} s - The input string to convert.
 * @return {Uint8Array} - The converted Uint8Array.
 */
Uint8Array.fromString = function (s) {
  return this.from(s, (c) => c.charCodeAt(0));
};
export default 1;
