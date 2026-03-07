<template>
  <div class="outer">
    <div class="vertical"></div>
    <div class="horizontal"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
</script>
<style scoped>
.vertical {
  position: absolute;
  right: -12px;
  top: 0;
  height: 100%;
  width: 12px;
  background-color: #888888;
}
.outer {
  height: 100%;
  width: 100%;
  position: relative;
}
.content {
  scrollbar-width: 0;
}

.content::-webkit-scrollbar {
  width: 0;
}
</style>
