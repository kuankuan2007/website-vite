<template>
  <div class="markdown-shower-box" ref="showBox">
    <k-markdown-vue class="k-markdown-shower" :value="content" :options="options" />
  </div>
</template>
<script setup>
import KMarkdownVue from '@kuankuan/k-markdown-vue/src/KMarkdownVue.vue';
import KCustomCodeBlock from './markdown/KCustomCodeBlock.vue';
import { computed, useTemplateRef } from 'vue';
import { compomentsOptionsMarkRaw } from '@kuankuan/k-markdown-vue/src/options.ts';
import defaultComponents from '@kuankuan/k-markdown-vue/src/nodesEle/default.ts';
const emit = defineEmits(['contentChanged']);
const showBox = useTemplateRef('showBox');
const props = defineProps({
  headerLevelStart: {
    type: Number,
    default: 1,
    required: false,
  },
  content: {
    type: String,
    default: '',
    required: true,
  },
});
const options = computed(() => ({
  components: compomentsOptionsMarkRaw({
    ...defaultComponents,
    'code-block': KCustomCodeBlock,
  }),
  titleLevelStart: props.headerLevelStart,
  xml: 'ignore',
  latex: 'show',
  highlight: true,
}));
defineExpose({ showBox });
</script>
<style lang="scss">
@use '../style/markdown.scss' as *;
</style>
