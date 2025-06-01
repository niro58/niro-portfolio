<script lang="ts">
	import type { PostSection } from '$lib/types';
	import { ChevronRight } from '@lucide/svelte';

	const { sections }: { sections: PostSection[] } = $props();

	let activeId = $state('');

	$effect(() => {
		const handleScroll = () => {
			let currentSection = '';
			sections.forEach((section) => {
				const element = document.getElementById(section.id);
				if (element && window.scrollY >= element.offsetTop - 100) {
					currentSection = section.id;
				}
				if (section.items) {
					section.items.forEach((subSection: PostSection) => {
						const subElement = document.getElementById(subSection.id);
						if (subElement && window.scrollY >= subElement.offsetTop - 100) {
							currentSection = subSection.id;
						}
					});
				}
			});
			activeId = currentSection;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const handleSelect = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};
</script>

{#snippet SidebarItem(
	section: PostSection,
	level: number,
	activeId: string,
	onSelect: (id: string) => void
)}
	{@const hasItems = section.items && section.items.length > 0}
	<div class="text-card-foreground">
		<button
			onclick={() => {
				onSelect(section.id);
			}}
			class={`hover:text-primary flex w-full items-center py-0.5 text-left transition-colors ${
				activeId === section.id ? 'text-primary bg-[#1e3c3c]' : ''
			}`}
			style={`paddingLeft:${level * 16}px`}
		>
			{#if hasItems}
				<span class="mr-1">
					<ChevronRight class="h-4 w-4" />
				</span>
			{/if}
			<span class="font-mono text-sm">{section.title}</span>
		</button>
		{#if hasItems}
			<div>
				{#each section.items ?? [] as item}
					{@render SidebarItem(item, level + 1, activeId, onSelect)}
				{/each}
			</div>
		{/if}
	</div>
{/snippet}
<aside class="border-primary/20 bg-card/50 fixed left-12 h-full w-64 overflow-y-auto border-r">
	<div class="p-4 pt-12">
		<h2 class="border-primary text-primary mb-4 border-b pb-2 font-mono text-sm">Index</h2>
		<nav class="space-y-1">
			{#each sections as section}
				{@render SidebarItem(section, 0, activeId, (id: string) => {
					activeId = id;
				})}
			{/each}
		</nav>
	</div>
</aside>
