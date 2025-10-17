import { appPages } from '$config/pages';
import { getBlogPosts } from '../../lib/server/content';

export async function GET() {
	const lastUpdate = '2025-16-11';
	let routes: string[] = [
		appPages.root.path().replace("/", ""),
		appPages.blog.path(),
		appPages.portfolio.path(),
		appPages.tools.path()
	];

	const blogSlugs = await getBlogPosts();
	if (blogSlugs.type === 'SUCCESS') {
		blogSlugs.data.map((slug) => {
			routes.push(`/blog/${slug}`);
		});
	}

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			${routes
				.map(
					(route) => `
				<url>
					<loc>https://www.nichita-r.com${route}</loc>
					<priority>0.8</priority>
					<changefreq>daily</changefreq>
					<lastmod>${lastUpdate}</lastmod>
				</url>
				`
				)
				.join('')}
           
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
