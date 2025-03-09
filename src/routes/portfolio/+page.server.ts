import { getPosts } from '$lib/query';

export async function load() {
	const category = 'portfolio';
	const projects = await getPosts(category);
	return {
		category: category,
		projects: projects.success ? projects.data : []
	};
}
