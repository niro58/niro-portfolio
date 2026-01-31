<script lang="ts">
	import type { Component } from 'svelte';

	const { icon: Icon }: { icon: Component } = $props();
</script>

<div class="bg-primary/10 rounded-md p-2">
	<Icon class="text-primary h-5 w-5" />
</div>
