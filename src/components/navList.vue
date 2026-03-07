<template>
  <div class="nav-list-scroll">
    <div class="nav-list-box" ref="navList" v-on-resize="refreshNavListBoxSize">
      <img class="center-logo" src="/logo.png" />
      <div class="centers">
        <h1 class="list-title">多彩世界，纷至沓来</h1>
        <div class="center-list" ref="centerBox" v-on-resize="refreshCenterBoxSize">
          <div v-for="data in nav.nav" :key="data.href">
            <a :href="getJumpUrl(data.href)">
              <div
                class="icon-box"
                :style="{
                  '--main-color': data.mainColor,
                }"
              >
                <p class="demo-icon">{{ data.icon }}</p>
                <p class="title">{{ data.word }}</p>
              </div>
            </a>
          </div>
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
            '--end-x':
              data.x <= navListSize.width / 2
                ? -data.x *
                  Math.abs((navListSize.width / 2 - data.x) / navListSize.height / 2) *
                  data.speed
                : (navListSize.width - data.x) *
                  Math.abs((navListSize.width / 2 - data.x) / navListSize.height / 2) *
                  data.speed,
            '--end-y':
              data.y <= navListSize.height / 2
                ? -data.y *
                  Math.abs((navListSize.height / 2 - data.y) / navListSize.height / 2) *
                  data.speed
                : (navListSize.height - data.y) *
                  Math.abs((navListSize.height / 2 - data.y) / navListSize.height / 2) *
                  data.speed,
          }"
          class="color-block"
          v-for="(data, index) in colorBolcks.data"
          :key="index"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import nav from '../data/nav';
import vOnResize from '../common/command/onResize';
import { debounce, getJumpUrl } from '../common/script/normal';
import { RandomColorboxList } from '../blockList';

const props = defineProps({
  simplePageHeight: {
    type: Number,
    required: false,
    default: 0,
  },
});

/**@type {import('vue').Ref<HTMLDivElement>} */
const navList = ref();

/**@type {import('vue').Ref<HTMLDivElement>} */
const centerBox = ref();

const navListSize = reactive({
  width: window.innerWidth,
  height: props.simplePageHeight,
});
const refreshNavListBoxSize = debounce(() => {
  if (!navList.value) {
    return;
  }
  navListSize.width = navList.value.offsetWidth;
  navListSize.height = navList.value.offsetHeight;
});
const refreshCenterBoxSize = debounce(() => {
  if (centerBox.value) {
    centerBox.value.style.setProperty('--center-list-width', `${centerBox.value.offsetWidth - 40}`);
    centerBox.value.style.setProperty(
      '--center-list-height',
      `${centerBox.value.offsetHeight - 40}`
    );

    for (const i of centerBox.value.children) {
      setTimeout(
        (i) => {
          i.style.setProperty('--center-list-item-left', `${i.offsetLeft - 20}`);
          i.style.setProperty('--center-list-item-top', `${i.offsetTop - 20}`);
          i.style.setProperty(
            '--distance',
            `${Math.sqrt((((centerBox.value.offsetWidth / 2 - i.offsetLeft - 50) * 2) / centerBox.value.offsetWidth) ** 2 + (((centerBox.value.offsetHeight / 2 - i.offsetTop - 50) * 2) / centerBox.value.offsetHeight) ** 2)}`
          );
        },
        0,
        i
      );
    }
  }
}, 300);

const colorBolcks = new RandomColorboxList(props, 'simplePageHeight');

onMounted(() => {
  refreshCenterBoxSize();
});
</script>
<style scoped lang="scss">
@use 'sass:math';

.nav-list-box {
  position: sticky;
  top: 0px;
  height: calc(var(--simple-page-height) * 1px);

  // background-color: bisque;
  & > .center-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: var(--theme-2-3);
    width: 13vmin;
    padding: 1%;
    border-radius: 10%;
    backdrop-filter: blur(10px);
    --self-scroll: max(calc(var(--scroll) - 0.8), 0);
    transform: translate(-50%, calc(-50% - var(--self-scroll) * var(--simple-page-height) * 1px))
      scale(calc(var(--self-scroll) * 2 + 1));
    opacity: calc(1 - min(var(--self-scroll) * 2, 1));
  }

  & > .centers {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 80%;

    & > .list-title {
      font-size: 2.5em;
      text-align: center;
      --self-scroll: clamp(0, calc(var(--scroll) - 1), 1);
      transform: translate(0, calc(300% * (1 - var(--self-scroll)))) scale(calc(var(--self-scroll)));
      opacity: var(--self-scroll);
      word-wrap: none;
      word-break: keep-all;
    }

    & > .center-list {
      background-color: var(--theme-2-3);
      display: flex;
      flex-wrap: wrap;
      row-gap: 20px;
      column-gap: 20px;
      padding: 20px;
      align-items: center;
      justify-content: space-around;
      --self-scroll: max(calc(var(--scroll) - 1), 0);
      transform: scale(min(1, var(--self-scroll)));
      opacity: min(1, calc(var(--self-scroll) - 0.2));
      border-radius: calc(60px * var(--theme-border-radius) * var(--theme-border-radius));
      backdrop-filter: blur(15px);

      & > * {
        $size: clamp(50px, 10vw, 150px);
        width: #{$size}px;
        height: #{$size}px;
        & > a {
          all: inherit;
          cursor: pointer;
          & > div {
            width: #{$size};
            height: #{$size};
            --self-scroll: clamp(0, calc(var(--scroll) - 1.5 + var(--distance)), 1);
            flex-shrink: 0;
            background-color: var(--main-color);
            font-size: clamp(6px, 1.2vw, 18px);
            color: white;

            display: flex;
            justify-content: center;
            border-radius: calc(50% * var(--theme-border-radius) * var(--theme-border-radius));
            align-items: center;
            flex-direction: column;
            left: calc(sqrt(calc(var(--raw-distance))));
            // transform-origin: calc((var(--center-list-width) / 2 - var(--center-list-item-left)) * 1px) calc((var(--center-list-height) / 2 - var(--center-list-item-top)) * 1px);
            // transform: scale(calc(max(0, var(--self-scroll) - var(--delay))));
            // transform: scale(var(--delay));
            --d: calc(1 - (1 - var(--distance)) * (1 - var(--distance)));
            transform: translate(
                calc(
                  (
                      (var(--center-list-width) / 2 - var(--center-list-item-left)) * 1px -
                        (#{$size} / 2)
                    ) *
                    (1 - var(--self-scroll))
                ),
                calc(
                  (
                      (var(--center-list-height) / 2 - var(--center-list-item-top)) * 1px -
                        (#{$size} / 2)
                    ) *
                    (1 - var(--self-scroll))
                )
              )
              scale(var(--self-scroll));

            & > p {
              margin: 0;

              &.demo-icon {
                font-size: 3em;
              }

              &.title {
                font-size: 1.5em;
              }
            }
          }
        }
      }
    }
  }

  & > .bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    --self-scroll: clamp(0, calc(var(--scroll) - 1), 1);

    & > .color-block {
      position: absolute;
      --block-scroll: calc(var(--scroll) - 1);

      left: calc((var(--x) - var(--size) / 2) * 1px);
      top: calc((var(--y) - var(--size) / 2) * 1px);
      transform: translate(
        calc(1px * (var(--self-scroll) * var(--end-x))),
        calc(
          var(--block-scroll) * (var(--speed) - 2) * var(--simple-page-height) * 0.02px + 1px *
            (var(--self-scroll) * var(--end-y))
        )
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
}
</style>
