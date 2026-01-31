<script module>
	const qaItems = [
		{
			question: 'What types of QR codes can I create?',
			answer:
				'You can create QR codes for URLs, plain text, Wi-Fi credentials, vCards (contact cards), emails, SMS messages, phone numbers, and geographic locations.'
		},
		{
			question: 'Is this QR code generator free?',
			answer:
				'Yes! This QR code generator is completely free with no watermarks, no sign-ups, and no hidden fees.'
		},
		{
			question: 'Can I customize the QR code design?',
			answer:
				'Absolutely! You can customize dot styles, corner squares, corner dots, colors, gradients, and even add your own logo or image to the center of the QR code.'
		},
		{
			question: 'What formats can I download the QR code in?',
			answer:
				'You can download your QR codes in PNG format for web use or SVG format for scalable, high-quality print materials.'
		},
		{
			question: 'Is my data safe?',
			answer:
				'Yes! All QR code generation happens directly in your browser—no data is ever uploaded to any server.'
		}
	];
	const features = [
		'Create QR codes for URLs, text, Wi-Fi, vCards, and more',
		'Customize colors, gradients, and dot styles',
		'Add your own logo or image',
		'Download in PNG or SVG formats',
		'100% free—no sign-ups, no watermarks',
		'All processing happens in your browser'
	];
</script>

<script lang="ts">
	import { QrCode, Lock } from '@lucide/svelte';
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';
	import Seo from '$lib/components/ui/seo/seo.svelte';
	import { generateSeoProps } from '$lib/modules/seo';
	import { page } from '$app/state';
	import QaItems from '$lib/components/ui/qa-items.svelte';
	import GridFeatures from '$lib/components/grid-features.svelte';
	import AboutFeatures from '$lib/components/about-features.svelte';
	import QrGen from '$lib/components/qr-gen/qr-gen.svelte';
</script>

<Seo
	{...generateSeoProps(
		{
			type: 'WebPage',
			seoTitle: 'Free QR Code Generator | Create Custom QR Codes | Niro',
			seoDescription:
				'Generate custom QR codes for URLs, text, Wi-Fi, vCards, and more. Customize your design with colors, gradients, and logos. Download in high-res PNG or SVG formats for free.'
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
	<QrGen
		title="QR Code Generator"
		description="Create custom QR codes for any need—URLs, Wi-Fi, vCards, and more. Design, customize with your brand, and download in high-resolution formats for free."
	/>
</section>

<AboutFeatures
	title="Create QR Codes Fast & Securely—No Uploads, No Hassle"
	description="Our QR code generator works entirely in your browser, so your data never leaves your device. Create unlimited QR codes with no sign-ups or hidden fees. It's fast, simple, and secure."
	items={[
		{
			title: 'Generate in Your Browser',
			description: 'All processing happens locally—no uploads, no waiting.',
			icon: Lock
		},
		{
			title: 'Unlimited QR Codes',
			description: 'Create as many QR codes as you need, completely free.',
			icon: QrCode
		}
	]}
/>

<GridFeatures
	title="Features"
	{features}
	featuredTitle="100% Browser-Based"
	featuredDescription="All QR code generation happens in your browser—your data never leaves your device."
/>

<section class="container my-16 max-w-3xl">
	<h2 class="text-foreground mb-8 text-2xl font-semibold">Frequently Asked Questions</h2>
	<QaItems items={qaItems} />
</section>
