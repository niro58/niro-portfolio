import type { MetadataWithSlug } from '$lib/types';
import nodePath from 'node:path';

export async function GET({ url }) {
	const searchParams = url.searchParams;
	const category = searchParams.get('category');

	const data = import.meta.glob('./../../../posts/*.md');

	let posts: MetadataWithSlug[] = [];
	for (const [path, module] of Object.entries(data)) {
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
	}

	posts = posts.sort((a, b) => {
		const dateA = new Date(a.date).getTime();
		const dateB = new Date(b.date).getTime();
		return dateB - dateA;
	});

	return new Response(JSON.stringify(posts));
}
