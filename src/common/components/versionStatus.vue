<template>
  <span v-if="versionType !== 'stable'" @click="showWarn" class="version-status">{{
    versionShowing
  }}</span>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { showMessage } from '../script/infomations';

function showWarn() {
  showMessage(
    `您正在查看一个${versionType.value}版本，这意味着这个版本不会提供稳定的服务和持续的更新。\n\n[返回稳定版本](/)`
  );
}
onMounted(() => {
  let nonStableVersionsTips = [];
  try {
    nonStableVersionsTips = JSON.parse(localStorage.getItem('nonStableVersionsTips', '[]'));
    if (!nonStableVersionsTips) {
      nonStableVersionsTips = [];
    }
  } catch {
    nonStableVersionsTips = [];
  }
  console.log(nonStableVersionsTips);
  if (!nonStableVersionsTips.includes(versionName.value) && versionType.value !== 'stable') {
    showWarn();
    nonStableVersionsTips.push(versionName.value);
    localStorage.setItem('nonStableVersionsTips', JSON.stringify(nonStableVersionsTips));
  }
});
const versionName = ref(import.meta.env.VITE_VERSION_NAME);
const versionType = ref(import.meta.env.VITE_VERSION_TYPE);
const versionShowing = ref(`${versionName.value}(${versionType.value})`);
</script>
<style scoped lang="scss">
.version-status {
  font-size: 0.5em;
  color: var(--theme-disabled-font);
  user-select: none;
  cursor: help;
}
</style>
