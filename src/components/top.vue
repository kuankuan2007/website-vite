<template>
  <div
    class="top-ele"
    :class="{
      'on-mounted': isOnMounted,
    }"
  >
    <div class="content">
      <h1>
        <span
          v-for="(s, index) in '宽宽的小天地'"
          :key="index"
          :style="{
            '--way': index % 2 ? 1 : -1,
            '--index': index,
          }"
          >{{ s }}</span
        >
      </h1>
      <typewriter
        ref="signature"
        class="signature"
        data="我们就这样，某天降生到世上，不停地流浪，一路去不知名的远方"
      />
    </div>
    <div class="bg" ref="bg" v-on-resize="debounce(onResize, 300)">
      <div
        :style="{
          '--x': data.x,
          '--y': data.y,
          '--size': data.size,
          '--color': data.color,
          '--speed': data.speed,
          '--r': data.r,
        }"
        class="color-block"
        v-for="(data, index) in colorBolcks.data"
        :key="index"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { RandomColorboxList } from '../blockList';
import vOnResize from '../common/command/onResize';
import { debounce } from '../common/script/normal';
import typewriter from '../common/components/typewriter.vue';

const props = defineProps({
  simplePageHeight: {
    type: Number,
    required: true,
  },
});

const isOnMounted = ref(false);

/**@type {import('vue').Ref<HTMLDivElement>} */
const bg = ref();
const signature = ref();

function onResize() {
  if (bg.value) {
    bg.value.style.setProperty('--bg-width', `${bg.value.offsetWidth}`);
    bg.value.style.setProperty('--bg-height', `${bg.value.offsetHeight}`);
  }
}
onMounted(() => {
  onResize();
  isOnMounted.value = true;
  signature.value.startAppend();
});
const colorBolcks = new RandomColorboxList(props, 'simplePageHeight');
</script>
<style scoped lang="scss">
.top-ele {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}

div.content {
  max-width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > h1 {
    font-size: 3.5em;
    text-align: center;
    perspective: 700px;
    justify-content: center;
    align-items: center;
    width: fit-content;
    .on-mounted & {
      display: flex;

      & > span {
        @keyframes title-show {
          0% {
            opacity: 0;
            transform: translate(0%, calc(var(--way) * 100%));
          }

          100% {
            opacity: 1;
            transform: translate(0%, 0%);
          }
        }

        display: block;
        opacity: 0;
        flex-grow: 0;
        flex-basis: 0;
        width: 14%;
        filter: drop-shadow(4px 0 4px var(--font-color-b));
        z-index: calc(20 - var(--index));
        animation: title-show 0.8s calc(var(--index) * 0.2s) cubic-bezier(0.78, -0.08, 0.54, 1.29)
          forwards;
      }
    }
  }

  & > .signature {
    text-align: center;
    font-size: 1.2em;
  }
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -1;

  & > .color-block {
    position: absolute;
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
    --block-scroll: calc(var(--scroll));

    @keyframes spread {
      0% {
        opacity: 0;
        transform: translate(
          calc((var(--bg-width) / 2 - (var(--x) - var(--size) / 2)) * 1px),
          calc((var(--bg-height) / 2 - (var(--y) - var(--size) / 2)) * 1px)
        );
      }

      100% {
        opacity: 1;
        transform: translate(
          0,
          calc(var(--block-scroll) * (var(--speed) - 2) * var(--simple-page-height) * 0.02px)
        );
      }
    }

    .on-mounted & {
      animation: spread 0.5s;
    }
  }
}
</style>
