<script>
	import ToolsGrid from '$lib/components/tools-grid.svelte';
</script>

<main class="dark bg-background min-h-screen">
	<div class="mx-auto max-w-7xl px-6 py-16 md:py-24">
		<header class="mb-16 md:mb-20">
			<div
				class="bg-accent/10 text-accent mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-medium"
			>
				Tools & Projects
			</div>
			<h1
				class="text-foreground mb-4 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl"
			>
				Tools
			</h1>
			<p class="text-muted-foreground max-w-2xl text-lg leading-relaxed md:text-xl">
				A collection of tools and projects I've built to solve problems and experiment with new
				ideas.
			</p>
		</header>

		<ToolsGrid />
	</div>
</main>
