import type { PageServerLoad } from './$types.js';
import { fail, superValidate } from 'sveltekit-superforms';

import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema } from '$lib/schemas.js';
import { type Actions } from '@sveltejs/kit';
import { createFormEntry } from '$lib/server/insertActivity.js';
import { getBlogPosts } from '$lib/server/content.js';

export async function load() {
	const posts = await getBlogPosts(3);

	return {
		form: await superValidate(zod(contactSchema)),
		posts: posts
	};
}

export const actions: Actions = {
	contact: async (event) => {
		const form = await superValidate(event, zod(contactSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await createFormEntry(form.data);

		return {
			form
		};
	}
};
