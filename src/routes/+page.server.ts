import type { PageServerLoad } from './$types.js';
import { fail, superValidate } from 'sveltekit-superforms';

import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema } from '$lib/schemas.js';
import { type Actions } from '@sveltejs/kit';
import { processEvent } from '$lib/server/insertActivity.js';
import { getPosts } from '$lib/query.js';

export const load: PageServerLoad = async () => {
	const posts = await getPosts();

	return {
		form: await superValidate(zod(contactSchema)),
		posts: !posts.success ? [] : posts.data
	};
};

export const actions: Actions = {
	contact: async (event) => {
		const form = await superValidate(event, zod(contactSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await processEvent(form, 'contact');

		return {
			form
		};
	}
};
