<template>
  <svg
    :class="{
      enable: !props.disabled,
    }"
    class="svg"
    style="display: none"
  >
    <defs>
      <filter id="blendFilter">
        <feGaussianBlur
          in="SourceGraphic"
          :stdDeviation="props.blur"
          result="blur"
        ></feGaussianBlur>
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 40 -20
                    "
        ></feColorMatrix>
      </filter>
    </defs>
  </svg>
  <slot></slot>
</template>
<script setup>
const props = defineProps({
  blur: {
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
</script>
<style scoped lang="scss">
.svg.enable:deep(+ *) {
  filter: url('#blendFilter');
}
</style>
