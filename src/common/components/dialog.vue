<template>
  <dialog ref="dialog">
    <slot></slot>
  </dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue';
let props = defineProps({
  onclose: {
    type: Function,
    required: false,
    default: () => {},
  },
  canClose: {
    type: Boolean,
    required: false,
    default: true,
  },
});
/**@type {import("vue").Ref<HTMLDialogElement>} */
let dialog = ref(null);
let onleave = ref(false);
function showModal() {
  dialog.value.showModal();
  onleave.value = false;
  dialog.value.classList.add('on-entry');
  setTimeout(() => {
    dialog.value.classList.remove('on-entry');
  }, 30);
}
function close(remove = false) {
  dialog.value.classList.add('on-leave');
  onleave.value = true;
  setTimeout(() => {
    dialog.value.close();
    dialog.value.classList.remove('on-leave');
    if (remove) {
      dialog.value.remove();
    }
  }, 300);
}
onMounted(() => {
  dialog.value.addEventListener('cancel', (e) => {
    e.preventDefault();
    if (props.canClose) {
      close();
    }
  });
});
function show() {
  dialog.value.classList.add('on-entry');
  setTimeout(() => {
    dialog.value.classList.remove('on-entry');
  }, 30);
  dialog.value.show();
  onleave.value = false;
}
defineExpose({
  showModal,
  close,
  show,
  dialog: dialog,
});
</script>
<style scoped lang="scss">
dialog {
  &.on-leave {
    transform: translate(0, 10vh);
    opacity: 0;
    transition: 0.3s;
  }
  &.on-entry {
    transform: translate(0, -10vh);
    opacity: 0;
    transition: 0s;
  }
}
</style>
