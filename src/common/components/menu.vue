<template>
  <div class="menu-box" ref="menuBox">
    <Transition :duration="300" @before-enter="onBeforeEnter" @leave="onLeave" @enter="onEntry">
      <div
        v-if="show"
        class="menu-fixd"
        ref="menuEle"
        :style="{
          '--x': props.x + dx + 'px',
          '--y': props.y + dy + 'px',
        }"
      >
        <div class="menu">
          <p class="title" v-if="props.data.title">{{ props.data.title }}</p>
          <ul class="choice-list">
            <li
              :class="{
                'has-sub-folder': now.sub,
              }"
              class="choice"
              @click="onChoiceClick(now, index, $event)"
              v-for="(now, index) of data.menu"
              :key="index"
            >
              <linkLikeButton>{{ now.title }}</linkLikeButton>
              <linkLikeButton v-if="now.sub" class="sub-menu-unfold demo-icon">{{
                iconMap.angleCircledRight
              }}</linkLikeButton>
              <Teleport ref="nowSubMenuTP" :to="contextBox">
                <myMenu
                  ref="nowSubMenu"
                  v-if="now.sub"
                  :show="acticedSubMenu === index"
                  :y="props.y + dy + subNavY"
                  :x="props.x + dx + width"
                  @choice="uploadChoice($event)"
                  :data="now.sub"
                  :parent-width="width"
                />
              </Teleport>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { watchEffect, ref, onMounted } from 'vue';
import { windowSize } from '../script/normal';
import myMenu from './menu.vue';
import linkLikeButton from './input/linkLikeButton.vue';
import iconMap from '../../data/demo-icon';

let nowSubMenuTP = ref();
onMounted(() => {
  watchEffect(() => {
    (props.x, props.y);
    refreshDxDy();
  });
});

let subNavY = ref(0);
let dx = ref(0);
let dy = ref(0);
let contextBox = document.querySelector('body>#contextBox');
if (!contextBox) {
  contextBox = document.createElement('div');
  contextBox.id = 'contextBox';
  document.body.appendChild(contextBox);
}
let emit = defineEmits(['choice']);
function onChoiceClick(now, index, event) {
  if (now.sub) {
    acticedSubMenu.value = index;
    subNavY = event.target.offsetTop;
  } else if (now.event) {
    uploadChoice(now.event);
  }
}
function uploadChoice(event) {
  console.log(event);
  emit('choice', event);
}
let height = 0;
let width = 0;
function onBeforeEnter(el) {
  el.style.height = 0;
}
function refreshDxDy() {
  if (windowSize.height - props.y < height + 10) {
    dy.value = windowSize.height - height - 10 - props.y;
  } else {
    dy.value = 0;
  }
  if (windowSize.width - props.x < width + 10) {
    dx.value = -width - props.parentWidth;
    console.log(dx.value);
  } else {
    dx.value = 0;
  }
}
function onEntry(el) {
  el.style.height = 'auto';
  height = el.clientHeight;
  width = el.clientWidth;
  refreshDxDy();
  el.style.height = '0';
  requestAnimationFrame(() => {
    el.style.height = height + 'px';
  });
}
function onLeave(el) {
  el.style.top = props.y + height + 'px';
  el.style.height = 0;
}

let menuEle = ref();
let menuBox = ref();

let props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
  parentWidth: {
    type: Number,
    default: 0,
    required: false,
  },
});
let acticedSubMenu = ref(undefined);
watchEffect(() => {
  if (!props.show) {
    acticedSubMenu.value = undefined;
  }
});
defineExpose({
  menuBox,
});
</script>
<style scoped lang="scss">
.title {
  margin: 0;
  font-size: 1.1em;
  font-weight: bold;
  cursor: default;
  user-select: none;
  padding-left: 3px;
  word-break: keep-all;
}

.sub-menu-unfold {
  margin: 0;
  position: absolute;
  top: calc(50% + 3px);
  right: 0px;
  transform: translate(0, -50%);
}
.choice-list {
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin: 0;

  & > .choice {
    &.has-sub-folder {
      padding-right: 25px;
    }
    cursor: pointer;
    padding: 3px;
    padding-left: 5px;
    position: relative;
    transition: 0.3s;
    border-radius: calc(10px * var(--theme-border-radius));
    word-break: keep-all;
    border-color: transparent;
    border-width: 1px;
    border-style: solid;
    &:hover {
      border-color: var(--theme-strong1);
    }
  }
}

.menu-fixd {
  position: fixed;
  left: var(--x);
  top: var(--y);
  z-index: 100;
  overflow: hidden;
  transition: 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.5;
}

v-enter-to,
v-leave-from {
  opacity: 1;
}

.menu {
  background-color: var(--theme-1-1);
  border-color: var(--theme-strong1);
  border-width: 2px;
  border-radius: calc(15px * var(--theme-border-radius));
  border-style: solid;
  backdrop-filter: blur(calc(10px * var(--theme-backdrop-blur)));
  padding: 3px;
  padding-top: 10px;
}
</style>
