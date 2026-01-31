<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	let { value = $bindable() }: { value: string } = $props();

	let vCardTab = $state({
		firstName: '',
		lastName: '',
		organization: '',
		title: '',
		phone: '',
		email: '',
		address: '',
		website: ''
	});

	$effect(() => {
		const vCardLines = [
			'BEGIN:VCARD',
			'VERSION:3.0',
			`N:${vCardTab.lastName};${vCardTab.firstName}`,
			`FN:${vCardTab.firstName} ${vCardTab.lastName}`,
			vCardTab.organization ? `ORG:${vCardTab.organization}` : '',
			vCardTab.title ? `TITLE:${vCardTab.title}` : '',
			vCardTab.phone ? `TEL;TYPE=WORK,VOICE:${vCardTab.phone}` : '',
			vCardTab.email ? `EMAIL;TYPE=PREF,INTERNET:${vCardTab.email}` : '',
			vCardTab.address ? `ADR;TYPE=WORK:;;${vCardTab.address};;;;` : '',
			vCardTab.website ? `URL:${vCardTab.website}` : '',
			'END:VCARD'
		].filter(Boolean);
		value = vCardLines.join('\n');
	});
</script>

<div class="grid grid-cols-2 gap-4">
	<div class="space-y-2">
		<Label for="first-name">First Name</Label>
		<Input id="first-name" bind:value={vCardTab.firstName} placeholder="John" class="mt-1" />
	</div>
	<div class="space-y-2">
		<Label for="last-name">Last Name</Label>
		<Input id="last-name" bind:value={vCardTab.lastName} placeholder="Doe" class="mt-1" />
	</div>
	<div class="space-y-2">
		<Label for="organization">Organization</Label>
		<Input
			id="organization"
			bind:value={vCardTab.organization}
			placeholder="Company Inc."
			class="mt-1"
		/>
	</div>
	<div class="space-y-2">
		<Label for="title">Job Title</Label>
		<Input id="title" bind:value={vCardTab.title} placeholder="Software Engineer" class="mt-1" />
	</div>
	<div class="space-y-2">
		<Label for="phone">Phone Number</Label>
		<Input
			id="phone"
			bind:value={vCardTab.phone}
			type="tel"
			placeholder="+1234567890"
			class="mt-1"
		/>
	</div>
	<div class="space-y-2">
		<Label for="email-vcard">Email Address</Label>
		<Input
			id="email-vcard"
			bind:value={vCardTab.email}
			type="email"
			placeholder="example@email.com"
			class="mt-1"
		/>
	</div>
	<div class="space-y-2">
		<Label for="address">Address</Label>
		<Input
			id="address"
			bind:value={vCardTab.address}
			placeholder="123 Main St, City"
			class="mt-1"
		/>
	</div>
	<div class="space-y-2">
		<Label for="website">Website</Label>
		<Input
			id="website"
			bind:value={vCardTab.website}
			type="url"
			placeholder="https://example.com"
			class="mt-1"
		/>
	</div>
</div>
