<script>
	import { page } from '$app/state';
	import { appPages } from '$config/pages.js';
	import Blog from '$lib/components/blog/blog.svelte';
	import { generateSeoProps } from '$modules/seo.js';
	import Seo from '$ui/seo/seo.svelte';
	const { data } = $props();
</script>

<Seo
	{...generateSeoProps(
		{
			type: 'WebPage',
			seoTitle: 'Blog | Niro',
			seoDescription:
				'A casual blog where I share my thoughts on programming, tech, and personal projects. From tinkering with Svelte and Go to exploring new ideas, this is my space to reflect and ramble.',
			seoKeywords:
				'programming thoughts, coding blog, Sveltekit projects, Go, personal coding projects, developer diary'
		},
		page.url
	)}
/>

{#if data.posts.type === 'SUCCESS'}
	{#each data.posts.data as post}
		{#if post.slug}
			<a href={appPages.blog_page.path(post.slug)} class="hidden">{post.title}</a>
		{/if}
	{/each}
	<Blog postsRes={data.posts.data} />
{/if}
