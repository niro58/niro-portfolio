<script lang="ts">
	import * as Select from '$lib/components/ui/select/index';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	type Gradient = {
		type: 'linear' | 'radial';
		colorStops: Array<{ offset: number; color: string }>;
		rotation?: number;
	};

	type Props = {
		value: string;
		label: string;
		items: Record<string, string>;
		color: string | undefined;
		gradient: Gradient | undefined;
	};
	let {
		value = $bindable(),
		label,
		items,
		color = $bindable(),
		gradient = $bindable()
	}: Props = $props();

	function nextElIndex<T>(current: T, array: T[]) {
		const currentIndex = array.indexOf(current);
		return (currentIndex + 1) % array.length;
	}
	function prevElIndex<T>(current: T, array: T[]) {
		const currentIndex = array.indexOf(current);
		return (currentIndex - 1 + array.length) % array.length;
	}

	function addColorStop() {
		if (!gradient) return;
		if (gradient.colorStops.length < 5) {
			gradient.colorStops = [...gradient.colorStops, { offset: 1, color: '#000000' }];
		}
	}

	function removeColorStop(index: number) {
		if (!gradient) return;
		if (gradient.colorStops.length > 2) {
			gradient.colorStops = gradient.colorStops.filter(
				(_: { offset: number; color: string }, i: number) => i !== index
			);
		}
	}
</script>

<div class="space-y-4">
	<div class="space-y-2">
		<Label>{label}</Label>
		<div class="flex flex-row justify-between gap-2">
			<Select.Root type="single" bind:value>
				<Select.Trigger class="mt-1 w-full">
					{items[value] || 'Select Style'}
				</Select.Trigger>
				<Select.Content>
					{#each Object.entries(items) as [value, label]}
						<Select.Item {label} {value} />
					{/each}
				</Select.Content>
			</Select.Root>
			<div class="flex flex-row items-end gap-2">
				<Button
					onclick={() => {
						value = Object.keys(items)[nextElIndex(value, Object.keys(items))];
					}}><ArrowLeft /></Button
				>
				<Button
					onclick={() => {
						value = Object.keys(items)[prevElIndex(value, Object.keys(items))];
					}}
				>
					<ArrowRight />
				</Button>
			</div>
		</div>
	</div>
	<Separator />
	<div class="space-y-2">
		<Label>Color Type</Label>
		<div class="flex gap-2">
			<Button
				variant={color !== undefined ? 'default' : 'outline'}
				onclick={() => {
					if (color === undefined) {
						color = '#000000';
						gradient = undefined;
					}
				}}
				class="flex-1"
			>
				Solid Color
			</Button>
			<Button
				variant={gradient !== undefined ? 'default' : 'outline'}
				onclick={() => {
					if (gradient === undefined) {
						color = undefined;
						gradient = {
							type: 'linear',
							colorStops: [
								{ offset: 0, color: '#000000' },
								{ offset: 1, color: '#ffffff' }
							]
						};
					}
				}}
				class="flex-1"
			>
				Gradient
			</Button>
		</div>
	</div>

	{#if color}
		<div class="space-y-2">
			<Label>Color</Label>
			<div class="flex gap-2">
				<Input type="color" bind:value={color} class="w-12 rounded border p-1" />
				<Input bind:value={color} placeholder="#000000" class="flex-1" />
			</div>
		</div>
	{:else if gradient !== undefined}
		<div class="space-y-4">
			<div class="space-y-2">
				<Label>Gradient Type</Label>
				<div class="flex gap-2">
					<Button
						variant={gradient.type === 'linear' ? 'default' : 'outline'}
						onclick={() => {
							if (!gradient) return;
							gradient.type = 'linear';
						}}
						class="flex-1"
					>
						Linear
					</Button>
					<Button
						variant={gradient.type === 'radial' ? 'default' : 'outline'}
						onclick={() => {
							if (!gradient) return;
							gradient.type = 'radial';
						}}
						class="flex-1"
					>
						Radial
					</Button>
				</div>
			</div>

			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<Label>Color Stops</Label>
					<Button
						variant="outline"
						size="sm"
						onclick={addColorStop}
						disabled={gradient.colorStops.length >= 5}
					>
						Add Stop
					</Button>
				</div>
				<div class="space-y-2">
					{#each gradient.colorStops as stop, index}
						<div class="flex items-center gap-2">
							<Input
								type="color"
								bind:value={
									() => stop.color,
									(v) => {
										if (!gradient) return;
										stop.color = v;
										gradient = {
											...gradient
										};
									}
								}
								class="w-12 rounded border p-1"
							/>
							<Input
								type="number"
								min="0"
								max="1"
								step="0.1"
								bind:value={
									() => stop.offset,
									(v) => {
										if (!gradient) return;
										stop.offset = v;
										gradient = {
											...gradient
										};
									}
								}
								placeholder="0.0"
								class="w-20"
							/>
							<Button
								variant="outline"
								size="sm"
								onclick={() => removeColorStop(index)}
								disabled={gradient.colorStops.length <= 2}
							>
								Remove
							</Button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
