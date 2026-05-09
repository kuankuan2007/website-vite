import { askAgreeReject } from './infomations';
import fingerprintjs from '@fingerprintjs/fingerprintjs';
import { sendBrowerInfo } from './connection';
import { getRefWithStorage } from './normal';
import { ref, watchEffect } from 'vue';

let user = getRefWithStorage('username', ref, sessionStorage);
watchEffect(async () => {
  if (user.value) {
    if (localStorage.getItem('sendBrowerInfo') === null) {
      if (
        await askAgreeReject(
          '## 是否反馈您当前的浏览器信息？\n我们确保您的信息不会被用于我们研究之外的其他任何目的。\n\n__您将来可以在[用户设置](/user/)下更改此设置__'
        )
      ) {
        localStorage.setItem('sendBrowerInfo', 'true');
      } else {
        localStorage.setItem('sendBrowerInfo', 'false');
      }
    }
    if (localStorage.getItem('sendBrowerInfo') !== 'true') {
      return;
    }
    const fp = await (await fingerprintjs.load()).get();
    console.log(fp);
    const info = {
      bowerID: fp.visitorId,
      platform: fp.components.platform.value,
      language: fp.components.languages.value,
      colorGamut: fp.components.colorGamut.value,
      colorDepth: fp.components.colorDepth.value,
      confidence: fp.confidence.score,
      screenResolution: fp.components.screenResolution.value,
      timezone: fp.components.timezone.value,
      userAgent: navigator.userAgent,
      browserInfoVersion: 0,
    };
    const stringInfo = JSON.stringify(info);
    if (localStorage.getItem('browerInfo') !== stringInfo) {
      if (
        await sendBrowerInfo({
          ...info,
          ...{
            from: location.href,
            versionType: import.meta.VITE_VERSION_TYPE,
            versionName: import.meta.VITE_VERSION_NAME,
          },
        })
      ) {
        localStorage.setItem('browerInfo', stringInfo);
      }
    }
  }
});
