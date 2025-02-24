export type Metadata = {
	title: string;
	excerpt: string;
	category: string;
	readingTime: string;

	date: string;
	updated: string;

	coverImage: string;
	coverWidth: number;
	coverHeight: number;

	metaKeywords: string;
	metaDescription: string;
};
export type MetadataWithHref = Metadata & { href: string };
