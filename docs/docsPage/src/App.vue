<template>
  <myheader :title="data ? data.title : '文档不存在'" />
  <div class="center" v-if="data">
    <div class="main">
      <div class="buttons">
        <button @click="downloadData(content,`${data.name}.md`)">
          <p class="button download demo-icon">&#xf02e;</p>
        </button>
      </div>
      <markdownShower :content="content" :header-level-start="2" v-if="finished" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import myheader from "../../../src/common/components/header.vue"
import markdownShower from "../../../src/common/components/markdownshower.vue"
import { getQueryVariable,downloadData } from "../../../src/common/script/normal"
import { showMessage, showError } from "../../../src/common/script/infomations"
import docs from "../../../src/data/docs";
const name = getQueryVariable("name", "unknown")
let data = ref(null)
let finished = ref(false)
let content = ref("")
for (var i = 0; i < docs.pageList.length; i++) {
  if (docs.pageList[i].name == name) {
    data.value = docs.pageList[i]
  }
}
if (data.value === null) {
  showError("文档不存在", () => {
    location.href = "/docs/"
  })
}
function getContentUrl(name) {
  return new URL(`../../../src/data/docs/${name}.md`, import.meta.url)
}
fetch(getContentUrl(name)).then((respone) => {
  respone.text().then((text) => {
    console.log(text)
    content.value = text
    finished.value = true
  }, (err) => {
    showError("获取数据失败", () => {
      location.href = "/docs/"
    })
  })
}, (err) => {
  showError("获取数据失败", () => {
    location.href = "/docs/"
  })
})
</script>
<style scoped lang="scss">
.center {
  position: absolute;
  max-width: 80%;
  min-width: 70%;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
  overflow: auto;
  background-color: var(--theme-1-1);
  border-radius: calc(20px * var(--theme-border-radius));
  backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));

  &:deep(*) {
    line-height: 150%;
  }
}
.main{
  position: relative;
  padding: 40px;
}
.buttons {
  position: absolute;
  right: 5px;
  top: 5px;
  &>button {
    border-style: solid;
    border-width: 2px;
    border-color: transparent;
    background-color: var(--theme-2-3);
    height: 30px;
    min-width: 30px;
    border-radius: calc(15px * var(--theme-border-radius));
    transition: 0.3s;
    color: var(--theme-font-color);
    cursor: pointer;
    &:hover{
      background-color: transparent;
      border-color: var(--theme-strong1);
    }
    &>* {
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }
}</style>