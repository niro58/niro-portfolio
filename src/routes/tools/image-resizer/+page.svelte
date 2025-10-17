<script module>
	const qaItems = [
		{
			question: 'What image formats are supported?',
			answer: 'We support PNG, JPG (JPEG), and WebP formats for resizing.'
		},
		{
			question: 'Will I lose image quality after resizing?',
			answer:
				'No, the quality stays the same—no compression is applied. However, reducing size significantly may cause minor quality loss due to fewer pixels.'
		},
		{
			question: 'Can I resize multiple images at once?',
			answer: 'Yes! You can resize up to 100 images at once—perfect for bulk processing.'
		},
		{
			question: 'What is the maximum file size and number of images I can resize?',
			answer: 'You can upload images up to 25 MB each and resize up to 100 images at the same time.'
		},
		{
			question: 'Is my data safe?',
			answer: 'Yes! All processing happens in your browser—no data is ever uploaded to our servers.'
		}
	];
	const features = [
		'Resize up to 100 images at once',
		'Supports PNG, JPG, and WebP formats',
		'Preserve or customize aspect ratios',
		'No quality loss—high-quality results',
		'100% free—no sign-ups, no hidden fees',
		'Process images up to 25 MB each'
	];
</script>

<script lang="ts">
	import { Image, Lock } from '@lucide/svelte';
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';
	import SelectScreen from '$lib/components/image-resizer/image-resizer-select-screen.svelte';
	import { setImageEditor } from '$modules/image-editor.svelte';
	import EditorScreen from '$lib/components/image-resizer/image-resizer-editor-screen.svelte';
	import Seo from '$ui/seo/seo.svelte';
	import { generateSeoProps } from '$modules/seo';
	import { page } from '$app/state';
	import QaItems from '$ui/qa-items.svelte';
	import GridFeatures from '$lib/components/grid-features.svelte';
	import AboutFeatures from '$lib/components/about-features.svelte';

	const imageEditor = setImageEditor();
	let editorMode = $state(false);
	$effect(() => {
		if (imageEditor.images.length > 0) {
			editorMode = true;
		}
	});
</script>

<Seo
	{...generateSeoProps(
		{
			type: 'WebPage',
			seoTitle: 'Image Resizer | Niro',
			seoDescription: 'Explore projects developed by Niro.'
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

<CircleDesignElement variation="1" />
<CircleDesignElement variation="2" />
<CircleDesignElement variation="3" />

<section class="container flex min-h-screen flex-col pt-16">
	{#if !editorMode}
		<SelectScreen />
	{:else}
		<EditorScreen />
	{/if}
</section>
<AboutFeatures
	title="Resize Images Fast & Securely—No Uploads, No Hassle"
	description="Our bulk image resizer works entirely in your browser, so your files never leave your device. Resize up to 100 images at once, with no sign-ups or hidden fees. It’s fast, simple, and secure."
	items={[
		{
			title: 'Resize in Your Browser',
			description: 'All processing happens locally—no uploads, no waiting.',
			icon: Lock
		},
		{
			title: 'Bulk Resize Up to 100 Images',
			description: 'Save time by resizing multiple images at once.',
			icon: Image
		},
		{
			title: 'No Quality Loss',
			description: 'Resize images without losing clarity or sharpness.',
			icon: Image
		}
	]}
/>

<GridFeatures
	title="Why Choose Our Image Resizer?"
	{features}
	featuredTitle="Your Privacy Matters"
	featuredDescription="All image processing happens in your browser—no uploads, no servers, no risk. Your files stay private and secure."
/>

<QaItems items={qaItems} />
