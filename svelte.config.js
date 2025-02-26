import { mdsvex } from 'mdsvex';
import adapter from 'amplify-adapter';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],

	kit: {
		adapter: adapter(),

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
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		})
	]
};

export default config;
