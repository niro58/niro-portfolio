<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Phone, Info } from '@lucide/svelte';

	let { value = $bindable() }: { value: string } = $props();

	type PhoneState = {
		raw: string;
		format: 'tel' | 'TEL';
	};
	let phone: PhoneState = $state({ raw: '', format: 'tel' });

	function sanitize(raw: string): string {
		const trimmed = raw.trim();
		const plus = trimmed.startsWith('+') ? '+' : '';
		const digits = trimmed.replace(/[^\d]/g, '');
		return plus + digits;
	}

	function build() {
		const cleaned = sanitize(phone.raw);
		if (!cleaned) {
			value = '';
			return;
		}
		value = phone.format === 'tel' ? `tel:${cleaned}` : `TEL:${cleaned}`;
	}

	$effect(() => {
		phone;
		build();
	});
</script>

<div class="space-y-5">
	<div class="space-y-2">
		<Label for="phone" class="flex items-center gap-2">
			<Phone class="h-4 w-4" />
			Phone Number
		</Label>
		<Input
			id="phone"
			placeholder="+15551234567"
			autocomplete="tel"
			inputmode="tel"
			bind:value={phone.raw}
		/>
		<p class="text-muted-foreground text-[10px]">
			Only digits and optional leading + are kept. Required field.
		</p>
	</div>

	<div class="flex flex-wrap gap-2">
		<Button
			type="button"
			size="sm"
			variant={phone.format === 'tel' ? 'default' : 'outline'}
			onclick={() => (phone.format = 'tel')}
		>
			tel: format
		</Button>
		<Button
			type="button"
			size="sm"
			variant={phone.format === 'TEL' ? 'default' : 'outline'}
			onclick={() => (phone.format = 'TEL')}
		>
			TEL: format
		</Button>
		<p class="text-muted-foreground ml-auto flex items-center gap-1 text-[10px]">
			<Info class="h-3 w-3" />
			Output updates automatically
		</p>
	</div>
</div>
