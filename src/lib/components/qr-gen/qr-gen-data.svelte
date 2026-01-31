<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import {
		Link as LinkIcon,
		Text as TextIcon,
		Wifi,
		IdCard,
		Mail,
		Image as ImageIcon,
		MessageCircle,
		Phone,
		MapPin,
		ChevronDown,
		ChevronUp
	} from '@lucide/svelte';

	import QrGenText from './data/qr-gen-text.svelte';
	import QrGenEmail from './data/qr-gen-email.svelte';
	import QrGenWifi from './data/qr-gen-wifi.svelte';
	import QrGenVcard from './data/qr-gen-vcard.svelte';
	import { cn } from '$lib/utils/common';
	import QrGenUrl from './data/qr-gen-url.svelte';
	import CardIcon from '$lib/components/ui/card-icon.svelte';
	import QrGenSms from './data/qr-gen-sms.svelte';
	import QrGenPhone from './data/qr-gen-phone.svelte';
	import QrGenGeo from './data/qr-gen-geo.svelte';
	import { slide } from 'svelte/transition';
	import { untrack } from 'svelte';

	let { data = $bindable(), defaultTab }: { data: string; defaultTab?: string } = $props();

	type TypeDef = {
		value: string;
		label: string;
		description: string;
		icon: any;
		component: any;
		popular?: boolean;
		disabled?: boolean;
	};

	const typeDefs: TypeDef[] = [
		{
			value: 'url',
			label: 'URL',
			description: 'Website / landing page',
			icon: LinkIcon,
			component: QrGenUrl,
			popular: true
		},
		{
			value: 'text',
			label: 'Text',
			description: 'Plain text / note',
			icon: TextIcon,
			component: QrGenText,
			popular: true
		},
		{
			value: 'wifi',
			label: 'Wi‑Fi',
			description: 'Network credentials',
			icon: Wifi,
			component: QrGenWifi,
			popular: true
		},
		{
			value: 'vcard',
			label: 'vCard',
			description: 'Contact card',
			icon: IdCard,
			component: QrGenVcard,
			popular: true
		},
		{
			value: 'email',
			label: 'Email',
			description: 'Pre‑filled email draft',
			icon: Mail,
			component: QrGenEmail,
			popular: true
		},
		{
			value: 'logo',
			label: 'Logo',
			description: 'Branded link (use URL + style)',
			icon: ImageIcon,
			component: QrGenUrl
		},
		{
			value: 'sms',
			label: 'SMS',
			description: 'Pre‑filled text message',
			icon: MessageCircle,
			component: QrGenSms
		},
		{
			value: 'phone',
			label: 'Phone',
			description: 'Click‑to‑call number',
			icon: Phone,
			component: QrGenPhone
		},
		{
			value: 'geo',
			label: 'Geo',
			description: 'Latitude / longitude',
			icon: MapPin,
			component: QrGenGeo
		}
	];

	const popular = typeDefs.filter((t) => t.popular);
	let activeType = $state<string>(defaultTab || popular[0]?.value || typeDefs[0].value);

	let browseOpen = $state(false);

	const activeDef = $derived(typeDefs.find((t) => t.value === activeType) || typeDefs[0]);

	function selectType(v: string) {
		activeType = v;
	}
	$effect(() => {
		defaultTab;
		untrack(() => {
			if (defaultTab) {
				activeType = defaultTab;
			}
		});
	});
</script>

<!-- CARD: TYPE SELECTION -->
<Card.Root class="space-y-0">
	<Card.Header>
		<Card.Title class="flex items-center gap-2">
			<CardIcon icon={TextIcon} />
			Data Type
		</Card.Title>
	</Card.Header>

	<Card.Content class="space-y-6">
		<!-- Popular quick chips -->
		<div
			tabindex="0"
			class="border-border bg-card/70 flex flex-wrap gap-2 rounded-lg border p-3"
			role="listbox"
			aria-label="Popular QR code types"
		>
			{#each popular as t, i}
				<Button
					type="button"
					variant={activeType === t.value ? 'default' : 'outline'}
					onclick={() => selectType(t.value)}
				>
					<t.icon class="h-4 w-4" />
					<span>{t.label}</span>
				</Button>
			{/each}
		</div>
		<Button variant="outline" onclick={() => (browseOpen = !browseOpen)}>
			{browseOpen ? 'Hide' : 'Browse all'}
			{#if browseOpen}
				<ChevronUp class="ml-1 h-3 w-3" />
			{:else}
				<ChevronDown class="ml-1 h-3 w-3" />
			{/if}
		</Button>

		<!-- Extended browser -->
		{#if browseOpen}
			<div
				class="border-border bg-card space-y-4 rounded-lg border p-4"
				transition:slide={{
					duration: 300
				}}
			>
				<div
					role="listbox"
					aria-label="All QR code types"
					tabindex="0"
					class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
				>
					{#each typeDefs as t, i}
						<Button
							onclick={() => selectType(t.value)}
							variant={activeType === t.value ? 'default' : 'outline'}
							class=""
						>
							<t.icon class="h-4 w-4" />
							{t.label}
						</Button>
					{/each}
				</div>
			</div>
		{/if}
	</Card.Content>
</Card.Root>

<!-- CARD: ACTIVE FORM -->
<Card.Root>
	<Card.Header class="pb-3">
		<Card.Title class="flex items-center gap-2 text-base">
			<CardIcon icon={activeDef.icon} />
			{activeDef.label} Data
		</Card.Title>
		<Card.Description>
			{activeDef.description}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<activeDef.component
			bind:value={
				() => data,
				(v) => {
					data = v;
				}
			}
		/>
	</Card.Content>
</Card.Root>
