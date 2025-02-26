import { getPosts } from '$lib/query';

export async function load() {
	const pageSize = 6;
	const category = 'portfolio';
	const projects = await getPosts(pageSize, 0, category);
	return {
		pageSize: pageSize,
		category: category,
		projects: projects.success ? projects.data : []
	};
}
