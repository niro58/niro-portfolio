import { AppConfig } from '$config/app.js';
import { getBlogPosts } from '$lib/server/content.js';

export async function load({ url }) {
	const projects = await getBlogPosts(
		{
			category: "portfolio"
		}
	);
	if (projects.type === 'FAILURE') {
		throw new Error("Failure portfolio posts")
	}
	console.log(projects);
	return {
		projects: projects.data
	};
}
