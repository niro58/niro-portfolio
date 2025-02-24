import type { PageServerLoad } from './$types.js';
import { fail, superValidate } from 'sveltekit-superforms';

import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema } from '$lib/schemas.js';
import type { Actions } from '@sveltejs/kit';
import { processEvent } from '$lib/server/insertActivity.js';
import type { MetadataWithHref } from '$lib/types.js';
import nodePath from 'node:path';

export const load: PageServerLoad = async () => {
	const data = import.meta.glob('./../lib/posts/*.md');
	// let posts: MetadataWithHref[] = [];

	for (const [path, module] of Object.entries(data)) {
		const post: any = await module();
		// const href = nodePath.parse(path).name;

		// posts.push({
		// 	...post.metadata,
		// 	href: `/posts/${href}`
		// });

		// if (posts.length === 3) {
		// 	break;
		// }
	}

	return {
		form: await superValidate(zod(contactSchema))
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
