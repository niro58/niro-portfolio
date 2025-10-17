<script module>
	const faqs = [
		{
			question: 'What video formats are supported?',
			answer:
				'We support MP4, AVI, MKV, MOV, FLV, WebM, and more. You can also convert videos to audio formats like MP3, WAV, and AAC.',
			key: 'video-formats'
		},
		{
			question: 'Will I lose video quality after converting?',
			answer:
				'No, the quality stays the same—no compression is applied. However, converting to certain formats may result in minor quality loss due to codec differences.',
			key: 'video-quality'
		},
		{
			question: 'Can I convert multiple videos at once?',
			answer: 'Yes! You can convert up to 10 videos at once—perfect for bulk processing.',
			key: 'multiple-videos'
		},
		{
			question: 'What is the maximum file size and number of videos I can convert?',
			answer:
				'You can upload videos up to 100 MB each and convert up to 10 videos at the same time.',
			key: 'file-size'
		},
		{
			question: 'Is my data safe?',
			answer:
				'Yes! All processing happens in your browser—no data is ever uploaded to our servers.',
			key: 'data-safety'
		}
	];
	const features = [
		{
			title: 'Convert up to 10 videos at once',
			icon: Video
		},
		{
			title: 'Supports MP4, AVI, MKV, MOV, and more',
			icon: Video
		},
		{
			title: 'Export as single files or ZIP',
			icon: Download
		},
		{
			title: 'No quality loss—high-quality results',
			icon: Video
		},
		{
			title: '100% free—no sign-ups, no hidden fees',
			icon: Lock
		},
		{
			title: 'Process videos up to 100 MB each',
			icon: Video
		}
	];
</script>

<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index';
	import { Download, Video, Lock, Check } from '@lucide/svelte';
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';
	import Seo from '$ui/seo/seo.svelte';
	import { VideoEditor } from '$modules/video-editor.svelte';
	import SelectScreen from '$lib/components/video-converter/video-converter-select-screen.svelte';
	import EditorScreen from '$lib/components/video-converter/video-converter-editor-screen.svelte';

	let videoEditor = $state(new VideoEditor());
</script>

<Seo
	title="Video Converter - Tivoku"
	description="Convert videos in bulk for free—fast, secure, and browser-based. No sign-ups or uploads. Process up to 10 videos, export as single files or ZIP."
	keywords="video converter online, free video converter, convert videos in browser, bulk video converter, secure video converter, no upload video converter, MP4 converter, AVI converter, MKV converter, WebM converter"
	canonical="https://www.tivoku.com/video-converter"
	themeColor="#D21E48"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Free Video Converter – Convert Videos Fast & Securely in Your Browser',
		url: 'https://www.tivoku.com/video-converter',
		description:
			'Convert videos in bulk for free—fast, secure, and browser-based. No sign-ups or uploads. Process up to 10 videos, export as single files or ZIP.',
		mainEntity: {
			'@type': 'WebApplication',
			name: 'Bulk Video Converter Tool',
			url: 'https://www.tivoku.com/video-converter',
			description:
				'Free online bulk video converter tool to convert videos to MP4, AVI, MKV, and more. Convert videos without losing quality quickly and easily.',
			applicationCategory: 'MultimediaTool',
			operatingSystem: 'All',
			offers: {
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'USD',
				category: 'Free Tool'
			},
			author: {
				'@type': 'Person',
				name: 'Niro58'
			},
			publisher: {
				'@type': 'Organization',
				name: 'Tivoku',
				logo: {
					'@type': 'ImageObject',
					url: 'https://www.tivoku.com/logo.png',
					width: 500,
					height: 281
				}
			}
		},
		'@graph': [
			{
				'@type': 'FAQPage',
				mainEntity: [
					{
						'@type': 'Question',
						name: 'What video formats are supported?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'We support MP4, AVI, MKV, MOV, FLV, WebM, and more. You can also convert videos to audio formats like MP3, WAV, and AAC.'
						}
					},
					{
						'@type': 'Question',
						name: 'Will I lose video quality after converting?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'No, the quality stays the same—no compression is applied. However, converting to certain formats may result in minor quality loss due to codec differences.'
						}
					},
					{
						'@type': 'Question',
						name: 'Can I convert multiple videos at once?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Yes! You can convert up to 10 videos at once—perfect for bulk processing.'
						}
					},
					{
						'@type': 'Question',
						name: 'What is the maximum file size and number of videos I can convert?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'You can upload videos up to 100 MB each and convert up to 10 videos at the same time.'
						}
					},
					{
						'@type': 'Question',
						name: 'Is my data safe?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Yes! All processing happens in your browser—no data is ever uploaded to our servers.'
						}
					}
				]
			}
		]
	}}
/>
<div class="from-background to-background/80 container mx-auto bg-gradient-to-b px-4 py-12 pb-16">
	<CircleDesignElement variation="3" />

	<section class="min-h-screen pt-12">
		{#if videoEditor.videos.length === 0}
			<SelectScreen bind:videoEditor />
		{:else}
			<EditorScreen bind:videoEditor />
		{/if}
	</section>
	<section class="py-16">
		<div class="mx-auto">
			<div class="mx-auto max-w-6xl">
				<div class="grid gap-12 md:grid-cols-2">
					<div class="space-y-8">
						<h2 class="text-3xl font-bold text-white md:text-4xl">
							Convert Videos Fast & Securely—No Uploads, No Hassle
						</h2>

						<p class="text-lg leading-relaxed text-gray-400">
							Our video converter works entirely in your browser, so your files never leave your
							device. Convert up to 10 videos at once, with no sign-ups or hidden fees. It’s fast,
							simple, and secure.
						</p>
					</div>

					<div class="grid gap-6">
						{#each [{ title: 'Convert in Your Browser', description: 'All processing happens locally—no uploads, no waiting.', icon: Lock }, { title: 'Bulk Convert Up to 10 Videos', description: 'Save time by converting multiple videos at once.', icon: Video }, { title: 'Export as Single Files or ZIP', description: 'Download your converted videos in one convenient package.', icon: Download }] as feature}
							<div
								class="flex gap-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
							>
								<div class="bg-primary/10 text-primary h-12 rounded-lg p-3">
									<feature.icon class="h-6 w-6" />
								</div>
								<div>
									<h3 class="mb-2 font-semibold text-white">{feature.title}</h3>
									<p class="text-sm text-gray-400">{feature.description}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="relative py-16">
		<div class="relative mx-auto">
			<div class="mx-auto max-w-4xl">
				<h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">
					Why Choose Our Video Converter?
				</h2>

				<div class="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each features as feature}
						<div
							class="border-foreground/10 bg-foreground/5 flex items-start gap-4 rounded-xl border p-6 backdrop-blur-sm"
						>
							<div class="bg-primary/10 text-primary rounded-lg p-2">
								<Check class="h-5 w-5" />
							</div>
							<div>
								<h3 class="font-medium">{feature.title}</h3>
							</div>
						</div>
					{/each}
				</div>
				<div
					class="from-primary to-primary relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 md:p-12"
				>
					<div
						class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:5rem_5rem] opacity-10"
					></div>

					<div
						class="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left"
					>
						<div class="rounded-full bg-white/10 p-4">
							<Lock class="h-8 w-8" />
						</div>
						<div>
							<h3 class="mb-2 text-xl font-semibold md:text-2xl">Your Privacy Matters</h3>
							<p class="text-white/90">
								All video processing happens in your browser—no uploads, no servers, no risk. Your
								files stay private and secure.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="relative py-16 md:py-24 lg:pt-16 lg:pb-32" id="faq">
		<div class="container px-4 md:px-6">
			<h2 class="text-primary mb-12 text-center text-3xl font-bold md:text-4xl">
				Frequently Asked Questions
			</h2>
			<Accordion.Root type="single" class="mx-auto max-w-3xl space-y-4">
				{#each faqs as { question, answer, key }}
					<Accordion.Item value={key}>
						<Accordion.Trigger>{question}</Accordion.Trigger>
						<Accordion.Content>
							{answer}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</section>
</div>
