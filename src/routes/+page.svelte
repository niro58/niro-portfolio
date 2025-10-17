<script>
	import { page } from '$app/state';
	import { appPages } from '$config/pages.js';
	import About from '$lib/components/about.svelte';
	import Contact from '$lib/components/contact.svelte';

	import Hero from '$lib/components/hero.svelte';
	import Journey from '$lib/components/journey.svelte';
	import PostShort from '$lib/components/post-short.svelte';
	import Stack from '$lib/components/stack.svelte';
	import { generateSeoProps } from '$modules/seo.js';
	import Seo from '$ui/seo/seo.svelte';

	let { data } = $props();
</script>

<Seo
	{...generateSeoProps(
		{
			type: 'WebPage',
			seoTitle: 'Home | Niro',
			seoDescription:
				'Hi, I’m Nichita Roilean developer from Prague who loves building things with code. From full-stack web apps to data-driven tools, this is my space to share my journey and projects.',
			seoKeywords:
				'full-stack developer, svelte projects, data analytics, code journey, go developer'
		},
		page.url
	)}
/>

<main class="min-h-screen">
	<Hero />
	<About />
	<Journey />
	<Stack />
	{#if data.posts.type === 'SUCCESS'}
		<section id="blog" class="py-20">
			<div class="container mx-auto px-4">
				<h2 class="mb-10 text-center text-3xl font-bold">
					<span class="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
						Latest Posts
					</span>
				</h2>
				<div class="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each data.posts.data as post}
						<PostShort {post} />
					{/each}
				</div>
				<div class="text-center">
					<a
						href={appPages.blog.path()}
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
