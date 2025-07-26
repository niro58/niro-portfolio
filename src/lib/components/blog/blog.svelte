<script lang="ts">
	import { DefaultBlogLimit } from '$config/data';
	import { getPosts } from '$lib/query';
	import type { MetadataWithSlug } from '$lib/types';
	import PostShort from '../post-short.svelte';

	import { fly } from 'svelte/transition';
	let { posts: initialPosts }: { posts: MetadataWithSlug[] } = $props();

	let posts: MetadataWithSlug[] = $state(initialPosts);

	let page = $state(0);
	async function nextPage() {
		page += 1;
		const res = await getPosts(DefaultBlogLimit, page * DefaultBlogLimit);
		if (res.success) {
			posts.push(...res.data);
		}
	}
</script>

<section id="blog" class="py-20">
	<div class="container mx-auto px-4">
		<h2 class="mb-10 text-center text-3xl font-bold">
			<span class="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
				Latest Posts
			</span>
		</h2>
		<div class="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post}
				<div transition:fly={{ y: 25, duration: 500 }}>
					<PostShort {post} />
				</div>
			{/each}
		</div>
		<div class="text-center">
			{#if posts.length % (DefaultBlogLimit * (page + 1)) === 0}
				<button
					onclick={async () => nextPage()}
					class="from-primary hover:shadow-primary/50 rounded-full bg-gradient-to-r to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
				>
					Load more
				</button>
			{/if}
		</div>
	</div>
</section>
