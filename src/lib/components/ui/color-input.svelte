<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		backgroundColor = $bindable(),
		opacity = $bindable(),
		children
	}: {
		backgroundColor?: string;
		opacity?: number;
		children?: Snippet;
	} = $props();
	let colorRef: HTMLInputElement | undefined = $state();
</script>

<div class="relative w-full">
	<input
		type="color"
		bind:this={colorRef}
		bind:value={backgroundColor}
		oninput={() => (opacity = colorRef?.value ? 1 : 0)}
		class="w-full rounded-lg border border-foreground/40 bg-transparent"
	/>
	<button
		aria-label="Color Picker"
		type="button"
		class="absolute inset-0 z-30 rounded-lg"
		onclick={() => colorRef?.click()}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				colorRef?.click();
			}
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			class="absolute inset-0 rounded-lg"
			style="pointer-events: none;"
		>
			<defs>
				<pattern id="transparentPattern" patternUnits="userSpaceOnUse" width="10" height="10">
					<rect width="10" height="10" fill="white" />
					<rect width="5" height="5" fill="lightgray" />
					<rect x="5" y="5" width="5" height="5" fill="lightgray" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#transparentPattern)" />
		</svg>
		<div
			class="absolute inset-0 rounded-lg border border-foreground/40"
			style="pointer-events: none; background-color: {backgroundColor === ''
				? '#ffffff'
				: backgroundColor}; opacity: {opacity};"
		></div>
		{#if children}
			<div class="flex items-center justify-center">
				<div class="absolute">
					{@render children()}
				</div>
			</div>
		{/if}
	</button>
</div>
