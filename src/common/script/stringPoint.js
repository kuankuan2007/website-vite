Object.defineProperty(String.prototype, 'KKpointLength', {
  /**
   * Calculates the length of a string, taking into account Unicode surrogate pairs.
   *
   * @return {number} The length of the string.
   */
  get: function () {
    let len = 0;
    for (let i = 0; i < this.length; ) {
      let codePoint = this.codePointAt(i);
      i += codePoint > 0xffff ? 2 : 1;
      len++;
    }
    return len;
  },
  enumerable: false,
});
Object.defineProperty(String.prototype, 'KKsliceByPoint', {
  /**
   * Returns a new string that contains a subset of the original string.
   *
   * @param {number} start - The index at which to begin extraction. Default is 0.
   * @param {number} end - The index at which to end extraction. Default is Infinity.
   * @return {string} The extracted substring.
   */
  value: function (start = 0, end = Infinity) {
    let result = '';
    let now = 0;
    for (let i = 0; i < this.length; ) {
      let codePoint = this.codePointAt(i);
      if (now >= start && now < end) {
        result += String.fromCodePoint(codePoint);
      } else if (now >= end) {
        break;
      }
      i += codePoint > 0xffff ? 2 : 1;
      now++;
    }
    return result;
  },
  enumerable: false,
});

Object.defineProperty(String.prototype, 'KKpointAt', {
  /**
   * Returns a substring containing the character at the specified point in the string.
   *
   * @param {number} point - The index of the character to return.
   * @return {string||undefined} - The substring containing the character at the specified point, or undefined if the point is out of range.
   */
  value: function (point) {
    const result = this.sliceByPoint(point, point + 1);
    return result || void 0;
  },
  enumerable: false,
});

export default 1;
