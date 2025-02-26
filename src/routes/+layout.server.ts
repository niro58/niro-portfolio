import { redirect } from '@sveltejs/kit';

import { PUBLIC_MODE } from '$env/static/public';

export const load = async ({ url }) => {
	if (PUBLIC_MODE === 'prod') {
		console.log('redirecting');
		const { host } = url;
		if (!host.startsWith('www.')) {
			return redirect(301, `https://www.${url.host}${url.pathname}${url.search}`);
		}
	}
};
