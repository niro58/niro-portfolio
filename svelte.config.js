import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['dracula'],
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
			$modules: './src/lib/modules',
			$ui: './src/lib/components/ui'
		},
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self', '*.plausible.io'],
				'script-src': ['self', 'plausible.io'],
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'https://imagedelivery.net', 'data:', 'blob:'],
				'font-src': ['self'],
				'connect-src': ['self', 'plausible.io'],
				'frame-src': ['self']
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
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'dracula' }));
					return `{@html \`${html}\` }`;
				}
			},
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		})
	]
};

export default config;
