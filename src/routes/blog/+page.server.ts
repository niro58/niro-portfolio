import { getPosts } from '$lib/query';

export async function load() {
	const posts = await getPosts();

	return {
		posts: posts.success ? posts.data : []
	};
}
