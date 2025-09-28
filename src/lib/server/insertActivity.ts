import { env } from '$env/dynamic/private';
import type { Result } from '$lib/types';

export async function createFormEntry(data: Record<string, any>): Promise<Result<boolean>> {
	const url = `${env.CONTACT_API_PATH}/api/contact`;

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
