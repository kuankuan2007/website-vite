<template>
  <div class="input-group" ref="inputGroup" :class="{ disabled: props.disabled }">
    <input
      :disabled="props.disabled"
      :class="{
        input: true,
        'no-empty': props.value.length > 0,
      }"
      :type="props.type"
      :value="props.value"
      @input="valueChange"
      ref="input"
    />
    <p class="title" ref="title">
      {{ props.title }}
      <Transition name="reminder">
        <span class="reminder" v-show="wrong != 0 && wrong != -1"
          ><span class="demo-icon">&#xe817;</span>{{ props.reminder[wrong - 1] }}</span
        >
      </Transition>
    </p>
    <div class="back"></div>
  </div>
</template>
<script setup>
import { watchEffect, onMounted, ref } from 'vue';
const emit = defineEmits(['update:value']);
let input = ref(null);
let props = defineProps({
  type: {
    type: String,
    default: 'text',
    required: false,
  },
  value: {
    type: String,
    default: '',
    required: false,
  },
  title: {
    type: String,
    default: '文本',
    required: false,
  },
  tester: {
    type: Function,
    default: () => 0,
    required: false,
  },
  reminder: {
    type: Array,
    default: ['内容格式不正确'],
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
let inputGroup = ref(null);
let title = ref(null);
let wrong = ref(props.value ? props.tester(props.value) : -1);
function refreshReminder(value, ...args) {
  wrong.value = value ? props.tester(value, ...args) : -1;
}
/**
 * @param {MouseEvent} event
 */
function valueChange(event) {
  refreshReminder(event.target.value);
  emit('update:value', event);
}
defineExpose({
  wrong,
  reminder: props.reminder,
  input,
  title: props.title,
  refreshReminder,
});
</script>
<style lang="scss" scoped>
.disabled {
  pointer-events: none;
  filter: contrast(0.5);
}

.reminder {
  transition: 0.3s;
  margin: 0;
  font-size: 0.8em;
  color: red;
  pointer-events: none;
  user-select: none;
  left: calc(20px + var(--title-width));
}

.reminder-enter-from,
.reminder-leave-to {
  opacity: 0;
}

.reminder-enter-to,
.reminder-leave-from {
  opacity: 1;
}

.input {
  display: block;
  position: relative;
  width: calc(100% - 44px);
  font-size: 24px;
  outline: none;
  border-style: solid;
  border-width: 0px;
  border-bottom-width: 2px;
  border-color: rgba(128, 128, 128, 0.5);
  height: 54px;
  padding: 0;
  padding-left: 20px;
  padding-right: 20px;
  transition: 0.3s;
  background-color: transparent !important;
  color: var(--font-color);
  &:focus,
  &:active,
  &.no-empty {
    & + .title {
      transform: translate(-10px, -150%);
      opacity: 1;
      pointer-events: all;
      font-size: 1.2em;
    }
  }

  &:focus,
  &:active {
    & + * + .back {
      width: 100%;
    }
  }
}

.title {
  position: absolute;
  margin: 0;
  height: 30px;
  line-height: 30px;
  font-size: 1.1em;
  top: 50%;
  transform: translate(0, -50%);
  left: 10px;
  opacity: 0.5;
  pointer-events: none;
  transition: 0.3s;
  pointer-events: none;
  user-select: none;
}

.input-group {
  position: relative;
}

.back {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: var(--theme-strong1);
  width: 0%;
  height: 2px;
  transition: 0.3s;
}
</style>
