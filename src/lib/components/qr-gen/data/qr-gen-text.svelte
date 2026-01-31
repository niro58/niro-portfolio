<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	let { value = $bindable() }: { value: string } = $props();
</script>

<div class="col-span-2 space-y-2">
	<Label for="input-text">Text</Label>
	<Textarea
		id="input-text"
		placeholder="Enter your text here"
		bind:value={
			() => value,
			(v) => {
				value = v;
			}
		}
	/>
</div>
