<template>
  <button
    :class="{ disabled: props.disabled }"
    :disabled="props.disabled"
    type="button"
    class="button"
  >
    <slot></slot>
  </button>
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
button {
  background-color: transparent;
  color: initial;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  color: unset;
  padding: unset;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: calc(10px * var(--theme-border-radius));
  cursor: pointer;
  font-size: unset;
  transition: 0.3s;
  outline: none;
  &:hover {
    color: var(--theme-strong1);
  }
  &:focus {
    border-color: var(--font-color);
  }
}
</style>
