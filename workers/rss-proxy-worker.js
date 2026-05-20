/**
 * Cloudflare Worker RSS proxy for personal-homepage-ios26.
 * Deploy this worker, then set config.json:
 * "proxyEndpoint": "https://your-worker-name.your-subdomain.workers.dev/"
 */
export default {
  async fetch(request) {
    const requestUrl = new URL(request.url);
    const feedUrl = requestUrl.searchParams.get('url');

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=900'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (!feedUrl) {
      return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    try {
      const upstream = await fetch(feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 RSS Reader'
        },
        cf: {
          cacheTtl: 900,
          cacheEverything: true
        }
      });

      if (!upstream.ok) {
        return new Response(JSON.stringify({ error: `Upstream HTTP ${upstream.status}` }), {
          status: upstream.status,
          headers: corsHeaders
        });
      }

      const xml = await upstream.text();
      const items = parseFeed(xml).slice(0, 20);
      return new Response(JSON.stringify({ items }), { headers: corsHeaders });
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};

function getText(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return decodeXml(stripCdata(match?.[1] || '')).trim();
}

function getAtomLink(block) {
  const hrefMatch = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i);
  return decodeXml(hrefMatch?.[1] || '');
}

function stripCdata(value) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'")
    .replaceAll('&apos;', "'");
}

function parseFeed(xml) {
  const channelTitle = getText(xml, 'title') || 'RSS';
  const rssBlocks = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].map(m => m[0]);
  const atomBlocks = [...xml.matchAll(/<entry[\s\S]*?<\/entry>/gi)].map(m => m[0]);
  const blocks = rssBlocks.length ? rssBlocks : atomBlocks;

  return blocks.map(block => {
    const title = getText(block, 'title') || 'Untitled';
    const link = getText(block, 'link') || getAtomLink(block) || '#';
    const publishedAt = getText(block, 'pubDate') || getText(block, 'published') || getText(block, 'updated');
    const summary = stripHtml(getText(block, 'description') || getText(block, 'summary') || getText(block, 'content'));

    return {
      title,
      link,
      publishedAt,
      summary,
      source: channelTitle
    };
  });
}
