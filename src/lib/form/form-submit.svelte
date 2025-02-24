<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { FormState } from '$lib/utils';


	const {
		formState,
		label = 'Odeslat',
		class: className
	}: { formState: FormState; label?: string; class?: string } = $props();
</script>

<Button type="submit" disabled={formState == 'submitting'} class={className}>{label}</Button>
