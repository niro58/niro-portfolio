<script>
	import { page } from '$app/state';
	import Blog from '$lib/components/blog/blog.svelte';
	import Seo from '$lib/components/seo.svelte';
	const { data } = $props();
</script>

<Seo
	title="Blog | Niro"
	description="A casual blog where I share my thoughts on programming, tech, and personal projects. From tinkering with Svelte and Go to exploring new ideas, this is my space to reflect and ramble."
	keywords="programming thoughts, coding blog, Sveltekit projects, Go, personal coding projects, developer diary"
	canonical={page.url.origin + page.url.pathname}
/>
<Blog posts={data.posts}  />
