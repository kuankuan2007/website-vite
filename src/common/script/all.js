import './stringPoint';
import './arrayBufferJsonSport';
import './copy';
import './arraySort';
import './browerInfo';
import './storageEvent';

window.passContextmenuEvent = null;
window.addEventListener('contextmenu', (e) => {
  if (window.passContextmenuEvent && e.target == window.passContextmenuEvent) {
    window.passContextmenuEvent = null;
  }
});
let serverStarter = document.createElement('script');
serverStarter.src = 'https://api.kuankuan.site/world/all.js';
serverStarter.async = true;
serverStarter.type = 'text/javascript';
document.head.appendChild(serverStarter);
export default 1;
