import path from 'path';
import process from 'process';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';
import sitemapPlugin from 'vite-plugin-sitemap';

import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import ViteCustom404PagePlugin from './plugins/ViteCustom404PagePlugin';
import { dfsSearch } from './assist/findFiles';

const dirname = import.meta.dirname.replaceAll("\\", "/");

function getNodeModulesPath(name) {
  return path.posix.join(dirname, "node_modules", name);
}

const chunkConfig = {
  markdown: [getNodeModulesPath('showdown'), getNodeModulesPath('showdown-katex'), getNodeModulesPath('xss'), getNodeModulesPath('katex'), getNodeModulesPath('highlight.js')],
  connections: [path.posix.join(dirname, './src/common/script/connection.js')],
  normal: [path.posix.join(dirname, './src/common/script/normal.js')],
  infomations: [path.posix.join(dirname, './src/common/script/infomations.js')],
  initEnv: [
    path.posix.join(dirname, './src/common/script/all.js'),
    path.posix.join(dirname, './src/common/script/arraySort.js'),
    path.posix.join(dirname, './src/common/script/arrayBufferJsonSport.js'),
    path.posix.join(dirname, './src/common/script/storageEvent.js'),
    path.posix.join(dirname, './src/common/script/stringPoint.js'),
    path.posix.join(dirname, './src/common/script/browerInfo.js'),
    path.posix.join(dirname, './src/common/script/copy.js'),
  ],
};
/** @type {import('vite').UserConfig} */
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
          grid: true,
        }),
        cssnano(),
      ],
    },
  },
  resolve: {
    alias: {
      'particles.js': path.resolve(__dirname, 'modifiedPackage/particles.js/particles.js'),
    },
  },
  server: {
    port: 81,
    host: '0.0.0.0',
  },
  base: '/',
  appType: 'mpa',
  plugins: [
    vue(),
    vueDevTools(),
    Inspect(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: './temp/test.html', //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
    sitemapPlugin({
      hostname: 'http://www.kuankuan.site/',
      changefreq: 'weekly',
      outDir: 'builded/dist',
    }),
    ViteCustom404PagePlugin(),
  ],
  build: {
    outDir: 'builded/dist',
    rolldownOptions: {
      input: dfsSearch(path.resolve('./'), (str) => str.endsWith('.html') || str.endsWith('.htm')),
      output: {
        codeSplitting: {
          groups: Object.entries(chunkConfig).map(([key, value]) => ({
            name: key,
            test: (id) => {
              return value.some((item) => id.startsWith(item));
            },
          }))
        },
        entryFileNames: function (chunkInfo) {
          let pathName = (
            path.dirname(chunkInfo.facadeModuleId).slice(__dirname.replace(/\\/g, '/').length) +
            '/script/[name]-[hash].js'
          ).slice(1);
          return pathName;
        },
        chunkFileNames: function (chunkInfo) {
          return 'script/[name]-[hash].js';
        },
        assetFileNames: function (chunkInfo) {
          if (chunkInfo.source === '/* vite internal call, ignore */') {
            return chunkInfo.names[0];
          }
          const extToDir = {
            script: ['.js'],
            style: ['.css'],
            font: ['.ttf', '.woff', '.woff2', '.eot', '.otf'],
            image: ['.png', '.jpg', '.svg', '.gif'],
          };

          for (const i in extToDir) {
            if (extToDir[i].some((ext) => chunkInfo.names[0].endsWith(ext))) {
              return `${i}/[name]-[hash].[ext]`;
            }
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    minify: 'terser',
    target: 'es2015',
  },
});
