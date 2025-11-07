<script lang="ts">
	import { appPages } from '$config/pages';
	import type { BlogPost } from '$lib/types/content';
	import CdnImage from '$ui/cdn-image.svelte';
	import { ArrowRight, Calendar, Tag } from '@lucide/svelte';

	const { post }: { post: BlogPost } = $props();
</script>

<a href={appPages.blog_page.path(post.slug!)}>
	<article
		class="bg-card border-primary/20 hover:shadow-primary/20 flex h-full flex-col justify-between overflow-hidden rounded-lg border shadow-lg transition-all hover:shadow-lg"
	>
		<div>
			<CdnImage
				src={post.coverImage}
				alt={post.coverImageAlt}
				width={500}
				height={220}
				class="w-full object-cover"
			/>
			<div class=" p-6">
				<div
					class="hover:text-primary/70 text-primary mb-2 inline-flex items-center text-xl font-semibold transition-colors"
				>
					{post.title}
				</div>
				<div class="text-muted-foreground mb-2 flex items-center text-sm">
					<Calendar class="mr-1 h-4 w-4" />
					<span>{post.createdAt}</span>
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
		<div class="text-primary hover:text-primary/70 inline-flex items-center p-6 transition-colors">
			Read more <ArrowRight class="ml-2 h-4 w-4" />
		</div>
	</article>
</a>
