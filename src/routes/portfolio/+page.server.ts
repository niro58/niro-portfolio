import { DefaultPortfolioLimit } from '$config/data.js';
import { getPosts } from '$lib/query';

export async function load({ url }) {
	const searchParams = url.searchParams;
	const page = parseInt(searchParams.get('page') || '1');

	const category = 'portfolio';
	const projects = await getPosts(
		DefaultPortfolioLimit,
		(page - 1) * DefaultPortfolioLimit,
		category
	);
	return {
		page: page,
		category: category,
		projects: projects.success ? projects.data : []
	};
}
