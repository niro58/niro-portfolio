import { env } from '$env/dynamic/private';
import type { Result } from '$lib/types';
import { fail } from '@sveltejs/kit';

// export async function processEvent(form: any, key: string) {
// 	const entry = {
// 		web: 'niro-portfolio-web',
// 		data: {
// 			...form.data,
// 			key: key
// 		},
// 		created: new Date().toISOString()
// 	};
// 	try {
// 		await insertContactEntry(entry);
// 	} catch (e) {
// 		return fail(500, {
// 			form,
// 			error: e
// 		});
// 	}
// }

export async function createFormEntry(data: Record<string, any>): Promise<Result<boolean>> {
	const url = `${env.CONTACT_API_PATH}/static-auth/contact-form`;

	const body = {
		key: 'niro-portfolio-web',
		data: {
			...data
		}
	};

	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${env.CONTACT_API_AUTH}`
		}
	});

	if (!response.ok) {
		return { success: false, error: 'Failed to fetch data' };
	}

	const responseData = await response.json();
	if (responseData.error && responseData.data === null) {
		return {
			success: false,
			error: responseData.error
		};
	}
	return { success: true, data: true };
}
