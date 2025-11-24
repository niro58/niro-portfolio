import { goto } from '$app/navigation';

export type AppPage = {
    name: string;
    route: string;
    path: (() => string) | ((...params: string[]) => string);
    dev?: boolean;
};
export type AppPageWithKey = AppPage & { key: string };

const rawAppPages = {
    root: {
        name: 'Home',
        route: '/',
        path: () => '/',
    },
    blog: {
        name: "Blog",
        route: "/blog",
        path: () => "/blog/"
    },
    portfolio: {
        name: "Portfolio",
        route: "/portfolio",
        path: () => "/portfolio/"
    },
    blog_page: {
        name: "Blog page",
        route: "/blog/[slug]",
        path: (slug: string) => `/blog/${slug}/`
    },
    tools: {
        name: "Tools",
        route: "/tools",
        path: () => "/tools/"
    },
    blockaid_website_blocker: {
        name: "BlockAid: Website Blocker",
        route: "/tools/blockaid-website-blocker",
        path: () => "/tools/blockaid-website-blocker/"
    },
    blockaid_website_blocker_blocked: {
        name: "BlockAid: Website Blocker",
        route: "/tools/blockaid-website-blocker/blocked",
        path: () => "/tools/blockaid-website-blocker/blocked/"
    },
    hacker_news_reader: {
        name: "Hacker News Reader - Filter And Save",
        route: "/tools/hacker-news-reader",
        path: () => "/tools/hacker-news-reader/"
    },
    readvault_bookmarks: {
        name: "ReadVault - Bookmark. Oragnize. Thrive",
        route: "/tools/readvault-bookmarks",
        path: () => "/tools/readvault-bookmarks/"
    },
    image_resizer: {
        name: "Image resizer",
        route: "/tools/image-resizer",
        path: () => "/tools/image-resizer/"
    },
    video_converter: {
        name: "Video Converter",
        route: "/tools/video-converter",
        path: () => "/tools/video-converter/"
    }

} as const;

export type PageKey = keyof typeof rawAppPages;

type AssertedAppPages = {
    [K in PageKey]: AppPage;
};

export const appPages: AssertedAppPages = rawAppPages;

export function getActivePage(route: string | null): AppPageWithKey | undefined {
    if (!route) {
        return undefined;
    }

    const entry = Object.entries(appPages).find(([key, page]) => {
        return page.route === route;
    });
    if (entry) {
        const [key, page] = entry;
        return { ...page, key };
    }
    return undefined;
}

export function gotoFilter(link: string) {
    goto(link, {
        invalidateAll: true,
        replaceState: true,
        noScroll: true,
        keepFocus: true
    });
}