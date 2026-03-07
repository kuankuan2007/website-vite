# VitePluginElectron

VitePluginElectron是用于简化Electron项目开发的Vite插件。

## 特性

- 使用 `npm run dev` 自动启动Electron
- 渲染进程和主进程的热重载
- 使用 `npm run preview` 自动打开Electron
- 使用 `npm run build` 自动进行Electron打包

## 安装

```bash
npm install @kuankuan/vite-plugin-electron --D
```

## 使用

### 配置

在你的 `vite.config.js` 文件中添加以下配置：

```javascript
import vitePluginElectron from 'vite-plugin-electron';

export default {
  plugins: [
    vitePluginElectron({
      electronBuilder: {
        config: {
          files: ['**/*'],
          asar: true,
          productName: 'yourAppName',
          nsis: {
            oneClick: false,
            allowToChangeInstallationDirectory: true,
          },
        },
      },
      esbuildTarget: 'node18',
      main: 'src/background.ts', // Electron入口文件
    }),
  ],
};
```

### 主进程

如果你当前正在运行开发服务器或预览服务器，`process.argv` 的第三个参数将会是一个URL。你可以通过判断 `process.argv[2]===undefined` 来确定当前环境，并打开开发服务器提供的URL，而不是加载index.html，像这样：

```javascript
if (process.argv[2]) {
  win.loadURL(process.argv[2]);
} else {
  win.loadFile('index.html');
}
```

## 命令

- `npm run dev`：启动Vite开发服务器，并自动打开Electron。
- `npm run preview`：构建你的Vite项目、打开Electron，并提供打包后的应用程序。
- `npm run build`：构建你的Vite项目，并使用Electron进行打包。

## 许可证

VitePluginElectron使用[MulanPSL-2.0](https://opensource.org/licenses/MulanPSL-2.0)许可证。

## 问题

如果你遇到任何问题或有建议，请在[GitHub存储库](https://github.com/kuankuan2007/vite-plugin-electron/issues)中提出问题。

## 鸣谢

VitePluginElectron由kuankuan和贡献者开发和维护。

特别感谢[Vite](https://vitejs.dev/)项目和Electron社区的支持和灵感。

[Gitee](https://gitee.com/kuankuan2007/vite-plugin-electron)|[Github](https://github.com/kuankuan2007/vite-plugin-electron)|[文档](https://kuankuan2007.gitee.io/docs/docsPage/?name=vite-plugin-electron)

![GitHub top language](https://img.shields.io/github/languages/top/kuankuan2007/vite-plugin-electron) ![GitHub issues](https://img.shields.io/github/issues/kuankuan2007/vite-plugin-electron)
