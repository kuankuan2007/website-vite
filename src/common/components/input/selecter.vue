<template>
  <span
    class="selecter"
    :class="{
      disabled: props.disabled,
    }"
    ref="selecter"
  >
    <span class="shower">
      {{ props.choice }}
    </span>
    <linkLikeButton :tabindex="props.disabled ? -1 : undefined" class="demo-icon show-menu">{{
      iconMap.downMicro
    }}</linkLikeButton>
    <span
      class="menu"
      :class="{
        unfold: !onFold,
      }"
    >
      <transition :duration="600">
        <div v-show="!onFold" class="padding-value-list">
          <ul ref="valueList" class="value-list">
            <li
              :class="{
                choices: true,
                value: true,
                choice: value === props.choice,
              }"
              :data-name="value"
              v-for="value in props.values"
              @click="chaneChoice(value)"
              :name="value"
            >
              {{ value }}
            </li>
          </ul>
        </div>
      </transition>
    </span>
  </span>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import iconMap from '../../../data/demo-icon';
import linkLikeButton from './linkLikeButton.vue';
let onFold = ref(true);
let valueList = ref(null);
let selecter = ref(null);
function scrollIn() {
  for (let i = 0; i < valueList.value.children.length; i++) {
    if (valueList.value.children[i].dataset.name === props.choice) {
      valueList.value.scrollTop = Math.max(0, valueList.value.children[i].offsetTop);
      break;
    }
  }
}
onMounted(() => {
  selecter.value.addEventListener('mouseenter', (e) => {
    onFold.value = false;
    setTimeout(scrollIn);
  });
  selecter.value.addEventListener('mouseleave', (e) => {
    onFold.value = true;
  });
  selecter.value.addEventListener('focusin', (e) => {
    onFold.value = false;
    setTimeout(scrollIn);
  });
  selecter.value.addEventListener('focusout', (e) => {
    onFold.value = true;
  });
  selecter.value.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      let thisFocus = null;
      if (valueList.value.contains(document.activeElement)) {
        /**
         *
         * @param {HTMLElement} node
         */
        function searchFather(node) {
          if (node.parentElement === valueList.value) {
            return node;
          } else {
            return searchFather(node.parentElement);
          }
        }
        thisFocus = searchFather(document.activeElement);
      } else {
        for (let i of valueList.value.children) {
          if (i.dataset.name === props.choice) {
            thisFocus = i;
            break;
          }
        }
      }
      if (thisFocus) {
        let index = props.values.indexOf(thisFocus.dataset.name);
        if (e.key === 'ArrowDown') {
          index += 1;
        } else {
          index -= 1;
        }
        if (index >= props.values.length) {
          index = 0;
        }
        if (index < 0) {
          index = props.values.length - 1;
        }
        chaneChoice(props.values[index]);
        scrollIn();
      }
    }
  });
});
let props = defineProps({
  values: {
    type: Array,
    default: [],
    required: true,
  },
  choice: {
    type: String,
    default: '',
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
});
let looking = ref(props.choice);

let emit = defineEmits(['update:choice']);
function chaneChoice(value) {
  emit('update:choice', value);
}
</script>
<style scoped lang="scss">
.selecter {
  background-color: var(--theme-1-2);
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  transition: 0.3s;
  border-radius: calc(11px * var(--theme-border-radius));
  display: block;
  &.distabled {
    pointer-events: none;
    color: var(--theme-disabled-font);
  }
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  position: absolute;
  display: grid;
  padding-top: 10px;
  grid-template-rows: 0fr;
  transition:
    0.3s 0s,
    grid-template-rows 0.3s 0.3s;
  width: max-content;
}

.show-menu {
  cursor: pointer;
  user-select: none;

  &:hover {
    color: var(--theme-strong1);
  }
}

.menu.unfold {
  grid-template-rows: 1fr;
  transition:
    0.3s 0s,
    grid-template-rows 0.3s 0s;
}

.padding-value-list {
  padding: 0;
  margin: 0;
  overflow-y: hidden;
  overflow-x: auto;
  background-color: var(--theme-1-4);
  border-radius: calc(10px * var(--theme-border-radius));
  backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
}

.value-list {
  list-style: none;
  scroll-behavior: smooth;
  padding: 10px;
  margin: 0;
  z-index: 100;
}

.choices {
  padding: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: calc(10px * var(--theme-border-radius));

  &:hover {
    background-color: var(--theme-2-1);
  }

  &.choice {
    background-color: var(--theme-3-3);
  }
}
</style>
