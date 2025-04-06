import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['catppuccin-mocha'],
	langs: ['javascript', 'typescript', 'json', 'go']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],

	kit: {
		adapter: adapter({
			out: 'build'
		}),

		alias: {
			$config: './src/config',
			$posts: './src/posts'
		},
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'https://www.googletagmanager.com'],
				'style-src': [
					'self',
					'https://fonts.googleapis.com',
					'https://www.googletagmanager.com',
					'unsafe-inline'
				],
				'img-src': [
					'self',
					'https://www.google-analytics.com',
					'https://www.google.com',
					'https://www.gstatic.com',
					'https://fonts.gstatic.com'
				],
				'font-src': ['self', 'https://fonts.gstatic.com'],
				'connect-src': [
					'self',
					'https://www.google-analytics.com',
					'https://region1.google-analytics.com'
				],
				'frame-src': ['self', 'https://www.google.com']
			}
		}
	},

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					await highlighter.loadLanguage('javascript', 'typescript');
					const html = escapeSvelte(
						highlighter.codeToHtml(code, { lang, theme: 'catppuccin-mocha' })
					);
					return `{@html \`${html}\` }`;
				}
			},
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		})
	]
};

export default config;
