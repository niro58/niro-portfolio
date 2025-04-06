import { env } from '$env/dynamic/public';
import type { MetadataWithSlug, Result } from './types';
export async function getPosts(
	category?: string
): Promise<Result<MetadataWithSlug[]>> {
	const searchParams = new URLSearchParams();
	if (category) {
		searchParams.set('category', category);
	}
	const url = `${env.PUBLIC_API_PATH}/api/posts?${searchParams.toString()}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			return {
				success: false,
				error: 'Failed to fetch posts'
			};
		}

		const data = await response.json();
		const metadata: MetadataWithSlug[] = data.map((post: any) => {
			return post as MetadataWithSlug;
		});
		return {
			success: true,
			data: metadata
		};
	} catch (e) {
		return {
			success: false,
			error: 'Failed to fetch posts'
		};
	}
}

export async function getSlugs(): Promise<Result<string[]>> {
	const url = `${PUBLIC_API_PATH}/api/slugs`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			return {
				success: false,
				error: 'Failed to fetch slugs'
			};
		}

		const data = await response.json();
		return {
			success: true,
			data: data
		};
	} catch (e) {
		return {
			success: false,
			error: 'Failed to fetch slugs'
		};
	}
}
