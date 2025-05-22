import { env } from '$env/dynamic/public';
import type { MetadataWithSlug, Result } from './types';
export async function getPosts(
	limit: number,
	offset: number,
	category?: string
): Promise<Result<MetadataWithSlug[]>> {
	const searchParams = new URLSearchParams();
	if (category) {
		searchParams.set('category', category);
	}

	if (isNaN(offset) || offset < 0) {
		return {
			success: false,
			error: 'Invalid offset value'
		};
	}
	if (isNaN(limit) || limit < 0) {
		return {
			success: false,
			error: 'Invalid limit value'
		};
	}

	searchParams.set('offset', offset.toString());
	searchParams.set('limit', limit.toString());

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
	const url = `${env.PUBLIC_API_PATH}/api/slugs`;
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
