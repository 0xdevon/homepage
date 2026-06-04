const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const socialGrid = document.getElementById('socialGrid');
const feedTabs = document.getElementById('feedTabs');
const rssList = document.getElementById('rssList');

let allRssItems = [];
let activeFilter = 'all';
let rssPageSize = 6;
let rssVisibleCounts = {};
const themeIcons = {
  light: `
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path d="M269.696 205.76l-12.224-12.288a43.008 43.008 0 0 0-61.12 0 43.776 43.776 0 0 0 0 61.632l12.288 12.352a43.008 43.008 0 0 0 61.056 0 43.776 43.776 0 0 0 0-61.696zM145.088 470.848h-40a41.088 41.088 0 0 0 0 82.24h40a41.088 41.088 0 0 0 0-82.24zM512 64a40.704 40.704 0 0 0-40.704 40.704v37.76a40.704 40.704 0 0 0 81.408 0v-37.76A40.704 40.704 0 0 0 512 64z m315.648 129.472a43.008 43.008 0 0 0-61.12 0l-14.272 14.336a40.896 40.896 0 0 0 0 57.6c16 16.064 41.792 16.832 58.624 1.6l15.104-13.632a41.408 41.408 0 0 0 1.664-59.904z m-75.392 622.72l16.32 16.384a40.192 40.192 0 0 0 57.024 0 40.832 40.832 0 0 0 0-57.536l-16.256-16.448a40.192 40.192 0 0 0-57.088 0 40.896 40.896 0 0 0 0 57.6z m126.656-263.104h40a41.088 41.088 0 0 0 0-82.24h-40a41.088 41.088 0 0 0 0 82.24zM512 960a40.704 40.704 0 0 0 40.704-40.704v-37.76a40.704 40.704 0 0 0-81.408 0v37.76c0 22.464 18.24 40.704 40.704 40.704z m-315.648-129.536a43.008 43.008 0 0 0 61.12 0l14.272-14.336a40.896 40.896 0 0 0 0-57.536 42.432 42.432 0 0 0-58.56-1.664l-15.104 13.696a41.408 41.408 0 0 0-1.728 59.84zM512 265.344c-134.4 0-244.352 111.04-244.352 246.592 0 135.68 109.952 246.592 244.352 246.592S756.48 647.552 756.48 512c0-135.552-109.952-246.592-244.416-246.592" fill="#2c2c2c"></path>
    </svg>
  `
};

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && typeof text === 'string') el.textContent = text;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function stripHtml(value = '') {
  return String(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}


function isInlineSvg(value = '') {
  return typeof value === 'string' && value.trim().startsWith('<svg');
}

function isPlainColorValue(value = '') {
  const color = String(value).trim().toLowerCase().replace(/\s+/g, '');
  return [
    '#fff',
    '#ffffff',
    'white',
    'rgb(255,255,255)',
    'rgba(255,255,255,1)',
    '#000',
    '#000000',
    'black',
    'rgb(0,0,0)',
    'rgba(0,0,0,1)'
  ].includes(color);
}

function normalizeStyleColor(value = '') {
  return String(value)
    .replace(/(fill\s*:\s*)(#fff(?:fff)?|white|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)|rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*1\s*\)|#000(?:000)?|black|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*1\s*\))/gi, '$1currentColor')
    .replace(/(stroke\s*:\s*)(#fff(?:fff)?|white|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)|rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*1\s*\)|#000(?:000)?|black|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*1\s*\))/gi, '$1currentColor');
}

function sanitizeInlineSvg(value = '', options = {}) {
  if (!isInlineSvg(value)) return '';

  const { normalizeColor = true } = options;
  const template = document.createElement('template');
  template.innerHTML = value.trim();
  const svg = template.content.querySelector('svg');
  if (!svg) return '';

  svg.querySelectorAll('*').forEach(node => {
    const tagName = node.localName.toLowerCase();
    if (['script', 'foreignobject', 'iframe', 'object', 'embed'].includes(tagName)) {
      node.remove();
    }
  });

  [svg, ...svg.querySelectorAll('*')].forEach(node => {
    [...node.attributes].forEach(attr => {
      const name = attr.name.toLowerCase();
      const val = attr.value.trim();
      const lowerVal = val.toLowerCase();

      if (name.startsWith('on') || lowerVal.startsWith('javascript:')) {
        node.removeAttribute(attr.name);
        return;
      }

      // 很多 iconfont/阿里图标导出的 SVG 会写死 fill="#ffffff"，
      // 在浅色毛玻璃卡片里会和背景融合。默认把纯白/纯黑改成 currentColor，
      // 由 CSS 统一控制为深浅模式下都清晰可见的颜色。
      if (normalizeColor && ['fill', 'stroke'].includes(name) && lowerVal !== 'none' && isPlainColorValue(val)) {
        node.setAttribute(attr.name, 'currentColor');
      }

      if (normalizeColor && name === 'style') {
        const normalizedStyle = normalizeStyleColor(val);
        if (normalizedStyle !== val) node.setAttribute(attr.name, normalizedStyle);
      }
    });
  });

  // 很多图标库导出的 SVG 会自带 class="icon" / width / height。
  // 如果不清理，内层 SVG 会命中页面的 .icon 卡片样式，导致图标尺寸或布局异常。
  svg.removeAttribute('class');
  svg.removeAttribute('style');
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('data-normalized-icon', normalizeColor ? 'true' : 'false');
  svg.setAttribute('fill', svg.getAttribute('fill') || 'currentColor');
  return svg.outerHTML;
}

function renderIcon(item = {}) {
  const iconValue = item.iconSvg || item.icon;
  if (isInlineSvg(iconValue)) {
    return sanitizeInlineSvg(iconValue, { normalizeColor: item.preserveIconColor !== true });
  }
  if (iconValue) {
    return `<img src="${escapeHtml(iconValue)}" alt="" loading="lazy" />`;
  }
  return escapeHtml(item.emoji || '↗');
}

function buildSocialStyle(item = {}) {
  const styles = [];
  if (item.iconColor) {
    styles.push(`--social-icon-color:${escapeHtml(item.iconColor)}`);
  }
  if (item.iconBackground) {
    styles.push(`--social-icon-bg:${escapeHtml(item.iconBackground)}`);
  }
  return styles.length ? ` style="${styles.join(';')}"` : '';
}

function formatDate(value) {
  if (!value) return '';
  if (/ago|today|yesterday|刚刚|小时前|分钟前|昨天|今天/i.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  if (days < 7) return `${days} 天前`;

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const isDark = theme === 'dark';
  if (isDark) {
    themeIcon.removeAttribute('class');
    themeIcon.textContent = '☾';
  } else {
    themeIcon.className = 'theme-icon';
    themeIcon.innerHTML = themeIcons.light;
  }
  themeText.textContent = isDark ? '深色模式' : '浅色模式';
  document.querySelector('meta[name="theme-color"]').setAttribute('content', isDark ? '#0d1118' : '#f6f7fb');
}

function initTheme(defaultTheme = 'system') {
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (defaultTheme === 'system' ? (systemDark ? 'dark' : 'light') : defaultTheme);
  applyTheme(initialTheme === 'dark' ? 'dark' : 'light');

  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

function applyBackground(config) {
  if (!config?.image) return;
  const backgroundUrl = new URL(config.image, document.baseURI);
  backgroundUrl.searchParams.set('v', config.version || Date.now());
  root.style.setProperty('--background-image', `url("${backgroundUrl.toString()}")`);
  root.style.setProperty('--background-opacity', String(config.opacity ?? 0.36));
  root.style.setProperty('--background-blur', `${config.blur ?? 0}px`);
  root.style.setProperty('--background-position', config.position || 'center');
  root.style.setProperty('--background-size', config.size || 'cover');
}

function renderProfile(config) {
  const profile = config.profile || {};
  const name = profile.name || 'Devon Chan';
  const initials = String(profile.initials || 'DC').trim() || 'DC';
  const avatarUrl = String(profile.avatar || '').trim();
  const avatar = document.getElementById('profileAvatar');

  setText('profileName', name);
  setText('profileRole', profile.role || 'Developer · Creator');
  setText('profileStatus', profile.status || 'Currently online');

  // 只保留一个头像容器：未配置头像时显示 initials；配置头像且加载成功时显示图片。
  // 这样可以避免空 src / 失效路径导致浏览器显示 broken image + 默认头像两个元素。
  avatar.classList.remove('has-image');
  avatar.innerHTML = escapeHtml(initials);

  if (!avatarUrl) return;

  const img = new Image();
  img.alt = `${name} avatar`;
  img.decoding = 'async';
  img.loading = 'eager';
  img.onload = () => {
    avatar.innerHTML = '';
    avatar.classList.add('has-image');
    avatar.appendChild(img);
  };
  img.onerror = () => {
    avatar.classList.remove('has-image');
    avatar.innerHTML = escapeHtml(initials);
  };
  img.src = avatarUrl;
}

function renderHero(config) {
  setText('heroEyebrow', config.hero?.eyebrow || '✦ Personal Homepage');
  setText('heroTitle', config.hero?.title || 'Personal Homepage');
  setText('heroDescription', config.hero?.description || '');
}

function renderSocialLinks(links = []) {
  socialGrid.innerHTML = links.map(item => {
    const url = escapeHtml(item.url || '#');
    const name = escapeHtml(item.name || 'Link');
    const description = escapeHtml(item.description || item.url || '');
    const icon = renderIcon(item);
    const style = buildSocialStyle(item);

    const target = url.startsWith('mailto:') || url.startsWith('tel:') ? '' : 'target="_blank" rel="noreferrer"';
    return `
      <a class="social-card" href="${url}" ${target}${style}>
        <span class="icon">${icon}</span>
        <span><strong>${name}</strong><span class="desc">${description}</span></span>
      </a>
    `;
  }).join('');
}

function renderTabs(categories = []) {
  const safeCategories = categories.length ? categories : [{ id: 'all', name: '全部' }];
  feedTabs.innerHTML = safeCategories.map((cat, index) => `
    <button class="tab ${index === 0 ? 'active' : ''}" data-filter="${escapeHtml(cat.id)}" type="button">${escapeHtml(cat.name)}</button>
  `).join('');

  activeFilter = safeCategories[0]?.id || 'all';
  feedTabs.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      feedTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      resetRssPagination(activeFilter);
      rssList.scrollTop = 0;
      renderRssItems(allRssItems);
    });
  });
}

function getXmlText(node, tagName) {
  return node.getElementsByTagName(tagName)[0]?.textContent || '';
}

function getXmlLink(node) {
  const links = [...node.getElementsByTagName('link')];
  const hrefLink = links.find(link => link.hasAttribute('href'));
  return hrefLink?.getAttribute('href') || links[0]?.textContent || '';
}

function normalizeItem(item, source = {}) {
  return {
    title: stripHtml(item.title || getXmlText(item, 'title') || 'Untitled'),
    link: item.link || getXmlLink(item) || getXmlText(item, 'guid') || '#',
    source: item.source || source.name || 'RSS',
    category: item.category || source.category || 'all',
    publishedAt: item.publishedAt || item.pubDate || item.isoDate || getXmlText(item, 'pubDate') || getXmlText(item, 'updated') || '',
    summary: stripHtml(item.summary || item.contentSnippet || item.description || getXmlText(item, 'description') || '')
  };
}

function getVisibleRssItems(items = []) {
  return items.filter(item => activeFilter === 'all' || item.category === activeFilter);
}

function resetRssPagination(filter = activeFilter) {
  rssVisibleCounts[filter] = rssPageSize;
}

function hasMoreRssItems(items = allRssItems) {
  const visible = getVisibleRssItems(items);
  const count = rssVisibleCounts[activeFilter] || rssPageSize;
  return count < visible.length;
}

function loadMoreRssItems() {
  if (!hasMoreRssItems()) return;
  rssVisibleCounts[activeFilter] = (rssVisibleCounts[activeFilter] || rssPageSize) + rssPageSize;
  renderRssItems(allRssItems);
}

function maybeLoadMoreRssItems() {
  if (!hasMoreRssItems()) return;

  const listCanScroll = rssList.scrollHeight > rssList.clientHeight + 4;
  const nearListBottom = listCanScroll && rssList.scrollTop + rssList.clientHeight >= rssList.scrollHeight - 140;
  const rect = rssList.getBoundingClientRect();
  const nearPageBottom = !listCanScroll && rect.bottom <= window.innerHeight + 180;

  if (nearListBottom || nearPageBottom) {
    loadMoreRssItems();
  }
}

function setupRssLazyLoading() {
  rssList.addEventListener('scroll', maybeLoadMoreRssItems, { passive: true });
  window.addEventListener('scroll', maybeLoadMoreRssItems, { passive: true });
  window.addEventListener('resize', maybeLoadMoreRssItems);
}

function initPwa() {
  if (!('serviceWorker' in navigator) || window.location.protocol === 'file:') return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(error => {
      console.warn('Service worker registration failed:', error);
    });
  });
}

function renderRssItems(items = []) {
  const visible = items.filter(item => activeFilter === 'all' || item.category === activeFilter);
  const visibleCount = rssVisibleCounts[activeFilter] || rssPageSize;
  const renderedItems = visible.slice(0, visibleCount);
  const hasMore = visibleCount < visible.length;

  if (!visible.length) {
    rssList.innerHTML = '<div class="empty-state">暂无可显示的 RSS 内容。请检查 config.json 中的 RSS 源或代理配置。</div>';
    return;
  }

  const itemHtml = renderedItems.map(item => {
    const link = escapeHtml(item.link || '#');
    const source = escapeHtml(item.source || 'RSS');
    const category = escapeHtml(item.category || 'all');
    const title = escapeHtml(item.title || 'Untitled');
    const summary = escapeHtml(item.summary || '');
    const date = escapeHtml(formatDate(item.publishedAt));
    return `
      <a class="rss-item" href="${link}" target="_blank" rel="noreferrer" data-type="${category}">
        <div class="rss-meta"><span class="rss-source">${source}</span><span>·</span><span>${date}</span></div>
        <h4>${title}</h4>
        ${summary ? `<p>${summary}</p>` : ''}
      </a>
    `;
  }).join('');

  rssList.innerHTML = `
    ${itemHtml}
    ${hasMore ? '<button class="rss-more" type="button">加载更多</button>' : ''}
  `;

  rssList.querySelector('.rss-more')?.addEventListener('click', loadMoreRssItems);
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function parseRssXml(xmlText, source) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  const rssItems = [...doc.getElementsByTagName('item')];
  const atomItems = [...doc.getElementsByTagName('entry')];

  if (rssItems.length) {
    return rssItems.map(item => normalizeItem(item, source));
  }

  return atomItems.map(entry => {
    return {
      title: stripHtml(getXmlText(entry, 'title') || 'Untitled'),
      link: getXmlLink(entry) || '#',
      source: source.name || 'RSS',
      category: source.category || 'all',
      publishedAt: getXmlText(entry, 'published') || getXmlText(entry, 'updated') || '',
      summary: stripHtml(getXmlText(entry, 'summary') || getXmlText(entry, 'content') || '')
    };
  });
}

function buildFeedUrl(sourceUrl, proxyEndpoint) {
  if (!proxyEndpoint) return sourceUrl;
  const separator = proxyEndpoint.includes('?') ? '&' : '?';
  return `${proxyEndpoint}${separator}url=${encodeURIComponent(sourceUrl)}`;
}

async function loadRss(config) {
  const rssConfig = config.rss || {};
  const sources = rssConfig.sources || [];
  const timeoutMs = rssConfig.timeoutMs || 9000;
  const proxyEndpoint = rssConfig.proxyEndpoint || '';
  rssPageSize = Math.max(1, Number(rssConfig.pageSize || 6));

  if (!sources.length) {
    allRssItems = [];
    rssVisibleCounts = {};
    resetRssPagination(activeFilter);
    renderRssItems(allRssItems);
    return;
  }

  const results = await Promise.allSettled(sources.map(async source => {
    const url = buildFeedUrl(source.url, proxyEndpoint);
    const text = await fetchWithTimeout(url, timeoutMs);
    let items = [];

    // Worker 代理默认返回 JSON，静态直连则返回 XML。
    let parsedAsJson = false;
    try {
      const json = JSON.parse(text);
      parsedAsJson = true;
      if (Array.isArray(json.items)) {
        items = json.items.map(item => normalizeItem({ ...item, category: item.category || source.category, source: item.source || source.name }, source));
      } else if (json.error) {
        throw new Error(json.error);
      } else {
        throw new Error('RSS proxy returned an unexpected JSON response');
      }
    } catch (error) {
      if (parsedAsJson) throw error;
      items = parseRssXml(text, source);
    }

    if (!items.length) {
      throw new Error(`${source.name || source.url} returned no RSS items`);
    }

    return items.slice(0, rssConfig.maxItems || 36);
  }));

  const fetchedItems = results
    .filter(result => result.status === 'fulfilled')
    .flatMap(result => result.value)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const configuredCategories = new Set(sources.map(source => source.category).filter(Boolean));
  const loadedCategories = new Set(fetchedItems.map(item => item.category));
  const missingCategories = [...configuredCategories].filter(category => !loadedCategories.has(category));
  const fallbackItems = (rssConfig.fallbackItems || []).map(item => normalizeItem(item));
  const categoryFallbackItems = fallbackItems.filter(item => missingCategories.includes(item.category));

  if (categoryFallbackItems.length) {
    console.warn('Some RSS categories failed or returned no items. Rendering category fallbackItems.', missingCategories, results);
  }

  allRssItems = [...fetchedItems, ...categoryFallbackItems];

  if (!allRssItems.length) {
    console.warn('All RSS sources failed. Rendering fallbackItems as placeholders.', results);
    allRssItems = fallbackItems;
  }

  rssVisibleCounts = {};
  resetRssPagination(activeFilter);
  renderRssItems(allRssItems);
}

async function loadConfig() {
  const candidates = [
    new URL('config.json', document.baseURI).toString(),
    new URL('/config.json', window.location.origin).toString()
  ];

  const tried = [];
  for (const url of [...new Set(candidates)]) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      tried.push(`${url} -> HTTP ${res.status}`);
      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();
      if (!contentType.includes('application/json') && !text.trim().startsWith('{')) {
        tried.push(`${url} -> 返回内容不是 JSON，可能被静态站点回退到了 index.html`);
        continue;
      }
      return JSON.parse(text);
    } catch (error) {
      tried.push(`${url} -> ${error.message}`);
    }
  }

  throw new Error(`无法加载 config.json。已尝试：${tried.join('；')}`);
}

async function init() {
  let config;
  try {
    config = await loadConfig();
  } catch (error) {
    rssList.innerHTML = `
      <div class="empty-state">
        <strong>config.json 加载失败</strong><br />
        请确认部署时 <code>config.json</code> 和 <code>index.html</code> 在同一层目录。<br />
        如果使用 Cloudflare Pages 命令部署，请先 <code>cd personal-homepage-ios26</code> 后再执行部署命令。
      </div>
    `;
    console.error(error);
    return;
  }

  document.title = config.site?.title || 'Personal Homepage';
  root.lang = config.site?.language || 'zh-CN';
  initTheme(config.site?.defaultTheme || 'system');
  applyBackground(config.background);
  renderProfile(config);
  renderHero(config);
  renderSocialLinks(config.socialLinks || []);
  setText('rssTitle', config.rss?.title || 'RSS News');
  setText('rssDescription', config.rss?.description || '');
  setText('footerText', config.site?.footer || '');
  renderTabs(config.rss?.categories || []);
  setupRssLazyLoading();
  loadRss(config);
}

initPwa();
init();
