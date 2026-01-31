<script module lang="ts">
	const errorCorrectionLevelEnum: Partial<Record<string, string>> = Object.freeze({
		L: 'Low (7%)',
		M: 'Medium (15%)',
		Q: 'Quartile (25%)',
		H: 'High (30%)'
	});

	const errorCorrectionLevelPercentages: Record<ErrorCorrectionLevel, number> = {
		L: 0.07,
		M: 0.15,
		Q: 0.25,
		H: 0.3
	} as const;
	const exportSizeEnum = {
		'128': '128x128',
		'256': '256x256',
		'512': '512x512',
		'1024': '1024x1024'
	} as const;

	const dotTypeEnum: Record<DotType, string> = {
		dots: 'Dots',
		rounded: 'Rounded',
		classy: 'Classy',
		'classy-rounded': 'Classy Rounded',
		square: 'Square',
		'extra-rounded': 'Extra Rounded'
	} as const;

	const cornersTypeEnum: Record<CornerSquareType, string> = {
		square: 'Square',
		dot: 'Dot',
		dots: 'Dots',
		rounded: 'Rounded',
		classy: 'Classy',
		'classy-rounded': 'Classy Rounded',
		'extra-rounded': 'Extra Rounded'
	} as const;
</script>

<script lang="ts">
	import { Download, ImageIcon, Palette, QrCode, Grip } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card/index';
	import * as Select from '$lib/components/ui/select/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	import FileDropper from '$lib/components/ui/file-dropper.svelte';
	// @ts-ignore
	import QRCodeStyling from 'qr-code-styling';
	import { onMount, untrack } from 'svelte';

	import QrGenData from './qr-gen-data.svelte';
	import QrGenShapeSelect from './qr-gen-shape-select.svelte';
	import RectInsidePrimary from '$lib/components/ui/icons/rect-inside-primary.svelte';
	import RectOutsidePrimary from '$lib/components/ui/icons/rect-outside-primary.svelte';
	import CardIcon from '$lib/components/ui/card-icon.svelte';

	type CornerDotType =
		| 'dot'
		| 'square'
		| 'heart'
		| 'extra-rounded'
		| 'classy'
		| 'classy-rounded'
		| 'rounded'
		| 'dots';
	type CornerSquareType =
		| 'dot'
		| 'square'
		| 'extra-rounded'
		| 'classy'
		| 'classy-rounded'
		| 'rounded'
		| 'dots';
	type DotType = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
	type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
	type Gradient = {
		type: 'linear' | 'radial';
		colorStops: Array<{ offset: number; color: string }>;
		rotation?: number;
	};
	type Options = {
		type?: string;
		shape?: 'square' | 'circle';
		width?: number;
		height?: number;
		qrOptions?: {
			errorCorrectionLevel?: ErrorCorrectionLevel;
		};
		dotsOptions?: {
			type?: DotType;
			color?: string;
			gradient?: Gradient;
		};
		cornersSquareOptions?: {
			type?: CornerSquareType;
			color?: string;
			gradient?: Gradient;
		};
		cornersDotOptions?: {
			type?: CornerDotType;
			color?: string;
			gradient?: Gradient;
		};
		backgroundOptions?: {
			color?: string;
		};
		image?: string;
		data?: string;
	};

	const {
		title,
		description,
		defaultTab
	}: { title: string; description: string; defaultTab?: string } = $props();
	let selectedImage: File | undefined = $state();
	let qrImageSize: ErrorCorrectionLevel = $state('M');

	let qrCodeEl: HTMLDivElement;
	let fileInputEl: HTMLInputElement | undefined = $state();

	let backgroundColor: string = $state('#ffffff');

	let correctionLevel: ErrorCorrectionLevel = $state('M');
	let qrData: string = $state('');
	let shape: 'square' | 'circle' = $state('square');

	let dotsOptionsType: DotType = $state('classy');
	let dotsOptionsColor: string | undefined = $state('#000000');
	let dotsOptionsGradient: Gradient | undefined = $state();

	let cornersSquareOptionsType: CornerSquareType = $state('extra-rounded');
	let cornersSquareOptionsGradient: Gradient | undefined = $state();
	let cornersSquareOptionsColor: string | undefined = $state('#000000');

	let cornerDotOptionsType: CornerDotType = $state('dot');
	let cornerDotOptionsGradient: Gradient | undefined = $state();
	let cornerDotOptionsColor: string | undefined = $state('#000000');

	let opts = $derived({
		type: 'svg' as const,
		shape: shape,
		qrOptions: {
			errorCorrectionLevel: correctionLevel
		},
		dotsOptions: {
			type: dotsOptionsType,
			color: dotsOptionsColor,
			gradient: dotsOptionsGradient
		},
		cornersSquareOptions: {
			type: cornersSquareOptionsType,
			color: cornersSquareOptionsColor,
			gradient: cornersSquareOptionsGradient
		},
		cornersDotOptions: {
			type: cornerDotOptionsType,
			color: cornerDotOptionsColor,
			gradient: cornerDotOptionsGradient
		},
		backgroundOptions: {
			color: backgroundColor
		},
		image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
		data: qrData
	});

	let exportSize: keyof typeof exportSizeEnum = $state('512');
	let qrCode: QRCodeStyling | undefined = $state();

	let timeoutId: NodeJS.Timeout | undefined = $state();
	$effect(() => {
		opts;
		untrack(() => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				if (!qrCode) return;
				qrCode.update(opts);
				qrCode.append(qrCodeEl);
			}, 200);
		});
	});

	onMount(() => {
		qrCode = new QRCodeStyling(opts);
	});
</script>

<div class="from-background to-card min-h-screen bg-linear-to-br p-4">
	<div class="mx-auto mt-12 max-w-7xl">
		<div class="mb-8 text-center">
			<div class="mb-4 flex items-center justify-center gap-2">
				<QrCode class="text-foreground h-8 w-8" />
				<h1 class="text-foreground text-3xl font-bold">{title}</h1>
			</div>
			<p class="text-muted-foreground mx-auto max-w-2xl">
				{description}
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-2">
			<div class="space-y-6">
				<QrGenData bind:data={qrData} {defaultTab} />
				<Separator />
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<CardIcon icon={Palette} />
							Styling
						</Card.Title>
					</Card.Header>
					<Card.Content class="grid grid-cols-2 grid-rows-1 gap-2 space-y-6">
						<div class="flex h-full flex-col justify-between gap-2">
							<div class="space-y-2">
								<Label>Shape</Label>
								<div class="grid grid-cols-2 gap-2">
									<Button
										variant={shape === 'square' ? 'default' : 'outline'}
										onclick={() => {
											shape = 'square';
										}}>Square</Button
									>
									<Button
										variant={shape === 'circle' ? 'default' : 'outline'}
										onclick={() => {
											shape = 'circle';
										}}>Circle</Button
									>
								</div>
							</div>
							<div class="space-y-2">
								<Label for="background">Background Color</Label>
								<div class="mt-1 flex gap-2">
									<Input
										id="background"
										type="color"
										bind:value={backgroundColor}
										class="w-12 rounded border p-1"
									/>
									<Input bind:value={backgroundColor} placeholder="#ffffff" class="flex-1" />
								</div>
							</div>
						</div>
						<div class="space-y-2">
							<Label class="text-sm font-medium">Logo/Image</Label>
							<div>
								{#if selectedImage}
									<div class="bg-card flex items-center gap-4 rounded-lg border p-4">
										<img
											src={URL.createObjectURL(selectedImage)}
											alt="Selected logo"
											class="h-12 w-12 rounded object-contain"
										/>
										<div class="flex-1">
											<p class="text-sm font-medium">Logo uploaded</p>
											<p class="text-muted-foreground text-xs">Will be centered in QR code</p>
										</div>
										<Button
											variant="outline"
											size="sm"
											onclick={() => {
												selectedImage = undefined;
											}}>Remove</Button
										>
									</div>
								{:else}
									<FileDropper
										bind:fileInputEl
										accept="image/*"
										startsWith="image/"
										onfileaccept={(file) => {
											if (file && file.length > 0) {
												selectedImage = file[0];
											}
										}}
										onclick={() => {
											fileInputEl?.click();
										}}
									>
										<div class="border-border rounded-lg border-2 border-dashed p-6 text-center">
											<ImageIcon class="text-muted-foreground mx-auto mb-2 h-8 w-8" />
											<p class="text-muted-foreground mb-2 text-sm">Upload a logo or image</p>
											<Input
												type="file"
												accept="image/*"
												onchange={(e) => {}}
												class="hidden"
												id="image-upload"
											/>
										</div>
									</FileDropper>
								{/if}
							</div>
						</div>
					</Card.Content>
				</Card.Root>
				<Separator />
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<CardIcon icon={Grip} />
							Dot Style
						</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-6">
						<QrGenShapeSelect
							label="Style"
							items={dotTypeEnum}
							bind:value={dotsOptionsType}
							bind:color={
								() => dotsOptionsColor,
								(v) => {
									dotsOptionsColor = v;
								}
							}
							bind:gradient={
								() => dotsOptionsGradient,
								(v) => {
									dotsOptionsGradient = v;
								}
							}
						/>
					</Card.Content>
				</Card.Root>
				<Separator />
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<CardIcon icon={RectOutsidePrimary} />
							Corner Squares
						</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-6">
						<QrGenShapeSelect
							label="Style"
							items={cornersTypeEnum}
							bind:value={cornersSquareOptionsType}
							bind:color={
								() => cornersSquareOptionsColor,
								(v) => {
									cornersSquareOptionsColor = v;
								}
							}
							bind:gradient={
								() => cornersSquareOptionsGradient,
								(v) => {
									cornersSquareOptionsGradient = v;
								}
							}
						/>
					</Card.Content>
				</Card.Root>
				<Separator />
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<CardIcon icon={RectInsidePrimary} />
							Corner Dots
						</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-6">
						<QrGenShapeSelect
							label="Style"
							items={cornersTypeEnum}
							bind:value={cornerDotOptionsType}
							bind:color={
								() => cornerDotOptionsColor,
								(v) => {
									cornerDotOptionsColor = v;
								}
							}
							bind:gradient={
								() => cornerDotOptionsGradient,
								(v) => {
									cornerDotOptionsGradient = v;
								}
							}
						/>
					</Card.Content>
				</Card.Root>
			</div>

			<div class="space-y-6">
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<CardIcon icon={QrCode} />
							Preview
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<div
							class="border-border relative flex min-h-96 flex-col items-center justify-between overflow-hidden rounded-lg border-2 border-dashed px-8"
							style:background-color={qrCode?._options.backgroundOptions.color}
						>
							<div class="relative flex items-center justify-center rounded-lg p-12">
								<div bind:this={qrCodeEl}></div>
							</div>
							<span class="text-muted-foreground mb-2 w-2/3 truncate text-sm" title={opts.data}
								>{opts.data}</span
							>
						</div>
					</Card.Content>
				</Card.Root>
				<Separator />
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">Download Options</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="grid grid-cols-2 gap-2">
							<div class="space-y-2">
								<Label for="size">Download Size (pixels)</Label>
								<Select.Root type="single" bind:value={exportSize}>
									<Select.Trigger class="mt-1 w-full">
										{exportSizeEnum[exportSize] || 'Select Size'}
									</Select.Trigger>
									<Select.Content>
										{#each Object.entries(exportSizeEnum) as [value, label]}
											<Select.Item {label} {value} />
										{/each}
									</Select.Content>
								</Select.Root>
							</div>
							<div class="space-y-2">
								<Label for="error-correction">Error Correction</Label>
								<Select.Root
									type="single"
									bind:value={
										() => correctionLevel,
										(v) => {
											correctionLevel = v;
											if (
												errorCorrectionLevelPercentages[qrImageSize] >
												errorCorrectionLevelPercentages[correctionLevel]
											) {
												qrImageSize = correctionLevel;
											}
										}
									}
								>
									<Select.Trigger class="mt-1 w-full">
										{errorCorrectionLevelEnum[correctionLevel] || 'Select Level'}
									</Select.Trigger>
									<Select.Content>
										{#each Object.entries(errorCorrectionLevelEnum) as [value, label]}
											<Select.Item {label} {value} />
										{/each}
									</Select.Content>
								</Select.Root>
							</div>
						</div>
						<div class="flex flex-col gap-2 md:flex-row">
							<Button
								class="grow"
								variant="outline"
								onclick={() => {
									const newQrCode = new QRCodeStyling({
										...opts,
										width: parseInt(exportSize),
										height: parseInt(exportSize)
									});
									newQrCode.download({
										name: 'niro-qr-code',
										extension: 'png'
									});
								}}
							>
								<Download class="mr-2 h-4 w-4" />
								PNG
							</Button>
							<Button
								class="grow"
								onclick={() => {
									const newQrCode = new QRCodeStyling({
										...opts,
										width: parseInt(exportSize),
										height: parseInt(exportSize)
									});
									newQrCode.download({
										name: 'niro-qr-code',
										extension: 'svg'
									});
								}}
							>
								<Download class="mr-2 h-4 w-4" /> SVG</Button
							>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</div>
