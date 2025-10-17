<script lang="ts">
	import type { Tool } from '$lib/types/common';
	import Card from '$ui/card/card.svelte';
	import { ArrowUpRight } from '@lucide/svelte';

	const {
		tool,
		featured
	}: {
		tool: Tool;
		featured?: boolean;
	} = $props();

	const cardProps = tool.url
		? {
				href: tool.url,
			}
		: {};
</script>

{#snippet child()}
	<div
		class="from-accent/5 absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
	></div>

	<div class="relative flex h-full flex-col">
		<div class="mb-auto flex items-start justify-between gap-4">
			<div class="flex-1">
				<h3
					class={`text-card-foreground group-hover:text-accent mb-3 font-semibold transition-colors ${
						featured ? 'text-2xl md:text-3xl' : 'text-xl'
					}`}
				>
					{tool.name}
				</h3>
				<p
					class={`text-muted-foreground leading-relaxed ${featured ? 'text-base md:text-lg' : 'text-sm'}`}
				>
					{tool.description}
				</p>
			</div>
			{#if tool.url}
				<ArrowUpRight
					class="text-muted-foreground group-hover:text-accent h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
				/>
			{/if}
		</div>
		{#if tool.year}
			<div class="mt-6 flex items-center gap-2">
				<div class="bg-border h-px flex-1"></div>
				<span class="text-muted-foreground text-xs font-medium">{tool.year}</span>
			</div>
		{/if}
	</div>
{/snippet}

{#if tool.url}
	<a
		{...cardProps}
		class={`group border-border bg-card hover:border-accent/50 relative block overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
			tool.url ? 'cursor-pointer' : ''
		} ${featured ? 'md:p-8 lg:p-10' : ''}`}>{@render child()}</a
	>
{:else}
	<div
		{...cardProps}
		class={`group border-border bg-card hover:border-accent/50 relative block overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
			tool.url ? 'cursor-pointer' : ''
		} ${featured ? 'md:p-8 lg:p-10' : ''}`}
	>
		{@render child()}
	</div>
{/if}
