<template>
  <div class="input-group" ref="inputGroup">
    <importtext
      :value="value"
      @update:value="valueChange"
      :title="props.title"
      :reminder="['图片验证码应是6位数字']"
      :tester="(s) => (/^[0-9]{6}$/.test(s) ? 0 : 1)"
      ref="inputer"
    />
    <div class="code-box">
      <div class="code-click">
        <div
          class="refresh"
          :class="{
            disabled: contDown > 0,
          }"
          @click="checkRefresh"
        >
          <p>{{ contDown > 0 ? `${contDown}s` : '重新发送' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import importtext from './text.vue';
import { ref } from 'vue';
import {
  getEmailCode,
  checkEmailCode,
  getChangeEmailCode,
  checkChangeEmailCode,
} from '../../script/connection';
let value = ref('');
let contDown = ref(0);
let inputer = ref(null);
function contDownSetter(now) {
  if (now < 0) {
    contDown.value = 0;
    return;
  }
  contDown.value = now;
  setTimeout(contDownSetter, 1000, now - 1);
}
function refreshNewEmail() {
  getChangeEmailCode(props.newEmail).then(
    () => {
      contDownSetter(60);
    },
    (err) => {}
  );
}
function checkRefresh() {
  getEmailCode().then(
    () => {
      contDownSetter(60);
    },
    (err) => {}
  );
}
function refresh() {
  if (props.useNewEmail) {
    return refreshNewEmail();
  } else {
    return checkRefresh();
  }
}
async function checkCheck() {
  if (inputer.value.wrong == -1) {
    showMessage('请填写邮箱验证码');
    throw void 0;
  } else if (inputer.value.wrong != 0) {
    showMessage(inputer.value.reminder[inputer.value.wrong - 1]);
    throw void 0;
  }
  let retsult = await checkEmailCode(value.value);
  if (retsult) return;
  throw void 0;
}
async function newEmailCheck() {
  if (inputer.value.wrong == -1) {
    showMessage('请填写邮箱验证码');
    throw void 0;
  } else if (inputer.value.wrong != 0) {
    showMessage(inputer.value.reminder[inputer.value.wrong - 1]);
    throw void 0;
  }
  let retsult = await checkChangeEmailCode(value.value);
  if (retsult) return;
  throw void 0;
}
function check() {
  if (props.useNewEmail) {
    return newEmailCheck();
  } else {
    return checkCheck();
  }
}
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
  useNewEmail: {
    type: Boolean,
    default: false,
    required: false,
  },
  newEmail: {
    type: String,
    default: '',
    required: false,
  },
});
if (props.useNewEmail) {
  contDownSetter(60);
} else {
  checkRefresh();
}
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
.input-group {
  position: relative;
}

.code-click {
  position: relative;
  height: 40px;
  width: 100px;
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
  background-color: var(--theme-2-5);
  transition: 0.3s;
  cursor: pointer;
  z-index: 1;

  & > p {
    font-size: 20px;
    margin: 0;
    user-select: none;
  }

  &.disabled {
    pointer-events: none;
    background-color: var(--theme-disabled-block);
    background-color: var(--theme-disabled-font);
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
