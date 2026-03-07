<template>
  <div class="in-node">
    <p class="in-content-node" v-if="props.data.isNode">
      <span class="property" v-if="!props.fatherIsArray">{{ props.title }}:&nbsp;</span>
      <span data-is-title @click="props.data.onClick"
        >&quot;<span :class="props.data.classList">{{ props.data.content }}</span
        >&quot;</span
      >
      <span class="gap">,</span>
    </p>
    <div v-else class="in-struct-node">
      <p>
        <span class="property" v-if="!props.fatherIsArray">{{ props.title }}:&nbsp;</span
        ><span class="left-brace bracket">{{ isArray ? '[' : '{' }}</span>
      </p>
      <div class="in-struct-child">
        <inNode
          v-for="(data, title) in props.data"
          :key="title"
          :title="title"
          :data="data"
          :fatherIsArray="isArray"
        />
      </div>
      <p class="right-brace bracket">{{ isArray ? ']' : '}' }}<span class="gap">,</span></p>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';

import inNode from './inNode.vue';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  title: {
    require: true,
  },
  fatherIsArray: {
    type: Boolean,
    require: false,
    default: false,
  },
});
const isArray = computed(() => {
  return Array.isArray(props.data);
});
</script>
<style scoped lang="scss">
*[data-is-title] {
  color: #40b000;
}
.click-able {
  cursor: pointer;
  text-decoration: underline;
}
.in-struct-child {
  margin-left: 10px;
}
p {
  margin: 0;
}
.bracket {
  color: #6666ff;
}
.property {
  color: var(--theme-1-10);
}
.gap {
  color: var(--font-color);
}
.h1 {
  font-size: 3em;
}
.h2 {
  font-size: 1.5em;
}
</style>
