<script lang="ts">
	import { page } from '$app/state';
	import { generateSeoProps } from '$modules/seo';
	import CdnImage from '$ui/cdn-image.svelte';
	import Seo from '$ui/seo/seo.svelte';
	import { Ban } from '@lucide/svelte';

	const phrases = [
		'Oops! This site is off-limits. Time to focus! 🚀',
		'Nice try! But this page is blocked. Stay productive! 💪',
		'Blocked! How about a quick focus session instead? 🧠',
		'Distraction detected! Let’s get back on track. 🎯',
		'Access denied! But your productivity is approved. ✅',
		'Blocked! You’re one step closer to your goals. 🌟',
		'Focus mode activated! This site can wait. ⏳',
		'Blocked! But don’t worry, your future self will thank you. 😊',
		'Access restricted! Time to conquer your to-do list. 📝',
		'Blocked! Let’s turn this into a productivity win. 🏆'
	];

	const images = [
		'2840ed2d-4d48-4ae1-2f4c-abcc16034500',
		'a7dbfc07-c34d-42a6-6ec5-f450f2f51f00',
		'5f6b3fa2-6e16-44d3-8d66-c2a3bf850c00',
		'd3f1f4b3-587f-4148-1483-7eae7dfbe900',
		'ceee95bf-6416-423e-9071-5b24d6e19a00'
	];
</script>

<Seo
	{...generateSeoProps(
		{
			type: 'WebPage',
			seoTitle: 'Access Blocked | Niro',
			seoDescription: 'Access to this page has been blocked. Time to focus and stay productive!',
			seoKeywords:
				'website blocker, block distractions, productivity tool, block websites, focus tool, chrome extension, open-source website blocker'
		},
		page.url
	)}
	noindex={true}
	nofollow={true}
/>

<div
	class="from-background/50 to-background/50 relative flex min-h-screen items-center justify-center bg-gradient-to-b"
>
	<CdnImage
		src={images[Math.floor(Math.random() * images.length)]}
		alt="Blocked"
		layout="fullWidth"
		class="absolute inset-0 -z-10 h-full w-full object-cover"
	/>
	<div class="bg-card w-full max-w-md rounded-lg p-8 text-center shadow-lg">
		<span class="text-primary mb-4 flex items-center justify-center text-6xl">
			<Ban class="h-12 w-12" />
		</span>
		<h1 class="text-primary mb-4 text-3xl font-bold">Access Blocked</h1>
		<p class="text-neutral-foreground mb-6">
			{phrases[Math.floor(Math.random() * phrases.length)]}
		</p>
	</div>
</div>
