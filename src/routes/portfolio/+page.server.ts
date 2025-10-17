import { AppConfig } from '$config/app.js';
import { getBlogPosts } from '$lib/server/content.js';

export async function load({ url }) {
	const searchParams = url.searchParams;
	const page = parseInt(searchParams.get('page') || '1');

	const category = 'portfolio';
	const projects = await getBlogPosts(
		AppConfig.defaultPortfolioLimit,
		page * AppConfig.defaultPortfolioLimit,
		category
	);
	if (projects.type === 'FAILURE') {
		throw new Error("Failure portfolio posts")
	}
	return {
		page: page,
		category: category,
		projects: projects.data
	};
}
