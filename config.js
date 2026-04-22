window.SITE_CONFIG = {
  defaultTheme: "light",
  defaultLanguage: "zh",

  profile: {
    name: {
      zh: "陈得锋",
      en: "Devon Chan"
    },
    bio: {
      zh: "Java 后端开发者 / 独立开发探索 / 摄影与用户体验爱好者",
      en: "Java backend developer / indie maker explorer / photography and UX enthusiast"
    },
    siteTitle: {
      zh: "陈得锋的主页",
      en: "Home | Devon Chan"
    }
  },

  backgroundImage: "./assets/bg.jpg",
  avatarImage: "./assets/avatar.JPG",

  links: [
    {
      label: { zh: "@0xdevon", en: "@0xdevon" },
      url: "https://github.com/0xdevon",
      icon: "github"
    },
    {
      label: { zh: "@devonchan_", en: "@devonchan_" },
      url: "https://x.com/devonchan_",
      icon: "x"
    },
    {
      label: { zh: "@FGBASE", en: "@FGBASE" },
      url: "https://weibo.com/u/5625035237",
      icon: "weibo"
    },
    {
      label: { zh: "@dévon", en: "@dévon" },
      url: "https://xhslink.com/m/4dL653NWlqB",
      icon: "xiaohongshu"
    },
    {
      label: { zh: "@devonchan", en: "@devonchan" },
      url: 'https://unsplash.com/@devonchan',
      icon: "unsplash"
    },  
    {
      label: { zh: "个人博客", en: "Blog" },
      url: "https://blog.devonchan.com",
      icon: "blog"
    }
  ],

  quickActions: [
    {
      label: { zh: "电话", en: "Phone" },
      url: "tel:+8617600000000",
      icon: "phone"
    },
    {
      label: { zh: "信息", en: "Message" },
      url: "sms:+8617600000000",
      icon: "message"
    },
    {
      label: { zh: "邮箱", en: "Email" },
      url: "mailto:i@devonchan.com",
      icon: "email"
    }
  ],

  uiText: {
    langToggle: {
      zh: "EN",
      en: "中"
    },
    themeToLight: {
      zh: "浅色",
      en: "Light mode"
    },
    themeToDark: {
      zh: "深色",
      en: "Dark mode"
    },
    installTip: {
      zh: "在 iPhone 上想获得更接近全屏、无浏览器黑条的效果：请在 Safari 中打开后，点击“分享” → “添加到主屏幕”。",
      en: "For a cleaner fullscreen look on iPhone, open this page in Safari, tap Share, then choose Add to Home Screen."
    },
    installClose: {
      zh: "忽略",
      en: "Dismiss"
    }
  },

  newsText: {
    title: {
      zh: "最新动态",
      en: "Latest News"
    },
    desc: {
      zh: "来自我订阅的 RSS 内容",
      en: "Curated from my RSS subscriptions"
    },
    loading: {
      zh: "正在加载订阅内容…",
      en: "Loading feeds..."
    },
    failed: {
      zh: "订阅加载失败",
      en: "Failed to load feeds"
    }
  },

  rssFeeds: [
    { name: "OpenAI", url: "https://openai.com/news/rss.xml" },
    { name: "GitHub Blog", url: "https://github.blog/feed/" },
    { name: "Hacker News", url: "https://hnrss.org/frontpage" },
    { name: "少数派", url: "https://sspai.com/feed" },
    { name: "Unsplash Blog", url: "https://unsplash.com/blog/feed" }
  ]
};
