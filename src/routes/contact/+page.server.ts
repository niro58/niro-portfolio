import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { contactSchema } from '$lib/schemas';
import { insertContactEntry } from '$lib/server/insertActivity';

async function processEvent(form: any, key: string) {
	const entry = {
		web: 'niro-personal-web',
		data: {
			...form.data,
			key: key
		},
		created: new Date().toISOString()
	};
	try {
		await insertContactEntry(entry);
	} catch (e) {
		return fail(500, {
			form,
			error: e
		});
	}
}

export const actions: Actions = {
	default: async (event) => {
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
