export type Metadata = {
	title: string;
	excerpt: string;
	tags: string[];
	category: string;
	readingTime: string;

	date: string;
	updated: string;

	coverImage: string;
	coverWidth: number;
	coverHeight: number;

	metaKeywords: string;
	metaDescription: string;

	githubLink?: string;
	appLink?: string;
	demoLink?: string;
};
export type MetadataWithSlug = Metadata & { slug: string };

type Success<T> = {
	success: true;
	data: T;
};
type Failure<> = {
	success: false;
	error: string;
};
export type Result<T> = Success<T> | Failure;
