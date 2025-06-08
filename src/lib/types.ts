export type Metadata = {
	title: string;
	excerpt: string;
	tags: string[];
	category: string;
	readTime: string;

	createdAt: string;
	updatedAt: string;

	coverImage: string;
	coverWidth: number;
	coverHeight: number;

	metaKeywords: string;
	metaDescription: string;

	githubLink?: string;
	appLink?: string;
};
export type MetadataWithSlug = Metadata & { slug: string };
export type PostSection = {
	id: string;
	title: string;
	items?: PostSection[];
};
type Success<T> = {
	success: true;
	data: T;
};
type Failure<> = {
	success: false;
	error: string;
};
export type Result<T> = Success<T> | Failure;
