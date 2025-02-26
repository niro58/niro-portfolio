<script lang="ts">
	import type { MetadataWithSlug } from '$lib/types';
	import { ArrowRight, Calendar, Tag } from 'lucide-svelte';

	const { post }: { post: MetadataWithSlug } = $props();
</script>

<article
	class="bg-card border-primary/20 hover:shadow-primary/20 overflow-hidden rounded-lg border shadow-lg transition-all hover:shadow-lg"
>
	<img
		src={post.coverImage || '/placeholder.svg'}
		alt={post.title}
		class="h-48 w-full object-cover"
	/>
	<div class="p-6">
		<h2 class="mb-2 text-xl font-semibold text-red-300">{post.title}</h2>
		<div class="text-muted-foreground mb-2 flex items-center text-sm">
			<Calendar class="mr-1 h-4 w-4" />
			<span>{post.date}</span>
		</div>
		<p class="mb-4 text-gray-300">{post.excerpt}</p>
		<div class="mb-4 flex flex-wrap gap-2">
			{#each post.tags as tag}
				<span
					class="border-primary/50 inline-flex items-center rounded-full border bg-red-900/30 px-2 py-1 text-xs text-red-200"
				>
					<Tag class="mr-1 h-3 w-3" />
					{tag}
				</span>
			{/each}
		</div>
		<a
			href={`/blog/${post.slug}`}
			class="inline-flex items-center text-red-400 transition-colors hover:text-red-300"
		>
			Read more <ArrowRight class="ml-2 h-4 w-4" />
		</a>
	</div>
</article>
