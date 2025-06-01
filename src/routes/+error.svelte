<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { Home, RefreshCcw } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<div transition:fly={{ y: 20, duration: 500 }} class="text-center">
		<h1 class="mb-4 text-6xl font-bold">
			<span class="from-primary to-primary/75 bg-gradient-to-r bg-clip-text text-transparent">
				404
			</span>
		</h1>
		<h2 class="mb-4 text-3xl font-semibold">Page Not Found</h2>
		<p class="text-neutral-backgroud mb-8 text-xl">
			Oops! The page you're looking for doesn't exist.
		</p>
		<div class="flex justify-center space-x-4">
			<div class="transition-all hover:scale-105 active:scale-95">
				<Button href="/">
					<Home class="mr-2 h-5 w-5" />
					Go Home
				</Button>
			</div>
			<div class="transition-all hover:scale-105 active:scale-95">
				<Button variant="outline" onclick={() => window.location.reload()}>
					<RefreshCcw class="mr-2 h-5 w-5" />
					Refresh Page
				</Button>
			</div>
		</div>
	</div>
</div>
