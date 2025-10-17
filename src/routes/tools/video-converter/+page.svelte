<script module>
	const qaItems = [
		{
			question: 'What video formats are supported?',
			answer:
				'We support MP4, AVI, MKV, MOV, FLV, WebM, and more. You can also convert videos to audio formats like MP3, WAV, and AAC.'
		},
		{
			question: 'Will I lose video quality after converting?',
			answer:
				'No, the quality stays the same—no compression is applied. However, converting to certain formats may result in minor quality loss due to codec differences.'
		},
		{
			question: 'Can I convert multiple videos at once?',
			answer: 'Yes! You can convert up to 10 videos at once—perfect for bulk processing.'
		},
		{
			question: 'What is the maximum file size and number of videos I can convert?',
			answer:
				'You can upload videos up to 100 MB each and convert up to 10 videos at the same time.'
		},
		{
			question: 'Is my data safe?',
			answer: 'Yes! All processing happens in your browser—no data is ever uploaded to our servers.'
		}
	];
	const features = [
		'Convert up to 10 videos at once',
		'Supports MP4, AVI, MKV, MOV, and more',
		'Export as single files or ZIP',
		'No quality loss—high-quality results',
		'100% free—no sign-ups, no hidden fees',
		'Process videos up to 100 MB each'
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
	import { generateSeoProps } from '$modules/seo';
	import { page } from '$app/state';
	import QaItems from '$ui/qa-items.svelte';
	import GridFeatures from '$lib/components/grid-features.svelte';
	import AboutFeatures from '$lib/components/about-features.svelte';

	let videoEditor = $state(new VideoEditor());
</script>

<Seo
	{...generateSeoProps(
		{
			type: 'WebPage',
			seoTitle:
				'Convert videos in bulk for free—fast, secure, and browser-based. No sign-ups or uploads. Process up to 10 videos, export as single files or ZIP.',
			seoDescription:
				'video converter online, free video converter, convert videos in browser, bulk video converter, secure video converter, no upload video converter, MP4 converter, AVI converter, MKV converter, WebM converter'
		},
		page.url,
		{
			type: 'FAQPage',
			questions: qaItems.map((it) => ({
				questionName: it.question,
				acceptedAnswerText: it.answer
			}))
		}
	)}
/>
<CircleDesignElement variation="3" />

<section class="container min-h-screen pt-12">
	{#if videoEditor.videos.length === 0}
		<SelectScreen bind:videoEditor />
	{:else}
		<EditorScreen bind:videoEditor />
	{/if}
</section>

<AboutFeatures
	title="Convert Videos Fast & Securely—No Uploads, No Hassle"
	description="Our video converter works entirely in your browser, so your files never leave your device. Convert up to 10 videos at once, with no sign-ups or hidden fees. It’s fast, simple, and secure."
	items={[
		{
			title: 'Convert in Your Browser',
			description: 'All processing happens locally—no uploads, no waiting.',
			icon: Lock
		},
		{
			title: 'Bulk Convert Up to 10 Videos',
			description: 'Save time by converting multiple videos at once.',
			icon: Video
		},
		{
			title: 'Export as Single Files or ZIP',
			description: 'Download your converted videos in one convenient package.',
			icon: Download
		}
	]}
/>

<GridFeatures
	title="Why Choose Our Video Converter?"
	{features}
	featuredTitle="Your Privacy Matters"
	featuredDescription="All video processing happens in your browser—no uploads, no servers, no risk. Your files stay private and secure."
/>

<QaItems items={qaItems} />
