<script module>
	const faqs = [
		{
			question: 'How do I block keywords?',
			answer:
				'Go to the settings and add any keyword or phrase to your blocklist. Any Hacker News post with that keyword in the title will be hidden from your feed.'
		},
		{
			question: 'How do I bookmark a post?',
			answer:
				'Simply click the bookmark icon next to any post title. You can find all your saved posts in the "Bookmarks" section.'
		},
		{
			question: 'Can I switch between different story feeds?',
			answer:
				'Yes! You can easily toggle between the "Top", "New", and "Best" Hacker News stories right from the main view.'
		},
		{
			question: 'Is my data private?',
			answer:
				'Absolutely. HN Reader is designed for privacy. Your blocklist and bookmarks are stored only in your browser. No data is collected, tracked, or sent anywhere. Feel free to inspect the code on <a href="https://github.com/your-repo-link" target="_blank" class="text-primary underline">GitHub</a>.'
		},
		{
			question: 'Where can I get HN Reader?',
			answer:
				'You can download it from the <a href="https://your-chrome-store-link" target="_blank" class="text-primary underline">Chrome Web Store</a>.'
		},
		{
			question: 'Is this project open-source?',
			answer:
				'Yes! You can view, inspect, and contribute to the code on <a href="https://github.com/your-repo-link" target="_blank" class="text-primary underline">GitHub</a>.'
		}
	];

	const features = [
		'Block Keywords',
		'Bookmark Posts',
		'Switch Feeds (Top, New, Best)',
		'100% Local & Private',
		'Open-Source',
		'Clean, Minimalist UI'
	];
</script>

<script>
	import Button from '$ui/button/button.svelte';
	import Seo from '$ui/seo/seo.svelte';

	import { Filter, Bookmark, Columns, Github } from '@lucide/svelte';
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
			seoTitle: 'HN Reader | A Better Hacker News Reader',
			seoDescription:
				'HN Reader helps you filter out noise from your Hacker News feed by blocking keywords and saving posts to read later. A simple, private, and clean way to read HN.',
			seoKeywords:
				'hacker news, hn reader, y combinator, filter hacker news, block keywords, tech news, HN Reader, privacy'
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
				<div>Filter<span class="text-primary">.</span></div>
				<div>Save<span class="text-primary">.</span></div>
				<div>
					Read<span class="text-primary">.</span>
				</div>
			</h1>
			<p class="text-neutral-foreground mb-8 text-xl sm:text-2xl">
				A clean and private way to read Hacker News, without the noise.
			</p>
		</div>

		<div in:scale={{ start: 0.8, duration: 800, delay: 200 }} class="relative">
			<div class="absolute inset-0 rounded-3xl bg-black opacity-50"></div>
			<div class="relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
				<div class="from-primary absolute top-0 left-0 h-2 w-full bg-gradient-to-r"></div>
				<div class="p-6 sm:p-10">
					<div class="mb-6 flex items-center justify-between">
						<div class="flex space-x-2">
							<div class="bg-primary h-3 w-3 rounded-full"></div>
							<div class="h-3 w-3 rounded-full bg-gray-600"></div>
							<div class="h-3 w-3 rounded-full bg-gray-600"></div>
						</div>
						<div class="text-neutral-foreground text-sm font-bold">
							<span class="text-primary">HN</span>Reader
						</div>
					</div>
					<div class="space-y-3 font-mono text-sm text-gray-400">
						<div class="flex items-center gap-3">
							<span>1.</span>
							<div class="h-4 w-3/4 rounded-sm bg-gray-700"></div>
							<Bookmark class="text-primary h-4 w-4" />
						</div>
						<div class="flex items-center gap-3">
							<span>2.</span>
							<div class="h-4 w-full rounded-sm bg-gray-700"></div>
						</div>
						<div class="flex items-center gap-3 opacity-40">
							<span>3.</span>
							<div class="h-4 w-5/6 rounded-sm bg-gray-700 line-through"></div>
						</div>
						<div class="flex items-center gap-3">
							<span>4.</span>
							<div class="h-4 w-4/6 rounded-sm bg-gray-700"></div>
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
				href="https://chromewebstore.google.com/detail/hacker-news-reader-filter/effgohcomddcjdfpioaajfgeckmbnjlc?authuser=1&hl=en"
				target="_blank"
				class="rounded-full"
				size="lg"
				>Get HN Reader
			</Button>
			<Button
				variant="outline"
				href="https://github.com/niro58/hackernews-reader"
				target="_blank"
				class="rounded-full"
				size="lg"
				>
				<Github/>
				Github
			</Button>
		</div>
	</div>
</div>

<AboutFeatures
	title="Your Hacker News, Your Way"
	description="Tired of seeing the same topics on Hacker News? HN Reader lets you hide posts with specific keywords and save interesting articles for later, creating a feed that's tailored to you."
	items={[
		{
			title: 'Block Keywords',
			description: "Hide posts about topics you're tired of seeing to reduce noise.",
			icon: Filter
		},
		{
			title: 'Bookmark Posts',
			description: 'Save interesting articles and links with a single click to read later.',
			icon: Bookmark
		},
		{
			title: 'Switch Feeds',
			description: "Easily switch between Top, New, and Best stories to see what's trending.",
			icon: Columns
		}
	]}
/>

<GridFeatures
	title="Why Choose HN Reader?"
	{features}
	featuredTitle="100% Private"
	featuredDescription="HN Reader works entirely in your browser. Your keyword blocklist and bookmarks never leave your device. No analytics, no tracking, period."
/>
<QaItems items={faqs} />
