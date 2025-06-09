<script lang="ts">
	import type { Metadata } from '$lib/types';
	import {
		Calendar,
		ChevronRight,
		Clock,
		ExternalLink,
		Github,
		Hash,
		Terminal
	} from '@lucide/svelte';
	import { cn, getIdYPos, moveToSection } from '$lib/utils';
	import { scrollY } from 'svelte/reactivity/window';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';
	const { meta }: { meta: Metadata } = $props();

	type BlogSection = {
		id: string;
		title: string;
		yPos: number;
	};
	type BlogSectionParent = BlogSection & {
		items: BlogSection[];
	};

	let activeSection = $state('installation');

	$effect(() => {
		let newSection = activeSection;

		for (let i = 0; i < sections.length; i++) {
			const yp = sections[i].yPos || 0;
			if (!scrollY.current || scrollY.current < yp) {
				break;
			}
			newSection = sections[i].id;
			
			if (sections[i].items.length === 0) {
				newSection = sections[i].id;
			}

			for (let j = 0; j < sections[i].items.length; j++) {
				const subYPos = sections[i].items[j].yPos || 0;
				if (scrollY.current < subYPos) {
					break;
				}
				newSection = sections[i].items[j].id;
			}
		}

		if (newSection != activeSection) {
			activeSection = newSection;
		}
	});

	function getSections(): BlogSectionParent[] {
		if (!browser) {
			return [];
		}
		const article = document.querySelector('article');
		if (!article) {
			return [];
		}
		const headings = article.querySelectorAll('h2,h3');

		console.log(headings);
		let blogSections: BlogSectionParent[] = [];
		let lastBlogSection: BlogSectionParent | undefined = undefined;
		for (let i = 0; i < headings.length; i++) {
			const heading = headings.item(i);
			if (!heading || !heading.id) {
				continue;
			}

			const title = heading.textContent;
			const yPos = getIdYPos(heading.id || '', 375);
			if (!heading || !title || !yPos) {
				break;
			}
			const blogSection: BlogSection = {
				id: heading.id,
				title: title,
				yPos: yPos
			};
			if (heading.tagName === 'H2') {
				if (lastBlogSection) {
					blogSections.push(lastBlogSection);
				}
				lastBlogSection = {
					...blogSection,
					items: []
				};
			} else if (heading.tagName === 'H3') {
				if (!lastBlogSection) {
					continue;
				}

				lastBlogSection.items.push(blogSection);
			}
		}
		if (lastBlogSection) {
			blogSections.push(lastBlogSection);
		}
		return blogSections;
	}

	let sections: BlogSectionParent[] = $state([]);
	onMount(() => {
		sections = getSections();
		window.addEventListener('resize', () => {
			sections = getSections();
		});
	});
</script>

<div class="border-sidebar-border border-b p-4">
	<div class="mb-3 flex items-center gap-2">
		<Hash class="text-sidebar-primary h-5 w-5" />
		<h2 class="text-sidebar-foreground font-mono text-lg font-bold">
			Table<span class="text-sidebar-primary">.</span>of<span class="text-sidebar-primary">()</span>
		</h2>
	</div>

	<div class="space-y-2 text-xs">
		<div class="text-sidebar-accent-foreground flex items-center gap-2">
			<Calendar class="h-3 w-3" />
			<span class="font-mono">{meta.createdAt}</span>
		</div>
		<div class="text-sidebar-accent-foreground flex items-center gap-2">
			<Clock class="h-3 w-3" />
			<span class="font-mono">{meta.readTime} min</span>
		</div>
		<div class="text-sidebar-accent font-mono">
			updatedAt: <span class="text-sidebar-primary">{meta.updatedAt}</span>
		</div>
	</div>
</div>

<div class="flex-1 overflow-y-auto p-2">
	{#each sections as section}
		<div class="mb-4">
			<button
				onclick={(e) => moveToSection(e, section.id)}
				class={cn(
					'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors',
					activeSection === section.id
						? 'border-sidebar-primary bg-sidebar-primary/20 text-sidebar-primary border-l-2'
						: 'text-sidebar-accent-foreground hover:bg-sidebar-accent border-l-2 border-transparent'
				)}
			>
				<span class="font-mono text-sm font-medium">{section.title}</span>
				{#if section.items.length > 0}
					<ChevronRight
						class={cn(
							'ml-auto h-4 w-4 transition-transform',
							activeSection === section.id || section.items.some((sub) => activeSection === sub.id)
								? 'rotate-90'
								: ''
						)}
					/>
				{/if}
			</button>

			{#if section.items.length > 0}
				<div
					class={cn(
						'border-sidebar-border mt-1 ml-2 space-y-1 border-l pl-4',
						section.items.some((sub) => activeSection === sub.id) || activeSection === section.id
							? 'block'
							: 'hidden'
					)}
				>
					{#each section.items as subsection}
						<button
							onclick={(e) => moveToSection(e, subsection.id)}
							class={cn(
								'flex w-full items-center gap-2 rounded-md  py-1.5 text-left text-sm transition-colors',
								activeSection === subsection.id
									? 'bg-sidebar-primary/10 text-sidebar-primary'
									: 'text-sidebar-accent-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
							)}
						>
							<span class="font-mono">
								<span class="text-sidebar-accent">→ </span>
								{subsection.title.length > 22
									? subsection.title.slice(0, 22) + '...'
									: subsection.title}
							</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>

<div class="border-sidebar-border border-t p-4">
	<h3 class="text-sidebar-accent-foreground mb-3 flex items-center gap-2 font-mono text-sm">
		<ExternalLink class="h-4 w-4" />
		Links<span class="text-sidebar-primary">[]</span>
	</h3>
	<div class="space-y-2">
		<Button
			href={meta.githubLink}
			target="_blank"
			rel="noopener noreferrer"
			class="w-full justify-between"
			disabled={!meta.githubLink}
		>
			<div class="flex flex-row gap-2">
				<Github
					class="text-sidebar-accent-foreground group-hover:text-sidebar-foreground h-4 w-4"
				/>
				<span
					class="text-sidebar-accent-foreground group-hover:text-sidebar-foreground font-mono text-sm"
					>GitHub</span
				>
			</div>
			<ExternalLink />
		</Button>
		<Button
			href={meta.appLink}
			target="_blank"
			rel="noopener noreferrer"
			class="w-full justify-between"
			disabled={!meta.appLink}
		>
			<div class="flex flex-row gap-2">
				<Terminal class="text-sidebar-accent-foreground group-hover:text-sidebar-primary h-4 w-4" />
				<span
					class="text-sidebar-accent-foreground group-hover:text-sidebar-foreground font-mono text-sm"
					>App</span
				>
			</div>
			<ExternalLink />
		</Button>
	</div>
</div>
