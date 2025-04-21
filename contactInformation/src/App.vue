<template>
  <myheader title="联系我们" />
  <div id="particles-js" class="background"></div>
  <div class="full">
    <ul class="main">
      <div>
        <div class="title">
          <h2>QQ</h2>
        </div>
        <div>
          <links
            tips="添加好友"
            copy-message="3169748076"
            :qrcode="qqQr1"
            :href="
              mobile
                ? 'mqqopensdkapi://bizAgent/qm/qr?url=https%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Fk%3Do6LlD46UQQTkCovv8LlDPnNmivremQoj%26jump_from%3D%26auth%3D%26app_name%3D%26authSig%3D%26source_id%3D3_40001'
                : 'tencent://ntqq-open?subCmd=profile&action=openMiniBuddyProfile&actionParams=%7B%22uin%22%3A%223169748076%22%2C%22sourceType%22%3A%22QrCodeShareBuddyLink%22%7D'
            "
            content="福瑞 : 3169748076"
          />
          <links
            tips="添加好友"
            copy-message="2163826131"
            :qrcode="qqQr2"
            :href="
              mobile
                ? 'mqqopensdkapi://bizAgent/qm/qr?url=https%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Fk%3DhYDeG_BAcHg23FikRpLckbGvcLsyd9Em%26jump_from%3D%26auth%3D%26app_name%3D%26authSig%3D%26source_id%3D3_40001'
                : 'tencent://ntqq-open?subCmd=profile&action=openMiniBuddyProfile&actionParams=%7B%22uin%22%3A%222163826131%22%2C%22sourceType%22%3A%22QrCodeShareBuddyLink%22%7D'
            "
            content="其他 : 2163826131"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>QQ频道</h2>
        </div>
        <div>
          <links
            href="https://pd.qq.com/s/7iqf08bgx"
            copy-message="kuankuan3World"
            content="宽宽的小天地"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>微信</h2>
        </div>
        <div>
          <links
            tips="添加好友"
            copy-message="furrykuankuan"
            href="https://u.wechat.com/MIuqPCR_YOvP88wrhJBtuXI"
            content="福瑞 : furrykuankuan"
          />
          <links
            tips="添加好友"
            copy-message="gouhaoming2007"
            href="https://u.wechat.com/ML4NzEKd45FRDTKi1Uj4ZaA"
            content="其他 : gouhaoming2007"
          />
        </div>
      </div>

      <div>
        <div class="title">
          <h2>bilibili</h2>
        </div>
        <div>
          <links
            copy-message="宽宽2007"
            href="https://space.bilibili.com/662698080"
            content="宽宽2007"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>抖音</h2>
        </div>
        <div>
          <links
            copy-message="kuankuan2007"
            :qrcode="douyinURL"
            tips="抖音扫一扫"
            href="https://www.douyin.com/user/MS4wLjABAAAA5m3gNGWqC6LuoDid1MIqfReLSm9QhBgZDIcuGvf1v8M"
            content="kuankuan2007"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>X</h2>
        </div>
        <div>
          <links
            copy-message="kuankuan2007"
            tips="用浏览器打开"
            href="https://x.com/kuankuan2007"
            content="kuankuan2007"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>YouTube</h2>
        </div>
        <div>
          <links
            copy-message="kuankuan2007"
            tips="用浏览器打开"
            href="https://www.youtube.com/@kuankuan2007"
            content="kuankuan2007"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>Github</h2>
        </div>
        <div>
          <links
            copy-message="kuankuan2007"
            tips="用浏览器打开"
            href="https://www.github.com/kuankuan2007"
            content="kuankuan2007"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>Gitee</h2>
        </div>
        <div>
          <links
            copy-message="kuankuan2007"
            tips="用浏览器打开"
            href="https://www.gitee.com/kuankuan2007"
            content="kuankuan2007"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>Pypi</h2>
        </div>
        <div>
          <links
            copy-message="kuankuan"
            href="https://pypi.org/user/kuankuan/"
            content="kuankuan"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>NPM</h2>
        </div>
        <div>
          <links
            copy-message="kuankuan"
            href="https://www.npmjs.com/~kuankuan"
            content="kuankuan"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <h2>邮箱</h2>
        </div>
        <div>
          <links
            copy-message="3169748076@qq.com"
            tips="发送邮件"
            href="mailto:3169748076@qq.com"
            content="福瑞/收稿 : 3169748076@qq.com"
          />
          <links
            copy-message="2163826131@qq.com"
            tips="发送邮件"
            href="mailto:2163826131@qq.com"
            content="其他 : 2163826131@qq.com"
          />
        </div>
      </div>
    </ul>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import myheader from '../../src/common/components/header.vue';
import showBG from './back';
import links from './components/links.vue';
import douyinURL from './assets/douyin.png';
import { getQRCode, isMobie } from '../../src/common/script/normal';

const mobile = isMobie();
const qqQr1 = ref('1');
const qqQr2 = ref('2');
getQRCode('https://qm.qq.com/q/GFHAYacPAY').then((res) => {
  qqQr1.value = res;
});
getQRCode('https://qm.qq.com/q/WLNfjovveQ').then((res) => {
  qqQr2.value = res;
});

onMounted(() => {
  showBG();
});
</script>
<style scoped lang="scss">
.full {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
}
.main {
  display: grid;
  row-gap: 10px;

  & > div {
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--font-color), transparent);
      position: absolute;
      bottom: -5px;
      transform: translate(0, 50%);
    }

    position: relative;
    display: flex;
    align-items: center;

    & > div.title {
      & > h2 {
        margin: 0;
      }
    }

    & a {
      color: var(--font-color);
      text-decoration: none;
    }

    & > div {
      margin-left: 20px;

      & > * {
        white-space: nowrap;
        word-break: keep-all;
      }

      & > p {
        margin: 0;
        color: black;
      }
    }
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -999;
}
</style>
