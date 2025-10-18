<script module>
	const steps = [
		{
			icon: Upload,
			title: 'Upload Your Video:',
			description: 'Drag and drop your video or select it from your device.'
		},
		{
			icon: Video,
			title: 'Choose Output Format:',
			description: 'Select the desired format for your video (e.g., MP4, AVI, MKV).'
		},
		{
			icon: ArrowRight,
			title: 'Convert and Download:',
			description: 'Convert the videos and download them as single files or in a ZIP archive.'
		}
	];
</script>

<script lang="ts">
	import { AppConfig } from '$config/app';

	import type { VideoEditor } from '$modules/video-editor.svelte';
	import FileDropper from '$ui/file-dropper.svelte';


	import { ArrowRight, ArrowUpFromLine, Upload, Video } from '@lucide/svelte';
	import { fly, scale } from 'svelte/transition';

	let fileInputEl: HTMLInputElement | undefined = $state();
	let { videoEditor = $bindable() }: { videoEditor: VideoEditor } = $props();
</script>

<div
	in:fly={{ duration: 600, y: 20, delay: 400 }}
	out:fly={{ duration: 600, y: 20 }}
	class="mx-auto max-w-4xl"
>
	<div class="mb-16 space-y-6 text-center">
		<h1 class="text-foreground text-4xl font-bold md:text-5xl lg:text-6xl">
			Free Online Video Converter
		</h1>
		<p class="text-primary text-2xl font-medium md:text-3xl">
			Convert Videos Without Losing Quality
		</p>
		<div
			class="text-neutral-background mx-auto grid max-w-3xl gap-4 text-base md:grid-cols-3 md:gap-8 md:text-lg"
		>
			<div class="border-foreground/10 bg-foreground/5 rounded-lg border p-4 backdrop-blur-sm">
				Bulk convert multiple videos at once
			</div>
			<div class="border-foreground/10 bg-foreground/5 rounded-lg border p-4 backdrop-blur-sm">
				Maintain original video quality
			</div>
			<div class="border-foreground/10 bg-foreground/5 rounded-lg border p-4 backdrop-blur-sm">
				Perfect for all devices and platforms
			</div>
		</div>
	</div>
</div>

<div
	class="grid gap-12 md:grid-cols-2"
	in:fly={{ duration: 600, y: 20, delay: 400 }}
	out:fly={{ duration: 600, y: 20 }}
>
	<FileDropper
		bind:fileInputEl
		accept="video/mp4,video/x-m4v,video/*"
		startsWith="video/"
		maxSize={AppConfig.maxVideoSize}
		onfileaccept={(files) => {
			if (files.length > 0) {
				videoEditor.load(files);
			}
		}}
		onclick={() => {
			fileInputEl?.click();
		}}
	>
		<div
			transition:scale={{ duration: 600, start: 0.95 }}
			class="in-colors group border-foreground/20 bg-background/20 hover:border-primary/40 relative h-full rounded-2xl border-2 border-dashed p-12 text-center backdrop-blur-sm"
		>
			<div
				class="in-opacity from-primary/10 absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br via-transparent to-transparent opacity-0 duration-300 group-hover:opacity-100"
			></div>
			<div class="mb-6 flex justify-center">
				<div class="bg-foreground/5 text-primary rounded-full p-4">
					<ArrowUpFromLine class="h-8 w-8" />
				</div>
			</div>
			<h3 class="text-foreground mb-2 text-xl font-semibold">Drag and drop your video here</h3>
			<p class="text-neutral-foreground text-sm">Supports MP4, AVI, MKV, and more up to 10GB</p>
		</div>
	</FileDropper>

	<div
		in:fly={{ duration: 600, y: 20, delay: 400 }}
		out:fly={{ duration: 600, y: 20 }}
		class="space-y-8"
	>
		<h2 class="text-foreground text-2xl font-bold">How to Convert a Video</h2>
		<div class="space-y-6">
			{#each steps as step, index}
				<div class="flex items-start gap-4">
					<div class="bg-primary/10 text-primary rounded-full p-3"><step.icon /></div>
					<div>
						<h3 class="text-foreground mb-1 font-semibold">
							{index + 1}. {step.title}
						</h3>
						<p class="text-neutral-background text-sm">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
