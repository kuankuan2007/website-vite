/**
 * Compares two values and returns true if the first value is less than the second value.
 *
 * @param {any} a - the first value to compare
 * @param {any} b - the second value to compare
 * @return {boolean} true if a is less than b, otherwise false
 */
function compareTo(a, b) {
  return a < b;
}
Object.defineProperty(Array.prototype, 'KKBubbleSort', {
  /**
   *
   * @param {function(any,any):boolean} compare
   */
  value: function (compare = compareTo) {
    while (true) {
      let flag = true;
      for (let i = 0; i < this.length - 1; i++) {
        if (compare(this[i + 1], this[i])) {
          [this[i], this[i + 1]] = [this[i + 1], this[i]];
          flag = false;
        }
      }
      if (flag) {
        break;
      }
    }
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
Object.defineProperty(Array.prototype, 'KKSelectionSort', {
  /**
   *
   * @param {function(any,any):boolean} compare
   */
  value: function (compare = compareTo) {
    for (let i = 0; i < this.length; i++) {
      let index = i;
      for (let j = i + 1; j < this.length; j++) {
        if (compare(this[j], this[index])) {
          index = j;
        }
      }
      if (index !== i) {
        [this[i], this[index]] = [this[index], this[i]];
      }
    }
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
Object.defineProperty(Array.prototype, 'KKInsertionSort', {
  value: function (compare = compareTo) {
    for (let i = 1; i < this.length; i++) {
      if (compare(this[i], this[i - 1])) {
        let temp = this[i],
          j;
        for (j = i - 1; j >= 0 && compare(temp, this[j]); j--) {
          this[j + 1] = this[j];
        }
        this[j + 1] = temp;
      }
    }
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
export default 1;
