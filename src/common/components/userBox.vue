<template>
  <div v-show="finished" id="user">
    <a
      class="login"
      :href="getJumpToWithFromNowUrl('/login/')"
      v-if="username === ''"
      @click="login"
      >登录</a
    >
    <a class="user" :href="getJumpUrl('/user/')" v-else @click="userPage">{{ username }}</a>
  </div>
</template>
<script setup>
import { getInfo, getUserName, getRights } from '../script/connection.js';
import { ref } from 'vue';
import ALL from '../script/all.js';
import {
  jumpToWithFromNow,
  getJumpToWithFromNowUrl,
  getJumpUrl,
} from '../../../src/common/script/normal';
let props = defineProps({
  jump: {
    type: String,
    required: false,
    default: '',
  },
  toLogin: {
    type: Boolean,
    required: false,
    default: false,
  },
  needInfo: {
    type: Boolean,
    required: false,
    default: false,
  },
  needRights: {
    type: Boolean,
    required: false,
    default: false,
  },
});
let username = ref('');
let finished = ref(false);
function jumpLogin() {
  jumpToWithFromNow('/login/');
}
if (props.needInfo) {
  getInfo().then(
    (retsult) => {
      if (retsult && props.jump) {
        location.href = props.jump;
      }
      if (props.toLogin && !retsult) {
        jumpLogin();
      }
      username.value = retsult.name;
      finished.value = true;
      retsult.state = true;
      sessionStorage.setItem('userinfo', retsult);
    },
    (reason) => {
      console.log(reason);
      let retsult = '';
      if (retsult && props.jump) {
        location.href = props.jump;
      }
      if (props.toLogin && !retsult) {
        jumpLogin();
      }
      sessionStorage.setItem(
        'userinfo',
        JSON.stringify({
          state: false,
        })
      );
    }
  );
} else {
  getUserName().then(
    (retsult) => {
      console.log(retsult, props.toLogin);
      if (retsult && props.jump) {
        location.href = props.jump;
      }
      if (props.toLogin && !retsult) {
        jumpLogin();
      }
      username.value = retsult;
      finished.value = true;
      sessionStorage.setItem('username', retsult);
    },
    (reason) => {
      console.log(reason);
      let retsult = '';
      if (retsult && props.jump) {
        location.href = props.jump;
      }
      if (props.toLogin && !retsult) {
        jumpLogin();
      }
      sessionStorage.setItem('username', '');
    }
  );
}
if (props.needRights) {
  getRights().then(
    (retsult) => {
      console.log(retsult);

      sessionStorage.setItem('userrights', JSON.stringify(retsult));
    },
    (reason) => {
      console.log(reason);
      sessionStorage.setItem('userrights', '');
    }
  );
}
function login() {
  jumpLogin();
}
function userPage() {
  location.href = `/user/`;
}
</script>
<style scoped lang="scss">
.user {
  border-color: var(--theme-2-10);
}

.login {
  border-color: var(--theme-strong1);
}
.login,
.user {
  display: block;
  font-size: 16px;
  margin: 0;
  padding: 6px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: calc(10px * var(--theme-border-radius));
  padding-left: 10px;
  padding-right: 10px;
  display: block;
  text-decoration-line: none;
  transition: 0.3s;
  color: var(--font-color);
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
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
