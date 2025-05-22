import { DefaultBlogLimit } from '$config/data.js';
import { getPosts } from '$lib/query';

export async function load({ url }) {
	const posts = await getPosts(DefaultBlogLimit, 0);
	return {
		page: posts,
		posts: posts.success ? posts.data : []
	};
}
