<template>
  <myDialog ref="dialog" class="dialog">
    <div class="page">
      <div class="controles">
        <linkLikeButton class="close demo-icon" @click="close">&#xe80c;</linkLikeButton>
        <linkLikeButton :disabled="showing <= 0" class="to-left demo-icon" @click="showing--">{{
          iconMap.angleCircledLeft
        }}</linkLikeButton>
        <linkLikeButton
          :disabled="showing >= props.images.length - 1"
          class="to-right demo-icon"
          @click="showing++"
          >{{ iconMap.angleCircledRight }}</linkLikeButton
        >
      </div>
      <ul class="images">
        <li
          v-for="(i, index) in props.images"
          :style="{
            '--position': index - showing,
          }"
        >
          <img :src="i" :key="index" />
        </li>
      </ul>
    </div>
  </myDialog>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import myDialog from '../dialog.vue';
import iconMap from '../../../data/demo-icon';
import linkLikeButton from '../input/linkLikeButton.vue';
const dialog = ref();
const showing = ref(0);
const props = defineProps({
  images: {
    type: Array,
    default: [],
    required: false,
  },
});
onMounted(() => {
  dialog.value.showModal();
});

function close() {
  let event = new Event('close', {
    bubbles: true,
  });
  dialog.value.close(true);
  setTimeout(() => {
    props.root.remove();
  }, 1000);
}
</script>
<style scoped lang="scss">
.dialog {
  color: var(--font-color);
  width: max-content;
  border: none;
  outline: none;
  border-radius: calc(20px * var(--theme-border-radius));
  background: var(--theme-3-1);
  backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
  transition: 0.3s;
  height: 80%;
  width: 80%;

  & > .page {
    width: 100%;
    height: 100%;
    position: relative;

    & > .controles {
      position: absolute;
      // background-color: red;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    & > .images {
      list-style: none;
      margin: 0;
      padding: 0;
      margin-left: 20px;
      margin-right: 20px;
      width: calc(100% - 40px);
      height: 100%;
      position: relative;
      overflow: hidden;

      & > * {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: 0.3s;
        transform: translate(calc((100% + 20px) * var(--position)), 0);

        & > img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: calc(10px * var(--theme-border-radius));
        }
      }
    }
  }
}

button.close {
  display: block;
  position: absolute;
  top: 5px;
  right: 5px;
  margin: 0;
  font-size: 20px;
  color: #ff0000;
  transition: 0.3s;
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
  border-color: transparent;

  &:focus {
    border-color: #ff0000;
  }

  &:hover {
    transform: scale(1.2);
    background-color: transparent;
    color: #ff0000;
    border-color: transparent;
  }
}

button.to-left,
button.to-right {
  display: block;
  position: absolute;
  margin: 0;
  font-size: 3em;
  color: var(--font-color);
  transition: 0.3s;
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
  border-color: transparent;
  top: 50%;
  transform: translate(0, -50%);
  &:focus {
    border-color: var(--font-color);
  }

  &:hover {
    transform: translate(0, -50%) scale(1.2);
    background-color: transparent;
    border-color: transparent;
  }
  &.disabled {
    pointer-events: none;
    color: var(--theme-disabled-block);
  }
  &.to-right {
    right: -10px;
  }
  &.to-left {
    left: -10px;
  }
}
</style>
