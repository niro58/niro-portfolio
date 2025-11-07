import { AppConfig } from '$config/app';
import type { ResultFetch } from '$lib/types/common';

export async function createFormEntry(data: Record<string, any>): Promise<ResultFetch<boolean>> {
	const url = `${AppConfig.publicContactApi}/api/contact`;

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
		}
	});

	if (!response.ok) {
		return { type: "FAILURE", error: 'Failed to fetch data' };
	}

	const responseData = await response.json();
	if (responseData.error && responseData.data === null) {
		return {
			type: "FAILURE",
			error: responseData.error
		};
	}
	return { type: "SUCCESS", data: true };
}
