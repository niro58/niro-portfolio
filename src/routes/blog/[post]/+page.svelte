<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { page } from '$app/state';
	import Contact from '$lib/components/contact.svelte';
	import { onMount } from 'svelte';
	import type { PostSection } from '$lib/types.js';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import BlogSidebar from '$lib/components/blog/blog-sidebar.svelte';
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
		publishedTime: data.meta.createdAt,
		modifiedTime: data.meta.createdAt,
		tag: data.meta.metaKeywords
	}}
/>
<BlogSidebar meta={data.meta} />
<div class="min-h-screen">
	<article class="lg:ml-64 pt-16 lg:pt-0">
		<div class="max-w-3xl mx-auto py-12 px-4 lg:px-8">
			<div class="border-card mb-12 border-b pb-8">
				<div class="bg-card/50 rounded-lg border border-primary/50 p-6">
					<h1 class="mb-4 font-mono text-3xl font-bold lg:text-4xl">
						{data.meta.title}
					</h1>
					<p class="text-lg leading-relaxed text-gray-300">
						{data.meta.excerpt}
					</p>
					<div class="mt-4 flex items-center gap-2">
						<div class="space-x-2 font-mono text-sm text-gray-400">
							{#each data.meta.tags as tag}
								<span
									class="rounded border border-primary/50 bg-red-900/30 px-2 py-1 font-mono text-xs text-gray-300"
								>
									#{tag}
								</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
	
			<div class="relative mb-8 aspect-video overflow-hidden rounded-lg">
				<img src={data.meta.coverImage} alt={data.meta.title} class="object-cover" />
			</div>
	
			<div class="prose prose-primary lg:prose-xl pb-12">
				<PostContent />
			</div>
			<Contact form={data.form} />
		</div>
	</article>
</div>
