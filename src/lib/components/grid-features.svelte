<script lang="ts">
	import { cn } from '$lib/utils/common';
	import { Check, Lock } from '@lucide/svelte';
	import type { Component } from 'svelte';

	const {
		title,
		features,
		featuredIcon: FeaturedIcon = Lock,
		featuredTitle,
		featuredDescription,
		class: className
	}: {
		title: string;
		features: string[];
		featuredIcon?: Component;
		featuredTitle: string;
		featuredDescription: string;
		class?: string;
	} = $props();
</script>

<section class={cn('relative py-16', className)}>
	<div class="relative mx-auto">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">
				{title}
			</h2>

			<div class="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature}
					<div
						class="border-foreground/10 bg-foreground/5 flex items-start gap-4 rounded-xl border p-6 backdrop-blur-sm"
					>
						<div class="bg-primary/10 text-primary rounded-lg p-2">
							<Check class="h-5 w-5" />
						</div>
						<div>
							<h3 class="font-medium">{feature}</h3>
						</div>
					</div>
				{/each}
			</div>
			<div
				class="from-primary to-primary relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 md:p-12"
			>
				<div
					class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:5rem_5rem] opacity-10"
				></div>

				<div class="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
					<div class="bg-foreground/10 rounded-full p-4">
						<FeaturedIcon class="h-8 w-8" />
					</div>
					<div>
						<h3 class="mb-2 text-xl font-semibold md:text-2xl">{featuredTitle}</h3>
						<p class="text-foreground/90">
							{featuredDescription}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
