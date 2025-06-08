<script lang="ts">
	import { cn } from '$lib/utils';
	import { X, Menu, Book } from '@lucide/svelte';
	import type { Component } from 'svelte';
	import type { Metadata } from '$lib/types';
	import BlogSidebarContent from './blog-sidebar-content.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	const {
		meta
	}: {
		meta: Metadata;
	} = $props();

	let isMobileOpen = $state(false);
</script>

<Button
	size="icon"
	variant="outline"
	onclick={() => (isMobileOpen = !isMobileOpen)}
	class="fixed top-4 right-4 z-[60] lg:hidden"
>
	{#if isMobileOpen}
		<X class="h-5 w-5" />
	{:else}
		<Book class="h-5 w-5" />
	{/if}
</Button>

{#if isMobileOpen}
	<button
		class="fixed inset-0 z-40 bg-black/50 lg:hidden"
		onclick={() => (isMobileOpen = false)}
		aria-label="Close sidebar"
	></button>
{/if}

<!-- Desktop Sidebar -->
<div
	class="bg-sidebar border-accent/30 fixed top-0 left-0 z-40 hidden h-full w-64 flex-col border-r lg:flex"
>
	<BlogSidebarContent {meta} />
</div>

<!-- Mobile Sidebar -->
<div
	class={cn(
		'bg-sidebar border-accent/30 fixed top-0 left-0 z-50 flex h-full w-80 transform flex-col border-r transition-transform duration-300 lg:hidden',
		isMobileOpen ? 'translate-x-0' : '-translate-x-full'
	)}
>
	<BlogSidebarContent {meta} />
</div>
