import type { MetadataWithSlug } from '$lib/types';
import nodePath from 'node:path';

export async function GET({ url }) {
	const searchParams = url.searchParams;
	const limit = parseInt(searchParams.get('limit') || 'NaN');
	const page = parseInt(searchParams.get('page') || 'NaN');
	const category = searchParams.get('category');
	if (limit === null || page === null || isNaN(limit) || isNaN(page)) {
		return new Response('Missing limit or page', { status: 400 });
	}

	const data = import.meta.glob('./../../../posts/*.md');

	let posts: MetadataWithSlug[] = [];
	const postsRaw = Object.entries(data).slice(page * limit, (page + 1) * limit);
	for (const [path, module] of postsRaw) {
		const post: any = await module();
		const slug = nodePath.parse(path).name;
		if (!post.metadata) {
			continue;
		}
		if (category !== null && post.metadata.category.toLowerCase() !== category) {
			continue;
		}

		posts.push({
			...post.metadata,
			slug: slug
		});

		if (posts.length === limit) {
			break;
		}
	}

	return new Response(JSON.stringify(posts));
}
