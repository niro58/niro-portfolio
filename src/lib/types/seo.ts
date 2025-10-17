
//seo
// =================================================================
// 1. Foundational & Helper Types
// These are the building blocks used within the main page types.
// =================================================================

/** The type of SEO page, used as a discriminator for the union type. */
export type SeoEntityType = 'WebPage' | 'Article' | 'Product' | 'FAQPage' | 'BreadcrumbList';

/** Represents an image object for schema.org. */
export type SeoImage = {
	url: string;
	width: number;
	height: number;
	alt: string;
};

/** Represents an author or publisher. */
export type SeoEntity = {
	type: 'Person' | 'Organization';
	name: string;
	url?: string;
	logo?: SeoImage;
};

/** Represents product pricing and availability. */
export type SeoOffer = {
	price: string;
	priceCurrency: string;
	// URL for availability, e.g., 'https://schema.org/InStock'
	availability: string;
	url?: string;
};

/** Represents product reviews and ratings. */
export type SeoRating = {
	ratingValue: number;
	bestRating?: number;
	worstRating?: number;
	reviewCount: number;
};

/** Represents a single question and answer for an FAQ page. */
export type SeoQuestion = {
	questionName: string;
	acceptedAnswerText: string;
};

/** Represents a single item in a breadcrumb list. */
export type SeoBreadcrumbItem = {
	position: number;
	name: string;
	// The full URL to the breadcrumb page
	item: string;
};

// =================================================================
// 2. Base Page Type
// All specific page types will extend this.
// =================================================================

/** The core properties shared by all SEO pages. */
export type SeoPageBase = {
	seoTitle: string;
	seoDescription: string;
	seoKeywords?: string | string[];
	image?: SeoImage[];
	// The main publisher or organization for the site
	publisher?: SeoEntity;
};

// =================================================================
// 3. Specific Page Types
// These define the unique data needed for each JSON-LD schema.
// =================================================================

/** For a generic web page. Corresponds to `WebPage` schema. */
export type SeoPageWeb = SeoPageBase & {
	type: 'WebPage';
};

/** For a blog post or news article. Corresponds to `Article` schema. */
export type SeoPageArticle = SeoPageBase & {
	type: 'Article';
	author: SeoEntity[];
	datePublished: string; // ISO 8601 format (e.g., "2025-09-27T10:00:00Z")
	dateModified?: string; // ISO 8601 format
};

/** For an e-commerce product page. Corresponds to `Product` schema. */
export type SeoPageProduct = SeoPageBase & {
	type: 'Product';
	productName: string;
	sku?: string;
	brand?: { name: string };
	offers: SeoOffer[];
	aggregateRating?: SeoRating;
};

/** For an FAQ page. Corresponds to `FAQPage` schema. */
export type SeoPageFaq = {
	type: 'FAQPage';
	questions: SeoQuestion[];
};

/** Represents a breadcrumb trail. Corresponds to `BreadcrumbList` schema. */
export type SeoPageBreadcrumb = {
	type: 'BreadcrumbList';
	items: SeoBreadcrumbItem[];
};


// =================================================================
// 4. Final Union Type
// This is the main type you'll use in your application components.
// It can represent any of the specific page types.
// =================================================================

export type SeoPage = SeoPageWeb | SeoPageArticle | SeoPageProduct;
export type SeoPagePart = SeoPageFaq | SeoPageBreadcrumb;
