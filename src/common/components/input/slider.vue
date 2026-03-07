<template>
  <div
    class="slider-box"
    :class="{
      disabled: disabled,
    }"
  >
    <div
      ref="slider"
      tabindex="-1"
      class="slider"
      :style="{
        '--value': _rawValue,
      }"
    >
      <div class="line">
        <div class="line-left"></div>
      </div>
      <button class="circle" ref="circle"></button>
    </div>
  </div>
  <!-- {{ _rawValue }} | {{ _value }} -->
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
const props = defineProps({
  value: {
    type: Number,
    default: 0,
    required: true,
  },
  max: {
    type: Number,
    default: 100,
    required: false,
  },
  min: {
    type: Number,
    default: 0,
    required: false,
  },
  step: {
    type: Number,
    default: 5,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
});
/**@type {import("vue").Ref<HTMLDivElement>} */
const slider = ref();
/**@type {import("vue").Ref<HTMLButtonElement>} */
const circle = ref();
const emit = defineEmits(['change']);
const _value = computed({
  get: () => {
    return props.value;
  },
  set: (v) => {
    if (v > props.max) {
      v = props.max;
    }
    if (v < props.min) {
      v = props.min;
    }
    emit('change', v);
  },
});
onMounted(() => {
  slider.value.addEventListener('mousedown', (e) => {
    const rect = slider.value.getBoundingClientRect();
    _rawValue.value = (e.pageX - rect.left) / rect.width;
  });
  document.body.addEventListener('mousemove', (e) => {
    if (!slider.value) {
      return;
    }
    if (e.buttons === 1 && slider.value.contains(document.activeElement)) {
      e.preventDefault();
      const rect = slider.value.getBoundingClientRect();
      _rawValue.value = (e.pageX - rect.left) / rect.width;
    }
  });
  circle.value.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      _value.value += props.step;
    } else if (e.key === 'ArrowLeft') {
      _value.value -= props.step;
    }
  });
});
const _rawValue = computed({
  get: () => {
    return (_value.value - props.min) / (props.max - props.min);
  },
  set: (v) => {
    if (v > 1) {
      v = 1;
    }
    if (v < 0) {
      v = 0;
    }
    _value.value = v * (props.max - props.min) + props.min;
  },
});
</script>
<style scoped lang="scss">
@use 'sass:math';
$width: 20px;

.slider-box {
  margin: 0 #{math.div($width, 2)};

  &.disabled {
    pointer-events: none;
  }
}

.slider {
  height: $width;
  position: relative;

  .line {
    top: 50%;
    transform: translate(0, -50%);
    position: absolute;
    width: calc(100%);
    border-radius: #{math.div($width, 2)};
    height: 5px;
    background-color: var(--theme-strong2-4);
    overflow: hidden;
    cursor: pointer;

    .disabled & {
      background-color: var(--theme-disabled-font);
    }

    & > .line-left {
      position: absolute;
      height: 5px;
      top: 50%;
      transform: translate(0, -50%);
      width: calc(100% * var(--value));
      background-color: var(--theme-strong2-2);

      .disabled & {
        background-color: var(--theme-disabled-block);
      }

      pointer-events: none;
    }
  }

  .circle {
    position: absolute;
    display: block;
    border: 2px solid transparent;
    outline: none;
    width: $width;
    height: $width;
    border-radius: 50%;
    background-color: var(--theme-strong2-2);
    transform: translate(-50%, -50%);
    top: 50%;
    left: calc(100% * var(--value));
    cursor: pointer;

    // opacity: 0.5;
    .disabled & {
      background-color: var(--theme-disabled-block);
    }

    &:focus {
      border-color: var(--theme-strong2);
    }
  }
}
</style>
