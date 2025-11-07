<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowRight, Github, Globe } from '@lucide/svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly, fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { cn } from '$lib/utils/common';
	import { AppConfig } from '$config/app';
	import { generateSeoProps } from '$modules/seo';
	import Seo from '$ui/seo/seo.svelte';
	import { page } from '$app/state';
	import CdnImage from '$ui/cdn-image.svelte';

	const { data } = $props();

	let activePage = $state(0);

	const hasNextPage = $derived(data.projects.length > AppConfig.defaultPortfolioLimit);

	const projectsToShow = $derived(
		hasNextPage
			? data.projects.slice(
					activePage * AppConfig.defaultPortfolioLimit,
					activePage * AppConfig.defaultPortfolioLimit + AppConfig.defaultPortfolioLimit
				)
			: data.projects
	);
	let activeProject = $derived(projectsToShow[0]);
</script>

<Seo
	{...generateSeoProps(
		{
			type: 'WebPage',
			seoTitle: 'Portfolio | Niro',
			seoDescription: 'Explore projects developed by Niro.'
		},
		page.url
	)}
/>
{#if data.projects.length === 0 && activePage === 1}
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
					Yo, some of my projects that I have worked on, more will be added soon, if I dont forget
					about it yet again
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
										<CdnImage
											src={activeProject.coverImage}
											alt={activeProject.title}
											width={1000}
											height={600}
											class="aspect-vide w-full rounded-lg object-cover shadow-lg"
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

					<div class="mt-auto pt-4 text-right" style="z-index: 10;">
						{#if activeProject}
							<Button href={`/blog/${activeProject.slug}`} size="lg">
								<span>Read More</span>
								<ArrowRight class="ml-1 h-4 w-4" />
							</Button>
						{/if}
					</div>
				</div>

				<div class="flex h-full flex-col">
					<div class="relative mb-12 flex-grow overflow-hidden md:min-h-[480px]">
						{#key activePage}
							<div
								class="space-y-3 overflow-y-auto pr-2 md:absolute md:inset-0 md:space-y-4"
								style="scrollbar-width: thin; scrollbar-color: rgba(156, 163, 175, 0.4) transparent;"
								in:fly={{ y: 40, duration: 400, delay: 100, easing: cubicOut, opacity: 0 }}
								out:fly={{ y: -40, duration: 300, easing: cubicOut, opacity: 0 }}
							>
								{#if data.projects.length > 0}
									{#each projectsToShow as project, index (project.slug || index)}
										<button
											type="button"
											onclick={() => (activeProject = project)}
											class={cn(
												' hover:bg-primary/5 flex w-full flex-row justify-between rounded-lg border border-transparent p-3 text-left transition-colors duration-150 md:p-4',
												activeProject.slug === project.slug
													? 'border-primary/50 bg-primary/10'
													: 'bg-card'
											)}
										>
											<div>
												<h4 class="font-semibold">{project.title}</h4>
												<p class="mt-1 line-clamp-2 text-sm text-gray-400">{project.excerpt}</p>
											</div>
											<div class="flex flex-col gap-2">
												{#if project.githubLink}
													<Button
														size="icon"
														variant="outline"
														href={project.githubLink}
														target="_blank"
													>
														<Github />
													</Button>
												{/if}
												{#if project.appLink}
													<Button
														size="icon"
														variant="outline"
														href={project.appLink}
														target="_blank"
													>
														<Globe />
													</Button>
												{/if}
											</div>
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
							onclick={() => (activePage -= 1)}
							disabled={activePage === 0}
						>
							Prev Page
						</Button>
						<span class="text-muted-foreground text-sm font-semibold"> Page {activePage + 1} </span>
						<Button
							size="sm"
							variant="outline"
							onclick={() => (activePage += 1)}
							disabled={!hasNextPage}
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
