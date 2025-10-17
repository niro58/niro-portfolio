<script module lang="ts">
	const aspectRatios: {
		key: string;
		title: string;
	}[] = [
		{ key: aspectRatioToKey({ x: 1, y: 1 }), title: '1 : 1 - Square (Versatile for Posts)' },
		{
			key: aspectRatioToKey({ x: 16, y: 9 }),
			title: '16 : 9 - Widescreen'
		},
		{
			key: aspectRatioToKey({ x: 4, y: 5 }),
			title: '4 : 5 - Portrait (Instagram Posts)'
		},
		{
			key: aspectRatioToKey({ x: 9, y: 16 }),
			title: '9 : 16 - Vertical (Stories and Reels)'
		}
	];
	const colorPrefabs = [
		{
			hex: '#000000',
			opacity: 0,
			label: 'Transparent',
			class: 'bg-transparent border-2 border-dashed border-gray-400'
		},
		{ hex: '#000000', opacity: 1, label: 'Black', class: 'bg-black' },
		{ hex: '#ffffff', opacity: 1, label: 'White', class: 'bg-foreground border border-gray-200' }
	];
</script>

<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table/index.js';
	import {
		Check,
		Crop,
		Loader,
		Maximize2,
		Pencil,
		Plus,
		RotateCcw,
		Trash2,
		X
	} from '@lucide/svelte';

	import * as RadioGroup from '$ui/radio-group/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { fly } from 'svelte/transition';
	import ColorInput from '$lib/components/ui/color-input.svelte';
	import {
		ExportFileFormat,
		ImageExportFormats,
		type ImageSettingsCrop
	} from '$lib/types/image-video';
	import { aspectRatioToKey, keyToAspectRatio } from '$lib/utils/image-video';
	import FileDropper from '$ui/file-dropper.svelte';
	import { AppConfig } from '$config/app';
	import { EditableImage } from '$modules/editable-image.svelte';
	import { getImageEditor } from '$modules/image-editor.svelte';
	let fileInputEl: HTMLInputElement | undefined = $state();

	const imageEditor = getImageEditor();
	let exportState = $state(false);
	let cd: any = $state();
	$effect(() => {
		$state.snapshot(cd);
	});
</script>

<div
	class="grid h-full grid-rows-1 gap-8 md:grid-cols-2 lg:gap-12"
	in:fly={{ duration: 600, delay: 600, y: 20 }}
>
	<FileDropper
		class="bg-card max-h-[85vh] cursor-default lg:h-full"
		bind:fileInputEl
		accept="image/*"
		startsWith="image/"
		maxSize={AppConfig.maxImageSize}
		onfileaccept={(files) => {
			const editableImages = Array.from(files).map((file) => new EditableImage(file));
			imageEditor.images.push(...editableImages);
		}}
		onclick={() => {}}
	>
		<Card.Root class="grid h-full grid-cols-1 grid-rows-8 bg-transparent">
			<Card.Content class="relative row-span-7 p-6">
				<ScrollArea class="h-full rounded-md border p-4">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head class="w-24">Image</Table.Head>
								<Table.Head>Filename</Table.Head>
								<Table.Head class="w-32">Width</Table.Head>
								<Table.Head class="w-32">Height</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each imageEditor.images as image, index}
								{@const size = image.getCanvasSize(
									imageEditor.settings.fixedSize,
									imageEditor.settings.aspectRatio,
									imageEditor.settings.cropType
								)}
								<Table.Row>
									<Table.Cell>
										{#if image.src}
											<img
												src={image.src}
												class="flex aspect-square h-16 w-16 items-center justify-center rounded-xl border-2 object-contain p-1"
												alt={'User image ' + index}
											/>
										{:else}
											<div class="flex h-16 w-16 items-center justify-center">
												<Loader class="text-muted-foreground mx-auto h-8 w-8 animate-spin" />
											</div>
										{/if}
									</Table.Cell>
									<Table.Cell>
										<Input bind:value={image.filename} />
									</Table.Cell>
									<Table.Cell class="text-center text-lg">
										{#if isNaN(size.x) || !isFinite(size.x)}
											-
										{:else}
											{size.x}
										{/if}
									</Table.Cell>
									<Table.Cell class="text-center text-lg">
										{#if isNaN(size.y) || !isFinite(size.y)}
											-
										{:else}
											{size.y}
										{/if}
									</Table.Cell>
									<Table.Cell>
										<Button
											size="icon"
											onclick={() => {
												imageEditor.images = imageEditor.images.filter((_, i) => i !== index);
											}}
										>
											<X />
										</Button>
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</ScrollArea>
			</Card.Content>
			<Card.Footer>
				<div class="flex w-full flex-col">
					<div class="flex flex-row gap-5">
						<Button class="mt-5 h-12 w-full text-xl" onclick={() => fileInputEl?.click()}>
							<Plus />
						</Button>
						<Button
							class="mt-5 h-12 w-12 text-xl"
							disabled={imageEditor.images.length === 0}
							onclick={() => (imageEditor.images = [])}
						>
							<Trash2 />
						</Button>
					</div>
				</div></Card.Footer
			>
		</Card.Root>
	</FileDropper>
	<Card.Root class="mx-auto grid max-h-[85vh] w-full max-w-3xl grid-rows-12">
		<Card.Header class="row-span-1">
			<Card.Title class="text-2xl font-bold">Image Editor</Card.Title>
		</Card.Header>
		<Card.Content class="row-span-9 flex flex-col gap-6">
			<div class="space-y-2">
				<Label>Resizing Type</Label>
				<RadioGroup.Root
					bind:value={
						() => imageEditor.settings.cropType,
						(v) => {
							imageEditor.settings.cropType = v as ImageSettingsCrop;
						}
					}
					class="grid grid-cols-2 gap-4"
				>
					<div>
						<RadioGroup.Item value="outside" id="outside" class="peer sr-only" />
						<Label
							for="outside"
							class="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer flex-row items-center justify-center gap-3 rounded-md border-2 bg-transparent p-4"
						>
							<Maximize2 class="h-4 w-4" />
							<span>Crop to Longest Side</span>
						</Label>
					</div>
					<div>
						<RadioGroup.Item value="inside" id="inside" class="peer sr-only" />
						<Label
							for="inside"
							class="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary  flex cursor-pointer flex-row items-center justify-center gap-3 rounded-md border-2 bg-transparent p-4"
						>
							<Crop class="h-4 w-4" />
							<span>Crop to Shortest Side</span>
						</Label>
					</div>

					<div class="col-span-2">
						<RadioGroup.Item value="downscale" id="downscale" class="peer sr-only" />
						<Label
							for="downscale"
							class="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer flex-row items-center justify-center gap-3 rounded-md border-2 bg-transparent p-4"
						>
							<Maximize2 class="h-4 w-4" />
							<span>Downscale</span>
						</Label>
					</div>
				</RadioGroup.Root>
			</div>
			<div class="space-y-2">
				<Label>Background Color</Label>
				<div class="grid grid-cols-4 gap-2">
					{#each colorPrefabs as color}
						{@const isActive =
							imageEditor.settings.backgroundColor === color.hex &&
							imageEditor.settings.opacity === color.opacity}
						<button
							onclick={() => {
								imageEditor.settings.backgroundColor = color.hex;
								imageEditor.settings.opacity = color.opacity;
							}}
							class={`h-10 rounded-md transition-all ${color.class} ${
								isActive ? 'ring-primary ring-2 ring-offset-2' : ''
							}`}
							title={color.label}
						>
							{#if isActive}
								<Check class={`mx-auto ${color.hex === '#ffffff' ? 'text-black' : ''}`} />
							{/if}
						</button>
					{/each}
					<ColorInput
						bind:backgroundColor={imageEditor.settings.backgroundColor}
						bind:opacity={imageEditor.settings.opacity}
					>
						<Pencil class="text-primary" />
					</ColorInput>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="format">Format</Label>
					<Select.Root
						type="single"
						bind:value={
							() => imageEditor.settings.format,
							(v) => {
								if (v in ImageExportFormats) {
									imageEditor.settings.format = v;
								}
							}
						}
					>
						<Select.Trigger id="format">{imageEditor.settings.format.toUpperCase()}</Select.Trigger>
						<Select.Content>
							{#each Object.entries(ImageExportFormats) as [key, value]}
								<Select.Item value={key}>{value.toUpperCase()}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="space-y-2">
					<Label for="aspect-ratio">Aspect Ratio</Label>
					<Select.Root
						type="single"
						bind:value={
							() => aspectRatioToKey(imageEditor.settings.aspectRatio),
							(v) => {
								imageEditor.settings.aspectRatio = keyToAspectRatio(v);
							}
						}
					>
						<Select.Trigger id="aspect-ratio"
							>{aspectRatioToKey(imageEditor.settings.aspectRatio)}</Select.Trigger
						>
						<Select.Content>
							{#each aspectRatios as ratio}
								<Select.Item value={ratio.key}>{ratio.title}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="aspect_ratio_x">Aspect Ratio X</Label>
					<Input
						id="aspect_ratio_x"
						type="number"
						bind:value={
							() => imageEditor.settings.aspectRatio.x,
							(v) => {
								if (isNaN(v) || v < 0 || v > 10000) return;
								imageEditor.settings.aspectRatio.x = v;
							}
						}
						min="1"
					/>
				</div>
				<div class="space-y-2">
					<Label for="aspect_ratio_y">Aspect Ratio Y</Label>
					<Input
						id="aspect_ratio_y"
						type="number"
						bind:value={
							() => imageEditor.settings.aspectRatio.y,
							(v) => {
								if (isNaN(v) || v < 0 || v > 10000) return;
								imageEditor.settings.aspectRatio.y = v;
							}
						}
						min="1"
					/>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="fixed_size_x">Fixed X</Label>
					<Input
						id="fixed_size_x"
						type="number"
						bind:value={
							() => imageEditor.settings.fixedSize.x,
							(v) => {
								if (isNaN(v) || v < 0 || v > 10000) return;
								imageEditor.settings.fixedSize.x = v;
							}
						}
						min="1"
					/>
				</div>

				<div class="relative space-y-2">
					<Label for="fixed_size_y">Fixed Y</Label>
					<Input
						id="fixed_size_y"
						type="number"
						bind:value={
							() => imageEditor.settings.fixedSize.y,
							(v) => {
								if (isNaN(v) || v < 0 || v > 10000) return;
								imageEditor.settings.fixedSize.y = v;
							}
						}
						min="1"
					/>
					<Button
						size="icon"
						class="absolute right-0 bottom-0"
						onclick={() => (imageEditor.settings.fixedSize = { x: 0, y: 0 })}
					>
						<RotateCcw />
					</Button>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="row-span-2 flex flex-col items-start justify-end gap-5">
			<div class="flex items-center gap-2 space-x-2">
				<div class="space-x-1">
					<Checkbox
						id="zip-export"
						aria-labelledby="zip-export"
						bind:checked={
							() => imageEditor.settings.exportFileFormat === ExportFileFormat.ZIP,
							() => (imageEditor.settings.exportFileFormat = ExportFileFormat.ZIP)
						}
					/>
					<Label
						id="zip-export"
						for="zip-export"
						class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						ZIP
					</Label>
				</div>
				<div class="space-x-1">
					<Checkbox
						id="single-files-export"
						aria-labelledby="single-files-export"
						bind:checked={
							() => imageEditor.settings.exportFileFormat === ExportFileFormat.SINGLE,
							() => (imageEditor.settings.exportFileFormat = ExportFileFormat.SINGLE)
						}
					/>
					<Label
						id="single-files-export"
						for="single-files-export"
						class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Single Files
					</Label>
				</div>
			</div>
			<Button
				class="h-12 w-full"
				disabled={imageEditor.images.length === 0 || exportState}
				onclick={async () => {
					exportState = true;
					await imageEditor.export();
					exportState = false;
				}}
			>
				Export
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
<div class="text-muted-foreground text-start">
	* Images can also be dragged into the image square
</div>
