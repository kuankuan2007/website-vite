<template>
  <div class="input-group" ref="inputGroup">
    <importtext
      :value="value"
      @update:value="valueChange"
      :title="props.title"
      :reminder="['图片验证码应是四位字母/数字']"
      :tester="(s) => (/^[a-z0-9A-Z]{4}$/.test(s) ? 0 : 1)"
      ref="inputer"
    />
    <div class="code-box">
      <div class="code-click">
        <img class="img" :src="imgSrc" />
        <div class="refresh" @click="refresh">
          <p>点击刷新</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import importtext from './text.vue';
import { ref } from 'vue';
import { getImageCode, checkImageCode } from '../../script/connection';
import { showMessage } from '../../script/infomations';
let value = ref('');
let imgSrc = ref('');
let inputer = ref(null);
function refresh() {
  getImageCode().then(
    (src) => {
      imgSrc.value = src;
    },
    (err) => {}
  );
}
async function check() {
  if (inputer.value.wrong == -1) {
    showMessage('请填写图片验证码');
    throw void 0;
  } else if (inputer.value.wrong != 0) {
    showMessage(inputer.value.reminder[inputer.value.wrong - 1]);
    throw void 0;
  }
  let retsult = await checkImageCode(value.value);
  if (retsult) return;
  throw void 0;
}
refresh();
let props = defineProps({
  title: {
    type: String,
    default: '验证码',
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

/**
 *
 * @param {InputEvent} event
 */
function valueChange(event) {
  value.value = event.target.value;
}
defineExpose({
  check,
  refresh,
});
</script>
<style scoped lang="scss">
@import url('../../font/image-captcha-font/imageCaptchaFont.css');
.input-group {
  position: relative;
}
:deep(* .input) {
  font-family: imageCaptchaFont;
}
.code-click {
  position: relative;
  height: 40px;
}

.code-box {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 5px;
  border-radius: calc(20px * var(--theme-border-radius));
  transition: 0.3s;
  overflow: hidden;
}

.img {
  height: 40px;
}

.refresh {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-disabled-block);
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
  z-index: 1;
  & > p {
    font-size: 20px;
    margin: 0;
    user-select: none;
  }
  &:hover {
    opacity: 0.8;
  }
}

:deep(.input) {
  padding-right: 120px;
  width: calc(100% - 144px);

  &:focus,
  &:active,
  &.no-empty {
    width: calc(100% - 144px - var(--title-width) - 20px);
  }
}
</style>
