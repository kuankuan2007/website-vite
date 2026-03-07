<template>
  <p class="typewriter">
    <span
      v-for="(s, index) in props.data"
      :class="{
        hide: index >= nowShowing,
      }"
      :key="index"
      >{{ s }}</span
    >
  </p>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: String,
    required: true,
  },
  gap: {
    type: Number,
    required: false,
    default: 100,
  },
});

let doing = 0;
const nowShowing = ref(0);

function show() {
  if (doing !== 1) {
    return;
  }
  if (nowShowing.value === props.data.length) {
    doing = 0;
    return;
  }
  nowShowing.value++;
  setTimeout(show, props.gap);
}
function hide() {
  if (doing !== -1) {
    return;
  }
  if (nowShowing.value <= 0) {
    doing = 0;
    return;
  }
  nowShowing.value--;
  setTimeout(hide, props.gap);
}

defineExpose({
  startAppend() {
    if (doing === 1) {
      return;
    }
    doing = 1;
    show();
  },
  startDelete() {
    if (doing === -1) {
      return;
    }
    doing = -1;
    hide();
  },
  pause() {
    doing = 0;
  },
});
</script>
<style scoped lang="scss">
.typewriter {
  & > span.hide {
    opacity: 0;
  }
}
</style>
