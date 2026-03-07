import iconsConfig from './config.json';
export const config = iconsConfig;
export const icons = iconsConfig.glyphs;
import { hyphenNaming2HumpNaming } from '../common/script/normal';
let iconMap = {};
for (let i of icons) {
  iconMap[hyphenNaming2HumpNaming(i.css)] = String.fromCharCode(i.code);
}
export default iconMap;
