<script>
	import Blog from '$lib/components/blog.svelte';
	import NoPosts from '$lib/components/no-posts.svelte';
	const { data } = $props();
</script>

{#if data.posts.length > 0}
	<Blog posts={data.posts} pageSize={data.pageSize} />
{:else}
	<NoPosts type="blog" />
{/if}
