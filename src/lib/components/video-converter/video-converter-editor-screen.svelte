<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils/common';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { ArrowUpFromLine, CheckCircle2, Film, Plus, Trash2, X } from '@lucide/svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { Label } from '$lib/components/ui/label';
	import { Progress } from '$lib/components/ui/progress';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { VideoEditor } from '$modules/video-editor.svelte';
	import FileDropper from '$ui/file-dropper.svelte';
	import { AppConfig } from '$config/app';
	import { ResultAudioFormat, ResultVideoFormat } from '$lib/types/image-video';

	let { videoEditor = $bindable() }: { videoEditor: VideoEditor } = $props();

	let formatOpen = $state(false);
	let formatTriggerRef: HTMLButtonElement | undefined = $state();
	function closeAndFocusTrigger(type: 'audio' | 'video') {
		tick().then(() => {
			formatOpen = false;
			formatTriggerRef?.focus();
		});
	}
	let fileInputEl: HTMLInputElement | undefined = $state();
	let canExport = $state(true);

	$effect(() => {
		canExport =
			videoEditor.videos.length > 0 &&
			videoEditor.videos.every((video) => video.currState === 'none');
	});
</script>

<div class="flex flex-col gap-5">
	<FileDropper
		accept="video/mp4,video/x-m4v,video/*"
		startsWith="video/"
		maxSize={AppConfig.maxVideoSize}
		bind:fileInputEl
		onfileaccept={(files) => {
			if (files.length > 0) {
				videoEditor.load(files);
			}
		}}
	>
		<div
			in:scale={{ duration: 600, start: 0.95, delay: 600 }}
			out:scale={{ duration: 300, start: 0.95 }}
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
		class="grid grid-rows-2 gap-5 md:grid-cols-2"
		in:slide={{ duration: 500, delay: 600 }}
		out:slide={{ duration: 300 }}
	>
		<Card.Root class="mb-8 h-full">
			<Card.Content class="flex h-full flex-col justify-between">
				<h2 class="mb-2 text-xl font-semibold">Imported Videos</h2>
				<ScrollArea class="h-[200px] w-full rounded-md border">
					{#each videoEditor.videos as video, index (index)}
						<div
							class="flex flex-col items-center justify-between border-b px-2 py-2 last:border-b-0"
						>
							<div class="flex w-full items-center md:gap-5">
								<div
									class="bg-background/40 relative hidden h-10 w-10 shrink-0 overflow-hidden rounded-lg md:block"
								>
									<Film
										class="text-foreground/60 absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2"
									/>
								</div>
								<Input bind:value={video.filename} disabled={!canExport} />
								<Button
									variant="outline"
									size="icon"
									class="shrink-0"
									disabled={video.currState !== 'none' || !canExport}
									onclick={() => {
										videoEditor.videos = videoEditor.videos.filter((_, i) => i !== index);
									}}
								>
									<X class="h-4 w-4" />
								</Button>
							</div>
							{#if video.currState != 'none'}
								<div
									class="relative flex h-10 w-full items-center pt-2"
									transition:fly={{ y: -20 }}
								>
									{#if video.currState === 'exporting'}
										<div
											class="absolute flex w-full items-center justify-center gap-5"
											in:fade={{ duration: 300, delay: 300 }}
											out:fade={{ duration: 200 }}
										>
											<Progress class="w-full" value={video.currProgress.current} />
											<span>{Math.round(video.currProgress.current)}%</span>
										</div>
									{:else if video.currState === 'done'}
										<div
											class="absolute inset-x-0 inline-flex items-center justify-center"
											in:fade={{ delay: 300, duration: 300 }}
											out:fade={{ duration: 200 }}
										>
											<CheckCircle2 class="me-2 h-6 w-6 text-green-500" />
											<span>Done</span>
										</div>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</ScrollArea>
			</Card.Content>
			<Card.Footer class="flex flex-row gap-2">
				<div class="flex grow flex-row justify-between gap-5">
					<Button class="w-full text-xl" disabled={!canExport} onclick={() => fileInputEl?.click()}>
						<Plus />
					</Button>
				</div>
				<Button
					class="w-12 text-xl"
					size="icon"
					variant="outline"
					disabled={!canExport}
					onclick={() => (videoEditor.videos = [])}
				>
					<Trash2 />
				</Button>
			</Card.Footer>
		</Card.Root>
		<Card.Root>
			<Card.Content class="flex h-full flex-col justify-between ">
				<div>
					<h2 class="mb-4 text-xl font-semibold">Conversion Options</h2>
					<div class="flex space-x-4">
						<div class="w-full">
							<Label class="mb-2 block text-sm font-medium" for="video-format">Convert to:</Label>
							<Popover.Root bind:open={formatOpen}>
								<Popover.Trigger id="video-format" class="w-full">
									{#snippet child({ props })}
										<Button
											variant="outline"
											class="w-[200px] justify-between"
											{...props}
											role="combobox"
											disabled={!canExport}
											aria-expanded={formatOpen}
										>
											{#if Object.values(ResultVideoFormat).includes(videoEditor.settings.exportFileFormat as ResultVideoFormat)}
												{videoEditor.settings.exportFileFormat?.toUpperCase()}
											{:else if Object.values(ResultAudioFormat).includes(videoEditor.settings.exportFileFormat as ResultVideoFormat)}
												{videoEditor.settings.exportFileFormat?.toUpperCase()}
											{:else}
												Select Video/Audio Format
											{/if}
											<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
										</Button>
									{/snippet}
								</Popover.Trigger>
								<Popover.Content class="w-[200px] p-0">
									<Command.Root>
										<Command.Input placeholder="Search format..." />
										<Command.List>
											<Command.Empty>No format found.</Command.Empty>
											<Command.Group heading="Video Formats">
												{#each Object.entries(ResultVideoFormat) as [k, v]}
													<Command.Item
														value={v}
														onSelect={() => {
															videoEditor.settings.exportFileFormat = v;
															closeAndFocusTrigger('video');
														}}
													>
														<Check
															class={cn(
																'mr-2 size-4',
																v !== videoEditor.settings.exportFileFormat && 'text-transparent'
															)}
														/>
														{v.toUpperCase()}
													</Command.Item>
												{/each}
											</Command.Group>
											<Command.Group heading="Audio Formats">
												{#each Object.entries(ResultAudioFormat) as [k, v]}
													<Command.Item
														value={v}
														onSelect={() => {
															videoEditor.settings.exportFileFormat = v;
															closeAndFocusTrigger('audio');
														}}
													>
														<Check
															class={cn(
																'mr-2 size-4',
																v !== videoEditor.settings.exportFileFormat && 'text-transparent'
															)}
														/>
														{v.toUpperCase()}
													</Command.Item>
												{/each}
											</Command.Group>
										</Command.List>
									</Command.Root>
								</Popover.Content>
							</Popover.Root>
						</div>
					</div>
				</div>
				<div>
					<Button class="w-full" disabled={!canExport} onclick={() => videoEditor.export()}
						>Convert Files</Button
					>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
