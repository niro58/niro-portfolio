<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { Toaster } from '$ui/sonner';
	import '../app.css';
	let { children } = $props();
</script>

<Navbar />
<Toaster />

{@render children()}
