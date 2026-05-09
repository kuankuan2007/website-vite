<template>
  <span class="demo-icon">{{ iconMap[props.icon] }}</span>
</template>
<script setup>
import iconMap from '../../data/demo-icon';
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>
<style scoped lang="scss"></style>
