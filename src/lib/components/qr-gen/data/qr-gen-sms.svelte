<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { Button } from '$lib/components/ui/button';

	let { value = $bindable() }: { value: string } = $props();

	type SmsState = {
		phone: string;
		message: string;
		format: 'SMSTO' | 'sms';
	};

	let sms: SmsState = $state({
		phone: '',
		message: '',
		format: 'SMSTO'
	});

	function sanitizePhone(raw: string) {
		const trimmed = raw.trim();
		const plus = trimmed.startsWith('+') ? '+' : '';
		return plus + trimmed.replace(/[^\d]/g, '');
	}

	function buildPayload() {
		const phone = sanitizePhone(sms.phone);
		if (!phone) {
			value = '';
			return;
		}

		const msg = sms.message.trim();

		if (sms.format === 'SMSTO') {
			value = msg ? `SMSTO:${phone}:${msg}` : `SMSTO:${phone}`;
		} else {
			const params = new URLSearchParams();
			if (msg) params.set('body', msg);
			const qs = params.toString();
			value = qs ? `sms:${phone}?${qs}` : `sms:${phone}`;
		}
	}

	$effect(() => {
		sms;
		buildPayload();
	});
</script>

<div class="space-y-4">
	<div class="grid gap-4 md:grid-cols-2">
		<div class="space-y-2 md:col-span-2">
			<Label for="phone">Phone Number</Label>
			<Input
				id="phone"
				placeholder="+15551234567"
				bind:value={sms.phone}
				inputmode="tel"
				autocomplete="tel"
			/>
		</div>

		<div class="space-y-2 md:col-span-2">
			<Label for="message">Message</Label>
			<Textarea
				id="message"
				bind:value={sms.message}
				placeholder="Hi! Your verification code is 123456"
				rows={4}
			/>
			<p class="text-muted-foreground text-[10px]">
				Leave message empty to only open the SMS composer with the number pre‑filled.
			</p>
		</div>
	</div>

	<div class="flex flex-wrap gap-3">
		<Button
			size="sm"
			variant={sms.format === 'SMSTO' ? 'default' : 'outline'}
			onclick={() => (sms.format = 'SMSTO')}
		>
			SMSTO Format
		</Button>
		<Button
			size="sm"
			variant={sms.format === 'sms' ? 'default' : 'outline'}
			onclick={() => (sms.format = 'sms')}
		>
			sms: URL Format
		</Button>
	</div>
</div>
