<template>
  <div
    class="message-box"
    v-show="show"
    :class="{
      right: props.right && props.data.statue === 0,
      normal: !(props.right && props.data.statue === 0),
    }"
  >
    <div class="message" v-if="data.statue === 0">
      <p class="info">{{ props.right ? `${data.time}` : `${data.time} · ${data.user}` }}</p>
      <contextMenu @choice="uploadChoice" :data="contextMenuData">
        <markdownShower class="content" :content="data.message" :header-level-start="2" />
      </contextMenu>
    </div>
    <p class="recalled" v-else>{{ recallWord }}</p>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { getRefWithStorage, copyText } from '../../../src/common/script/normal';
import { showMessage } from '../../../src/common/script/infomations';
import contextMenu from '../../../src/common/components/contextMenu.vue';

let emit = defineEmits(['recall']);
let show = ref(true);
function uploadChoice(event) {
  if (event === 'copy') {
    copyText(props.data.message);
    showMessage('复制成功');
  } else if (event === 'delete') {
    show.value = false;
  } else if (event === 'recall') {
    emit('recall');
  }
}
let username = getRefWithStorage('username', ref, sessionStorage, '', false);
let userrights = getRefWithStorage('userrights', ref, sessionStorage, '', true);
let contextMenuData = computed(() => {
  let nowData = {
    title: '消息',
    menu: [
      {
        title: '复制',
        event: 'copy',
      },
      {
        title: '删除消息',
        event: 'delete',
      },
    ],
  };
  if (username.value === props.data.user) {
    nowData.menu = nowData.menu.concat([
      {
        title: '撤回消息',
        event: 'recall',
      },
    ]);
  }
  if (userrights.value.includes('admin')) {
    nowData.menu = nowData.menu.concat([
      {
        title: '管理员',
        sub: {
          title: false,
          menu: [
            {
              title: '撤回消息',
              event: 'recall',
            },
          ],
        },
      },
    ]);
  }
  return nowData;
});
let props = defineProps({
  data: {
    type: Object,
    default: {},
    required: true,
  },
  right: {
    type: Boolean,
    default: false,
    required: false,
  },
});
let recallWord = computed(() => {
  if (props.data.user === props.data.message) {
    return `${props.data.user} 撤回了一条消息`;
  }
  return `${props.data.message} 撤回了一条 ${props.data.user} 的消息`;
});
</script>
<style scoped lang="scss">
.message-box {
  position: relative;

  &.normal {
    & > .message {
      padding-bottom: 20px;

      & > .info {
        font-size: 0.8em;
        margin: 0;
        padding-left: 10px;
      }

      & .content {
        background-color: var(--theme-3-2);

        width: fit-content;
        padding: 10px;
        margin: 0;

        &:deep(p) {
          margin: 0;
        }

        &::before {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          top: 0;
          left: -12px;
          background: radial-gradient(circle at 0 100%, transparent 12px, var(--theme-3-2) 12px) top
            right;
        }

        position: relative;
        min-width: 50px;
        max-width: 80%;
        margin-left: 20px;
        border-radius: 0 calc(10px * var(--theme-border-radius))
          calc(10px * var(--theme-border-radius)) calc(10px * var(--theme-border-radius));
        margin-top: 10px;
        transition: 0.1s;
      }

      // overflow: auto;
    }
  }

  &.right {
    & > .message {
      padding-bottom: 20px;

      & > .info {
        font-size: 0.8em;
        margin: 0;
        padding-right: 10px;
        text-align: right;
      }

      & .content {
        background-color: var(--theme-1-5);
        float: right;
        width: fit-content;
        padding: 10px;
        margin: 0;

        &:deep(p) {
          margin: 0;
        }

        &::before {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          top: 0;
          left: 100%;
          background: radial-gradient(circle at 100% 100%, transparent 12px, var(--theme-1-5) 12px)
            top right;
        }

        position: relative;
        min-width: 50px;
        max-width: 80%;
        margin-right: 20px;
        border-radius: calc(10px * var(--theme-border-radius)) 0
          calc(10px * var(--theme-border-radius)) calc(10px * var(--theme-border-radius));
        margin-top: 10px;
        transition: 0.1s;
      }

      overflow: auto;
    }
  }
}

.recalled {
  text-align: center;
  font-size: 1.1em;
  margin: 10px;
  color: var(--theme-disabled-font);
}
</style>
