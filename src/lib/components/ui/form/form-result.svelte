<script lang="ts">
	import { AppConfig } from '$config/app';
	import type { FormState } from '$lib/utils/common';
	import { fly } from 'svelte/transition';
	interface Props {
		formState?: FormState;
	}

	let { formState = 'idle' }: Props = $props();

	// Success and error both stay until the next send. Success used to vanish after 3 s,
	// above a form that had just been emptied, and read as "nothing happened".
	// The outcome takes focus when it appears: it sits above the form, out of view from the
	// submit button, and a screen reader reads the focused message aloud.
	function focusOnMount(node: HTMLElement) {
		node.focus();
	}
</script>

{#if formState === 'success'}
	<div transition:fly={{ y: -10 }}>
		<div
			class="relative mb-5 scroll-mt-24 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 outline-none"
			role="status"
			aria-live="polite"
			tabindex="-1"
			use:focusOnMount
		>
			<strong class="font-bold">Thank you, I have received your message.</strong>
			<span class="block">I will reply to the email address you gave as soon as I can.</span>
		</div>
	</div>
{:else if formState === 'error'}
	<div transition:fly={{ y: -10 }}>
		<div
			class="relative mb-5 scroll-mt-24 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 outline-none"
			role="alert"
			tabindex="-1"
			use:focusOnMount
		>
			<strong class="font-bold">Your message could not be sent.</strong>
			<span class="block">
				It is still in the form, so please try sending it again, or email me at
				<a class="underline" href={`mailto:${AppConfig.contact.email}`}>{AppConfig.contact.email}</a>.
			</span>
		</div>
	</div>
{/if}
