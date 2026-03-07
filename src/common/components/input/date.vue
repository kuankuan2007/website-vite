<template>
  <div class="main-box" ref="inputGroup" :class="{ disabled: props.disabled }">
    <div class="input-group">
      <p class="title" ref="title">
        {{ props.title }}
      </p>
      <mySelecter
        :disabled="props.disabled"
        @update:choice="changChoice('year', $event)"
        class="selecter"
        :values="Array.from({ length: 200 }, (item, index) => (index + 1900).toString())"
        :choice="showYear"
      />
      <p>年</p>
      <mySelecter
        :disabled="props.disabled"
        @update:choice="changChoice('mounth', $event)"
        class="selecter"
        :values="Array.from({ length: 12 }, (item, index) => (index + 1).toString())"
        :choice="showMounth"
      />
      <p>月</p>
      <mySelecter
        :disabled="props.disabled"
        @update:choice="changChoice('date', $event)"
        class="selecter"
        :values="dayList"
        :choice="showday"
      />
      <p>日</p>
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
let emit = defineEmits(['update:date']);
let wrong = ref(0);
function refreshReminder(value, ...args) {
  wrong.value = props.tester(value, ...args);
}
let showYear = computed(() => props.value.getFullYear().toString());
let showMounth = computed(() => (props.value.getMonth() + 1).toString());
let showday = computed(() => props.value.getDate().toString());
function changChoice(part, value) {
  let newValue = new Date(props.value);
  if (part === 'year') {
    newValue.setFullYear(parseInt(value, 10));
  }
  if (part === 'mounth') {
    newValue.setMonth(parseInt(value, 10) - 1);
  }
  if (part === 'date') {
    newValue.setDate(parseInt(value, 10));
  }
  refreshReminder(newValue);
  emit('update:date', newValue);
}

let props = defineProps({
  title: {
    type: String,
    required: false,
    default: '日期',
  },
  value: {
    type: Date,
    required: true,
    default: new Date(2000, 1, 1),
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
let dayList = computed(() => {
  let mounth = props.value.getMonth() + 1;
  if (mounth == 2) {
    if (
      (props.value.getFullYear() % 4 === 0 && props.value.getFullYear() % 100 !== 0) ||
      props.value.getFullYear() % 400 === 0
    ) {
      return Array.from({ length: 29 }, (item, index) => (index + 1).toString());
    }
    return Array.from({ length: 28 }, (item, index) => (index + 1).toString());
  } else if (mounth <= 7) {
    if (mounth % 2 === 0) {
      return Array.from({ length: 30 }, (item, index) => (index + 1).toString());
    }
    return Array.from({ length: 31 }, (item, index) => (index + 1).toString());
  } else {
    if (mounth % 2 === 0) {
      return Array.from({ length: 31 }, (item, index) => (index + 1).toString());
    }
    return Array.from({ length: 30 }, (item, index) => (index + 1).toString());
  }
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
  font-size: 1.1em;
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
