<script>
	import About from '$lib/components/about.svelte';
	import Blog from '$lib/components/blog.svelte';
	import Contact from '$lib/components/contact.svelte';

	import Hero from '$lib/components/hero.svelte';
	import Journey from '$lib/components/journey.svelte';
	import Seo from '$lib/components/seo.svelte';
	import Stack from '$lib/components/stack.svelte';

	let { data } = $props();
</script>

<Seo title="Nichita Roilean" />
<main class="min-h-screen">
	<Hero />
	<About />
	<Journey />
	<Stack />
	<Blog />
	<Contact form={data.form} />
</main>
