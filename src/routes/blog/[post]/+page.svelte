<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { ArrowLeft, CalendarIcon, Clock } from 'lucide-svelte';
	import { page } from '$app/state';
	import Contact from '$lib/components/contact.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	let { data } = $props();
	const { PostContent } = data;
</script>

<Seo
	title={data.meta.title}
	type="article"
	description={data.meta.metaDescription}
	keywords={data.meta.metaKeywords}
	canonical={page.url.origin + page.url.pathname}
	imageWidth={data.meta.coverWidth}
	imageHeight={data.meta.coverHeight}
	openGraph={{
		author: 'Lucky Auto',
		publishedTime: data.meta.date,
		modifiedTime: data.meta.date,
		tag: data.meta.metaKeywords
	}}
	facebook={{
		appId: '61571748624208'
	}}
/>

<article class="mx-auto max-w-3xl px-4 pt-32 pb-16">
	<a href={'/blog'} class="text-muted-foreground hover:text-foreground mb-8 flex items-center">
		<ArrowLeft class="mr-2 h-4 w-4" />
		Back to all posts
	</a>

	<Badge class="mb-4">{data.meta.category}</Badge>

	<h1 class="mb-4 text-4xl font-bold lg:text-5xl">{data.meta.title}</h1>

	<div class="text-muted-foreground mb-8 flex items-center space-x-4">
		<div class="flex items-center">
			<CalendarIcon class="mr-2 h-4 w-4" />
			<span>{data.meta.date}</span>
		</div>
		<div class="flex items-center">
			<Clock class="mr-2 h-4 w-4" />
			<span>{data.meta.readingTime} min</span>
		</div>
	</div>

	<div class="relative mb-8 aspect-video overflow-hidden rounded-lg">
		<img src={data.meta.coverImage} alt={data.meta.title} class="object-cover" />
	</div>

	<div class="blog-content prose">
		<PostContent />
	</div>
	<Contact form={data.form} />
</article>
