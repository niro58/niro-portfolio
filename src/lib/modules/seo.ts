import { AppConfig } from '$config/app';
import { env } from '$env/dynamic/public';
import type { SeoPage, SeoPagePart } from '$lib/types/seo';
import { createCloudflareImageUrl } from '$lib/utils/common';
import type { SeoProps } from '$ui/seo/seo.svelte';
import type { Page } from '@sveltejs/kit';

const BASE_WEBSITE_ID = AppConfig.baseUrl + '/#' + AppConfig.jsonLdWebsiteId;
const PERSON_ID = AppConfig.baseUrl + '/#person';

const jsonLdWebsiteLogo = createCloudflareImageUrl('33a9f1db-82d0-4fd9-7a43-614e5ae60900', {
	width: '256',
	height: '256',
	fit: 'cover'
});
const jsonLdWebsiteImage = createCloudflareImageUrl('33a9f1db-82d0-4fd9-7a43-614e5ae60900', {
	width: '1024',
	height: '776',
	fit: 'cover'
});
const firstDefaultImage = createCloudflareImageUrl('33a9f1db-82d0-4fd9-7a43-614e5ae60900', {
	width: '1200',
	height: '630',
	fit: 'cover'
});

export const JSONLD_WEBSITE_SCHEMA = {
	'@type': 'WebSite',
	'@id': BASE_WEBSITE_ID, // A unique ID for your business
	name: AppConfig.siteName,
	url: AppConfig.baseUrl,
	logo: jsonLdWebsiteLogo,
	image: jsonLdWebsiteImage,
	// Only real profile URLs belong in sameAs — not the bare username fields that
	// also live on socialLinks (Object.values would leak "niro58" into the array).
	sameAs: [
		AppConfig.socialLinks.github,
		AppConfig.socialLinks.linkedin,
		AppConfig.socialLinks.discord
	],
	publisher: { '@id': PERSON_ID },
	author: { '@id': PERSON_ID }
};

// Single canonical Person entity for the site owner, referenced by @id from the
// WebSite node and every Article's author/publisher (E-E-A-T author signals).
export const JSONLD_PERSON_SCHEMA = {
	'@type': 'Person',
	'@id': PERSON_ID,
	name: 'Nichita Roilean',
	url: AppConfig.baseUrl,
	image: jsonLdWebsiteLogo,
	jobTitle: 'Full-Stack Developer',
	sameAs: [AppConfig.socialLinks.github, AppConfig.socialLinks.linkedin]
};

function getCanonicalUrl(url: Page['url']) {
	// Derive from the fixed production base rather than url.origin so canonical /
	// og:url / JSON-LD @id are deterministic at prerender (a preview/local build
	// must never bake localhost URLs into the shipped static HTML).
	return AppConfig.baseUrl + url.pathname;
}
export function generateJsonLd(
	seoPage: SeoPage,
	url: Page['url'],
	withContext: boolean = true
): Record<string, any> {
	const canonicalUrl = getCanonicalUrl(url);

	const graph = [];

	let mainEntity: Record<string, any> = {};

	// --- Base Organization & Website Schema (optional but good practice) ---
	if (seoPage.publisher) {
		graph.push({
			'@type': seoPage.publisher.type,
			'@id': `${canonicalUrl}#${seoPage.publisher.type.toLowerCase()}`,
			name: seoPage.publisher.name,
			url: seoPage.publisher.url,
			logo: {
				'@type': 'ImageObject',
				url: seoPage.publisher.logo?.url,
				width: seoPage.publisher.logo?.width,
				height: seoPage.publisher.logo?.height
			}
		});
	}

	// --- Main Entity Schema (dynamic based on page type) ---
	mainEntity = {
		'@id': `${canonicalUrl}#webpage`,
		url: canonicalUrl,
		name: seoPage.seoTitle,
		description: seoPage.seoDescription,
		isPartOf: {
			'@id': BASE_WEBSITE_ID
		}
	};

	switch (seoPage.type) {
		case 'WebPage':
			mainEntity['@type'] = 'WebPage';

			mainEntity.image =
				seoPage.image && seoPage.image.length > 0 ? seoPage.image[0].url : firstDefaultImage;
			break;

		case 'Article':
			mainEntity['@type'] = 'Article';
			mainEntity.headline = seoPage.seoTitle;
			mainEntity.datePublished = seoPage.datePublished;
			mainEntity.dateModified = seoPage.dateModified ?? seoPage.datePublished;
			// Reference the single Person node (added to the graph in generateSeoProps)
			// rather than emitting a bare inline author with no url/sameAs.
			mainEntity.author = { '@id': PERSON_ID };
			mainEntity.publisher = { '@id': PERSON_ID };
			if (seoPage.image && seoPage.image.length > 0) {
				mainEntity.image = seoPage.image[0].url;
			}

			break;

		case 'Product':
			mainEntity['@type'] = 'Product';
			mainEntity.name = seoPage.productName;
			mainEntity.sku = seoPage.sku;
			mainEntity.brand = seoPage.brand ? { '@type': 'Brand', name: seoPage.brand.name } : undefined;
			mainEntity.offers = seoPage.offers.map((offer) => ({
				'@type': 'Offer',
				price: offer.price,
				priceCurrency: offer.priceCurrency,
				availability: offer.availability,
				url: offer.url
			}));
			if (seoPage.aggregateRating) {
				mainEntity.aggregateRating = {
					'@type': 'AggregateRating',
					ratingValue: seoPage.aggregateRating.ratingValue,
					reviewCount: seoPage.aggregateRating.reviewCount
				};
			}
			break;
	}

	// Add the main page schema to the graph
	graph.push(mainEntity);

	if (withContext) {
		return {
			'@context': 'https://schema.org',
			'@graph': graph
		};
	}

	return graph[0];
}
export function generateJsonLdPagePart(
	seoPagePart: SeoPagePart,
	withContext: boolean = true
): Record<string, any> {
	const graph: Record<string, any> = {};
	switch (seoPagePart.type) {
		case 'BreadcrumbList':
			graph['@type'] = 'BreadcrumbList';
			graph.itemListElement = seoPagePart.items.map((item, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.name,
				item: AppConfig.baseUrl + item.item
			}));
			break;
		case 'FAQPage':
			graph['@type'] = 'FAQPage';
			graph.mainEntity = seoPagePart.questions.map((q) => ({
				'@type': 'Question',
				name: q.questionName,
				acceptedAnswer: {
					'@type': 'Answer',
					text: q.acceptedAnswerText
				}
			}));
			break;
	}
	if (withContext) {
		return {
			'@context': 'https://schema.org',
			...graph
		};
	}

	return graph;
}

/**
 * Generates an array of meta tag objects for Open Graph and Twitter cards.
 * This consolidates the previous getOpenGraph and getTwitterCard functions.
 *
 * @param seoPage The page-specific SEO data.
 * @returns An array of objects, each representing a meta tag.
 */
export function generateMetaTags(seoPage: SeoPage, url: Page['url']) {
	const canonicalUrl = getCanonicalUrl(url);

	const imageUrls = seoPage.image?.map((img) => img.url) ?? [];
	const firstImage = imageUrls.length > 0 ? imageUrls[0] : firstDefaultImage; // Fallback image

	const tags = [
		// Open Graph
		{ property: 'og:type', content: seoPage.type === 'Article' ? 'article' : 'website' },
		{ property: 'og:url', content: canonicalUrl },
		{ property: 'og:title', content: seoPage.seoTitle },
		{ property: 'og:description', content: seoPage.seoDescription },
		{ property: 'og:site_name', content: AppConfig.siteName }, // Your site name
		{ property: 'og:image', content: firstImage },

		// Twitter Card
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:title', content: seoPage.seoTitle },
		{ name: 'twitter:description', content: seoPage.seoDescription },
		{ name: 'twitter:image', content: firstImage }
		// { name: 'twitter:site', content: '@yourhandle' },
		// { name: 'twitter:creator', content: '@creatorhandle' },
	];

	return tags;
}

export function generateSeoProps(
	seoPage: SeoPage,
	url: Page['url'],
	parts?: SeoPagePart | SeoPagePart[]
): SeoProps {
	const jsonLd: Record<string, any> = {
		'@context': 'https://schema.org',
		// Reserved keyword is "@graph" — plain "graph" makes every node an
		// unrecognized blob that search engines and LLMs silently ignore.
		'@graph': [JSONLD_WEBSITE_SCHEMA, JSONLD_PERSON_SCHEMA, generateJsonLd(seoPage, url, false)]
	};
	if (parts) {
		const partsArray = Array.isArray(parts) ? parts : [parts];
		jsonLd['@graph'].push(...partsArray.map((part) => generateJsonLdPagePart(part, false)));
	}

	const canonicalUrl = getCanonicalUrl(url);

	const imageList = seoPage.image ?? [];
	const firstImg = imageList.length > 0 ? imageList[0] : undefined;
	const imageUrl = firstImg?.url ?? firstDefaultImage;

	// Bare keys only — seo.svelte / open-graph.svelte apply the og:/twitter:
	// prefix themselves. Passing already-prefixed keys produced og:og:image /
	// twitter:twitter:card and dropped the real tags. seo.svelte already emits
	// og/twitter title, description and url, so we supply only the rest here.
	const openGraph: Record<string, any> = {
		type: seoPage.type === 'Article' ? 'article' : 'website',
		site_name: AppConfig.siteName,
		image: imageUrl
	};
	const twitter: Record<string, string> = {
		card: 'summary_large_image',
		image: imageUrl
	};

	const seoKeywords = Array.isArray(seoPage.seoKeywords)
		? seoPage.seoKeywords.join(', ')
		: seoPage.seoKeywords;
	return {
		// No <base> tag: the site uses absolute paths, and emitting one broke the
		// prerender crawler (base href sent link discovery to the external origin).
		title: seoPage.seoTitle,
		description: seoPage.seoDescription,
		keywords: seoKeywords,
		themeColor: AppConfig.themeColor,
		applicationName: AppConfig.siteName,
		canonical: canonicalUrl,
		imageWidth: firstImg?.width ?? 1200,
		imageHeight: firstImg?.height ?? 630,
		openGraph,
		twitter,
		jsonLd
	};
}
