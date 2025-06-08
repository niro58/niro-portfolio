<script>
	import { page } from '$app/state';
	import About from '$lib/components/about.svelte';
	import Contact from '$lib/components/contact.svelte';

	import Hero from '$lib/components/hero.svelte';
	import Journey from '$lib/components/journey.svelte';
	import PostShort from '$lib/components/post-short.svelte';
	import Seo from '$lib/components/seo.svelte';
	import Stack from '$lib/components/stack.svelte';

	let { data } = $props();
</script>

<Seo
	title="Home | Niro"
	description="Hi, I’m Nichita Roilean developer from Prague who loves building things with code. From full-stack web apps to data-driven tools, this is my space to share my journey and projects."
	keywords="full-stack developer, svelte projects, data analytics, code journey, go developer"
	canonical={page.url.origin + page.url.pathname}
/>
<main class="min-h-screen">
	<Hero />
	<About />
	<Journey />
	<Stack />
	{#if data.posts.length > 0}
		<section id="blog" class="py-20">
			<div class="container mx-auto px-4">
				<h2 class="mb-10 text-center text-3xl font-bold">
					<span class="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
						Latest Posts
					</span>
				</h2>
				<div class="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each data.posts as post}
						<PostShort {post} />
					{/each}
				</div>
				<div class="text-center">
					<a
						href="/blog"
						class="from-primary hover:shadow-primary/50 rounded-full bg-gradient-to-r to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
					>
						View More Posts
					</a>
				</div>
			</div>
		</section>
	{/if}
	<div id="contact">
		<Contact form={data.form} />
	</div>
</main>
