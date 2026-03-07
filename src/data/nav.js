import docs from './docs';
import repositories from './repositories';
import iconMap from './demo-icon';
export default {
  width: 200,
  title: '菜单',
  nav: [
    {
      href: '/',
      word: '主页',
      icon: '\ue800',
      mainColor: '#4258A9',
    },
    {
      href: '/blogs/',
      word: '博客',
      icon: '\ue801',
      mainColor: '#6969FF',
    },
    {
      href: '/docs/',
      word: '帮助',
      icon: '\ue802',
      subNav: {
        title: '帮助',
        width: 260,
        struct: {
          href: '/docs/docsPage/?name=%(name)s',
          word: '%(title)s',
          icon: '\ue806',
        },
        data: {
          value: docs,
          obj: ['pageList'],
        },
      },
      mainColor: '#1F6B22',
    },
    {
      href: '/novel/',
      word: '小说',
      icon: '\ue803',
      mainColor: '#FF3B86',
    },
    {
      href: '/calc24/',
      word: '24点',
      icon: '\ue81d',
      mainColor: '#9B9E81',
    },
    {
      href: '/contactInformation/',
      word: '联系我们',
      icon: '\uf2b9',
      mainColor: '#FF2259',
    },
    {
      href: '/player/',
      word: '播放器',
      icon: iconMap.noteBeamed,
      mainColor: '#6503B8',
    },
    {
      href: '/feedback/',
      word: '反馈',
      icon: '\uf2b6',
      mainColor: '#FF8800',
    },
    {
      href: '/chat/',
      word: '聊天',
      icon: '\ue813',
      mainColor: '#8C8F00',
    },
    {
      href: '/chatgpt/',
      word: 'ChatGPT',
      icon: '\uf18d',
      mainColor: '#570000',
    },
    {
      href: '/about/',
      word: '关于',
      icon: iconMap.infoCircled,
      mainColor: '#0078D4',
    },
    {
      href: 'https://pypi.org/user/kuankuan/',
      word: 'PyPI',
      icon: '\ue808',
      mainColor: '#0073B7',
    },
    {
      href: 'https://www.npmjs.com/~kuankuan',
      word: 'npm',
      icon: iconMap.npm,
      mainColor: '#CB0303',
    },
    {
      href: 'https://members.opensource.org/user/kuankuan/',
      word: 'OSI',
      icon: '\uE81E',
      mainColor: '#3DA639',
    },
    {
      href: 'https://gitee.com/kuankuan2007',
      word: 'Gitee',
      icon: '\uf053',
      subNav: {
        title: 'Gitee',
        width: 260,
        struct: {
          href: 'https://gitee.com/kuankuan2007/%(name)s',
          word: '%(title)s',
          icon: '\ue80a',
        },
        data: {
          value: repositories,
          obj: [],
        },
      },
      mainColor: '#FF0000',
    },
    {
      href: 'https://gitlab.com/kuankuan2007',
      word: 'Gitlab',
      icon: '\ue814',
      subNav: {
        title: 'Gitlab',
        width: 260,
        struct: {
          href: 'https://gitlab.com/kuankuan2007/%(name)s',
          word: '%(title)s',
          icon: '\ue80a',
        },
        data: {
          value: repositories,
          obj: [],
        },
      },
      mainColor: '#FF0000',
    },
    {
      href: 'https://github.com/kuankuan2007',
      word: 'Github',
      icon: '\uf056',
      subNav: {
        title: 'Github',
        width: 260,
        struct: {
          href: 'https://github.com/kuankuan2007/%(name)s',
          word: '%(title)s',
          icon: '\ue80a',
        },
        data: {
          value: repositories,
          obj: [],
        },
      },
      mainColor: '#2B001F',
    },
  ],
};
