<template>
  <myheader :title="'页面不存在'" />
  <div id="particles-js" class="background"></div>
  <div class="main">
    <h1 class="error-code">404<span class="error-text">Not Found</span></h1>
    <h2>抱歉，您访问的页面不存在</h2>
    <p>
      请检查您的URL是否正确, <wbr /> 您当前访问的地址是<i>{{ nowURL }}</i>
    </p>
    <div class="show-more" v-if="unexceped">
      <p>更多信息</p>
      <div>
        <p
          class="demo-icon flod-button"
          :class="{
            unfold: !folded,
          }"
          @click="folded = !folded"
        >
          {{ iconMap.angleCircledRight }}
        </p>
      </div>
    </div>
    <div
      class="more-info-box"
      v-if="unexceped"
      :class="{
        unfold: !folded,
      }"
    >
      <div class="more-info">
        <p>我们无法找到您访问的页面，可能的原因可能有以下情况：</p>
        <ul>
          <li>您访问的页面不存在。</li>
          <li>您访问的页面已被删除。</li>
          <li>您访问的页面已被禁用。</li>
          <li>该页面未正式上线</li>
        </ul>
        <p>您可以</p>
        <div class="input-next-url or-list">
          <myinput
            class="input-next"
            :value="nextURL"
            title="编辑URL"
            @update:value="nextURL = $event.target.value"
          />
          <a :href="nextURL">
            <p class="demo-icon">
              {{ iconMap.goNext }}
            </p>
          </a>
        </div>
        <p>或者</p>
        <div class="or-list">
          <mybutton
            value="反馈此问题"
            @click="
              jump(
                `/feedback/new/?title=${encodeURIComponent(`${nowURL}访问错误`)}&content=${encodeURIComponent(`我在尝试访问${nowURL}，但是却发现网站出现了404的响应码。`)}&recirculationStep=${encodeURIComponent(
                  `请求URL为[该地址](${nowURL})`
                )}`
              )
            "
          />
        </div>
      </div>
    </div>
    <div v-else class="more-info">
      <p>我们推测造成这个错误的原因是：</p>
      <p class="tips">{{ tip }}</p>
      <p>
        请尝试访问这个地址
        <a :href="nextURL">
          <span class="demo-icon jump-next">
            {{ iconMap.goNext }}
          </span>
        </a>
      </p>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import myheader from '../src/common/components/header.vue';
import myinput from '../src/common/components/input/text.vue';
import mybutton from '../src/common/components/input/button.vue';
import iconMap from '../src/data/demo-icon';
import { jump } from '../src/common/script/normal';
import { sprintf } from 'sprintf';

import showBG from './back';

onMounted(() => {
  showBG();
});
let nextURL = ref(location.href);
let unexceped = ref(true);
let tip = ref('');
const now = new URL(location.href);
let specialURLMap = {
  docsdata1: {
    from: /\/docs\/docsPage.html\?name=(.*)/,
    to: `\/docs\/docsPage\/\?name=%(retsult[1])s`,
    tip: '帮助文档页面已迁移',
  },
  docsdata2: {
    from: /\/docs\/([^\/]*)\/?/,
    tip: '帮助文档页面已迁移',
    to: `\/docs\/docsPage\/\?name=%(retsult[1])s`,
  },
};
const endSupportListOfUnstableVersion = ['/vditor/', '/new-index/'];
for (let name in specialURLMap) {
  let retsult = location.href.match(specialURLMap[name].from);
  console.log(retsult);
  if (retsult) {
    nextURL.value = sprintf(specialURLMap[name].to, { retsult: retsult });
    unexceped.value = false;
    tip.value = specialURLMap[name].tip;
    break;
  }
}
for (let i of endSupportListOfUnstableVersion) {
  if (now.pathname.startsWith(i)) {
    unexceped.value = false;
    const temp = new URL(location.href);
    temp.pathname = now.pathname.slice(i.length - 1);
    nextURL.value = temp.href;
    tip.value = '该非稳定版本的页面已停止访问';
  }
}

let nowURL = computed(() => location.href);
let folded = ref(unexceped.value);
</script>
<style scoped lang="scss">
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > .show-more {
    display: flex;
    width: fit-content;
    margin-left: 10%;
    justify-content: center;

    & p {
      margin: 0;
    }

    & > div {
      position: relative;
    }

    & .flod-button {
      font-size: 1.3em;
      position: absolute;
      top: 50%;
      left: 20px;
      transform-origin: 50% 0;
      transform: translate(0, -50%);
      cursor: pointer;
      transition: 0.3s;

      &.unfold {
        transform: rotate(90deg) translate(0, -50%);
        font-size: 1.5em;
      }

      &:hover {
        color: var(--theme-strong1);
      }
    }
  }
}

.more-info-box {
  display: grid;
  grid-template-rows: 0fr;
  transition: 0.3s;
  text-align: left;

  &.unfold {
    grid-template-rows: 1fr;
  }

  & .more-info {
    overflow: hidden;
  }

  & ul {
    text-align: left;
  }
}

.error-code {
  font-size: 5em;
  text-align: center;
  word-break: keep-all;
  white-space: nowrap;

  & .error-text {
    font-size: 0.25em;
    margin-left: 10px;
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.input-next-url {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;

  & .input-next {
    flex-grow: 1;
  }

  & p {
    margin: 0;
    font-size: 2em;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }

  & > a {
    position: relative;
    width: 40px;
  }
}

.or-list {
  margin-left: 30px;
}

.tips {
  font-size: 1.2em;
  color: yellow;
}

a {
  color: var(--theme-font-color);
  transition: 0.3s;
  text-decoration: none;
  &:hover {
    color: var(--theme-strong1);
  }
}

.jump-next {
  font-size: 2em;
}
</style>
