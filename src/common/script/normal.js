import { sprintf } from "sprintf"
import { customRef, ref } from "vue"
/**
 * 
 * @param {function} fn
 * @param {number} delay 
 * @returns {function}
 */
export function debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, delay);
    }
}
/**
 * 
 * @param {String} text 
 * @returns {HTMLTextAreaElement}
 */
function createElement(text) {
    var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    var element = document.createElement('textarea');
    // 防止在ios中产生缩放效果
    element.style.fontSize = '12pt';
    // 重置盒模型
    element.style.border = '0';
    element.style.padding = '0';
    element.style.margin = '0';
    // 将元素移到屏幕外
    element.style.position = 'absolute';
    element.style[isRTL ? 'right' : 'left'] = '-9999px';
    // 移动元素到页面底部
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    element.style.top = `${yPosition}px`;
    //设置元素只读
    element.setAttribute('readonly', '');
    element.value = text;
    document.body.appendChild(element);
    return element;
}
/**
 * 
 * @param {String} text 
 */
export function copyText(text) {
    var element = createElement(text);
    element.select();
    element.setSelectionRange(0, element.value.length);
    document.execCommand('copy');
    element.remove();
}
/**
 * 
 * @param {string} variable 
 * @param {string} elsevalue 
 * @returns {string}
 */
export function getQueryVariable(variable, elsevalue) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        let retsult = ""
        for (var j = 1; j < pair.length; j++) {
            retsult += "=" + pair[j]
        }
        retsult = retsult.substring(1)
        if (pair[0] == variable) { return retsult; }
    }
    return (elsevalue);
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
    }
    return sprintf(base, obj)
}
export function debounceRef(value, duration = 1000) {
    let timer;
    return customRef((track, trigger) => {
        return {

            get() {
                track()
                return value
            }, set(val) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    trigger()
                    value = val
                }, duration)
            }
        }
    })
}
/**
 * jump to a url
 * @param {String} url 
 */
export function jump(url) {
    window.location.href = url
}
function getStorageName(value)  {
    if (value ===localStorage){
        return "local"
    }if (value === sessionStorage){
        return "session"
    }
    return void 0
}
/**
 * 
 * @param {any} by
 * @param {String} key 
 * @param {Storage} storage 
 * @param {any} elsevalue 
 * @param {boolean} stringify 
 */
export function getRefWithStorage(key , by = ref , storage = localStorage, elsevalue = null, stringify = false) {
    let getvalue = (value) => {
        if (!stringify) {
            return value
        }
        try {
            return JSON.parse(value)
        } catch {
            return value
        }
    }
    
    let val = by(getvalue(storage.getItem(key)) || elsevalue);
    window.addEventListener(`${getStorageName(storage)}StorageSetItemEvent`, (event) => {
        if (event.key === key) {
            val.value = getvalue(event.newValue);
        }
    })
    window.addEventListener("storage", (event) => {
        if (event.key === key && event.storageArea===storage) {
            val.value = getvalue(event.newValue);
        }
    })
    return val
}