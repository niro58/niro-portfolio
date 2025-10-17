import { AppConfig } from "$config/app";
import { getBlogPosts } from "$lib/server/content";

export async function load() {
	const posts = await getBlogPosts();
	return {
		page: posts,
		posts: posts
	};
}
