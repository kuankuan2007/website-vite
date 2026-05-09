<template>
  <myHeader :hidden="hiddenHeader" title="宽宽的小天地"></myHeader>
  <div
    class="fixed"
    ref="fixedEle"
    @scroll="refreshScrollTop"
    v-on-resize="debounceRefreshSimplePageHeight"
    :style="{
      '--foot-num': footList.length,
      '--simple-page-height': simplePageHeight,
    }"
  >
    <div
      class="scroll"
      :style="{
        '--scroll': scrollTop / simplePageHeight,
      }"
    >
      <topEle :simple-page-height="simplePageHeight" />
      <navList :simple-page-height="simplePageHeight" />
      <introduce
        v-for="(data, index) in footList"
        :key="index"
        :data="data"
        :index="index"
        :simple-page-height="simplePageHeight"
      />
      <div class="footer">
        <p>渝ICP备2023004395号-1</p>
        <p>
          <img src="./assets/police-badge.png" alt="警徽" class="police-badge" />
          渝公网安备50010702506491号
        </p>
        <p>宽宽的小天地 © 2023-2026 宽宽2007</p>
        <p>Powered by 曜魄科技</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import myHeader from './common/components/header.vue';
import vOnResize from './common/command/onResize';
import { onMounted, reactive, ref, computed } from 'vue';
import topEle from './components/top.vue';
import { debounce } from './common/script/normal';
import navList from './components/navList.vue';
import introduce from './components/introduce.vue';
import { jump } from './common/script/normal';

/**@type {import('vue').Ref<HTMLDivElement>} */
const fixedEle = ref();

const simplePageHeight = ref(window.innerHeight);

class IntroduceNode {
  isNode = true;
  /**
   * Constructor for creating an object.
   *
   * @param {any} content - The content of the object.
   * @param {array} classList - The list of classes for the object.
   * @param {function} onclick - The onclick event handler for the object.
   */
  constructor(content, classList = [], onclick = () => {}) {
    this.content = content;
    this.classList = classList;
    this.onClick = (...args) => {
      onclick.call(this, ...args);
    };
  }
}

const footList = reactive([
  {
    title: new IntroduceNode('合作', ['h1']),
    content: new IntroduceNode(
      '在宽宽的小天地，我们秉持着合作的精神。我们鼓励用户和开发者之间的互动与合作，致力于打造一个共同成长的社区。无论是对于我们的开源项目，还是对于我们提供的各种服务，我们都欢迎大家积极参与和提供宝贵的意见和建议。通过合作，我们相信可以共同推动网站的进一步发展和完善。',
      []
    ),
    openSource: {
      repository: [
        {
          title: new IntroduceNode('最新版', ['h2']),
          url: new IntroduceNode(
            'https://gitee.com/kuankuan2007/website-vite',
            ['click-able'],
            function () {
              jump(this.content, true);
            }
          ),
        },
        {
          title: new IntroduceNode('旧版（停止维护）', ['h2']),
          url: new IntroduceNode(
            'https://gitee.com/kuankuan2007/website-old',
            ['click-able'],
            function () {
              jump(this.content, true);
            }
          ),
        },
        {
          title: new IntroduceNode('Gitee Pages', ['h2']),
          url: new IntroduceNode(
            'https://gitee.com/kuankuan2007/kuankuan2007',
            ['click-able'],
            function () {
              jump(this.content, true);
            }
          ),
        },
      ],
      license: new IntroduceNode('MPL-2.0', ['click-able'], function () {
        jump('https://opensource.org/license/mpl-2-0/', true);
      }),
    },
  },
  {
    title: new IntroduceNode('共享', ['h1']),
    content: new IntroduceNode(
      '宽宽的小天地一直以共享为宗旨。我们坚信只有共享才能获得更多的创新和进步。因此，我们不仅将我们的开源项目公之于众，还提供了免费的ChatGPT等服务。我们希望通过共享的平台，让更多人能够参与其中，发挥个人的创造力和想象力。我们鼓励用户通过使用我们的服务来实现自己的目标，同时也欢迎开发者共同贡献代码和功能，共同推动互联网的开放和发展。'
    ),
    pages: [
      new IntroduceNode('ChatGPT', ['click-able'], function () {
        jump('/chatgpt/', true);
      }),
      new IntroduceNode('聊天室', ['click-able'], function () {
        jump('/chat/', true);
      }),
      new IntroduceNode('致谢', ['click-able'], function () {
        jump('/about/', true);
      }),
    ],
  },
  {
    title: new IntroduceNode('创新', ['h1']),
    content: new IntroduceNode(
      '在宽宽的小天地，我们追求创新。我们持续关注最新的技术和趋势，不断更新和迭代我们的产品和服务。我们努力将最新的科技融入到我们的网站中，以提供更好的用户体验和功能。同时，我们也鼓励用户创新和尝试，提供一个自由发挥的空间。我们相信，只有通过不断创新，我们才能够不断提升我们的网站，更好地满足用户的需求。'
    ),
  },
]);

const scrollTop = ref(0);

const hiddenHeader = computed(() => {
  return scrollTop.value < simplePageHeight.value * 0.2;
});

const loaded = ref(false);

function refreshSimplePageHeight() {
  if (fixedEle.value) {
    simplePageHeight.value = fixedEle.value.offsetHeight;
  }
}

const debounceRefreshSimplePageHeight = debounce(refreshSimplePageHeight, 300);

function refreshScrollTop() {
  if (fixedEle.value) {
    scrollTop.value = fixedEle.value.scrollTop;
  }
}

onMounted(() => {
  refreshSimplePageHeight();
  refreshScrollTop();
  setTimeout(() => {
    loaded.value = true;
  });
});
</script>
<style lang="scss" scoped>
.fixed {
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  overflow-x: hidden;

  & > .scroll {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 2.5fr repeat(var(--foot-num), 1fr) auto;

    & > * {
      transition: 0.3s;
      // background: linear-gradient(rgba(0, 0, 255, 0.1), rgba(255, 0, 0, 0.1));

      height: calc(var(--simple-page-height) * 1px);
      position: relative;

      &:nth-child(2) {
        height: calc(var(--simple-page-height) * 2.5px);
      }
      &.footer {
        height: auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        padding: 1rem;
        background: rgba(127, 127, 127, 0.5);

        column-gap: 1rem;
        p {
          margin: 0;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        a {
          color: var(--font-color);
        }
        .police-badge {
          height: 1.3em;
        }
      }

      &.hidden {
        opacity: 0;
      }
    }
  }
}
</style>
