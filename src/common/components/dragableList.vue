<template>
  <ul ref="ul">
    <transition-group name="list">
      <li draggable="true" v-for="(data, index) in content" :key="getKey(data)">
        <slot :data="data" :index="index"></slot>
      </li>
    </transition-group>
  </ul>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  content: {
    type: Array,
    default: [],
    required: true,
  },
  getKey: {
    type: Function,
    required: false,
    default: (n) => n.id,
  },
});
/**@type {import("vue").Ref<HTMLDivElement>} */
const ul = ref();
let nowNode = null;
onMounted(() => {
  ul.value.addEventListener('dragstart', (e) => {
    nowNode = e.target;
    ul.value.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      e.target.classList.add('moving');
    });
  });
  ul.value.addEventListener('dragend', (e) => {
    ul.value.classList.remove('dragging');
    e.target.classList.remove('moving');
    nowNode = null;
  });
  ul.value.addEventListener('dragenter', (e) => {
    if (e.target === ul.value || e.target === nowNode) return;
    const index = new Array(...ul.value.children).indexOf(e.target);
    if (index !== -1) {
      console.log(nowNode);
      emit('update', {
        type: 'move',
        from: new Array(...ul.value.children).indexOf(nowNode),
        to: index,
      });
    }
  });
  ul.value.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
});
const emit = defineEmits(['update']);
</script>
<style scoped lang="scss">
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  & > * {
    position: relative;
  }
  &.dragging > *:deep(*) {
    pointer-events: none;
  }
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translate(0, -100px) scale(0.8);
}
.list-leave-to {
  opacity: 0;
  transform: translate(0, 100px) scale(0.8);
}

.list-leave-active {
  position: absolute;
}

.moving {
  opacity: 0.5;
  filter: contrast(0);
}
</style>
