<template>
  <myheader title="24点" />
  <div id="particles-js" class="background"></div>
  <div class="full">
    <div v-show="onLoad" class="on-load">
      <img src="../../src/common/image/loading.gif" class="loading-logo">
      <p>加载中</p>
    </div>
    <div class="game-box">
      <ul class="broads-box">
        <li class="broad-area" :class="{
          active: statue[index]
        }" v-for="data, index of values">
          <div class="broad">
            <div :class="{
              active: statue[index]
            }" class="back" @click="activeBroad(index)">
              <p>?</p>
            </div>
            <div :class="{
              active: statue[index]
            }" class="value">
              <p>{{ data }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="ans" :class="{
        show: buttonStatue === 3
      }">
        <ul class="ans-box">
          <li v-for="data, index of ans">
            <ul class="ans-line">
              <li v-for="words, index of data" :key="index">
                {{ words }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <p class="button" @click="buttonClick">{{ buttonContent }}</p>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import myheader from "../../src/common/components/header.vue"
import showBG from "./back"
import { getRandomInt, ArrayLike, toArray } from "../../src/common/script/normal"
import ansWorker from "./worker.js?worker"

let buttonContent = computed(() => {
  return {
    0: "请稍后",
    1: "全部翻开",
    2: "查看答案",
    3: "下一题"
  }[buttonStatue.value]
})
function buttonClick() {

  if (buttonStatue.value == 1) {
    for (let i = 0; i < statue.length; i++) {
      statue[i] = true
      buttonStatue.value = 2
    }
  } else if (buttonStatue.value == 2) {
    buttonStatue.value = 3
  } else if (buttonStatue.value == 3) {
    refreshValues()
  }
}
let values = reactive([])
let ans = reactive([])
let worker = ansWorker()
let onLoad = ref(false)
let statue = reactive([])

let buttonStatue = ref(0)

function activeBroad(index) {
  statue[index] = true
  for (let i of statue) {
    if (!i) {
      return
    }
  }
  buttonStatue.value = 2
}

worker.onmessage = function (event) {
  let { type, data } = event.data
  console.log(type, data, event);

  if (type == "stop") {
    values.splice(0, 4)
    ans.splice(0, 4)
    statue.splice(0, 4)
    for (let i = 0; i < 4; i++) {
      values.push(getRandomInt(1, 13))
      statue.push(false)
    }
    worker.postMessage({ type: "start", data: new ArrayLike(values) })
  } if (type == "ans") {
    ans.push(toArray(data))
  } if (type == "finish") {
    if (ans.length > 0) {
      buttonStatue.value = 1
      onLoad.value = false
    } else {
      refreshValues()
    }
  }
}
function refreshValues() {
  onLoad.value = true
  buttonStatue.value = 0
  worker.postMessage({ type: "stop", data: {} })
}
onMounted(() => {
  showBG()
  refreshValues()
})
</script>
<style scoped lang="scss">
.on-load {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  &>img {
    width: 100px;
    display: block;
  }

  &>p {
    text-align: center;
  }
}

.button {
  background-color: var(--theme-strong1);
  color: var(--font-color-b);
  padding: 10px;
  line-height: 20px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 1.3em;
  user-select: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.6;
  }

  border-radius: calc(20px * var(--theme-border-radius));
}

.full {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

}

.game-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.broads-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  column-gap: 10px;
  row-gap: 10px;

  &>li {
    height: 40vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    perspective: 30px;

    &>div {
      width: 26vmin;
      height: 40vmin;
      position: relative;

      &>div {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
        transition: 0.3s;
        border-radius: calc(15px * var(--theme-border-radius));

        &.value {
          background-color: var(--theme-1-5);

          transform: rotateY(180deg);

          &.active {
            transform: rotateY(0deg);
          }
        }

        &.back {
          background-color: var(--theme-2-5);
          cursor: pointer;
          transform: rotateY(0deg);

          &.active {
            transform: rotateY(180deg);
          }
        }

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5em;
      }
    }
  }
}

.ans {
  margin-top: 20px;
  display: grid;
  grid-template-rows: 0px;
  // transition: 0.3s;
  overflow: hidden;

  &.show {
    grid-template-rows: 1fr;
  }

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  & .ans-box {
    display: flex;
    column-gap: 15px;
    row-gap: 10px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    flex-wrap: wrap;

    &>li {
      border-radius: calc(10px * var(--theme-border-radius));
      background-color: var(--theme-3-1);

      & .ans-line {
        display: flex;
        column-gap: 20px;
        padding: 10px;
        flex-wrap: wrap;
        flex-shrink: 0;

        &>* {
          word-wrap: none;
          word-break: keep-all;
        }
      }
    }
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -999;
}</style>