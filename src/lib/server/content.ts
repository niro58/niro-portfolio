import type { ResultFetch } from '$lib/types/common';
import type { BlogPost } from '$lib/types/content';
import nodePath from 'node:path';


export async function getBlogPosts(params: {
	limit?: number,
	offset?: number,
	category?: string
}): Promise<ResultFetch<BlogPost[]>> {
	try {
		const data = import.meta.glob('../../content/posts/*.md');

		let posts: BlogPost[] = [];
		for (const [path, module] of Object.entries(data)) {
			const post: any = await module();
			const slug = nodePath.parse(path).name;
			if (!post.metadata) {
				continue;
			}
			if (params.category && post.metadata.category.toLowerCase() !== params.category) {

				continue;
			}

			posts.push({
				...post.metadata,
				slug: slug
			});
		}

		posts = posts.sort((a, b) => {
			const dateA = new Date(a.createdAt).getTime();
			const dateB = new Date(b.createdAt).getTime();
			return dateB - dateA;
		});
		if (params.offset !== undefined && params.limit !== undefined) {
			posts = posts.slice(params.offset, params.offset + params.limit);
		} else if (params.limit !== undefined) {

			posts = posts.slice(0, params.limit);
		}

		return {
			type: "SUCCESS",
			data: posts
		};
	} catch (err) {
		return {
			type: "FAILURE",
			error: (err as Error).message
		}
	}
}