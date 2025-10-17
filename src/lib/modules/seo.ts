import { AppConfig } from "$config/app";
import { env } from "$env/dynamic/public";
import type { SeoPage, SeoPagePart } from "$lib/types/seo";
import type { SeoProps } from "$ui/seo/seo.svelte";
import type { Page } from "@sveltejs/kit";


const BASE_WEBSITE_ID = AppConfig.baseUrl + '/#' + AppConfig.jsonLdWebsiteId;

export const JSONLD_WEBSITE_SCHEMA = {
    '@type': 'WebSite',
    '@id': BASE_WEBSITE_ID, // A unique ID for your business
    name: AppConfig.siteName,
    url: env.PUBLIC_BASE_URL,
    logo: AppConfig.jsonLdWebsiteLogo,
    image: AppConfig.jsonLdWebsiteImage,
    sameAs: AppConfig.socialLinks ? Object.values(AppConfig.socialLinks) : undefined,
}

function getCanonicalUrl(url: Page['url']) {
    return url.origin + url.pathname;
}
export function generateJsonLd(seoPage: SeoPage, url: Page["url"], withContext: boolean = true): Record<string, any> {
    const canonicalUrl = getCanonicalUrl(url)

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
                height: seoPage.publisher.logo?.height,
            },
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
        },
    };


    switch (seoPage.type) {
        case 'WebPage':
            mainEntity['@type'] = 'WebPage';

            mainEntity.image = seoPage.image && seoPage.image.length > 0 ? seoPage.image[0].url : AppConfig.firstDefaultImage;
            break;

        case 'Article':
            mainEntity['@type'] = 'Article';
            mainEntity.headline = seoPage.seoTitle;
            mainEntity.datePublished = seoPage.datePublished;
            mainEntity.dateModified = seoPage.dateModified ?? seoPage.datePublished;
            mainEntity.author = seoPage.author.map(author => ({
                '@type': author.type,
                name: author.name,
                url: author.url,
            }));
            if (seoPage.publisher) {
                mainEntity.publisher = { '@id': `${canonicalUrl}#${seoPage.publisher.type.toLowerCase()}` };
            }
            if (seoPage.image && seoPage.image.length > 0) {
                mainEntity.image = seoPage.image[0].url
            }

            break;

        case 'Product':
            mainEntity['@type'] = 'Product';
            mainEntity.name = seoPage.productName;
            mainEntity.sku = seoPage.sku;
            mainEntity.brand = seoPage.brand ? { '@type': 'Brand', name: seoPage.brand.name } : undefined;
            mainEntity.offers = seoPage.offers.map(offer => ({
                '@type': 'Offer',
                price: offer.price,
                priceCurrency: offer.priceCurrency,
                availability: offer.availability,
                url: offer.url,
            }));
            if (seoPage.aggregateRating) {
                mainEntity.aggregateRating = {
                    '@type': 'AggregateRating',
                    ratingValue: seoPage.aggregateRating.ratingValue,
                    reviewCount: seoPage.aggregateRating.reviewCount,
                };
            }
            break;
    }

    // Add the main page schema to the graph
    graph.push(mainEntity);

    if (withContext) {
        return {
            '@context': 'https://schema.org',
            '@graph': graph,
        };
    }

    return graph[0];
}
export function generateJsonLdPagePart(seoPagePart: SeoPagePart, withContext: boolean = true): Record<string, any> {
    const graph: Record<string, any> = {};
    switch (seoPagePart.type) {
        case 'BreadcrumbList':
            graph['@type'] = 'BreadcrumbList';
            graph.itemListElement = seoPagePart.items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: env.PUBLIC_BASE_URL + item.item,
            }));
            break;
        case "FAQPage":
            graph['@type'] = 'FAQPage';
            graph.mainEntity = seoPagePart.questions.map(q => ({
                '@type': 'Question',
                name: q.questionName,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: q.acceptedAnswerText,
                },
            }));
            break;
    }
    if (withContext) {
        return {
            '@context': 'https://schema.org',
            ...graph,
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
export function generateMetaTags(seoPage: SeoPage, url: Page["url"]) {
    const canonicalUrl = getCanonicalUrl(url)

    const imageUrls = seoPage.image?.map(img => img.url) ?? [];
    const firstImage = imageUrls.length > 0 ? imageUrls[0] : AppConfig.firstDefaultImage; // Fallback image

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
        { name: 'twitter:image', content: firstImage },
        // { name: 'twitter:site', content: '@yourhandle' },
        // { name: 'twitter:creator', content: '@creatorhandle' },
    ];

    return tags;
}

export function generateSeoProps(seoPage: SeoPage, url: Page["url"], parts?: SeoPagePart | SeoPagePart[]): SeoProps {
    let jsonLd = {
        '@context': 'https://schema.org',
        "graph": [
            JSONLD_WEBSITE_SCHEMA,
            generateJsonLd(seoPage, url, false)],
    }
    if (parts) {
        const partsArray = Array.isArray(parts) ? parts : [parts];
        jsonLd.graph.push(...partsArray.map(part => generateJsonLdPagePart(part, false)));
    }

    const metaTags = generateMetaTags(seoPage, url);
    const canonicalUrl = getCanonicalUrl(url)

    const openGraph = metaTags
        .filter(tag => tag.property?.startsWith('og:'))
        .reduce((acc, tag) => {
            if (tag.property) {
                // Example: acc['og:title'] = 'My Awesome Page'
                acc[tag.property] = tag.content;
            }
            return acc;
        }, {} as Record<string, string>);

    // FIX: Do the same for Twitter tags
    const twitter = metaTags
        .filter(tag => tag.name?.startsWith('twitter:'))
        .reduce((acc, tag) => {
            if (tag.name) {
                // Example: acc['twitter:card'] = 'summary_large_image'
                acc[tag.name] = tag.content;
            }
            return acc;
        }, {} as Record<string, string>);

    let seoKeywords = Array.isArray(seoPage.seoKeywords) ? seoPage.seoKeywords.join(', ') : seoPage.seoKeywords;
    return {
        base: url.origin,
        title: seoPage.seoTitle,
        description: seoPage.seoDescription,
        keywords: seoKeywords,
        themeColor: AppConfig.themeColor,
        applicationName: AppConfig.siteName,
        canonical: canonicalUrl,
        openGraph,
        twitter,
        jsonLd,
        // languageAlternates: getPageAlternates(page.url.origin, page.url.pathname)
    };
}