export type BlogPost = {
    slug?: string;
    title: string;
    excerpt: string;
    tags: string[];
    category: string;
    readTime: string;

    createdAt: string;
    updatedAt: string;

    coverImage: string;
    coverImageAlt: string;

    metaKeywords: string;
    metaDescription: string;

    githubLink?: string;
    appLink?: string;
};

export type PostSection = {
    id: string;
    title: string;
    items?: PostSection[];
};