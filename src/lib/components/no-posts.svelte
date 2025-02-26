<script lang="ts">
	import { PenTool } from 'lucide-svelte';

	import { fly } from 'svelte/transition';

	const { type }: { type: 'portfolio' | 'blog' } = $props();

	const texts = {
		portfolio: {
			title: 'What I’ve Been Building',
			message_1: 'Oops! Nothing to show here... yet.',
			message_2:
				'Looks like this section is still under construction. I’m busy building some projects to showcase here, so check back soon!'
		},
		blog: {
			title: 'Blog Posts',
			message_1: 'No posts? No problem!',
			message_2: 'This page is brand new, and I’m working on some great content. Check back soon!'
		}
	};
	const text = texts[type];
</script>

<div class="min-h-screen">
	<main class="container mx-auto px-4 py-12">
		<h1 class="mb-12 text-center text-4xl font-bold">
			<span class="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent"
				>{text.title}</span
			>
		</h1>
		<div transition:fly={{ y: 20, duration: 500 }} class="text-center">
			<PenTool class="mx-auto mb-4 h-16 w-16 text-red-400" />
			<h2 class="mb-2 text-2xl font-semibold text-red-300">{text.message_1}</h2>
			<p class="mb-4 text-gray-400">{text.message_2}</p>
		</div>
	</main>
</div>
