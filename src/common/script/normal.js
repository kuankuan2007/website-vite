import { sprintf } from 'sprintf';
import { customRef, reactive, ref } from 'vue';
import QRCode from 'qrcode';
console.log(import.meta.env);
/**
 * Creates a debounced version of a function that delays its execution until after a specified delay.
 * @param {function} fn - The function to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @param {object} flag - The flag to be used in the debounced function.
 * @param {object} flag.obj - The flag to be used in the debounced function.
 * @param {string} flag.key - The name of the flag to be used in the
 * @returns {function} - The debounced function.
 */
export function debounce(fn, delay = 300, flag = null) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    if (flag) {
      flag.obj[flag.key] = true;
    }
    timer = setTimeout(() => {
      if (flag) {
        flag.obj[flag.key] = false;
      }
      fn.call(this, ...args);
    }, delay);
  };
}
/**
 *
 * @param {String} text
 */
export function copyText(text) {
  return navigator.clipboard.writeText(text);
}
/**
 * Retrieves the value of a query variable from the URL.
 * If the variable is not found, returns the provided elsevalue.
 * @param {string} variable - The name of the query variable to retrieve.
 * @param {string} elsevalue - The value to return if the variable is not found.
 * @returns {string} - The value of the query variable, or elsevalue if not found.
 */
export function getQueryVariable(variable, elsevalue) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    let retsult = '';
    for (var j = 1; j < pair.length; j++) {
      retsult += '=' + pair[j];
    }
    retsult = retsult.substring(1);
    if (pair[0] == variable) {
      return retsult;
    }
  }
  return elsevalue;
}
/**
 * format a date.
 * Replace the date information with %(xxx)s(see https://www.npmjs.com/package/sprintf-js#format-specification)
 * Effective information: year, month, day, hour, minute, second
 * @param {Date} date
 * @param {String} base
 * @returns {String}
 */
export function dateFormater(date, base) {
  let obj = {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
    day: date.getDate().toString(),
    hour: date.getHours().toString(),
    minute: date.getMinutes().toString(),
    second: date.getSeconds().toString(),
  };
  return sprintf(base, obj);
}
/**
 * Returns a debounced ref that tracks changes to a value and triggers an update after a specified duration.
 * @param {*} value - The initial value.
 * @param {number} duration - The duration in milliseconds.
 * @returns {Ref} - The debounced ref.
 */
export function debounceRef(value, duration = 1000) {
  let timer;
  let tra, tri;
  let lastVal = value;
  let refresh = () => {
    tri();
    value = lastVal;
  };
  let nowRef = customRef((track, trigger) => {
    tri = trigger;
    tra = track;
    return {
      get() {
        track();
        return value;
      },
      set(val) {
        clearTimeout(timer);
        lastVal = val;
        timer = setTimeout(refresh, duration);
      },
    };
  });
  nowRef.refresh = refresh;
  return nowRef;
}

/**
 * Jumps to a specified URL.
 *
 * @param {string} url - The URL to jump to.
 * @param {boolean} onOtherWindow - Specifies whether to open the URL in a new window.
 * @return {void} This function does not return a value.
 */
export function jump(url, onOtherWindow) {
  url = getJumpUrl(url);
  if (onOtherWindow) {
    window.open(url);
  } else {
    window.location.href = url;
  }
}
/**
 * Returns a modified URL if it starts with "/" and does not start with the base URL.
 *
 * @param {string} url - The URL to be checked and possibly modified.
 * @return {string} The modified URL, if necessary.
 */
export function getJumpUrl(url) {
  if (url.startsWith('/') && !url.startsWith(import.meta.env.BASE_URL)) {
    // console.warn("Base URL is not included in the URL.")
    console.log(url);

    url = import.meta.env.BASE_URL + url.slice(1);
  }
  return url;
}
function getStorageName(value) {
  if (value === localStorage) {
    return 'local';
  }
  if (value === sessionStorage) {
    return 'session';
  }
  return void 0;
}
/**
 * Returns a reference to a value stored in a storage object, such as localStorage.
 * If the value does not exist, it returns the "elsevalue" parameter.
 * The value can be optionally parsed from a string using JSON.parse.
 *
 * @param {String} key - The key used to store the value in the storage object.
 * @param {Function} by - The function used to create the reference.
 * @param {Storage} storage - The storage object where the value is stored.
 * @param {any} elsevalue - The value to return if the key does not exist in the storage object.
 * @param {boolean} stringify - Indicates whether the value should be parsed from a string.
 * @returns {Ref} - A reference to the value.
 */
export function getRefWithStorage(
  key,
  by = ref,
  storage = localStorage,
  elsevalue = null,
  stringify = false
) {
  let getvalue = (value) => {
    if (!stringify) {
      return value;
    }
    try {
      return JSON.parse(value);
    } catch {
      console.warn('The value could not be parsed from a string.');
      return value;
    }
  };
  let v = getvalue(storage.getItem(key));
  let val = by(v !== null ? v : elsevalue);
  window.addEventListener(`${getStorageName(storage)}StorageSetItemEvent`, (event) => {
    if (event.key === key) {
      val.value = getvalue(event.newValue);
    }
  });
  window.addEventListener('storage', (event) => {
    if (event.key === key && event.storageArea === storage) {
      val.value = getvalue(event.newValue);
    }
  });
  return val;
}
/**
 * Download a file from the given data.
 * @param {Any} data - The data to be downloaded.
 * @param {String} name - The name of the file.
 * @param {String} [memi='text/plain'] - The MIME type of the file.
 */
export function downloadData(data, name, memi = 'text/plain') {
  const blob = new Blob([data], {
    type: memi,
  });
  const objectURL = URL.createObjectURL(blob);
  const aTag = document.createElement('a');
  aTag.href = objectURL;
  aTag.download = name;
  aTag.click();
  aTag.remove();
  URL.revokeObjectURL(objectURL);
}
/**
 * @type {import('vue').UnwrapNestedRefs<{
 *  width:number,
 *  height:number,
 *  readonly minSize:number,
 *  readonly maxSize:number,
 *  readonly meanSize:number
 * }>}
 */
export let windowSize = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
  get minSize() {
    return Math.min(windowSize.width, windowSize.height);
  },
  get maxSize() {
    return Math.max(windowSize.width, windowSize.height);
  },
  get meanSize() {
    return (windowSize.width + windowSize.height) / 2;
  },
});
window.addEventListener('resize', () => {
  windowSize.height = window.innerHeight;
  windowSize.width = window.innerWidth;
});
/**
 * Converts a hyphen-separated string to hump (camel) case.
 *
 * @param {string} str - The hyphen-separated string to be converted.
 * @return {string} The converted hump case string.
 */
export function hyphenNaming2HumpNaming(str) {
  var re = /-(\w)/g;
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase();
  });
}
/**
 * Generates a URL by appending the current URL to the base URL.
 *
 * @param {string} baseUrl - The base URL to append to.
 * @return {string} The generated URL.
 */
export function getJumpToWithFromNowUrl(baseUrl) {
  return `${baseUrl}${baseUrl.includes('?') ? '' : '?'}&from=${encodeURIComponent(location.href)}`;
}
/**
 * Redirects the user to a specified URL with an additional "from" query parameter.
 *
 * @param {string} baseURL - The base URL to redirect to.
 * @return {void} This function does not return a value.
 */
export function jumpToWithFromNow(baseURL) {
  jump(getJumpToWithFromNowUrl(baseURL));
}
/**
 * Jumps back to the previous page while passing the "from" parameter in the URL.
 * @return {type} description of return value
 */
export function jumpBackToFrom() {
  jump(decodeURIComponent(getQueryVariable('from', '/')));
}
/**
 * Returns a URL with a query parameter "from" added to it, derived from the provided base URL.
 *
 * @param {string} baseUrl - The base URL to add the "from" parameter to.
 * @return {string} The modified URL with the "from" parameter added.
 */
export function getJumpToWithFromUrl(baseURL) {
  return `${baseURL}${baseURL.includes('?') ? '' : '?'}&from=${getQueryVariable('from', '/')}`;
}
/**
 * Redirects the user to a new URL by appending a `from` query parameter.
 *
 * @return {void} No return value.
 */
export function jumpToWithFrom(baseURL) {
  jump(getJumpToWithFromUrl(baseURL));
}
/**
 * make QR Code and return the data url
 * @param {string} content
 * @returns {string}
 */
export async function getQRCode(content) {
  const canvas = await QRCode.toCanvas(content);
  let dataURL = canvas.toDataURL('image/png');
  return dataURL;
}
/**
 * Determines if the current device is a mobile device.
 *
 * @return {boolean} True if the device is a mobile device, false otherwise.
 */
export function isMobie() {
  return /mobile/.test(navigator.userAgent.toLowerCase());
}
/**
 * get the random number in [from,to)
 * @param {number} from
 * @param {number} to
 * @returns {number}
 */
export function getRandomFloat(from, to) {
  return Math.random() * (to - from) + from;
}
/**
 * get the random int in [from,to)
 * @param {number} from
 * @param {number} to
 * @returns
 */
export function getRandomInt(from, to) {
  return Math.floor(getRandomFloat(from, to));
}
/**
 * Returns a randomly chosen element from the given list.
 *
 * @param {Array} list - The list from which to choose an element.
 * @return {*} - The randomly chosen element from the list.
 */
export function randomChoose(list) {
  return list[getRandomInt(0, list.length)];
}
export function getRandomString(
  length,
  from = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) {
  return Array.from({ length }, () => from[getRandomInt(0, from.length)]).join('');
}
/**
 *
 * @template _T
 * @param {_T} item
 * @returns {_T}
 */
export function copyItem(item) {
  return JSON.parse(JSON.stringify(item));
}
/**
 * Creates a deep copy of an object or array.
 *
 * @param {any} item - The object or array to be copied.
 * @return {any} - The deep copy of the input object or array.
 */
export function deepCopy(item) {
  let maps = new WeakMap();
  function _deepCopy(item) {
    if (typeof item !== 'object' || item === null) {
      return item;
    }
    let result = Array.isArray(item) ? [] : {};
    if (maps.has(item)) {
      return maps.get(item);
    }
    maps.set(item, result);
    for (let i in item) {
      result[i] = _deepCopy(item[i]);
    }
    return result;
  }
  return _deepCopy(item);
}
export class ArrayLike {
  /**
   *
   * @param {Any[]} data
   */
  constructor(data) {
    for (let i = 0; i < data.length; i++) {
      this[i] = data[i];
    }
    this.length = data.length;
  }
  /**
   *
   * @returns {Any[]}
   */
  toArray() {
    let array = new Array(this.length);
    for (let i = 0; i < this.length; i++) {
      array[i] = this[i];
    }
    return array;
  }
}
/**
 *
 * @returns {Any[]}
 */
export function toArray(data) {
  let array = new Array(data.length);
  for (let i = 0; i < data.length; i++) {
    array[i] = data[i];
  }
  return array;
}
/**
 * Sets default values in an object.
 *
 * @param {object} value - The object to set default values in.
 * @param {object} defaultsValue - The object containing the default values.
 */
export function setDefaultsValue(value, defaultsValue) {
  for (let i in defaultsValue) {
    if (!(i in value)) {
      value[i] = defaultsValue[i];
    }
    if (typeof defaultsValue[i] === 'object' && typeof value[i] === 'object') {
      setDefaultsValue(value[i], defaultsValue[i]);
    }
  }
}
/**
 * Runs a microtask asynchronously.
 *
 * @param {function} task - The task to be executed.
 * @param {...*} args - Arguments to be passed to the task function.
 * @return {undefined} - The function does not return a value.
 */
export function runMicrotask(task, ...args) {
  function runTask() {
    task(...args);
  }
  if (typeof Promise !== 'undefined') {
    Promise.resolve().then(runTask);
  } else if (typeof MutationObserver !== 'undefined') {
    const tempNode = document.createTextNode('');
    const tempObserver = new MutationObserver(runTask).observe(tempNode, {
      characterData: true,
    });
    tempNode.data = 1;
  } else {
    setTimeout(runTask, 0);
  }
}
/**
 * Generates a string with leading spaces.
 *
 * @param {any} str - The input.
 * @param {number} num - The number of leading spaces.
 * @param {string} leading - The character to repeat as leading spaces. (default: " ")
 * @return {string} - The input string with leading spaces.
 */
export function leadingWords(str, num, leading = ' ') {
  // console.log(leading.repeat(Math.max(str.toString().length - num, 0)) + str);
  return leading.repeat(Math.max(num - str.toString().length, 0)) + str;
}
/**
 * Formats the given time in seconds into a string representation of hours, minutes, and seconds.
 *
 * @param {number} time - The time in seconds to be formatted.
 * @return {string} The formatted time string.
 */
export function formattingTime(time) {
  if (time < 3600) {
    return `${leadingWords(Math.floor(time / 60), 2, '0')}:${leadingWords(Math.round(time % 60), 2, '0')}`;
  }
  return `${Math.floor(time / 3600)}:${leadingWords(Math.floor((time % 3600) / 60), 2, '0')}:${leadingWords(Math.round(time % 60), 2, '0')}`;
}
/**
 * Creates a promise that resolves after the specified amount of time.
 *
 * @param {number} time - The time in milliseconds to wait before resolving the promise.
 * @return {Promise} A promise that resolves after the specified time.
 */
export function awaitTime(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
