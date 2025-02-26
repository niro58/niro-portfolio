<script lang="ts">
	import NoPosts from '$lib/components/no-posts.svelte';
	import { ArrowRight, ExternalLink, Github, Globe } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fly, fade, scale, blur } from 'svelte/transition';
	const { data } = $props();
	let activeIndex = $state(0);
	const activeProject = $derived(data.projects[activeIndex]);
</script>

{#if data.projects.length === 0}
	<NoPosts type="portfolio" />
{:else}
	<div class="min-h-screen">
		<main class="container mx-auto px-4 py-12">
			<h1 class="mb-8 text-center text-4xl font-bold">
				<span class=" from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
					My Portfolio
				</span>
			</h1>
			<div class="grid gap-8 md:grid-cols-2">
				<div class="grid">
					{#key activeIndex}
						<div style:grid-area="1/1">
							<img
								src={activeProject.coverImage}
								alt={activeProject.title}
								in:fly={{ x: 25, duration: 500 }}
								out:fly={{ x: -25, duration: 500 }}
								class="h-64 w-full rounded-lg object-cover shadow-lg"
							/>
						</div>

						<div
							class="mt-4"
							in:fly={{ x: 25, duration: 500 }}
							out:fly={{ x: -25, duration: 500 }}
							style:grid-area="2/1"
						>
							<h2 class="text-2xl font-semibold text-red-300">{activeProject.title}</h2>
							<p class="text-muted-foreground mt-2">{activeProject.excerpt}</p>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each activeProject.tags as tag}
									<span
										class="border-primary/50 rounded-full border bg-red-900/30 px-2 py-1 text-xs text-red-200"
										in:scale={{ duration: 500 }}
										out:blur={{ amount: 10, duration: 500 }}
									>
										{tag}
									</span>
								{/each}
							</div>
							<div class="mt-6 flex gap-4">
								{#if activeProject.githubLink}
									<a
										href={activeProject.githubLink}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center text-red-400 hover:text-red-300"
										in:fade={{ duration: 500 }}
										out:fade={{ duration: 500 }}
									>
										<Github class="mr-2" /> View on GitHub
									</a>
								{/if}
								{#if activeProject.appLink}
									<a
										href={activeProject.appLink}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center text-red-400 hover:text-red-300"
										in:fade={{ duration: 500 }}
										out:fade={{ duration: 500 }}
									>
										<Globe class="mr-2" /> App Link
									</a>
								{/if}
								{#if activeProject.demoLink}
									<a
										href={activeProject.demoLink}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center text-red-400 hover:text-red-300"
										in:fade={{ duration: 500 }}
										out:fade={{ duration: 500 }}
									>
										<ExternalLink class="mr-2" /> Live Demo
									</a>
								{/if}
								<a
									href={`/blog/${activeProject.slug}`}
									rel="noopener noreferrer"
									class="inline-flex items-center space-x-2 text-red-400 hover:text-red-300"
									in:fade={{ duration: 500 }}
									out:fade={{ duration: 500 }}
								>
									<span>Read More</span>
									<ArrowRight class="mr-2" />
								</a>
							</div>
						</div>
					{/key}
				</div>
				<div>
					<h3 class="mb-4 text-xl font-semibold text-red-300">All Projects</h3>
					<div class="space-y-4">
						{#each data.projects as project, index (index)}
							<button
								onclick={() => (activeIndex = index)}
								class={`w-full rounded-lg border p-4 text-left transition-all hover:scale-102 active:scale-98 ${
									activeIndex === index
										? 'border-primary/50 bg-primary/20 border'
										: 'bg-card hover:bg-card/70 '
								}`}
								in:fade={{ duration: 500 }}
								out:fade={{ duration: 500 }}
							>
								<h4 class="font-semibold">{project.title}</h4>
								<p class="mt-1 text-sm text-gray-400">{project.excerpt}</p>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</main>
	</div>

	<style>
		/* Custom CSS for smooth hover effects */
		button {
			transition:
				transform 0.2s ease,
				background-color 0.2s ease;
		}

		button:hover {
			transform: scale(1.02);
		}

		button:active {
			transform: scale(0.98);
		}
	</style>
{/if}
