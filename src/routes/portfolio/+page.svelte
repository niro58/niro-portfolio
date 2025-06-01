<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { DefaultPortfolioLimit } from '$config/data.js';
	import Seo from '$lib/components/seo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils.js';
	import { ArrowRight, ExternalLink, Github, Globe } from '@lucide/svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly, fade } from 'svelte/transition';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	let activeIndex = $state(0);

	const activeProject = $derived(
		data.projects && data.projects.length > activeIndex && activeIndex >= 0
			? data.projects[activeIndex]
			: null
	);

	$effect(() => {
		if (data.projects && data.projects.length > 0) {
			if (activeIndex >= data.projects.length || activeIndex < 0) {
				activeIndex = 0;
			}
		} else {
			activeIndex = -1;
		}
	});

	function moveToPage(newPage: number) {
		if (newPage < 1) return;
		goto(`/portfolio?page=${newPage}`, {
			invalidateAll: true,
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});
	}

	const hasMoreProjects = $derived(data.projects.length === DefaultPortfolioLimit);
	const isFirstPage = $derived(data.page <= 1);
</script>

<Seo
	title="Portfolio | Niro"
	description="Explore projects developed by Niro."
	canonical={page.url.origin + page.url.pathname}
/>

{#if !data.projects || (data.projects.length === 0 && data.page === 1)}
	<div class="flex min-h-[60vh] items-center justify-center px-4 text-center">
		<p class="text-muted-foreground">No portfolio projects found yet.</p>
	</div>
{:else}
	<div class="flex min-h-screen flex-col">
		<header class="container mx-auto px-4 pt-12 md:pt-16">
			<div class="mb-8 text-center md:mb-12">
				<h1 class="text-3xl font-bold md:text-4xl">
					<span class=" from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
						My Portfolio
					</span>
				</h1>
				<p class="text-muted-foreground mt-2 text-sm md:text-base">
					Welcome! Here are some of the projects I've worked on.
				</p>
			</div>
		</header>

		<main class="container mx-auto flex-grow px-4 pb-12 md:pb-16">
			<div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
				<div class="flex h-full flex-col">
					<div class="relative flex-grow md:min-h-[480px]">
						{#if activeProject}
							{#key activeProject.slug}
								<div
									class="grid grid-rows-[auto_1fr] gap-4 md:absolute md:inset-0 md:gap-6"
									in:fade={{ duration: 400, delay: 50, easing: cubicOut }}
									out:fade={{ duration: 300, easing: cubicOut }}
								>
									<div>
										<img
											src={activeProject.coverImage}
											alt={activeProject.title}
											class="aspect-video w-full rounded-lg object-cover shadow-lg"
										/>
									</div>
									<div class="flex flex-col">
										<h2 class="text-primary text-xl font-semibold md:text-2xl">
											{activeProject.title}
										</h2>
										<p
											class="text-muted-foreground border-primary mt-2 line-clamp-3 border-l-4 py-1 pl-4 text-sm md:text-base"
										>
											{activeProject.excerpt}
										</p>
										<div class="mt-4 flex flex-wrap gap-2">
											{#each activeProject.tags as tag}
												<span
													class="border-primary/50 rounded-full border bg-red-900/30 px-2.5 py-1 text-xs text-red-200"
												>
													{tag}
												</span>
											{/each}
										</div>
										<div class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
											{#if activeProject.githubLink}
												<a
													href={activeProject.githubLink}
													target="_blank"
													rel="noopener noreferrer"
													class="inline-flex items-center text-sm text-red-400 hover:text-red-300"
												>
													<Github class="mr-1.5 h-4 w-4 shrink-0" /> GitHub
												</a>
											{/if}
											{#if activeProject.appLink}
												<a
													href={activeProject.appLink}
													target="_blank"
													rel="noopener noreferrer"
													class="inline-flex items-center text-sm text-red-400 hover:text-red-300"
												>
													<Globe class="mr-1.5 h-4 w-4 shrink-0" /> App
												</a>
											{/if}
											{#if activeProject.demoLink}
												<a
													href={activeProject.demoLink}
													target="_blank"
													rel="noopener noreferrer"
													class="inline-flex items-center text-sm text-red-400 hover:text-red-300"
												>
													<ExternalLink class="mr-1.5 h-4 w-4 shrink-0" /> Demo
												</a>
											{/if}
										</div>
									</div>
								</div>
							{/key}
						{:else}
							<div
								class="text-muted-foreground flex min-h-[200px] items-center justify-center md:h-full"
							>
								Select a project from the list.
							</div>
						{/if}
					</div>

					<div class="mt-auto flex-shrink-0 pt-4 text-right">
						{#if activeProject}
							<Button href={`/blog/${activeProject.slug}`} size="sm" disabled={!activeProject.slug}>
								<span>Read More</span>
								<ArrowRight class="ml-1 h-4 w-4" />
							</Button>
						{/if}
					</div>
				</div>

				<div class="flex h-full flex-col">
					<div class="relative mb-12 flex-grow overflow-hidden md:min-h-[480px]">
						{#key data.page}
							<div
								class="space-y-3 overflow-y-auto pr-2 md:absolute md:inset-0 md:space-y-4"
								style="scrollbar-width: thin; scrollbar-color: rgba(156, 163, 175, 0.4) transparent;"
								in:fly={{ y: 40, duration: 400, delay: 100, easing: cubicOut, opacity: 0 }}
								out:fly={{ y: -40, duration: 300, easing: cubicOut, opacity: 0 }}
							>
								{#if data.projects.length > 0}
									{#each data.projects as project, index (project.slug || index)}
										<button
											type="button"
											onclick={() => (activeIndex = index)}
											class={cn(
												'hover:bg-primary/5 block w-full rounded-lg border border-transparent p-3 text-left transition-colors duration-150 md:p-4',
												activeIndex === index ? 'border-primary/50 bg-primary/10' : 'bg-card'
											)}
										>
											<h4 class="font-semibold">{project.title}</h4>
											<p class="mt-1 line-clamp-2 text-sm text-gray-400">{project.excerpt}</p>
										</button>
									{/each}
								{:else}
									<p class="text-muted-foreground p-4">No projects found on this page.</p>
								{/if}
							</div>
						{/key}
					</div>

					<div class="mt-auto flex flex-shrink-0 items-center justify-between gap-4 pt-4">
						<Button
							size="sm"
							variant="outline"
							onclick={() => moveToPage(data.page - 1)}
							disabled={isFirstPage}
						>
							Prev Page
						</Button>
						<span class="text-muted-foreground text-sm font-semibold"> Page {data.page} </span>
						<Button
							size="sm"
							variant="outline"
							onclick={() => moveToPage(data.page + 1)}
							disabled={!hasMoreProjects}
						>
							Next Page
						</Button>
					</div>
				</div>
			</div>
		</main>
	</div>
{/if}

<style>
	.overflow-y-auto::-webkit-scrollbar {
		width: 6px;
	}
	.overflow-y-auto::-webkit-scrollbar-track {
		background: transparent;
	}
	.overflow-y-auto::-webkit-scrollbar-thumb {
		background-color: rgba(156, 163, 175, 0.4);
		border-radius: 3px;
	}
</style>
