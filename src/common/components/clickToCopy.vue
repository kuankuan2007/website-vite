<template>
  <p class="demo-icon copy-button" @click="copy">&#xf249;</p>
</template>
<script setup>
let props = defineProps({
  content: {
    type: String,
    default: '',
    required: true,
  },
});
function copy(e) {
  console.log(props.content);
}
</script>
