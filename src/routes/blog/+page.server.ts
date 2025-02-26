import { getPosts } from '$lib/query';

export async function load() {
	const pageSize = 9;
	const posts = await getPosts(pageSize, 0);

	return {
		pageSize: pageSize,
		posts: posts.success ? posts.data : []
	};
}
