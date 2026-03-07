<template>
  <div class="main-box" ref="inputGroup" :class="{ disabled: props.disabled }">
    <div class="input-group">
      <p class="title" ref="title">
        {{ props.title }}
      </p>
      <mySelecter
        :disabled="props.disabled"
        @update:choice="changChoice($event)"
        class="selecter"
        :values="['保密', '男', '女', '其他']"
        :choice="props.value"
      />
    </div>
    <Transition name="reminder">
      <p class="reminder" v-show="wrong != 0">
        <span class="demo-icon">&#xe817;</span>{{ props.reminder[wrong - 1] }}
      </p>
    </Transition>
  </div>
</template>
<script setup>
import mySelecter from './selecter.vue';
import { computed, ref, onMounted, watchEffect } from 'vue';
let emit = defineEmits(['update:value']);
let wrong = ref(0);
function refreshReminder(value, ...args) {
  wrong.value = props.tester(value, ...args);
}
function changChoice(value) {
  refreshReminder(value);
  emit('update:value', value);
}

let props = defineProps({
  title: {
    type: String,
    required: false,
    default: '性别',
  },
  value: {
    type: String,
    required: true,
    default: '保密',
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
onMounted(() => {
  watchEffect(() => {
    props.title;
    inputGroup.value.style.setProperty('--title-width', `${title.value.clientWidth}px`);
  });
});
defineExpose({
  wrong,
  reminder: props.reminder,
  title: props.title,
  refreshReminder,
});
</script>
<style scoped lang="scss">
.disabled * {
  pointer-events: none;
  color: var(--theme-disabled-font);
}

.main-box {
  position: relative;
}

.input-group {
  position: relative;
  display: flex;
  position: relative;
  width: calc(100% - 4px);
  outline: none;
  border-width: 3px;
  height: 54px;
  padding: 0;
  background-color: transparent;
  border-color: var(--theme-1-5);

  .disabled & {
    border-color: var(--theme-disabled-block);
  }

  border-style: solid;
  border-width: 0px;
  border-bottom-width: 2px;
  transition: 0.3s;
  color: var(--font-color);
  align-items: center;
}

.input-group > * {
  flex: 1 1 auto;
  text-align: center;
}

.input-group > .title {
  text-align: left;
  padding: 10px;
}

.title {
  font-size: 1.2em;
  margin-left: 10px;
  transition: 0.3s;
  margin: 0;
}

.input-group .selecter {
  background-color: transparent;
}

.selecter:deep(* .value-list) {
  max-height: 100px;
  overflow-y: scroll;
}

.selecter:deep(.shower) {
  text-decoration: underline;
}

.reminder {
  transition: 0.3s;
  position: absolute;
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
</style>
