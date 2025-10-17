<script lang="ts">
	import { categoryIcons, tools } from '$config/tools';
	import ToolCard from './tool-card.svelte';

	const categories = Array.from(new Set(tools.map((tool) => tool.category)));
</script>

<div class="space-y-16">
	{#each categories as category}
		{@const Icon = categoryIcons[category]}
		{@const categoryTools = tools.filter((tool) => tool.category === category)}
		{@const featuredTool = categoryTools.find((tool) => tool.featured)}
		{@const regularTools = categoryTools.filter((tool) => !tool.featured)}

		<section>
			<div class="mb-8 flex items-center gap-3">
				<Icon class="text-accent h-4 w-4" />
				<h2 class="text-muted-foreground text-sm font-medium tracking-wider uppercase">
					{category}
				</h2>
			</div>

			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#if featuredTool}
					<div class="md:col-span-2 lg:row-span-2">
						<ToolCard tool={featuredTool} featured />
					</div>
				{/if}
				{#each regularTools as tool}
					<ToolCard {tool} />
				{/each}
			</div>
		</section>
	{/each}
</div>
