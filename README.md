# Personal Homepage (iOS26 Style)

一个简约个人主页模板，支持：

- PC 端左侧个人卡片 + 右侧 RSS 信息流
- 移动端自动单列布局
- 深色 / 浅色模式切换
- PWA 安装与基础离线访问
- 毛玻璃、圆角卡片、浅色系配色
- 通过 `config.json` 配置个人信息、社交图标、背景图和 RSS 源
- 附带 Cloudflare Worker RSS 代理，解决浏览器跨域读取 RSS 的问题

## 项目结构

```text
personal-homepage-ios26/
├── index.html
├── config.json
├── site.webmanifest
├── service-worker.js
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   ├── icons/
│   └── images/background.svg
├── functions/
│   └── rss-proxy.js
└── workers/rss-proxy-worker.js
```

## 本地预览

不要直接双击 `index.html`，因为浏览器可能禁止直接读取 `config.json`。

推荐在项目根目录执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 修改个人信息

编辑 `config.json`：

```json
"profile": {
  "name": "Devon Chan",
  "initials": "DC",
  "role": "Developer · Creator · Photographer",
  "intro": "这里是我的个人入口页...",
  "status": "Currently building personal projects",
  "avatar": ""
}
```

如果要使用头像，把头像放到 `assets/images/`，然后配置：

```json
"avatar": "assets/images/avatar.jpg"
```

## 配置社交媒体入口和图标

编辑 `socialLinks`：

```json
{
  "name": "GitHub",
  "description": "github.com/yourname",
  "url": "https://github.com/yourname",
  "icon": "assets/icons/github.svg"
}
```

图标可以是：

- 本地 SVG/PNG：`assets/icons/github.svg`
- 远程图片 URL：`https://example.com/icon.svg`
- SVG 字符串：`"icon": "<svg viewBox=\"0 0 24 24\" ...></svg>"`
- 独立 SVG 字符串字段：`"iconSvg": "<svg ...></svg>"`
- 如果不写 `icon`，可以用 `emoji` 字段替代

当前版本已内置 `Unsplash` 和 `微博` 两个社交入口示例，它们使用的就是 SVG 字符串形式，后续可以直接在 `config.json > socialLinks` 里替换。

## 配置背景图

编辑 `background`：

```json
"background": {
  "image": "assets/images/background.svg",
  "opacity": 0.36,
  "blur": 0,
  "position": "center",
  "size": "cover"
}
```

如果你想换成摄影背景，把图片放到：

```text
assets/images/background.jpg
```

然后改成：

```json
"image": "assets/images/background.webp",
"opacity": 0.28,
"blur": 0,
"position": "center",
"size": "cover"
```

## 配置 RSS 源

编辑 `rss.sources`：

```json
"sources": [
  {
    "name": "少数派",
    "category": "tech",
    "url": "https://sspai.com/feed"
  },
  {
    "name": "你的博客",
    "category": "life",
    "url": "https://your-blog.com/rss.xml"
  }
]
```

分类需要和 `rss.categories` 中的 `id` 对应。

## 关于 RSS 跨域问题

大多数 RSS 源不允许浏览器直接跨域读取。项目默认把 `config.json > rss.proxyEndpoint` 设置为 `/rss-proxy`，部署到 Cloudflare Pages 后会使用 `functions/rss-proxy.js` 作为同源代理读取真实 RSS。

`fallbackItems` 只作为兜底占位：只要任意一个配置的 RSS 源成功返回内容，页面就会展示真实 RSS；只有所有 RSS 源都失败或都没有解析到条目时，才会展示 `fallbackItems`。

本地如果使用 `python3 -m http.server` 预览，Cloudflare Pages Functions 不会运行，所以 `/rss-proxy` 会不可用，此时页面会进入 fallback 占位。这是本地静态服务器限制，不代表线上 Pages 部署后的真实 RSS 加载失败。

### 可选：独立部署 Worker

如果你不想使用 Pages Functions，也可以新建一个 Cloudflare Worker：

1. 新建一个 Cloudflare Worker
2. 把 `workers/rss-proxy-worker.js` 内容复制进去
3. 部署后得到一个地址，例如：

```text
https://rss-proxy.yourname.workers.dev/
```

4. 回到 `config.json`，设置：

```json
"proxyEndpoint": "https://rss-proxy.yourname.workers.dev/"
```

如果把 `proxyEndpoint` 留空，页面会尝试直接读取 RSS；由于跨域限制，很多源会读取失败，最终可能进入 fallback 占位。

## 部署到 Cloudflare Pages

把整个文件夹推送到 GitHub，然后在 Cloudflare Pages 里选择该仓库：

- Build command：留空
- Build output directory：`/`

也可以直接拖拽整个项目文件夹到 Pages 的上传部署页面。

## PWA 支持

项目已内置 PWA 基础能力：

- `site.webmanifest`：声明应用名称、启动路径、显示模式、主题色和安装图标。
- `service-worker.js`：缓存页面外壳、样式、脚本、配置和本地图片资源。
- `assets/js/app.js`：页面加载后自动注册 Service Worker。

本地调试时请通过 `http://localhost:8080` 访问；直接打开 `index.html` 时浏览器不会启用 Service Worker。部署到 HTTPS 域名后，浏览器会在满足条件时展示“安装应用”入口。

如果更新了 CSS/JS 文件版本号，请同步更新 `service-worker.js` 里的缓存清单；如果需要强制所有用户刷新缓存，可递增 `CACHE_VERSION`。

## 常用替换位置

- 个人名称：`config.json > profile.name`
- 网站标题：`config.json > site.title`
- 社交链接：`config.json > socialLinks`
- 背景图：`config.json > background.image`
- RSS 源：`config.json > rss.sources`
- RSS 代理：`config.json > rss.proxyEndpoint`



## 头像显示说明

`profile.avatar` 为空时，只显示 initials 生成的默认头像；配置头像图片路径后，只显示真实头像。当前版本已修复头像图片和默认头像同时出现的问题。

## v3 修复说明

- 修复未配置头像或头像路径失效时可能同时显示 broken image 与默认 initials 头像的问题。
- 现在头像区域只保留一个 `.avatar` 容器：`profile.avatar` 为空时显示 `profile.initials`；配置头像且加载成功后才替换为图片。

## v4 部署说明：config.json 加载失败的处理

如果页面显示 `config.json 加载失败`，通常不是代码问题，而是部署目录不对：`config.json` 没有和 `index.html` 部署在同一层。

### Cloudflare Pages 命令部署

请进入项目根目录后再执行：

```bash
cd personal-homepage-ios26
npx wrangler pages deploy . --project-name=你的Pages项目名
```

部署后直接访问：

```text
https://你的域名/config.json
```

如果这里返回 JSON，说明配置文件已经部署成功。

### Cloudflare Workers 静态资源部署

v4 已内置 `wrangler.jsonc`，如果你希望使用 Workers 静态资源方式，可以在项目根目录执行：

```bash
cd personal-homepage-ios26
npx wrangler deploy
```

注意：不要在解压后的上一级目录执行部署命令，否则可能只上传外层目录，导致 `/config.json` 访问不到。

## SVG 图标颜色说明

如果你的 `config.json` 中直接使用 SVG 字符串，页面会默认把 SVG 中写死的纯白/纯黑 `fill` 或 `stroke` 转换成 `currentColor`，这样在浅色、深色模式下都能保持清晰可见。

单个社交链接可额外配置：

```json
{
  "name": "GitHub",
  "url": "https://github.com/yourname",
  "icon": "<svg>...</svg>",
  "iconColor": "#172033",
  "iconBackground": "rgba(255,255,255,0.72)"
}
```

如果你希望保留 SVG 原本的品牌色，不希望自动改色，可以设置：

```json
{
  "preserveIconColor": true
}
```

## v8 图标颜色修复说明

如果你在 `config.json` 中使用阿里 Iconfont 或其他 SVG 字符串，很多 SVG 会写死 `fill="#ffffff"`。v8 会自动将纯白/纯黑 SVG 颜色归一为 `currentColor`，并在 CSS 层同时覆盖 SVG 根节点和子节点的 `fill/stroke`。浅色模式下图标底座也加入了轻微冷色对比，避免左侧图标和白色毛玻璃背景融合。

若你希望某个图标保留品牌色，可在对应 `socialLinks` 项中增加：

```json
"preserveIconColor": true
```

如果部署后仍看到旧样式，请强制刷新浏览器缓存：`Command + Shift + R`。
