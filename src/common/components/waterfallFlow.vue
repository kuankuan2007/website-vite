<template>
  <div class="watterfall" ref="watterfall">
    <slot v-for="(data, name) in props.valueList" :data="data" :title="name" :key="name" />
  </div>
  <div v-on-resize="debounceRefresh"></div>
</template>
<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { debounce } from '../script/normal';
import vOnResize from '../command/onResize';
let props = defineProps({
  valueList: {
    type: Object,
    default: [],
    required: true,
  },
  eleWidth: {
    type: Number,
    default: 0,
    required: true,
  },
  rowGap: {
    type: Number,
    default: 10,
    required: false,
  },
  columnGap: {
    type: Number,
    default: 10,
    required: false,
  },
  debounceDelay: {
    type: Number,
    default: 300,
    required: false,
  },
});
let debounceRefresh = debounce(refresh, props.debounceDelay);
const ob = new MutationObserver(debounceRefresh);
onMounted(() => {
  ob.observe(watterfall.value, {
    subtree: true,
    childList: true,
  });
});
let watterfall = ref(null);

function refresh() {
  if (watterfall.value === null) {
    return;
  }
  const ele = watterfall.value;
  let eleList = ele.children;
  if (eleList.length === 0) {
    return;
  }
  const width = ele.clientWidth;
  const conlunNum = Math.min(
    eleList.length,
    Math.max(1, Math.floor(width / (props.eleWidth + props.columnGap)))
  );
  if (conlunNum <= 1) {
    props.columnGap = 0;
  }
  const columnPosition = Array(conlunNum).fill(0);
  const paddingLeft = (width - conlunNum * props.eleWidth - (conlunNum - 1) * props.columnGap) / 2;
  for (let i = 0; i < eleList.length; i++) {
    const now = eleList[i];

    let top = Infinity;
    let column = 0;
    for (let j = 0; j < columnPosition.length; j++) {
      if (columnPosition[j] < top) {
        top = columnPosition[j];
        column = j;
      }
    }
    now.style.top = `${top}px`;
    now.style.left = `${paddingLeft + column * (props.eleWidth + props.columnGap)}px`;
    columnPosition[column] += now.clientHeight + props.rowGap;
  }
  ele.style.height = `${Math.max(...columnPosition) - props.rowGap + 20}px`;
}
onMounted(() => {
  watchEffect(() => {
    watterfall.value.style.setProperty('--width', `${props.eleWidth}px`);
  });
});
</script>
<style scoped lang="scss">
.watterfall {
  position: relative;
  max-width: 100%;
  transition: 0.3s;

  & > * {
    position: absolute;
  }
}
.size-tester {
  width: 100%;
  height: 0px;
  border: none;
}
.watterfall > :deep(*) {
  position: absolute;
  display: block;
  left: 0px;
  right: 0px;
  width: var(--width);
  transition: 0.3s;
}
</style>
