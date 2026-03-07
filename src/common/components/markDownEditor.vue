<template>
  <div class="markdownEditor" ref="markdownEditor">
    <textarea
      @keydown="keydown"
      :placeholder="props.placeHolder"
      ref="editer"
      v-show="set['display'] !== 'hidden' || hiddenModeShowing === 'editer'"
      class="editor"
      :value="props.content"
      @input="contentChange"
    ></textarea>
    <markdownShower
      ref="shower"
      @content-changed="refrshHeight"
      v-show="set['display'] !== 'hidden' || hiddenModeShowing === 'shower'"
      class="shower"
      :content="showcontent"
      :header-level-start="props.headerLevelStart"
    ></markdownShower>
    <div class="buttons">
      <linkLikeButton
        v-if="set['display'] === 'hidden'"
        v-show="hiddenModeShowing === 'editer'"
        @click="hiddenModeShowing = 'shower'"
        class="showShowerButton"
        >预览<span class="demo-icon">&#xe815;</span></linkLikeButton
      >
      <linkLikeButton
        v-if="set['display'] === 'hidden'"
        v-show="hiddenModeShowing === 'shower'"
        @click="hiddenModeShowing = 'editer'"
        class="showEditerButton"
        >编辑<span class="demo-icon">&#xf14b;</span></linkLikeButton
      >
      <linkLikeButton class="demo-icon setting" @click="showSettings">&#xE80D;</linkLikeButton>
      <linkLikeButton
        v-for="data of props.otherButtons"
        @click="customButtomClick(data.event)"
        v-html="data.inner"
      ></linkLikeButton>
    </div>
  </div>
  <mydialog class="setting-dialog" ref="settingDialog">
    <div class="content">
      <ul class="names">
        <li v-for="(choice, name) in values">
          <ul
            class="values"
            :style="`grid-template-columns: repeat(${Object.getOwnPropertyNames(choice).length},minmax(0px,1fr));`"
          >
            <li
              v-for="(title, value) in choice"
              :class="{
                choice: value === set[name],
              }"
              @click="changeSet(name, value)"
            >
              <p class="title">{{ title }}</p>
              <img :src="getUrl(`${name}-${value}`)" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <linkLikeButton class="close demo-icon" @click="closeThemesChoicer">&#xe80c;</linkLikeButton>
  </mydialog>
</template>
<script setup>
import ALL from '../../../src/common/script/all.js';
import markdownShower from './markdownShower.vue';
import mydialog from './dialog.vue';
import { debounceRef } from '../script/normal';
import { watchEffect, ref, onMounted } from 'vue';
import linkLikeButton from './input/linkLikeButton.vue';

function keydown(event) {
  if (event.key === 'Enter') {
    emit('spicalEnter', event);
  }
}
let markdownEditor = ref(null);
let values = {
  display: {
    horizontal: '左右',
    vertical: '上下',
    hidden: '隐藏',
  },
};

let hiddenModeShowing = ref('editer');
let defaultSet = {
  display: 'horizontal',
};
let userSet = JSON.parse(localStorage.getItem('markdownEditorSettings'));
let set = ref(Object.assign({}, defaultSet, userSet));
function refrsh() {
  userSet = JSON.parse(localStorage.getItem('markdownEditorSettings'));
  set.value = Object.assign({}, defaultSet, userSet);
  for (let i in set.value) {
    markdownEditor.value.dataset[`markdownEditorTheme${i.slice(0, 1).toUpperCase() + i.slice(1)}`] =
      set.value[i];
  }
  refrshHeight();
}
function changeSet(name, value) {
  set.value[name] = value;
  localStorage.setItem('markdownEditorSettings', JSON.stringify(set.value));
}
const emit = defineEmits(['update:content', 'customButtomClick', 'spicalEnter']);
function customButtomClick(event) {
  emit('customButtomClick', event);
}
function contentChange(event) {
  refrshHeight();
  emit('update:content', event);
}
function refrshHeight() {
  editer.value.style.minHeight = 'unset';
  shower.value.showBox.style.minHeight = 'unset';
  markdownEditor.value.style.minHeight = 'unset';
  let allHeight = Math.min(props.maxEditorHeight, editer.value.scrollHeight - 20);
  editer.value.style.minHeight = `${allHeight}px`;
  shower.value.showBox.style.minHeight = `${allHeight}px`;
  markdownEditor.value.style.minHeight = `${allHeight + 20}px`;
}
let shower = ref(null);
let editer = ref(null);
function closeThemesChoicer() {
  settingDialog.value.close();
}
let props = defineProps({
  headerLevelStart: {
    type: Number,
    default: 1,
    required: false,
  },
  content: {
    type: String,
    default: '',
    required: true,
  },
  otherButtons: {
    type: Array,
    default: [],
    required: false,
  },
  maxEditorHeight: {
    type: Number,
    default: Infinity,
    required: false,
  },
  placeHolder: {
    type: String,
    default: '',
    required: false,
  },
});
let showcontent = debounceRef(props.content, 500);
watchEffect(() => {
  showcontent.value = props.content;
});
onMounted(() => {
  refrsh();
  window.addEventListener('localStorageSetItemEvent', (event) => {
    if (event.key === 'markdownEditorSettings') {
      refrsh();
    }
  });
  window.addEventListener('storage', (event) => {
    if (event.key === 'markdownEditorSettings') {
      refrsh();
    }
  });

  watchEffect(() => {
    markdownEditor.value.style.setProperty('--max-height', props.maxEditorHeight + 'px');
  });
});
let settingDialog = ref(null);
function showSettings(event) {
  settingDialog.value.showModal();
}

function getUrl(name) {
  return new URL(`../image/markDownThemeShower/${name}.svg`, import.meta.url).pathname;
}
defineExpose({
  editer,
});
</script>
<style lang="scss" scoped>
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

.close:hover {
  transform: scale(1.2);
}

.editor {
  padding: 10px;
  resize: none;
  font-size: 24px;
  border: none;
  outline: none;
  background-color: var(--theme-3-5);
  color: var(--font-color);
  &:focus {
    background-color: var(--theme-3-1);
  }
  transition: 0.3s;
}

.shower {
  padding: 10px;
  cursor: default;
  background-color: var(--theme-3-3);
  position: relative;
  max-height: var(--max-height);
  overflow-x: scroll;
}

.shower::before {
  content: 'Preview';
  position: absolute;
  left: 5px;
  top: 2px;
  font-size: 0.5px;
  opacity: 0.5;
  color: var(--theme-disabled-font);
  pointer-events: none;
}

.markdownEditor {
  font-size: 20px;
  display: grid;
  padding: 10px;
  position: relative;
  padding-top: 20px;
  margin-top: 20px;
  &[data-markdown-editor-theme-display='horizontal'] {
    grid-template-columns: 1fr 1fr;

    & .editor {
      border-radius: calc(10px * var(--theme-border-radius)) 0 0
        calc(10px * var(--theme-border-radius));
    }

    & .shower {
      border-radius: 0 0 calc(10px * var(--theme-border-radius)) 0;
    }
  }

  &[data-markdown-editor-theme-display='vertical'] {
    grid-template-rows: 1fr 1fr;

    & .editor {
      border-radius: calc(10px * var(--theme-border-radius)) 0 0 0;
    }

    & .shower {
      border-radius: 0 0 calc(10px * var(--theme-border-radius))
        calc(10px * var(--theme-border-radius));
    }
  }

  &[data-markdown-editor-theme-display='hidden'] {
    & .shower {
      width: calc(100% - 20px);
      height: calc(100% - 50px);
      border-radius: calc(10px * var(--theme-border-radius));
      border-top-right-radius: 0;
    }

    & .editor {
      border-radius: calc(10px * var(--theme-border-radius));
      border-top-right-radius: 0;
    }
  }
}

.setting-dialog {
  color: var(--font-color);
  width: max-content;
  border: none;
  outline: none;
  border-radius: calc(20px * var(--theme-border-radius));
  background: var(--theme-3-1);
  backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
  transition: 0.3s;
  max-height: 50%;
}

.names,
.values {
  list-style: none;
  padding: 0;
}

.values {
  display: grid;
  column-gap: 5vw;
  text-align: center;
}

.values > li {
  text-align: center;
  cursor: pointer;
  border-color: transparent;
  border-width: 1px;
  border-style: groove;
  transition: 0.3s;
  padding: 10px;
  border-radius: calc(10px * var(--theme-border-radius));
}

.values > li:hover {
  border-color: var(--theme-strong1);
}

.values > li.choice {
  background: var(--theme-1-5);
}

.values .title {
  margin: 0;
}

.values > li > p {
  padding: 0;
  margin: 0;
  padding-left: -20px;
  font-size: 18px;
  word-break: keep-all;
}

.values > li > img {
  width: 15vmin;
  transition: 0.3s;
  border-radius: calc(14px * var(--theme-border-radius));
}

.buttons {
  position: absolute;
  top: -12px;
  right: 10px;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  column-gap: 10px;
  background-color: var(--theme-2-1);
  padding: 5px;
  padding-right: 15px;
  padding-left: 15px;
  border-top-left-radius: calc(20px * var(--theme-border-radius));
  border-top-right-radius: calc(20px * var(--theme-border-radius));
  transition: 0.3s;

  & > button.button {
    margin: 0;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s;
    border-width: 1px;
    border-style: groove;
    border-color: transparent;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: calc(10px * var(--theme-border-radius));

    & * {
      border-width: 0;
      margin: 0;
    }
    &:focus {
      opacity: 1;
      border-color: var(--font-color);
    }
    &:hover {
      opacity: 1;
      color: var(--theme-strong1);
      border-color: var(--theme-strong1);
    }
  }
}

.button-enter-from,
.button-leave-to {
  opacity: 0;
}

.button-leave-to,
.button-enter-from {
  opacity: 0.5;
}
</style>
