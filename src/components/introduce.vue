<template>
  <div
    class="introduce"
    :style="{
      '--introduce-index': props.index,
    }"
  >
    <div class="page">
      <div class="content">
        <p class="left-brace">{</p>
        <div class="json-struct" ref="jsonStruct">
          <inNode v-for="(data, title) in props.data" :key="title" :data="data" :title="title" />
        </div>
        <p class="right-brace">}<span class="gap">,</span></p>
      </div>
    </div>
    <div class="bg">
      <div
        :style="{
          '--x': data.x,
          '--y': data.y,
          '--size': data.size,
          '--color': data.color,
          '--speed': data.speed,
        }"
        class="color-block"
        v-for="(data, index) in colorBlocks.data"
        :key="index"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, watchEffect, ref } from 'vue';
import inNode from './inNode.vue';
import { RandomColorboxList } from '../blockList';

/**@type {import('vue').Ref<HTMLDivElement>} */
const jsonStruct = ref();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  simplePageHeight: {
    type: Number,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const colorBlocks = new RandomColorboxList(props, 'simplePageHeight');
</script>
<style scoped lang="scss">
* {
  transition:
    color 0.3s,
    border-radius 0.3s;
}

.gap {
  color: var(--font-color);
}

.introduce {
  font-size: clamp(6px, 1.2vw, 18px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > .bg {
    position: absolute;
    inset: 0;
    z-index: -1;

    & > .color-block {
      --block-scroll: calc(var(--scroll) - 3.5 - var(--introduce-index));
      position: absolute;
      --self-scroll: clamp(0, calc(var(--scroll) - 1), 1);
      left: calc((var(--x) - var(--size) / 2) * 1px);
      top: calc((var(--y) - var(--size) / 2) * 1px);
      transform: translate(
        0,
        calc(var(--block-scroll) * (var(--speed) - 2) * var(--simple-page-height) * 0.02px)
      );
      width: calc(var(--size) * 1px);
      height: calc(var(--size) * 1px);
      background-color: var(--color);
      border-radius: 10%;
      transition:
        0.3s,
        transform 0.05s;
    }
  }

  & > .page {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    & > .content {
      $padding: 40px;
      max-width: calc(70% - #{1 * $padding});
      padding: #{$padding} #{$padding};
      background-color: var(--theme-1-3);
      border-radius: calc(20px * var(--theme-border-radius));
      position: relative;
      backdrop-filter: blur(10px);

      & > .right-brace,
      & > .left-brace {
        backdrop-filter: blur(10px);
        position: absolute;
        margin: 0;
        font-size: clamp(36px, 5vw, 108px);
        width: clamp(64px, 5vw, 192px);
        height: clamp(64px, 5vw, 192px);
        line-height: clamp(64px, 5vw, 192px);
        color: var(--theme-strong1-2);
        text-align: center;
        background-color: var(--theme-3-10);
        border-radius: calc(20px * var(--theme-border-radius));
      }

      & > .left-brace {
        left: 0;
        top: 0;
        transform: translate(-40%, -80%);
      }

      & > .right-brace {
        right: 0;
        bottom: 0;
        transform: translate(60%, 80%);
        z-index: -1;
      }

      & > .json-struct {
        font-size: 1.2em;
      }
    }
  }
}
</style>
