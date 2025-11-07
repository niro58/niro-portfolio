
import { getBlogPosts } from '$lib/server/content.js';

export async function load() {
	const posts = await getBlogPosts({
		limit: 3
	});

	return {
		posts: posts
	};
}
