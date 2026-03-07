Object.defineProperty(Object.prototype, 'KKCopyTo', {
  value: function () {
    if (typeof this !== 'object' || this === null) {
      return this;
    }
    let result = {};
    for (let i in this) {
      result[i] = this[i];
    }
    return result;
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
Object.defineProperty(Object.prototype, 'KKdeepCopyTo', {
  value: function () {
    if (typeof this !== 'object' || this === null) {
      return this;
    }
    let result = {};
    for (let i in this) {
      if (typeof this[i] === 'object' && this[i] !== null) {
        result[i] = this[i].KKdeepCopyTo();
      } else {
        result[i] = this[i];
      }
    }
    return result;
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
Object.defineProperty(Array.prototype, 'KKCopyTo', {
  value: function () {
    let result = [];
    for (let i in this) {
      result[i] = this[i];
    }
    return result;
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
Object.defineProperty(Array.prototype, 'KKdeepCopyTo', {
  value: function () {
    let result = [];
    for (let i in this) {
      if (typeof this[i] === 'object' && this[i] !== null) {
        result[i] = this[i].KKdeepCopyTo();
      } else {
        result[i] = this[i];
      }
    }
    return result;
  },
  enumerable: false,
  writable: false,
  configurable: false,
});
export default 1;
