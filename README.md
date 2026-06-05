# Personal Homepage (iOS26 Style)

[English](README.md) | [中文](README.zh-CN.md)

A minimalist personal homepage template with:

- A personal profile card on the left and an RSS feed on the right for desktop
- Automatic single-column layout on mobile
- Dark / light mode switching
- PWA installation and basic offline access
- Frosted glass, rounded cards, and a light color palette
- Personal information, social icons, background image, and RSS sources configured through `config.json`
- A bundled Cloudflare Worker RSS proxy to solve browser CORS issues when reading RSS feeds

## Project Structure

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

## Local Preview

Do not double-click `index.html` directly, because the browser may block direct reads of `config.json`.

Run this from the project root instead:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Updating Personal Information

Edit `config.json`:

```json
"profile": {
  "name": "Devon Chan",
  "initials": "DC",
  "role": "Developer · Creator · Photographer",
  "status": "Currently building personal projects",
  "avatar": ""
}
```

To use an avatar, place the image in `assets/images/`, then configure:

```json
"avatar": "assets/images/avatar.jpg"
```

## Configuring Social Links and Icons

Edit `socialLinks`:

```json
{
  "name": "GitHub",
  "description": "github.com/yourname",
  "url": "https://github.com/yourname",
  "icon": "assets/icons/github.svg"
}
```

Icons can be:

- Local SVG/PNG: `assets/icons/github.svg`
- Remote image URL: `https://example.com/icon.svg`
- SVG string: `"icon": "<svg viewBox=\"0 0 24 24\" ...></svg>"`
- Separate SVG string field: `"iconSvg": "<svg ...></svg>"`
- If `icon` is omitted, the `emoji` field can be used instead

The current version includes two example social links, `Unsplash` and `微博`, both using SVG strings. You can replace them directly in `config.json > socialLinks`.

## Configuring the Background Image

Edit `background`:

```json
"background": {
  "image": "assets/images/background.svg",
  "opacity": 0.36,
  "blur": 0,
  "position": "center",
  "size": "cover"
}
```

If you want to use a photography background, place the image at:

```text
assets/images/background.jpg
```

Then update it to:

```json
"image": "assets/images/background.webp",
"opacity": 0.28,
"blur": 0,
"position": "center",
"size": "cover"
```

## Configuring RSS Sources

Edit `rss.sources`:

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

Each category must match an `id` in `rss.categories`.

## About RSS CORS Issues

Most RSS sources do not allow browsers to read them directly across origins. By default, the project sets `config.json > rss.proxyEndpoint` to `/rss-proxy`. After deployment to Cloudflare Pages, `functions/rss-proxy.js` will be used as a same-origin proxy to read the real RSS feeds.

`fallbackItems` are only fallback placeholders. As long as any configured RSS source returns content successfully, the page will show real RSS content. `fallbackItems` are shown only when all RSS sources fail or no entries can be parsed.

If you preview locally with `python3 -m http.server`, Cloudflare Pages Functions will not run, so `/rss-proxy` will be unavailable and the page will fall back to placeholder items. This is a limitation of the local static server and does not mean RSS loading will fail after deployment to Pages.

### Optional: Deploy a Standalone Worker

If you do not want to use Pages Functions, you can create a Cloudflare Worker instead:

1. Create a new Cloudflare Worker
2. Copy the contents of `workers/rss-proxy-worker.js` into it
3. Deploy it and obtain a URL, for example:

```text
https://rss-proxy.yourname.workers.dev/
```

4. Return to `config.json` and set:

```json
"proxyEndpoint": "https://rss-proxy.yourname.workers.dev/"
```

If `proxyEndpoint` is left empty, the page will try to read RSS feeds directly. Because of CORS restrictions, many sources may fail and the page may eventually show fallback placeholders.

## Deploying to Cloudflare Pages

Push the entire folder to GitHub, then select that repository in Cloudflare Pages:

- Build command: leave empty
- Build output directory: `/`

You can also drag and drop the entire project folder into the Pages upload deployment page.

## PWA Support

The project includes basic PWA support:

- `site.webmanifest`: declares the app name, start URL, display mode, theme color, and install icons.
- `service-worker.js`: caches the page shell, styles, scripts, config, and local image assets.
- `assets/js/app.js`: automatically registers the Service Worker after the page loads.

For local debugging, visit `http://localhost:8080`; the browser will not enable the Service Worker when opening `index.html` directly. After deployment to an HTTPS domain, the browser will show the "Install app" entry when the requirements are met.

If you update CSS/JS file versions, also update the cache list in `service-worker.js`. To force all users to refresh cached assets, increment `CACHE_VERSION`.

## Common Replacement Locations

- Personal name: `config.json > profile.name`
- Website title: `config.json > site.title`
- Social links: `config.json > socialLinks`
- Background image: `config.json > background.image`
- RSS sources: `config.json > rss.sources`
- RSS proxy: `config.json > rss.proxyEndpoint`

## Avatar Display Notes

When `profile.avatar` is empty, only the default avatar generated from initials is shown. After an avatar image path is configured, only the real avatar is shown. The current version fixes the issue where the avatar image and default avatar could appear at the same time.

## v3 Fix Notes

- Fixed an issue where a broken image and the default initials avatar could appear together when no avatar was configured or when the avatar path was invalid.
- The avatar area now keeps only one `.avatar` container: when `profile.avatar` is empty, it shows `profile.initials`; after an avatar is configured and loads successfully, it is replaced with the image.

## v4 Deployment Notes: Handling config.json Loading Failures

If the page shows `config.json 加载失败`, it is usually not a code issue. It usually means the deployment directory is wrong: `config.json` was not deployed at the same level as `index.html`.

### Cloudflare Pages Command Deployment

Enter the project root before running:

```bash
cd personal-homepage-ios26
npx wrangler pages deploy . --project-name=你的Pages项目名
```

After deployment, visit:

```text
https://你的域名/config.json
```

If this returns JSON, the configuration file has been deployed successfully.

### Cloudflare Workers Static Assets Deployment

v4 includes `wrangler.jsonc`. If you want to use Workers static assets, run this from the project root:

```bash
cd personal-homepage-ios26
npx wrangler deploy
```

Note: do not run the deployment command from the parent directory of the extracted folder. Otherwise, only the outer directory may be uploaded and `/config.json` may become inaccessible.

## SVG Icon Color Notes

If your `config.json` directly uses SVG strings, the page automatically converts hard-coded pure white / pure black `fill` or `stroke` values in the SVG to `currentColor`, keeping icons readable in both light and dark mode.

Each social link can also configure:

```json
{
  "name": "GitHub",
  "url": "https://github.com/yourname",
  "icon": "<svg>...</svg>",
  "iconColor": "#172033",
  "iconBackground": "rgba(255,255,255,0.72)"
}
```

If you want to preserve the SVG's original brand colors and disable automatic recoloring, set:

```json
{
  "preserveIconColor": true
}
```

## v8 Icon Color Fix Notes

If you use Alibaba Iconfont or other SVG strings in `config.json`, many SVGs may hard-code `fill="#ffffff"`. v8 automatically normalizes pure white / pure black SVG colors to `currentColor`, and the CSS layer overrides `fill/stroke` on both the SVG root and child nodes. In light mode, the icon base also uses a subtle cool-toned contrast so left-side icons do not blend into the white frosted-glass background.

To preserve brand colors for a specific icon, add this to the corresponding `socialLinks` item:

```json
"preserveIconColor": true
```

If you still see old styles after deployment, force-refresh the browser cache with `Command + Shift + R`.
