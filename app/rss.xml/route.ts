
import { getAllPostsDetailed } from "@/lib/mdx";

const SITE_URL = "https://cyvanta.com";

export async function GET() {
  const posts = await getAllPostsDetailed();

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Cyvanta | Red Team Operations</title>
    <link>${SITE_URL}</link>
    <description>Advanced security research, offensive operations, and red team insights.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map((post) => {
        const url = `${SITE_URL}/blog/${post.slug}`;
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : ""}</pubDate>
      <description><![CDATA[${post.summary || ""}]]></description>
      ${post.tags?.map((tag) => `<category><![CDATA[${tag}]]></category>`).join("") || ""}
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
