<template>
  <input
    :class="{ disabled: props.disabled }"
    :disabled="props.disabled"
    type="button"
    class="button"
  />
</template>
<script setup>
let props = defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
<style scoped lang="scss">
.button {
  border-width: 3px;
  border-color: transparent;
  border-style: solid;
  outline: none;
  background-color: var(--theme-strong1);
  cursor: pointer;
  padding: 0px;
  height: 60px;
  width: 100%;
  font-size: 24px;
  color: var(--font-color-b);
  border-radius: calc(30px * var(--theme-border-radius));
  transition: 0.3s;
  &:focus {
    border-color: var(--font-color);
  }
  &:hover {
    opacity: 0.7;
  }
  &.disabled {
    pointer-events: none;
    color: var(--theme-disabled-font);
    background-color: var(--theme-disabled-block);
  }
}
</style>
