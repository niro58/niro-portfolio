<script lang="ts">
	import { cn } from '$lib/utils/common';
	import type { Component } from 'svelte';

	const {
		title,
		description,
		items,
		class: className
	}: {
		title: string;
		description: string;
		items: {
			title: string;
			description: string;
			icon: Component;
		}[];
		class?: string;
	} = $props();
</script>

<section class={cn('relative py-16', className)}>
	<div class="relative mx-auto">
		<div class="mx-auto max-w-6xl">
			<div class="grid gap-12 md:grid-cols-2">
				<div class="space-y-8">
					<h2 class="text-foreground text-3xl font-bold md:text-4xl">
						{title}
					</h2>

					<p class="text-lg leading-relaxed text-gray-400">
						{description}
					</p>
				</div>

				<div class="grid gap-6">
					{#each items as feature}
						<div
							class="border-foreground/10 bg-foreground/5 flex gap-6 rounded-xl border p-6 backdrop-blur-sm"
						>
							<div class="bg-primary/10 text-primary h-12 rounded-lg p-3">
								<feature.icon class="h-6 w-6" />
							</div>
							<div>
								<h3 class="text-foreground mb-2 font-semibold">{feature.title}</h3>
								<p class="text-sm text-gray-400">{feature.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
