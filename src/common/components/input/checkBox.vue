<template>
  <div
    class="check-box"
    :class="{
      disabled: disabled,
      checked: props.content,
    }"
  >
    <div class="check-box-core">
      <input
        class="checkbox"
        @keydown.enter="$event.target.click()"
        @input="$emit('change', $event.target.checked)"
        :checked="props.content"
        type="checkbox"
      />
      <div @click="$emit('change', !props.content)" class="input-shower">
        <svg viewBox="0 0 20 20">
          <polyline class="st0" points="1.5,9.5 6.5,15.5 18.5,4.5 " />
        </svg>
      </div>
    </div>
    <p class="title" @click="$emit('change', !props.content)">{{ props.title }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  content: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: '',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits(['change']);
</script>
<style scoped lang="scss">
.check-box {
  display: flex;
  justify-content: left;
  align-items: center;
  &.disabled {
    pointer-events: none;
  }
  & > .title {
    cursor: pointer;
    margin: 0;
  }

  & > .check-box-core {
    position: relative;
    margin-right: 5px;

    & > input.checkbox {
      position: absolute;
      z-index: -1;
      margin: 0;
      border: none;
      outline: none;
      padding: 0;
      width: 20px;
      height: 20px;
      opacity: 0;
    }
  }
}

.input-shower {
  z-index: 1;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: var(--theme-1-1);
  cursor: pointer;
  border-radius: calc(var(--theme-border-radius) * 50%);
  border-width: 2px;
  border-color: var(--theme-strong1);
  border-style: solid;
  transition:
    0.3s,
    background-color 0.3s 0.2s;
  // transition-delay: 0.2s;

  .checked & {
    background-color: var(--theme-strong1);
    transition:
      0.3s,
      background-color 0.3s 0s;
  }
  input:focus + & {
    outline-color: var(--theme-strong3);
  }
  .check-box:hover & {
    transform: scale(1.05);
  }
  outline-style: solid;
  outline-width: 2px;
  outline-color: transparent;
  & .st0 {
    fill: transparent;
    stroke: transparent;
    stroke-width: 3;
    stroke-miterlimit: 10;
    stroke-dasharray: 25;
    stroke-dashoffset: 25;
    transition: 0.3s;
    transition-delay: 0s;
    stroke-linecap: round;
    .checked & {
      stroke-dashoffset: 0;
      transition-delay: 0.2s;
      stroke: var(--theme-1-1);
    }
  }
  .disabled & {
    background-color: var(--theme-disabled-block);
    border-color: var(--theme-disabled-block);
    & .st0 {
      opacity: 0;
    }
  }
}
</style>
