import type { ResultFetch } from '$lib/types/common';
import type { BlogPost } from '$lib/types/content';
import nodePath from 'node:path';


export async function getBlogPosts(limit?: number, offset?: number, category?: string): Promise<ResultFetch<BlogPost[]>> {
	try {
		const data = import.meta.glob('../../content/posts/*.md');

		let posts: BlogPost[] = [];
		for (const [path, module] of Object.entries(data)) {
			const post: any = await module();
			const slug = nodePath.parse(path).name;
			if (!post.metadata) {
				continue;
			}
			if (category && post.metadata.category.toLowerCase() !== category) {
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

		if (offset && limit) {
			posts = posts.slice(offset, offset + limit);
		} else if (limit) {
			posts = posts.slice(0, limit);
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