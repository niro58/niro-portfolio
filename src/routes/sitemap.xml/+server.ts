import { getSlugs } from '$lib/query';

export async function GET() {
	const lastUpdate = '2025-02-28';
	let routes: string[] = ['', '/blog', '/portfolio'];
	const blogSlugs = await getSlugs();
	if (blogSlugs.success) {
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
