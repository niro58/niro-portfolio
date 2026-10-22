import { AppConfig } from '$config/app';
import type { ResultFetch } from '$lib/types/common';

// The platform's public contact path (cms.sitely.cz/public/contact/:form). The token is
// published on purpose: it names the form, nothing more. The platform checks the page's
// origin and its rate limits; only the form's own fields go in `data`.
export async function createFormEntry(data: Record<string, any>): Promise<ResultFetch<boolean>> {
	try {
		const response = await fetch(AppConfig.PUBLIC_CONTACT_FORM_URL, {
			method: 'POST',
			body: JSON.stringify({ token: AppConfig.PUBLIC_CONTACT_FORM_TOKEN, data }),
			headers: { 'Content-Type': 'application/json' }
		});
		if (!response.ok) {
			return { type: 'FAILURE', error: `Failed to send (${response.status})` };
		}
		return { type: 'SUCCESS', data: true };
	} catch {
		return { type: 'FAILURE', error: 'Failed to send' };
	}
}
