<template>
  <k-markdown-code-block :node="node" @resolve-info="handleResolveInfo">
    <template #assistant="{ info, code, node }">
      <div class="assistant">
        <div
          class="lang"
          :class="{
            illegal: info?.illegal,
          }"
        >
          {{ node.args.language || info?.usingLang || 'unknown' }}
        </div>
        <button
          class="copy-code"
          @click="
            () => {
              copyText(code);
              showMessage('复制成功');
            }
          "
        >
          <k-icon :icon="copied ? 'tick' : 'copy'" />
        </button>
      </div>
    </template>
  </k-markdown-code-block>
</template>
<script setup>
import KMarkdownCodeBlock from '@kuankuan/k-markdown-vue/src/nodesEle/KMdEleCodeBlock.vue';

import KIcon from '../KIcons.vue';
import { ref } from 'vue';
import { copyText } from '../../script/normal.js';
import { showMessage } from '../../script/infomations.js';
defineProps({
  node: {
    type: Object,
    default: () => {},
  },
});
const info = ref();
function handleResolveInfo(newInfo) {
  info.value = newInfo;
}
const copied = ref(false);
</script>
<style scoped lang="scss">
.k-md-ele-code-block {
  &:deep(.k-md-ele-code-block-inner) {
    padding: 1em 1em 0 1em;
    overflow-x: auto;
  }
  border-radius: 0.5em;
  position: relative;
  overflow: hidden;
  .lang {
    align-items: center;
    font-size: 0.8em;
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    color: var(--theme-disabled-font);
    background-color: var(--theme-2-3);
    padding: 0.2em 1em;
    border-radius: 0 0.4em 1em 0.4em;
  }
  .copy-code {
    align-items: center;
    font-size: 1.2em;
    position: absolute;
    top: 0;
    right: 0;

    padding: 0.1em;
    cursor: pointer;
    border-radius: 0.3em 0.45em 0.3em 0.5em;
    transition:
      color 0.3s,
      background 0.3s,
      border-color 0.3s;
    border-width: 1px;
    border-style: groove;
    border-color: transparent;
    &:hover {
      color: var(--theme-strong1);
      background: var(--theme-1-2);
      border-color: var(--theme-strong1);
    }
  }
}
</style>
