<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	const blogPosts = [
		{
			slug: 'mastering-react-hooks',
			title: 'Mastering React Hooks: Advanced Patterns',
			date: '2024-02-15',
			excerpt: 'Dive deep into advanced React Hook patterns to level up your component logic.',
			tags: ['React', 'Hooks', 'JavaScript']
		},
		{
			title: 'The Future of Web Development: AI Integration',
			date: '2024-02-20',
			excerpt:
				'Exploring how AI is reshaping the landscape of web development and what it means for developers.',
			tags: ['AI', 'Web Development', 'Future Tech']
		},
		{
			title: 'Building Scalable Microservices with Node.js',
			date: '2024-02-10',
			excerpt:
				'A comprehensive guide to designing and implementing microservices architecture using Node.js.',
			tags: ['Microservices', 'Node.js', 'Architecture']
		}
	];
</script>

<section id="blog" class="py-20">
	<div class="container mx-auto px-4">
		<h2 class="mb-10 text-center text-3xl font-bold">
			<span class="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
				Latest Insights
			</span>
		</h2>
		<div class="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each blogPosts as post, index}
				<article
					class="overflow-hidden rounded-lg border border-primary/20 bg-card shadow-lg transition-all hover:shadow-lg hover:shadow-primary/20"
				>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold text-red-300">{post.title}</h3>
						<p class="mb-4 text-sm text-gray-400">{post.date}</p>
						<p class="mb-4 text-gray-300">{post.excerpt}</p>
						<div class="mb-4 flex flex-wrap gap-2">
							{#each post.tags as tag}
								<span
									class="rounded-full border border-primary/50 bg-red-900/30 px-2 py-1 text-xs text-red-200"
								>
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
			{/each}
		</div>
		<div class="text-center">
			<button
				class="rounded-full bg-gradient-to-r from-primary to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/50 active:scale-95"
			>
				View More Posts
			</button>
		</div>
	</div>
</section>
