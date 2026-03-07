<template>
    <div class="userbox">
        <importbutton class="button demo-icon" @click="openThemesChoicer">&#xe80f;</importbutton>
    </div>
    <mydialog class="dialog" ref="themesChoicer" a="1" b="2">
        <h3>主题选择</h3>
        <div>
            <ul class="mainList">
                <li v-for="(subValue, name) in values">
                    <ul class="line"
                        :style="`grid-template-columns: repeat(${Object.getOwnPropertyNames(subValue).length},minmax(0px,1fr));`">
                        <li v-for="(title, value) in subValue" @click="change(name, value)"
                            :class="{ choice: data[name] == value }">
                            <p class="valuename">{{ title }}</p>
                            <img :src="getUrl(name + `-` + value)" class="shower" />
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <p class="close demo-icon" @click="closeThemesChoicer">&#xe80c;</p>
    </mydialog>
</template>
<script setup>
import ALL from "../../../src/common/script/all.js"
import importbutton from "./input/linkLikeButton.vue"

import mydialog from "./dialog.vue";
function getUrl(name) {
    return new URL(`../image/themeShower/${name}.svg`, import.meta.url).href
}
function change(name, value) {
    data[name] = value
    localStorage.setItem("theme", JSON.stringify(data))
}
import { data } from "../script/themes"
import { ref } from "vue"
let themesChoicer = ref(null)
function openThemesChoicer() {
    themesChoicer.value.showModal()
}
function closeThemesChoicer() {
    themesChoicer.value.close()
}
let values = {
    light: {
        light: "亮色",
        dark: "暗色",
        OS: "跟随系统"
    },
    color: {
        simple: "简约",
        full: "多彩"
    },
    opacity: {
        "true": "半透明",
        "false": "不透明",
        "blur": "背景模糊"
    },
    roundedBorder: {
        "full": "圆润",
        "normal": "正常",
        "none": "直角"
    }
}
import "../style/font-icos.css"

</script>
<style scoped lang="scss">
h3 {
    font-size: 24px;
    margin: 0;
}

button.button {
    margin: 0;
    padding: 0;
    font-size: 24px;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.2s;
    color: var(--font-color);

    &:hover{
        opacity: 1;
        color: var(--theme-strong1);
    }
}

ul {
    list-style: none;
    padding: 0;
}

ul.mainList {
    display: grid;
    row-gap: 5px;
}

ul.line {
    display: grid;
    column-gap: 5vw;
    width: 100%;
}

ul.line>li {
    text-align: center;
    cursor: pointer;
    border-color: transparent;
    border-width: 1px;
    border-style: groove;
    transition: 0.3s;
    padding: 10px;
    border-radius: calc(10px * var(--theme-border-radius));
}

ul.line>li:hover {
    border-color: var(--theme-strong1);
}

img.shower {
    width: 15vmin;
    transition: 0.3s;
    border-radius: calc(14px * var(--theme-border-radius));
}

.choice {
    background: var(--theme-1-5);
}

p.valuename {
    padding: 0;
    margin: 0;
    padding-left: -20px;
    font-size: 18px;
    word-break: keep-all;
}

.dialog {
    color: var(--font-color);
    width: max-content;
    border: none;
    outline: none;
    border-radius: calc(20px * var(--theme-border-radius));
    background: var(--theme-3-1);
    backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
    transition: 0.3s;
    max-height: 50%;
}


.close {
    position: absolute;
    top: 5px;
    right: 5px;
    margin: 0;
    font-size: 20px;
    color: #ff0000;
    transition: 0.3s;
    cursor: pointer;
}

.close:hover {
    transform: scale(1.2);
}
</style>