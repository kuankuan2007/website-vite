<template>
  <myheader title="播放器"></myheader>
  <div class="main">
    <listDialog
      :text-statue="textStatue"
      :player-statue="playerStatue"
      @update-text-statue="textStatueChange"
      @update-music-list="musicListChange"
      ref="myListDialog"
    />
    <div class="top-shower">
      <div class="text-shower">
        <p class="text">
          <span
            ref="textBox"
            :class="{
              refreshing: textStatue.onRefreshText,
            }"
          >
            <span v-for="i in textStatue.showText" class="hidden">{{ i }}</span>
          </span>
          <span class="cursor-box" ref="cursorBox"></span>
        </p>
      </div>
      <div
        class="wave-shower"
        v-on-resize="
          () => {
            if (waveShower.resize) {
              waveShower.resize();
            }
          }
        "
      >
        <oscillogram :analyser="_toWaveShower" ref="waveShower" />
      </div>
    </div>
    <div class="player">
      <audio ref="playerAudio" :src="playerStatue.data.url"></audio>
      <div class="player-ui">
        <div>
          <div
            class="img-shower"
            :style="{ backgroundImage: `url(${playerStatue.data.picture || placeHolderPicture})` }"
          ></div>
          <div class="infos">
            <p class="title">{{ playerStatue.data.title }}</p>
            <p class="author">{{ playerStatue.data.author }}</p>
          </div>
        </div>
        <div>
          <div class="progress">
            <p class="music-length-shower">{{ currentTimeShower }}</p>
            <slider
              :disabled="!playerStatue.inited"
              @change="((playerStatue.currentTime = $event), setAudioCurrentTime($event))"
              :value="playerStatue.currentTime"
              :max="playerStatue.data.length"
            />
            <p class="music-length-shower">{{ durationTimeShiwer }}</p>
          </div>
          <div class="buttons">
            <div class="center">
              <button
                @click="playerControler.last"
                :disabled="!playerStatue.playList.length || playerStatue.playWay === 2"
                class="left demo-icon"
              >
                {{ iconMap.last }}
              </button>
              <button
                :disabled="!playerStatue.playList.length"
                @click="playerControler.playOrPause"
                class="play-pause demo-icon"
              >
                {{ playerStatue.playing ? iconMap.pause : iconMap.play }}
              </button>
              <button
                @click="playerControler.next"
                :disabled="!playerStatue.playList.length"
                class="right demo-icon"
              >
                {{ iconMap.next }}
              </button>
            </div>
            <div class="right">
              <div
                class="volume"
                :class="{
                  mute: playerStatue.mute,
                }"
              >
                <linkLikeButton class="demo-icon" @click="playerStatue.mute = !playerStatue.mute">{{
                  playerStatue.volume === 0 || playerStatue.mute
                    ? iconMap.volume0
                    : playerStatue.volume <= 100 / 3
                      ? iconMap.volume1
                      : playerStatue.volume <= 200 / 3
                        ? iconMap.volume2
                        : iconMap.volume3
                }}</linkLikeButton>
                <slider
                  class="volume-slider"
                  @change="((playerStatue.volume = $event), (playerStatue.mute = false))"
                  :value="playerStatue.mute ? 0 : playerStatue.volume"
                  :max="100"
                  :min="0"
                  :step="1"
                />
                <div>
                  <p>100%</p>
                  <p>{{ Math.round(playerStatue.volume) }}%</p>
                </div>
              </div>
              <button
                class="repeat-type demo-icon"
                style="font-size: 1.5em"
                @click="playerStatue.playWay = (playerStatue.playWay + 1) % 4"
              >
                {{
                  [
                    iconMap.playInOrder,
                    iconMap.loopPlayBack,
                    iconMap.shufflePlay,
                    iconMap.singleCycle,
                  ][playerStatue.playWay]
                }}
              </button>
              <button class="play-list demo-icon" @click="myListDialog.open()">
                {{ iconMap.playList }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="play-list-box"></div>
  <audio id="temp" src=""></audio>
  <div id="particles-js" class="background"></div>
</template>
<script setup>
import { ref, reactive, onMounted, computed, shallowRef, watchEffect } from 'vue';
import myheader from '../../src/common/components/header.vue';
import showBG from './back';
import { showError } from '../../src/common/script/infomations';
import slider from '../../src/common/components/input/slider.vue';
import {
  formattingTime,
  awaitTime,
  randomChoose,
  debounce,
  getRandomInt,
} from '../../src/common/script/normal';
import iconMap from '../../src/data/demo-icon';
import listDialog from './components/listDialog.vue';
import * as musicMetadata from 'music-metadata';
import placeHolderPicture from './assets/music.svg?url';
import oscillogram from '../../src/common/components/oscillogram.vue';
import linkLikeButton from '../../src/common/components/input/linkLikeButton.vue';
import vOnResize from '../../src/common/command/onResize';

const _toWaveShower = shallowRef(undefined);
const waveShower = ref();
/**@type {import("vue").Ref<HTMLAudioElement>} */
const playerAudio = ref();
/**@type {import("vue").Ref<HTMLSpanElement>} */
const cursorBox = ref();
/**@type {import("vue").Ref<HTMLSpanElement>} */
const textBox = ref();

const myListDialog = ref();
const currentTimeShower = computed(() => {
  return formattingTime(playerStatue.currentTime);
});
const durationTimeShiwer = computed(() => {
  return formattingTime(playerStatue.data.length);
});
class MusicInfo {
  /**
   * A description of the entire function.
   *
   * @param {File} file - description of parameter
   */
  constructor(file) {
    ((this.file = file), (this.title = file.name));
    this.data = '';
    this.canplay = false;
    this.error = null;

    this.id = playerStatue.idEnd++;
    this.url = URL.createObjectURL(this.file);
    fetch(this.url).then((res) => {
      musicMetadata.parseWebStream(res.body).then(
        (metadata) => {
          this.metadata = metadata;
          this.canplay = true;
          this.length = metadata.format.duration;
          this.title = metadata.common.title || file.name;
          this.author = metadata.common.artist || '未知';
          if (metadata.common.picture && metadata.common.picture[0]) {
            try {
              this.picture = URL.createObjectURL(
                new Blob([metadata.common.picture[0].data], {
                  type: metadata.common.picture && metadata.common.picture[0].type,
                })
              );
            } catch {
              this.picture = '';
            }
          } else {
            this.picture = '';
          }
        },
        (err) => {
          this.error = err;
        }
      );
    }, (err) => {
      this.error = err;
      this.canplay = 2;
    });
  }
}
/**
 *
 * @param {object} e
 * @param {FileList} e.files
 * @param {string} e.type
 */
async function musicListChange(e) {
  console.log(e);
  if (e.type === 'new') {
    for (const i of e.files) {
      playerStatue.playList.push(new MusicInfo(i));
    }
  }
  if (e.type === 'move') {
    const moveingNode = playerStatue.playList.splice(e.from, 1);
    playerStatue.playList.splice(e.to, 0, moveingNode[0]);
  }
  if (e.type === 'play') {
    const index = playerStatue.playList.findIndex((n) => n.id === e.id);
    if (index != -1 && canplay(playerStatue.playList[index])) {
      playerStatue.inited = true;
      playerStatue.data = playerStatue.playList[index];
      setTimeout(() => {
        playerAudio.value.play();
      }, 0);
    }
  }
  if (e.type === 'delete') {
    const index = playerStatue.playList.findIndex((n) => n.id === e.id);
    if (index != -1) {
      playerStatue.playList.splice(index, 1);
    }
  }
}
async function textStatueChange(e) {
  console.log(e);
  if (e.type === 'play') {
    if (textStatue.textGetErrorPaused) {
      textStatue.textGetErrorPaused = false;
      textControl();
    } else {
      textStatue.textGetErrorPaused = true;
    }
  }
  if (e.type === 'typeChange') {
    if (textStatue.types.includes(e.key)) {
      textStatue.types.splice(textStatue.types.indexOf(e.key), 1);
    } else {
      textStatue.types.push(e.key);
    }
  }
}
function canplay(n) {
  if (n.canplay && !n.error) {
    return true;
  }
  return false;
}
/**
 * Get the next playlist item based on the current item ID and mode.
 *
 * @param {number} nowId - The ID of the current item. Default is -1.
 * @param {"full"|"single"|"last"} mode - The mode of the playlist. Default is "full".
 * @return {object|null} The next playlist item or null if not found.
 */
function getNextPlayList(nowId = -1, mode = 'full') {
  let now = playerStatue.playList.findIndex((n) => {
    return n.id == nowId;
  });
  if (mode === 'last') {
    for (let i = now - 1; i >= 0; i--) {
      if (canplay(playerStatue.playList[i])) {
        return playerStatue.playList[i];
      }
    }
    for (let i = playerStatue.playList.length - 1; i > now; i--) {
      if (canplay(playerStatue.playList[i])) {
        return playerStatue.playList[i];
      }
    }
    return null;
  }
  if (mode !== 'full' && playerStatue.playWay === 3) {
    if (playerStatue.playList[now] && canplay(playerStatue.playList[now])) {
      return playerStatue.playList[now];
    }
    return null;
  }
  if (playerStatue.playWay !== 2) {
    for (let i = now + 1; i < playerStatue.playList.length; i++) {
      console.log(i, playerStatue.playList[i], canplay(playerStatue.playList[i]));
      if (canplay(playerStatue.playList[i])) {
        return playerStatue.playList[i];
      }
    }
    if (mode !== 'full' && playerStatue.playWay === 0) {
      return null;
    }
    for (let i = 0; i < now; i++) {
      if (canplay(playerStatue.playList[i])) {
        return playerStatue.playList[i];
      }
    }
    return null;
  } else {
    const choice = [];
    for (let i = 0; i < playerStatue.playList.length; i++) {
      if (playerStatue.playList[i].id != nowId && canplay(playerStatue.playList[i])) {
        choice.push(playerStatue.playList[i]);
      }
    }
    if (choice.length) {
      return randomChoose(choice);
    }
    return null;
  }
}
const playerControler = {
  playOrPause() {
    if (!playerStatue.inited) {
      initPlayer();
      return;
    }
    if (playerStatue.playing) {
      playerAudio.value.pause();
    } else {
      playerAudio.value.play();
    }
  },
  next() {
    if (!playerStatue.inited) {
      initPlayer();
      return;
    }
    let next = getNextPlayList(playerStatue.data.id);
    if (next) {
      playerStatue.data = next;
      setTimeout(() => {
        playerAudio.value.play();
      }, 0);
    }
  },
  last() {
    if (!playerStatue.inited) {
      initPlayer();
      return;
    }
    let last = getNextPlayList(playerStatue.data.id, 'last');
    if (last) {
      playerStatue.data = last;
      setTimeout(() => {
        playerAudio.value.play();
      }, 0);
    }
  },
};
function initPlayer() {
  if (playerStatue.inited) {
    return;
  }
  if (!playerStatue.playList.length) {
    return;
  }
  const data = getNextPlayList();
  if (data !== null) {
    playerStatue.data = data;
    playerStatue.inited = true;
    setTimeout(() => {
      playerAudio.value.play();
    }, 0);
  }
  console.log(data);
}
const playerStatue = reactive({
  data: {
    url: '',
    author: '',
    title: '未播放',
    length: 0,
    picture: '',
  },
  inited: false,
  playList: [],
  currentTime: 0,
  playing: false,
  playWay: 0, //0顺序 1循环 2随机 3单曲
  idEnd: 0,
  onSetAudioCurrentTime: false,
  volume: 100,
  mute: false,
});

const setAudioCurrentTime = debounce(
  (currentTime) => {
    playerAudio.value.currentTime = currentTime;
  },
  500,
  {
    obj: playerStatue,
    key: 'onSetAudioCurrentTime',
  }
);

const textStatue = reactive({
  showText: '',
  onRefreshText: false,
  textHistory: [],
  textGetErrorPaused: false,
  types: ['a', 'b', 'd', 'e', 'h', 'i', 'k'],
});

function failToGetWords(err) {
  textStatue.textGetErrorPaused = true;
  showError('获取数据时出现错误');
}

/**
 * Refreshes the words by making a network request to retrieve a random quote.
 *
 * @return {Promise<undefined>} A promise that resolves with the random quote.
 */
function refreshWords() {
  return new Promise((resolve, reject) => {
    let args = 'randnum=' + Math.random();
    for (const i of textStatue.types) {
      args += '&c=' + i;
    }
    fetch('https://v1.hitokoto.cn?' + args).then((res) => {
      res.json().then((data) => {
        let text = data.hitokoto;
        if (data['from']) {
          let addAfter = data['from'];
          if (data['from_who']) {
            addAfter += '·' + data['from_who'];
          }
          text += '——' + addAfter;
        } else {
          if (data['from_who']) {
            text += '——' + data['from_who'];
          }
        }
        if (textStatue.showText === text) {
          refreshWords().then(resolve, reject);
          return;
        }
        (async () => {
          cursorBox.value.classList.add('flicker');
          for (let i = textBox.value.children.length - 1; i >= 0; i--) {
            textBox.value.children[i].classList.add('hidden');
            const { left, top, height } = textBox.value.children[i].getBoundingClientRect();
            const { left: pleft, top: ptop } = textBox.value.parentNode.getBoundingClientRect();
            cursorBox.value.style.setProperty('--top', `${top - ptop}px`);
            cursorBox.value.style.setProperty('--left', `${left - pleft}px`);
            cursorBox.value.style.setProperty('--height', `${height}px`);
            await awaitTime(150 + getRandomInt(-50, 50));
          }
          cursorBox.value.classList.remove('flicker');

          textStatue.showText = text;
          setTimeout(async () => {
            cursorBox.value.classList.add('flicker');
            for (let i = 0; i < textBox.value.children.length; i++) {
              textBox.value.children[i].classList.remove('hidden');
              if (i < textBox.value.children.length - 2) {
                const { left, top, height } = textBox.value.children[i + 1].getBoundingClientRect();
                const { left: pleft, top: ptop } = textBox.value.parentNode.getBoundingClientRect();
                cursorBox.value.style.setProperty('--top', `${top - ptop}px`);
                cursorBox.value.style.setProperty('--left', `${left - pleft + 5}px`);
                cursorBox.value.style.setProperty('--height', `${height}px`);
              } else {
                cursorBox.value.classList.remove('flicker');
              }
              await awaitTime(150 + getRandomInt(-50, 50));
            }
            textStatue.textHistory.unshift(data);
            resolve();
          });
        })();
      }, reject);
    }, reject);
  });
}
function textControl() {
  if (textStatue.textGetErrorPaused) {
    return;
  }
  textStatue.onRefreshText = true;
  refreshWords().then(() => {
    textStatue.onRefreshText = false;
    setTimeout(textControl, 2000);
  }, failToGetWords);
}

/**
 * @type {{
 *  ctx:AudioContext
 *  analyser:AnalyserNode
 *  gain:GainNode
 *  source:MediaElementAudioSourceNode
 * }}
 */
const audioContextEle = reactive({});
window.ctx = audioContextEle;
onMounted(() => {
  textControl();
  showBG();
  playerAudio.value.addEventListener('play', () => {
    playerStatue.playing = true;
  });
  playerAudio.value.addEventListener('pause', () => {
    playerStatue.playing = false;
  });
  playerAudio.value.addEventListener('timeupdate', () => {
    if (playerStatue.onSetAudioCurrentTime) {
      return;
    }
    playerStatue.currentTime = playerAudio.value.currentTime;
  });
  playerAudio.value.addEventListener('loadedmetadata', () => {
    playerStatue.data.length = playerAudio.value.duration;
  });
  playerAudio.value.addEventListener('ended', () => {
    if (playerStatue.playWay === 2) {
      playerStatue.currentTime = 0;
    }
    let next = getNextPlayList(playerStatue.data.id, 'single');
    if (next) {
      playerStatue.data = next;
      setTimeout(() => {
        playerAudio.value.play();
      }, 0);
    }
  });
  playerAudio.value.addEventListener(
    'play',
    () => {
      audioContextEle.ctx = new AudioContext();
      audioContextEle.gain = audioContextEle.ctx.createGain();
      watchEffect(() => {
        playerStatue.volume;
        if (playerStatue.mute) {
          audioContextEle.gain.gain.value = 0;
        } else {
          audioContextEle.gain.gain.value = playerStatue.volume / 100;
        }
      });
      audioContextEle.analyser = audioContextEle.ctx.createAnalyser();
      audioContextEle.source = audioContextEle.ctx.createMediaElementSource(playerAudio.value);
      audioContextEle.source.connect(audioContextEle.gain);
      audioContextEle.gain.connect(audioContextEle.analyser);
      audioContextEle.analyser.connect(audioContextEle.ctx.destination);
      _toWaveShower.value = audioContextEle.analyser;
    },
    {
      once: true,
    }
  );
});
</script>
<style scoped lang="scss">
.main {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > .top-shower {
    position: relative;
    flex-grow: 1;
  }

  & > .player {
    position: relative;
  }
}

.wave-shower {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 50%;
  z-index: -1;
}

.player-ui {
  display: flex;
  background-color: var(--theme-1-5);
  border-radius: calc(20px * var(--theme-border-radius)) calc(20px * var(--theme-border-radius)) 0 0;
  padding: 20px;
  column-gap: 2vw;

  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    flex-wrap: nowrap;

    & > .img-shower {
      border-radius: calc(15px * var(--theme-border-radius));
      height: 8vh;
      width: 8vh;
      position: relative;
      background-repeat: no-repeat;
      background-size: cover;
    }

    & > .infos {
      & > * {
        margin: 0;
        text-wrap: nowrap;
        text-overflow: ellipsis;
        word-wrap: none;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      max-width: 20vw;

      // overflow: hidden;
      & > .title {
        // font-size: 1.5em;
        margin-bottom: 1vh;
        font-size: clamp(1em, 3.5vw, 1.8em);
      }

      & > .author {
        font-size: clamp(0.8em, 2vw, 1.3em);
      }
    }
  }

  & > div:nth-child(2) {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 10%;

    & > .progress {
      display: flex;
      justify-content: center;
      align-items: center;

      & > *:nth-child(2) {
        flex-grow: 1;
      }

      & > .music-length-shower {
        margin: 0 10px 0 0;
        text-wrap: nowrap;
        word-wrap: none;
        font-size: 1.2em;
      }
    }

    & > .buttons {
      display: flex;
      justify-content: center;
      align-items: center;

      & > * {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 2px;

        & > button {
          // display: block;
          border: 2px solid var(--theme-1-10);
          border-radius: 50%;
          outline: none;
          background: transparent;
          cursor: pointer;
          width: 40px;
          height: 40px;
          transition: 0.3s;
          font-size: 1.2em;
          color: var(--font-color);

          &:hover {
            color: var(--font-color-b);
            background: var(--theme-strong1);
            border-color: var(--theme-strong1);
          }

          &:focus {
            border-color: var(--theme-strong1);
          }
        }
      }

      & > .center {
        flex-grow: 1;
      }

      & > .right > .volume {
        width: 10vw;
        min-width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;

        & > *:nth-child(3) {
          position: relative;

          & > *:nth-child(1) {
            opacity: 0;
            pointer-events: none;
            user-select: none;
          }

          & > *:nth-child(2) {
            position: absolute;
            right: 0;
            top: 0;
          }
        }

        & > *:nth-child(2) {
          flex-grow: 1;
        }

        & > *:nth-child(1) {
          font-size: 1.5em;
          margin: 0;
          padding: 0;
          user-select: none;
          cursor: pointer;

          &:hover {
            color: var(--theme-strong1-3);
          }
        }
      }
    }
  }
}

.text-shower {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;

  & > .text {
    font-family: 'STXINGKAI';
    font-size: 2em;
    text-align: center;
    padding: 0 20px;
    position: relative;

    & > .cursor-box {
      opacity: 0;
      transition: 0.05s;
      position: absolute;
      height: var(--height);
      width: 2px;
      left: var(--left);
      top: var(--top);
      background-color: var(--font-color);
    }

    & > .cursor-box.flicker {
      animation: cursor-blinking 1s ease-in-out infinite;
      opacity: 1;
    }

    @keyframes cursor-blinking {
      0% {
        opacity: 0;
      }

      16% {
        opacity: 0;
      }

      33% {
        opacity: 1;
      }

      66% {
        opacity: 1;
      }

      82% {
        opacity: 0;
      }

      100% {
        opacity: 0;
      }
    }

    & > span {
      & > .hidden {
        opacity: 0;
        user-select: none;
      }
    }
  }
}

.background {
  position: absolute;
  width: 100%;
  height: calc(100% - 10px);
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
