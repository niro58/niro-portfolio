<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	let { value = $bindable() }: { value: string } = $props();

	let emailTab = $state({
		address: '',
		subject: '',
		message: ''
	});

	$effect(() => {
		if (!emailTab) {
			value = 'mailto:';
			return;
		}
		let mailtoUrl = `mailto:${emailTab.address}`;
		const params = new URLSearchParams();
		params.append('subject', emailTab.subject);
		params.append('body', emailTab.message);
		const queryString = params.toString();

		if (queryString) {
			value = `${mailtoUrl}?${queryString}`;
		} else {
			value = mailtoUrl;
		}
	});
</script>

<div class="grid grid-cols-2 gap-4">
	<div class="space-y-2">
		<Label for="email">Email Address</Label>
		<Input
			id="email"
			bind:value={emailTab.address}
			type="email"
			placeholder="example@email.com"
			class="mt-1"
		/>
	</div>
	<div class="space-y-2">
		<Label for="subject">Subject</Label>
		<Input id="subject" bind:value={emailTab.subject} placeholder="Email subject" class="mt-1" />
	</div>
	<div class="col-span-2 space-y-2">
		<Label for="message">Message</Label>
		<Textarea
			bind:value={emailTab.message}
			id="message"
			placeholder="Email message..."
			class="mt-1"
		/>
	</div>
</div>
