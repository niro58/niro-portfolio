<script lang="ts">
	import './prose.css';
	import Seo from '$lib/components/seo.svelte';
	import { ArrowLeft, CalendarIcon, Clock, ExternalLink, Github, Globe } from 'lucide-svelte';
	import { page } from '$app/state';
	import Contact from '$lib/components/contact.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { onMount } from 'svelte';
	import type { PostSection } from '$lib/types.js';
	import { fade } from 'svelte/transition';
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	let { data } = $props();
	const { PostContent } = data;

	const sections: PostSection[] = $state([]);
	onMount(() => {
		const headings = document.querySelectorAll('h2, h3');
		let currSection: PostSection | undefined;
		headings.forEach((heading) => {
			const id = heading.id;
			const title = heading.textContent;
			if (!id || !title) return;

			const section: PostSection = {
				id: id,
				title: title,
				items: []
			};

			if (heading.tagName === 'H2') {
				if (currSection) {
					sections.push(currSection);
				}
				currSection = section;
			} else if (currSection) {
				currSection.items?.push(section);
			}
		});
		if (currSection) {
			sections.push(currSection);
		}

		const codeBlocks = document.querySelectorAll('pre');
		const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
		const checkmarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
		codeBlocks.forEach((codeBlock) => {
			codeBlock.addEventListener('mouseenter', () => {
				if (codeBlock.querySelector('#copyButton')) return;
				const copyButton = document.createElement('button');
				copyButton.id = 'copyButton';
				copyButton.innerHTML = copyIcon;
				copyButton.className = `absolute right-4 top-4 ${buttonVariants({ variant: 'outline' })}`;
				copyButton.onclick = () => {
					const code = codeBlock.querySelector('code')?.innerText || '';
					navigator.clipboard.writeText(code).then(() => {
						copyButton.innerHTML = checkmarkIcon;
						setTimeout(() => {
							copyButton.innerHTML = copyIcon;
						}, 2000);
					});
				};
				codeBlock.appendChild(copyButton);
				codeBlock.classList.add('relative');
			});
			codeBlock.addEventListener('mouseleave', () => {
				const copyButton = codeBlock.querySelector('#copyButton');
				if (copyButton) {
					codeBlock.removeChild(copyButton);
				}
			});
		});
	});
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
		author: 'Nichita Roilean',
		publishedTime: data.meta.date,
		modifiedTime: data.meta.date,
		tag: data.meta.metaKeywords
	}}
/>

<div class="to-primary/10 from-background min-h-screen bg-gradient-to-b">
	<div class="flex">
		<article class="mx-auto max-w-3xl px-4 pt-16 pb-16">
			<a href={'/blog'} class="text-muted-foreground hover:text-foreground mb-8 flex items-center">
				<ArrowLeft class="mr-2 h-4 w-4" />
				Back to all posts
			</a>
			<div class="mb-4 flex justify-between">
				<div class="flex gap-4">
					{#if data.meta.githubLink}
						<a
							href={data.meta.githubLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center text-red-400 hover:text-red-300"
							in:fade={{ duration: 500 }}
							out:fade={{ duration: 500 }}
						>
							<Github class="mr-2" /> View on GitHub
						</a>
					{/if}
					{#if data.meta.appLink}
						<a
							href={data.meta.appLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center text-red-400 hover:text-red-300"
							in:fade={{ duration: 500 }}
							out:fade={{ duration: 500 }}
						>
							<Globe class="mr-2" /> App Link
						</a>
					{/if}
					{#if data.meta.demoLink}
						<a
							href={data.meta.demoLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center text-red-400 hover:text-red-300"
							in:fade={{ duration: 500 }}
							out:fade={{ duration: 500 }}
						>
							<ExternalLink class="mr-2" /> Live Demo
						</a>
					{/if}
				</div>
				<Badge class="mb-4">{data.meta.category}</Badge>
			</div>

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

			<div class="prose lg:prose-xl pb-12">
				<PostContent />
			</div>
			<Contact form={data.form} />
		</article>
		<!-- <PostSidebar {sections} /> -->
	</div>
</div>
