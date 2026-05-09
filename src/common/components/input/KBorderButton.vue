<template>
  <button class="border-button">
    <slot>按钮</slot>
  </button>
</template>
<script setup></script>
<style scoped lang="scss">
.border-button {
  display: block;
  font-size: 1em;
  margin: 0;
  padding: 0.05em 1em;
  border-radius: calc(10px * var(--theme-border-radius));
  transition: 0.3s;
  color: var(--font-color);
  background-color: transparent;
  border-width: 1px;
  border-color: var(--theme-strong1);
  border-style: solid;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  outline: none;
  &:focus {
    border-color: var(--font-color);
    background-color: var(--theme-2-10);
  }
  &:hover {
    border-color: var(--theme-strong1);
    background-color: var(--theme-strong1);
    color: var(--font-color-b);
  }
}
</style>
