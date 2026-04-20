# Cloudflare Pages 个人主页项目

新增：
- PWA 安装支持
- Service Worker 离线缓存
- iPhone 主屏幕图标与 Apple Touch Icon
- 更完整的 `manifest.webmanifest`
- iPhone 非主屏访问时的安装提示
- 主屏模式下更贴近全屏展示

## 目录结构

```text
personal-homepage-cf-pages-v9/
├── index.html
├── style.css
├── main.js
├── config.js
├── service-worker.js
├── manifest.webmanifest
└── assets/
    ├── bg.svg
    ├── avatar.svg
    ├── icons/
    │   ├── github.png
    │   ├── x.png
    │   ├── weibo.png
    │   ├── xiaohongshu.png
    │   └── blog.png
    └── pwa/
        ├── apple-touch-icon.png
        ├── icon-192.png
        ├── icon-512.png
        └── favicon-32.png
```

## 部署到 Cloudflare Pages

- Framework preset: `None`
- Build command: 留空
- Build output directory: `/`

## 你通常只需要修改

### 1) `config.js`
改这些内容：
- 中英文姓名
- 中英文简介
- 背景图路径
- 头像路径
- GitHub / X / 微博 / 小红书 / 博客链接
- 电话 / 信息 / 邮箱
- iPhone 安装提示文案

### 2) `assets/`
如需替换背景图或头像，直接覆盖文件并修改 `config.js` 路径。

### 3) `assets/pwa/`
如果你想换成自己的主屏图标，替换这几个 PNG 即可。

## 字体说明

本项目会优先使用：
- `PingFang SC`
- `PingFang TC`
- `PingFang HK`

如果访问设备本身没有苹方，浏览器才会回退到系统备用字体。

## iPhone 使用说明

在普通浏览器里，顶部状态栏和底部工具栏属于浏览器自身 UI，网页本身无法完全消除。

要获得更接近“整屏无黑条”的效果：
1. 用 Safari 打开页面
2. 点击“分享”
3. 选择“添加到主屏幕”
4. 从主屏图标进入

这版已经为该方式补齐了必要的 PWA 资源与配置。


## v10 修复
- 修复 PC 端因 `-webkit-fill-available` 导致的首屏高度异常
- 统一改为 `100vh / 100svh / 100dvh` 组合
- 将页面背景同步到 `body`，避免可视区外露底
