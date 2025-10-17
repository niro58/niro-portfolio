<script lang="ts">
	import { AppConfig } from '$config/app';
	import type { BlogPost } from '$lib/types/content';
	import PostShort from '../post-short.svelte';

	import { fly, slide } from 'svelte/transition';
	const { postsRes }: { postsRes: BlogPost[] } = $props();
	let page = $state(0);
	let posts = $derived(postsRes.slice(0, (page + 1) * AppConfig.defaultBlogLimit));
</script>

<section id="blog" class="py-20">
	<div class="container mx-auto px-4">
		<h2 class="mb-10 text-center text-3xl font-bold">
			<span class="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
				Latest Posts
			</span>
		</h2>
		<div class="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post, index (index)}
				<div in:slide={{ duration: 350 }}>
					<PostShort {post} />
				</div>
			{/each}
		</div>
		<div class="text-center">
			{#if posts.length < postsRes.length}
				<button
					onclick={() => {
						page += 1;
					}}
					class="from-primary hover:shadow-primary/50 rounded-full bg-gradient-to-r to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
				>
					Load more
				</button>
			{/if}
		</div>
	</div>
</section>
