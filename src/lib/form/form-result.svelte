<script lang="ts">
	import type { FormState } from '$lib/utils/common';
	import { fly } from 'svelte/transition';
	interface Props {
		formState?: FormState;
		timeout?: number;
		onSuccessEnd?: () => void;
	}

	let { formState = $bindable('idle'), timeout = 3000, onSuccessEnd }: Props = $props();

	$effect(() => {
		if (formState != 'idle') {
			setTimeout(() => {
				if (formState === 'success' && onSuccessEnd) {
					onSuccessEnd();
				}
				formState = 'idle';
			}, timeout);
		}
	});
</script>

{#if formState === 'success'}
	<div transition:fly={{ y: -10 }}>
		<div
			class="relative mb-5 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
			role="alert"
		>
			<strong class="font-bold">Success!</strong>
			<span class="block sm:inline">Your form has been submitted successfully.</span>
		</div>
	</div>
{:else if formState === 'error'}
	<div transition:fly={{ y: -10 }}>
		<div
			class="relative mb-5 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
			role="alert"
		>
			<strong class="font-bold">Error!</strong>
			<span class="block sm:inline">There was an error submitting your form. Please try again.</span
			>
		</div>
	</div>
{/if}
