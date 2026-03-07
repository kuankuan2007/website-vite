<template>
  <div ref="mainEle">
    <slot></slot>
  </div>
  <Teleport :to="contextBox">
    <myMenu @choice="uploadChoice" ref="nowMenu" :show="show" :data="props.data" :x="x" :y="y" />
  </Teleport>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import myMenu from './menu.vue';

let contextBox = document.querySelector('body>#contextBox');
if (!contextBox) {
  contextBox = document.createElement('div');
  contextBox.id = 'contextBox';
  document.body.appendChild(contextBox);
}
let emit = defineEmits(['choice']);
function uploadChoice(event) {
  console.log(event);
  show.value = false;
  emit('choice', event);
}
let nowMenu = ref();
let x = ref(0);
let y = ref(0);
let show = ref(false);
let props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
let mainEle = ref();
onMounted(() => {
  mainEle.value.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    x.value = e.pageX;
    y.value = e.pageY;
    show.value = true;
  });
  window.addEventListener(
    'click',
    (e) => {
      if (!contextBox.contains(e.target)) {
        show.value = false;
      }
    },
    true
  );
  window.addEventListener(
    'contextmenu',
    (e) => {
      if (!mainEle.value.contains(e.target)) {
        show.value = false;
      }
    },
    true
  );
});
</script>
<style scoped lang="scss"></style>
