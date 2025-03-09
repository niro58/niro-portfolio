<script lang="ts">
	import type { MetadataWithSlug } from '$lib/types';
	import { ArrowRight, Calendar, Tag } from 'lucide-svelte';

	const { post }: { post: MetadataWithSlug } = $props();
</script>

<article
	class="bg-card border-primary/20 hover:shadow-primary/20 flex h-full flex-col justify-between overflow-hidden rounded-lg border shadow-lg transition-all hover:shadow-lg"
>
	<div>
		<img
			src={post.coverImage || '/placeholder.svg'}
			alt={post.title}
			class="aspect-video w-full object-cover"
		/>
		<div class=" p-6">
			<a
				href={`/blog/${post.slug}`}
				class="hover:text-primary/70 text-primary mb-2 inline-flex items-center text-xl font-semibold transition-colors"
			>
				{post.title}
			</a>
			<div class="text-muted-foreground mb-2 flex items-center text-sm">
				<Calendar class="mr-1 h-4 w-4" />
				<span>{post.date}</span>
			</div>
			<p class="text-muted-foreground mb-4">{post.excerpt}</p>
			<div class="mb-4 flex flex-wrap gap-2">
				{#each post.tags as tag}
					<span
						class="border-primary/50 bg-primary/20 text-primary inline-flex items-center rounded-full border px-2 py-1 text-xs"
					>
						<Tag class="mr-1 h-3 w-3" />
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</div>
	<a
		href={`/blog/${post.slug}`}
		class="text-primary hover:text-primary/70 inline-flex items-center p-6 transition-colors"
	>
		Read more <ArrowRight class="ml-2 h-4 w-4" />
	</a>
</article>
