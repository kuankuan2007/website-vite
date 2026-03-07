<template>
  <div class="userbox" v-show="isFinished">
    <importbutton class="button demo-icon" @click="openAnnouncementShower">{{
      iconMaps.announcement
    }}</importbutton>
  </div>
  <mydialog v-if="isFinished" class="dialog" ref="themesChoicer" a="1" b="2">
    <h3>
      <span class="demo-icon">{{ iconMaps.announcement }}</span
      >公告
    </h3>
    <p class="close demo-icon" @click="closeAnnouncementShower">&#xe80c;</p>
    <div
      class="announcement-shower"
      :style="{
        '--length': data.data.length,
      }"
    >
      <div
        class="page-move"
        v-if="data.data.length > 0"
        :style="{
          '--now': now,
        }"
      >
        <div class="page-flex">
          <markdownShower
            :class="{
              disabled: index != now,
            }"
            :style="{
              '--index': index,
              '--order': index - now,
            }"
            v-for="(items, index) in data.data"
            :key="index"
            :header-level-start="4"
            :content="items.content"
          />
        </div>
      </div>
      <p class="empty-tips" v-else>暂时没有公告</p>
    </div>
    <div class="button-box" v-show="data.data.length > 0">
      <p :class="{ disabled: now <= 0 }" class="demo-icon" @click="((now -= 1), addLooked(now))">
        {{ iconMaps.angleCircledLeft }}
      </p>
      <p class="page-shower">第{{ now + 1 }}条/共{{ data.data.length }}条</p>
      <p
        :class="{ disabled: now >= data.data.length - 1 }"
        class="demo-icon"
        @click="((now += 1), addLooked(now))"
      >
        {{ iconMaps.angleCircledRight }}
      </p>
    </div>
  </mydialog>
</template>
<script setup>
import ALL from '../../../src/common/script/all.js';
import iconMaps from '../../data/demo-icon';
import markdownShower from './markdownShower.vue';
import importbutton from './input/linkLikeButton.vue';
import mydialog from './dialog.vue';
import { ref } from 'vue';
let isFinished = ref(false);
let data = ref();
let now = ref(0);
let looked = new Set(JSON.parse(localStorage.getItem('announcementLooked') || '[]'));
fetch('https://api.kuankuan.site/world/announcement.json')
  .then((respone) => respone.json())
  .then((values) => {
    data.value = values;
    isFinished.value = true;
    for (let i = 0; i < values.data.length; i++) {
      if (!looked.has(values.data[i].id)) {
        addLooked(values.data[i].id);
        console.log(i, values.data[i]);
        now.value = parseInt(i);
        setTimeout(openAnnouncementShower, 0);
        return;
      }
    }
  });
function addLooked(id) {
  looked.add(id);
  looked.values();
  localStorage.setItem('announcementLooked', JSON.stringify([...looked.values()]));
}
let themesChoicer = ref(null);
function openAnnouncementShower() {
  themesChoicer.value.showModal();
}
function closeAnnouncementShower() {
  themesChoicer.value.close();
}
</script>
<style scoped lang="scss">
h3 {
  font-size: 24px;
  margin: 0;
}

button.button {
  margin: 0;
  padding: 0;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.2s;
  color: var(--font-color);

  &:hover {
    opacity: 1;
    color: var(--theme-strong1);
  }
}

.dialog {
  color: var(--font-color);
  height: 50%;
  border: none;
  outline: none;
  border-radius: calc(20px * var(--theme-border-radius));
  background: var(--theme-3-1);
  backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
  transition: 0.3s;
  width: 80%;
  max-width: 800px;
}

.announcement-shower {
  position: relative;
  height: calc(100% - 32px - 44px);
  overflow: hidden;
  & > .page-move {
    transform: translate(calc(-100% * var(--now)), 0);
    height: 100%;
    transition: 0.3s;
    & > .page-flex {
      grid-template-columns: repeat(var(--length), 100%);
      display: grid;
      height: 100%;
      & > * {
        padding: 10px;
        height: 100%;
        padding-top: 0;
        padding-bottom: 0;
        overflow-y: scroll;
        transition: 0.3s;
        &.disabled {
          transform: scale(0.8);
        }
      }
    }
  }
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  margin: 0;
  font-size: 20px;
  color: #ff0000;
  transition: 0.3s;
  cursor: pointer;
}

.close:hover {
  transform: scale(1.2);
  color: var(--theme-disabled-font);
}
.empty-tips {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 1.3em;
  word-break: keep-all;
  word-wrap: none;
  user-select: none;
  transform: translate(-50%, -50%);
}
.button-box {
  display: flex;
  font-size: 1.2em;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  height: 24px;
  margin-top: 20px;

  & > * {
    margin: 0;

    &.demo-icon {
      user-select: none;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        color: var(--theme-strong1);
      }
      &.disabled {
        pointer-events: none;
        color: var(--theme-disabled-font);
      }
    }
  }
}
</style>
