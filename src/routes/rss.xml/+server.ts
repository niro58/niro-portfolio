import { AppConfig } from "$config/app";
import { getBlogPosts } from "$lib/server/content";
import { escapeXml, formatXmlDate } from "$lib/utils/common";


export async function GET() {
    const result = await getBlogPosts();

    if (result.type === 'FAILURE') {
        return new Response("Failed to fetch", { status: 500 })
    }

    const posts = result.data;

    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const rssItems = posts.map((post) => {
        const postUrl = `${AppConfig.siteUrl}/blog/${post.slug!}`;
        const title = escapeXml(post.title);
        const description = escapeXml(post.excerpt || `${post.category ? `Kategorie: ${post.category}. ` : ''}${post.readTime ? `Čas čtení: ${post.readTime} min.` : ''}`);
        const pubDate = formatXmlDate(post.createdAt);
        const category = post.category ? `<category>${escapeXml(post.category)}</category>` : '';

        return `
        <item>
            <title>${title}</title>
            <description>${description}</description>
            <link>${postUrl}</link>
            <guid isPermaLink="true">${postUrl}</guid>
            <pubDate>${pubDate}</pubDate>
            ${category}
        </item>`;
    }).join('');

    const lastBuildDate = posts.length > 0 ? formatXmlDate(posts[0].createdAt) : formatXmlDate(new Date().toISOString());

    const rssXml = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>${escapeXml(AppConfig.rssName)}</title>
            <description>${escapeXml(AppConfig.rssDescription)}</description>
            <link>${AppConfig.siteUrl}</link>
            <atom:link href="${AppConfig.siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
            <language>cs</language> <lastBuildDate>${lastBuildDate}</lastBuildDate>
            <copyright>Copyright ${new Date().getFullYear()} Lucky Autoservis</copyright>
            ${rssItems}
        </channel>
    </rss>`;

    return new Response(rssXml, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}