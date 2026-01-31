<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Button } from '$lib/components/ui/button';
	import { MapPin, Crosshair, Info } from '@lucide/svelte';

	let { value = $bindable() }: { value: string } = $props();

	type GeoFormat = 'geo' | 'google' | 'osm';

	type GeoState = {
		lat: string;
		lon: string;
		alt: string;
		label: string;
		format: GeoFormat;
		includeAltitude: boolean;
		zoom: number;
	};

	let geo: GeoState = $state({
		lat: '',
		lon: '',
		alt: '',
		label: '',
		format: 'geo',
		includeAltitude: false,
		zoom: 17
	});

	let locating = $state(false);
	let errorMsg = $state('');

	function clamp(n: number, min: number, max: number) {
		return Math.min(Math.max(n, min), max);
	}

	function norm(v: string, type: 'lat' | 'lon' | 'alt'): string {
		if (!v.trim()) return '';
		const num = Number(v);
		if (Number.isNaN(num)) return '';
		if (type === 'lat') return clamp(num, -90, 90).toFixed(6);
		if (type === 'lon') return clamp(num, -180, 180).toFixed(6);
		return clamp(num, -1000, 10000).toString();
	}

	function build() {
		errorMsg = '';
		const lat = norm(geo.lat, 'lat');
		const lon = norm(geo.lon, 'lon');

		if (!lat || !lon) {
			value = '';
			return;
		}

		const labelClean = geo.label.trim().replace(/\s+/g, ' ');
		const alt = geo.includeAltitude ? norm(geo.alt, 'alt') : '';

		if (geo.format === 'geo') {
			const core = `geo:${lat},${lon}${alt ? ',' + alt : ''}`;
			const q = labelClean ? `?q=${encodeURIComponent(labelClean)}` : '';
			value = core + q;
		} else if (geo.format === 'google') {
			const base = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
			value = labelClean ? `${base}(${encodeURIComponent(labelClean)})` : base;
		} else {
			const z = geo.zoom || 17;
			value = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${z}/${lat}/${lon}`;
		}
	}

	async function locate() {
		if (!('geolocation' in navigator)) {
			errorMsg = 'Geolocation not supported.';
			return;
		}
		locating = true;
		errorMsg = '';
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { latitude, longitude, altitude } = pos.coords;
				geo.lat = latitude.toFixed(6);
				geo.lon = longitude.toFixed(6);
				if (altitude != null) {
					geo.alt = altitude.toFixed(0);
				}
				locating = false;
			},
			(err) => {
				errorMsg = err.message;
				locating = false;
			},
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	}

	$effect(() => {
		geo;
		build();
	});
</script>

<div class="space-y-6">
	<div class="grid gap-4 md:grid-cols-2">
		<div class="space-y-2">
			<Label for="lat" class="flex items-center gap-2">
				<MapPin class="h-4 w-4" /> Latitude *
			</Label>
			<Input
				id="lat"
				placeholder="48.858260"
				bind:value={geo.lat}
				inputmode="decimal"
				autocomplete="off"
			/>
		</div>
		<div class="space-y-2">
			<Label for="lon">Longitude *</Label>
			<Input
				id="lon"
				placeholder="2.294499"
				bind:value={geo.lon}
				inputmode="decimal"
				autocomplete="off"
			/>
		</div>
		<div class="space-y-2">
			<Label for="label">Label (optional)</Label>
			<Input id="label" placeholder="Eiffel Tower" bind:value={geo.label} />
		</div>
		<div class="space-y-2">
			<Label for="zoom">Zoom (OSM)</Label>
			<Input
				id="zoom"
				type="number"
				min="1"
				max="20"
				bind:value={geo.zoom}
				disabled={geo.format !== 'osm'}
			/>
		</div>
		<div class="space-y-2">
			<div class="flex items-center gap-2">
				<input
					id="incAlt"
					type="checkbox"
					class="border-border accent-primary h-4 w-4 rounded"
					bind:checked={geo.includeAltitude}
				/>
				<Label for="incAlt">Include Altitude</Label>
			</div>
			<Input
				placeholder="35"
				bind:value={geo.alt}
				inputmode="decimal"
				disabled={!geo.includeAltitude}
			/>
			<p class="text-muted-foreground text-[10px]">Meters above sea level.</p>
		</div>
	</div>

	<div class="flex flex-wrap gap-2">
		<Button
			type="button"
			size="sm"
			variant={geo.format === 'geo' ? 'default' : 'outline'}
			onclick={() => (geo.format = 'geo')}
			aria-pressed={geo.format === 'geo'}
		>
			geo: format
		</Button>
		<Button
			type="button"
			size="sm"
			variant={geo.format === 'google' ? 'default' : 'outline'}
			onclick={() => (geo.format = 'google')}
		>
			Google Maps
		</Button>
		<Button
			type="button"
			size="sm"
			variant={geo.format === 'osm' ? 'default' : 'outline'}
			onclick={() => (geo.format = 'osm')}
		>
			OpenStreetMap
		</Button>

		<Button
			type="button"
			size="sm"
			variant="outline"
			disabled={locating}
			onclick={locate}
			class="flex items-center gap-1"
		>
			<Crosshair class="h-3 w-3" />
			{locating ? 'Locating…' : 'Use current'}
		</Button>

		<p class="text-muted-foreground ml-auto flex items-center gap-1 text-[10px]">
			<Info class="h-3 w-3" />
			Enter valid decimal degrees (±90 / ±180).
		</p>
	</div>

	{#if errorMsg}
		<p class="text-destructive text-[11px]">{errorMsg}</p>
	{/if}
</div>
