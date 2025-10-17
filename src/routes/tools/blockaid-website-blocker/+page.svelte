<script module>
	const faqs = [
		{
			question: 'How do I block a website?',
			answer:
				'You can block entire domains, specific pages, or even patterns like "xyz.com/sad/*" to block everything after a specific path. You can also block the current page with one click.'
		},
		{
			question: 'Can I schedule blocking times?',
			answer:
				'Yes! BlockAid allows you to set custom schedules, like blocking during work hours (8am–5pm) or on weekends. You can also create your own custom schedules.'
		},
		{
			question: 'Does BlockAid work on all websites?',
			answer: 'Yes, you can block any website, domain, or specific pages within a domain.'
		},
		{
			question: 'Is my data safe?',
			answer:
				'Absolutely. BlockAid is open-source and works entirely on your device. No data is collected, shared, or sent anywhere. You can verify the code yourself on <a href="https://github.com/niro58/website-blocker-extension-svelte" target="_blank" class="text-primary underline">GitHub</a>.'
		},
		{
			question: 'Where can I download BlockAid?',
			answer:
				'You can download it from the <a href="https://chromewebstore.google.com/detail/blockaid-website-blocker/cginnmmbhcfboaliincmendnddelbdbf" target="_blank" class="text-primary underline">Chrome Web Store</a>.'
		},
		{
			question: 'How do I view the source code?',
			answer:
				'BlockAid is open-source! You can view and contribute to the code on <a href="https://github.com/niro58/website-blocker-extension-svelte" target="_blank" class="text-primary underline">GitHub</a>.'
		}
	];

	const features = [
		'Block Specific Domains or Pages',
		'Advanced URL Patterns',
		'Custom Scheduling',
		'Local & Private',
		'Open-Source & Transparent',
		'Easy to Use'
	];
</script>

<script>
	import Button from '$ui/button/button.svelte';

	import Seo from '$ui/seo/seo.svelte';

	import { Lock, Globe, Clock, Shield, Gift, Settings, Check } from '@lucide/svelte';
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
			seoTitle: 'Blockaid | Niro',
			seoDescription:
				'BlockAid is a powerful Chrome extension to block distracting websites. Block domains, specific pages, or schedule blocking times—all.',
			seoKeywords:
				'website blocker, block distractions, productivity tool, block websites, focus tool, chrome extension, open-source website blocker'
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
				<div>Block<span class="text-primary">.</span></div>
				<div>Focus<span class="text-primary">.</span></div>
				<div>
					Thrive<span class="text-primary">.</span>
				</div>
			</h1>
			<p class="text-neutral-foreground mb-8 text-xl sm:text-2xl">
				Take control of your online distractions with BlockAid.
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
							Block<span class="text-primary">Aid</span>
						</div>
					</div>
					<div class="space-y-4">
						<div class="h-4 w-3/4 rounded bg-gray-700"></div>
						<div class="h-4 rounded bg-gray-700"></div>
						<div class="h-4 w-5/6 rounded bg-gray-700"></div>
						<div class="h-4 w-1/2 rounded bg-gray-700"></div>
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
				href="https://chromewebstore.google.com/detail/blockaid-website-blocker/cginnmmbhcfboaliincmendnddelbdbf"
				target="_blank"
				class="rounded-full"
				size="lg"
				>Download BlockAid
			</Button>
		</div>
	</div>
</div>

<AboutFeatures
	title="Take Control of Your Focus"
	description="BlockAid helps you stay productive by blocking distracting websites. Block entire domains, specific pages, or even use advanced URL patterns. Set custom schedules to block sites during work hours, weekends, or anytime you need to focus."
	items={[
		{
			title: 'Block Specific Domains or Pages',
			description: 'Block entire domains or specific pages with ease.',
			icon: Lock
		},
		{
			title: 'Advanced URL Patterns',
			description: 'Use patterns like "xyz.com/sad/*" to block everything after a specific path.',
			icon: Globe
		},
		{
			title: 'Custom Scheduling',
			description: 'Block sites during work hours, weekends, or any custom schedule.',
			icon: Clock
		}
	]}
/>

<GridFeatures
	title="Why Choose BlockAid?"
	{features}
	featuredTitle="Your Privacy, Guaranteed"
	featuredDescription="BlockAid is open-source and works entirely on your device. No data is collected, shared, or stored. Your browsing stays private and secure."
/>
<QaItems items={faqs} />
