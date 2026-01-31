<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';

	let { value = $bindable() }: { value: string } = $props();

	const wifiSecurityEnum = {
		WPA: 'WPA/WPA2',
		WEP: 'WEP',
		nopass: 'No Password'
	} as const;

	let wifiTab = $state({
		SSID: '',
		password: '',
		security: 'WPA'
	});

	$effect(() => {
		value = `WIFI:T:${wifiTab.security};S:${wifiTab.SSID};P:${wifiTab.password};H:false;;`;
	});
</script>

<div class="grid grid-cols-2 gap-4">
	<div class="space-y-2">
		<Label for="ssid">Network Name (SSID)</Label>
		<Input id="ssid" bind:value={wifiTab.SSID} placeholder="MyWiFiNetwork" class="mt-1" />
	</div>
	<div class="space-y-2">
		<Label for="security">Security Type</Label>
		<Select.Root type="single" bind:value={wifiTab.security}>
			<Select.Trigger class="mt-1 w-full">
				{wifiTab.security || 'Select Security Type'}
			</Select.Trigger>
			<Select.Content>
				{#each Object.entries(wifiSecurityEnum) as [value, label]}
					<Select.Item {value}>{label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="col-span-2 space-y-2">
		<Label for="password">Password</Label>
		<Input
			id="password"
			bind:value={wifiTab.password}
			type="password"
			placeholder="WiFi password"
			class="mt-1"
		/>
	</div>
</div>
