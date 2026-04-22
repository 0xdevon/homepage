function decodeXml(str = "") {
    return str
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

function pickTag(block, tag) {
    const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
    const match = block.match(regex);
    return match ? decodeXml(match[1].trim()) : "";
}

function stripHtml(str = "") {
    return str.replace(/<[^>]+>/g, "").trim();
}

function parseFeedItems(xml, sourceName) {
    const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    const entryBlocks = xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
    const blocks = itemBlocks.length ? itemBlocks : entryBlocks;

    return blocks.slice(0, 5).map((block) => {
        const title = stripHtml(pickTag(block, "title"));
        const pubDate = stripHtml(
            pickTag(block, "pubDate") ||
            pickTag(block, "updated") ||
            pickTag(block, "published")
        );

        const atomLink = block.match(/<link[^>]*href="([^"]+)"[^>]*\/?>/i)?.[1] || "";
        const rssLink = stripHtml(pickTag(block, "link"));
        const link = atomLink || rssLink;

        return {
            source: sourceName,
            title,
            link,
            pubDate
        };
    }).filter((item) => item.title && item.link);
}

export async function onRequestGet() {
    const feeds = [
        { name: "OpenAI", url: "https://openai.com/news/rss.xml" },
        { name: "GitHub Blog", url: "https://github.blog/feed/" },
        { name: "Hacker News", url: "https://hnrss.org/frontpage" },
        { name: "少数派", url: "https://sspai.com/feed" },
        { name: "Unsplash Blog", url: "https://unsplash.com/blog/feed" }
    ];

    const results = await Promise.all(
        feeds.map(async (feed) => {
            try {
                const resp = await fetch(feed.url, {
                    headers: {
                        "user-agent": "Mozilla/5.0 RSS Aggregator"
                    }
                });

                if (!resp.ok) return [];
                const xml = await resp.text();
                return parseFeedItems(xml, feed.name);
            } catch {
                return [];
            }
        })
    );

    const items = results.flat().slice(0, 10);

    return new Response(JSON.stringify({ items }), {
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "cache-control": "public, max-age=900"
        }
    });
}