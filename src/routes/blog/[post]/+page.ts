import { error } from '@sveltejs/kit';
import type { Metadata, PostSection } from '$lib/types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema } from '$lib/schemas.js';

export const load = async ({ params }) => {
	try {
		const post = await import(`../../../posts/${params.post}.md`);
		const meta: Metadata = post.metadata;

		const PostContent = post.default;


		return {
			PostContent: PostContent,
			meta: { ...meta, slug: params.post },
			form: await superValidate(zod(contactSchema))
		};
	} catch (err) {
		error(404, 'lol');
	}
};
