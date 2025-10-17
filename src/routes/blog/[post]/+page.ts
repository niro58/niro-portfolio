import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema } from '$lib/schemas.js';
import type { BlogPost } from '$lib/types/content.js';

export const load = async ({ params }) => {
	try {
		const post = await import(`../../../content/posts/${params.post}.md`);
		const meta: BlogPost = post.metadata;

		return {
			PostContent: post.default,
			meta: { ...meta, slug: params.post },
			form: await superValidate(zod(contactSchema))
		};
	} catch (err) {
		error(404, 'No blog post');
	}
};
