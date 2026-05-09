import { reactive } from 'vue';
import ALL from './all';
let themes = {
  light: 'OS',
  color: 'simple',
  opacity: 'blur',
  roundedBorder: 'normal',
};
export let nowdata = {};
export let data = reactive(nowdata);
let matchs = matchMedia('(prefers-color-scheme: dark)');
function refresh() {
  try {
    nowdata = Object.assign({}, themes, JSON.parse(localStorage.getItem('theme') || '{}'));
  } catch {
    nowdata = Object.assign({}, themes);
  }
  for (let i in nowdata) {
    data[i] = nowdata[i];
  }
  if (nowdata.light === 'OS') {
    nowdata.light = matchs.matches ? (themes.light = 'dark') : (themes.light = 'light');
    matchs.addEventListener('change', refresh);
  } else {
    matchs.removeEventListener('change', refresh);
  }
  for (let i in nowdata) {
    document.documentElement.dataset[`theme${i.slice(0, 1).toUpperCase() + i.slice(1)}`] =
      nowdata[i];
  }
  sessionStorage.setItem('theme', JSON.stringify(nowdata));
  let event = new Event('themeRefresh');
  event.value = nowdata;
  window.dispatchEvent(event);
}
refresh();
window.addEventListener('localStorageSetItemEvent', (e) => {
  if (e.key === 'theme') {
    refresh();
  }
});
window.addEventListener('storage', function (e) {
  if (e.key === 'theme') {
    refresh();
  }
});
export function refreshThemes() {
  refresh();
}
