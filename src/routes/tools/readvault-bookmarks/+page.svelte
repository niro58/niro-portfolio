<script module>
	const faqs = [
		{
			question: 'How do I save a page?',
			answer:
				'Just click the ReadVault icon in your browser and hit "Save Page." The current website will be instantly added to your reading list.'
		},
		{
			question: 'What does "Mark as Urgent" do?',
			answer:
				'Marking a page as "Urgent" pins it to the top of your reading list. It\'s perfect for articles you need to read soon or refer to often.'
		},
		{
			question: 'How does archiving work?',
			answer:
				'Once you are finished with a page, you can archive it to move it from your active list to the archive. This helps keep your reading list clean and focused.'
		},
		{
			question: 'Is my data safe and private?',
			answer:
				'Absolutely. ReadVault is open-source and works entirely on your device using IndexedDB. No data is collected, shared, or sent to any server. You can verify the code yourself on <a href="https://github.com/your-repo-link" target="_blank" class="text-primary underline">GitHub</a>.'
		},
		{
			question: 'Where can I download ReadVault?',
			answer:
				'You can download it from the <a href="https://your-chrome-store-link" target="_blank" class="text-primary underline">Chrome Web Store</a>.'
		},
		{
			question: 'How do I view the source code?',
			answer:
				'ReadVault is open-source! You can view and contribute to the code on <a href="https://github.com/your-repo-link" target="_blank" class="text-primary underline">GitHub</a>.'
		}
	];

	const features = [
		'Save Pages Instantly',
		'Prioritize with Urgency',
		'Easy Archiving',
		'Fast & Local Storage',
		'Open-Source & Private',
		'Simple & Clean UI'
	];
</script>

<script>
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';
	import * as Accordion from '$ui/accordion/index';
	import { moveToSection } from '$lib/utils/common';

	import Button from '$ui/button/button.svelte';

	import Seo from '$ui/seo/seo.svelte';

	import { Bookmark, AlertTriangle, Archive, Shield, Gift, Settings, Check } from '@lucide/svelte';
	import { fly, scale } from 'svelte/transition';
	import { generateSeoProps } from '$modules/seo';
	import { page } from '$app/state';
	import QaItems from '$ui/qa-items.svelte';
	import GridFeatures from '$lib/components/grid-features.svelte';
	import AboutFeatures from '$lib/components/about-features.svelte';
</script>

<Seo
	{...generateSeoProps(
		{
			type: 'WebPage',
			seoTitle: 'ReadVault | Your Ultimate Reading Companion',
			seoDescription:
				"ReadVault is a simple extension to save, organize, and prioritize your reading list. Save articles with one click, mark them as urgent, and archive them when you're done. All data is stored locally.",
			seoKeywords:
				'read later, reading list, save articles, bookmark manager, productivity tool, chrome extension, open-source read later'
		},
		page.url,
		{
			type: 'FAQPage',
			questions: faqs.map((it) => ({
				questionName: it.question,
				acceptedAnswerText: it.answer
			}))
		}
	)}
/>

<div class="container flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-7xl space-y-8">
		<div in:fly={{ y: 20, duration: 800 }} class="text-center">
			<h1
				class="mb-4 flex flex-col text-start text-5xl font-extrabold sm:flex-row sm:items-center sm:justify-center sm:text-6xl md:text-7xl"
			>
				<div>Save<span class="text-primary">.</span></div>
				<div>Organize<span class="text-primary">.</span></div>
				<div>
					Read<span class="text-primary">.</span>
				</div>
			</h1>
			<p class="text-neutral-foreground mb-8 text-xl sm:text-2xl">
				Your ultimate reading companion to capture and manage web content.
			</p>
		</div>

		<div in:scale={{ start: 0.8, duration: 800, delay: 200 }} class="relative">
			<div class="absolute inset-0 rounded-3xl bg-black opacity-50"></div>
			<div class="relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
				<div
					class="from-primary absolute top-0 left-0 h-2 w-full bg-gradient-to-r via-yellow-500 to-green-500"
				></div>
				<div class="p-6 sm:p-10">
					<div class="mb-6 flex items-center justify-between">
						<div class="flex space-x-2">
							<div class="bg-primary h-3 w-3 rounded-full"></div>
							<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
							<div class="h-3 w-3 rounded-full bg-green-500"></div>
						</div>
						<div class="text-neutral-foreground text-sm font-bold">
							Read<span class="text-primary">Vault</span>
						</div>
					</div>
					<div class="space-y-3">
						<div class="flex items-center gap-3 rounded-lg bg-gray-800 p-3 shadow-md">
							<div
								class="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-yellow-400"
								title="Urgent"
							></div>
							<div class="h-4 w-full rounded-md bg-gray-700"></div>
						</div>
						<div class="flex items-center gap-3 rounded-lg bg-gray-800/60 p-3">
							<div class="h-2.5 w-2.5 flex-shrink-0"></div>
							<div class="h-4 w-4/5 rounded-md bg-gray-700"></div>
						</div>
						<div class="flex items-center gap-3 rounded-lg bg-gray-800/60 p-3">
							<div class="h-2.5 w-2.5 flex-shrink-0"></div>
							<div class="h-4 w-2/3 rounded-md bg-gray-700"></div>
						</div>
						<div class="flex items-center gap-3 rounded-lg bg-gray-800/60 p-3">
							<div class="h-2.5 w-2.5 flex-shrink-0"></div>
							<div class="h-4 w-5/6 rounded-md bg-gray-700"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			in:fly={{ y: 20, duration: 800, delay: 400 }}
			class="flex flex-col justify-center gap-3 sm:flex-row"
		>
			<Button
				variant="default"
				href="https://chromewebstore.google.com/detail/readvault-bookmark-organi/pknjnapfdjdgaihmafnnpkpajefkodcn?authuser=1&hl=en"
				target="_blank"
				class="rounded-full"
				size="lg"
				>Download ReadVault
			</Button>
		</div>
	</div>
</div>

<AboutFeatures
	title="Simplify Your Reading Workflow"
	description="ReadVault helps you manage the flood of online content. Save any article, blog post, or website with a single click. Prioritize what's important and archive what's done, all within a fast, local, and private extension."
	items={[
		{
			title: 'Save Any Page Instantly',
			description: 'Add any website to your reading list with just one click.',
			icon: Bookmark
		},
		{
			title: 'Mark as Urgent',
			description: 'Highlight important articles to keep them at the top of your list.',
			icon: AlertTriangle
		},
		{
			title: 'Archive with Ease',
			description: 'Keep your list clean by archiving pages you’re done reading.',
			icon: Archive
		}
	]}
/>

<GridFeatures
	title="Why Choose ReadVault?"
	{features}
	featuredTitle="Your Reading List, Your Data"
	featuredDescription="ReadVault is open-source and works entirely on your browser using IndexedDB. No data is collected, shared, or sent to a server. Your reading list stays private, fast, and completely under your control."
/>
<QaItems items={faqs} />
