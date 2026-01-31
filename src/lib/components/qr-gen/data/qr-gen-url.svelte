<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	let { value = $bindable() }: { value: string } = $props();

	let basicUrlValue = $state('');
	let withPrefix = $state(true);

	$effect(() => {
		let v = withPrefix ? 'https://' : '';
		v += basicUrlValue;
		value = v;
	});
</script>

<div class="col-span-2 space-y-2">
	<Label for="url">Website URL</Label>
	<div class="flex flex-row items-center gap-2">
		<span class="text-muted-foreground text-xs">
			{#if withPrefix}
				https://
			{/if}
		</span>
		<Input id="url" type="text" placeholder="example.com" bind:value={basicUrlValue} />
	</div>
	<div class="flex flex-row items-center gap-2 text-sm">
		<Checkbox id="prefix-checkbox" bind:checked={withPrefix} />
		<Label for="prefix-checkbox" class="text-muted-foreground">With https:// prefix</Label>
	</div>
</div>
