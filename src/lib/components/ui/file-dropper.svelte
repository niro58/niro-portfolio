<script lang="ts">
	import { cn } from '$lib/utils/common';
	import type { WithElementRef } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type FileDropProps = {
		fileInputEl?: HTMLInputElement | undefined;
		children: Snippet;
		accept?: string;
		startsWith?: string;
		maxSize?: number;
		onfileaccept: (files: FileList) => void;
	} & WithElementRef<HTMLButtonAttributes>;
	let {
		fileInputEl = $bindable(),
		class: className,
		onfileaccept,
		children,
		accept,
		startsWith = 'image/',
		maxSize = 50 * 1024 * 1024,
		...restProps
	}: FileDropProps = $props();

	let isDragging = $state(false);
	let dragCounter = $state(0);

	function onError(message: string) {
		toast.warning(message);
	}

	function handleDrop(files: FileList) {
		if (files.length > 50) {
			onError('Maximum 50 files allowed');
			return;
		}
		for (let i = 0; i < files.length; i++) {
			const file = files.item(i);
			if (!file || file === null) {
				onError('Invalid file');
				return;
			}
			if (!file.type.startsWith(startsWith)) {
				onError('Invalid file type');
				return;
			}
			if (file.size > maxSize) {
				onError('File size exceeds the limit');
				return;
			}
			if (!file.type.startsWith(startsWith)) {
				onError(`Invalid file type ${file.type} ${startsWith}`);
				return;
			}
		}
		onfileaccept(files);
	}
</script>

<button
	class={cn(
		'h-full w-full',
		className,
		isDragging ? 'border-primary/50 bg-primary/10 transition-colors' : ''
	)}
	ondrop={(e) => {
		e.preventDefault();
		isDragging = false;
		dragCounter = 0;

		const dt = e.dataTransfer;
		if (!dt) return;
		const files = dt.files;
		handleDrop(files);
	}}
	ondragover={(e) => {
		e.preventDefault();
		isDragging = true;
	}}
	ondragenter={() => {
		dragCounter++;
		isDragging = true;
	}}
	ondragleave={() => {
		dragCounter--;
		if (dragCounter === 0) {
			isDragging = false;
		}
	}}
	{...restProps}
>
	{@render children()}
	<input
		type="file"
		accept={accept || ''}
		class="hidden"
		bind:this={fileInputEl}
		multiple
		onchange={(e) => {
			const target = e.target;
			if (target instanceof HTMLInputElement && target.files) {
				const files = target.files;
				handleDrop(files);
			}
		}}
	/>
</button>
