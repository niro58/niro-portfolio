<script module lang="ts">
	export type BlogSection = {
		id: string;
		title: string;
		icon: Component;
		yPos: number;
		items?: BlogSection[];
	};
</script>

<script lang="ts">
	import { cn, moveToSection } from '$lib/utils';
	import { ChevronRight } from '@lucide/svelte';
	import type { Component } from 'svelte';
	import { scrollY } from 'svelte/reactivity/window';

	let activeSection = $state('installation');

	$effect(() => {
		let newSection = activeSection;

		for (let i = 0; i < sections.length; i++) {
			const yp = sections[i].yPos || 0;
			if (!scrollY.current || scrollY.current < yp) {
				break;
			}
			newSection = sections[i].id;
		}

		if (newSection != activeSection) {
			activeSection = newSection;
		}
	});

	const {
		sections
	}: {
		sections: BlogSection[];
	} = $props();
</script>

<div
	class="bg-card ring-primary/50 fixed inset-y-8 top-32 left-48 z-50 flex h-[80vh] w-64 -translate-x-1/2 flex-col rounded-xl text-white shadow-lg ring-2"
>
	<div class="flex-1 overflow-y-auto p-2">
		{#each sections as section (section.id)}
			<div class="mb-4">
				<button
					onclick={(e) => moveToSection(e, section.id)}
					class={cn(
						'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors',
						activeSection === section.id
							? 'border-primary bg-primary/20 text-primary border-l-2'
							: 'hover:bg-primary/10 text-foreground/80 border-l-2 border-transparent'
					)}
				>
					<section.icon class="h-4 w-4" />
					<span class="font-mono font-medium">{section.title}</span>
					{#if section.items}
						<ChevronRight
							class={cn(
								'ml-auto h-4 w-4 transition-transform',
								activeSection === section.id ||
									section.items.some((sub) => activeSection === sub.id)
									? 'rotate-90'
									: ''
							)}
						/>
					{/if}
				</button>

				{#if section.items}
					<div
						class={cn(
							'border-primary/50 mt-1 ml-2 space-y-1 border-l pl-4',
							section.items.some((sub) => activeSection === sub.id) || activeSection === section.id
								? 'block'
								: 'hidden'
						)}
					>
						{#each section.items as subsection (subsection.id)}
							<button
								onclick={(e) => moveToSection(e, subsection.id)}
								class={cn(
									'flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors',
									activeSection === subsection.id
										? 'bg-primary/10 text-primary'
										: 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
								)}
							>
								<span class="font-mono">
									<span
										class={cn(
											activeSection === subsection.id ? 'font-semibold' : 'text-muted-foreground'
										)}
										>→
									</span>
									{subsection.title}
								</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
