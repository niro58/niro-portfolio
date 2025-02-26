<script lang="ts">
	import AnalyticsConsent from '$lib/components/analytics-consent.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Navbar />
{@render children()}
<AnalyticsConsent />
