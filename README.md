# Cloudflare Pages 个人主页项目（v4）

这版已修正：
- 微博图标显示异常
- 小红书图标显示异常
- X 图标改为 X，而不是旧 Twitter 造型
- 新增个人博客跳转项
- 主题切换按钮使用规范太阳 / 月亮图标
- 全站字体改为苹方优先字体栈

## 目录结构

```text
personal-homepage-cf-pages-v4/
├── index.html
├── style.css
├── main.js
├── config.js
└── assets/
    ├── bg.svg
    └── avatar.svg
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

### 2) `assets/`
如需替换背景图或头像，直接覆盖文件并修改 `config.js` 路径。

## 字体说明

本项目会优先使用：
- `PingFang SC`
- `PingFang TC`
- `PingFang HK`

如果访问设备本身没有苹方，浏览器才会回退到系统备用字体。

补充：微博和小红书图标已改为项目内本地透明 SVG 资源，路径在 `assets/icons/`，部署到 Cloudflare Pages 时不依赖外部图标库。


## 图标说明

- 5 个站点入口图标使用项目内本地透明 PNG 资源，路径在 `assets/icons/`
- 你后续如果想替换成自己下载的图标，只需要保持同名文件即可
