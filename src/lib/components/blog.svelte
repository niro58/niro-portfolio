<script lang="ts">
	import type { MetadataWithSlug } from '$lib/types';
	import { ArrowRight } from 'lucide-svelte';
	import PostShort from './post-short.svelte';
	import { getPosts } from '$lib/query';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	const {
		posts: initialPosts,
		pageSize,
		category
	}: { posts: MetadataWithSlug[]; pageSize: number; category?: string } = $props();

	let page = $state(0);
	let posts: MetadataWithSlug[] = $state(initialPosts);
	let pageState: 'loading' | 'idle' | 'all_loaded' | 'error' = $state(
		initialPosts.length < pageSize ? 'all_loaded' : 'idle'
	);

	function loadMorePosts() {
		pageState = 'loading';
		page += 1;
		getPosts(pageSize, page, category).then((res) => {
			if (res.success) {
				if (res.data.length === pageSize) {
					pageState = 'idle';
				} else {
					pageState = 'all_loaded';
				}
				posts = [...posts, ...res.data];
			} else {
				pageState = 'error';
			}
		});
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
			{#if pageState === 'error'}
				<p class="text-red-500">Error loading posts</p>
			{:else if pageState !== 'all_loaded'}
				<button
					onclick={() => {
						loadMorePosts();
					}}
					disabled={pageState === 'loading'}
					class="from-primary hover:shadow-primary/50 rounded-full bg-gradient-to-r to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
				>
					Load more
				</button>
			{/if}
		</div>
	</div>
</section>
