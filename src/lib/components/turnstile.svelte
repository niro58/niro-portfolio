<script lang="ts">
	// Cloudflare Turnstile: the human check the platform's public contact path requires.
	// Rendered explicitly, so the script loads only on a page that shows a form.
	import { onMount } from 'svelte';

	type Props = {
		siteKey: string;
		token?: string;
		reset?: () => void;
	};

	let { siteKey, token = $bindable(''), reset = $bindable() }: Props = $props();
	let box: HTMLDivElement;

	const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

	function load(): Promise<void> {
		const w = window as any;
		if (w.turnstile) return Promise.resolve();
		w.__turnstileLoad ??= new Promise<void>((resolve, reject) => {
			const script = document.createElement('script');
			script.src = SRC;
			script.async = true;
			script.onload = () => resolve();
			script.onerror = () => reject(new Error('Turnstile failed to load'));
			document.head.appendChild(script);
		});
		return w.__turnstileLoad;
	}

	onMount(() => {
		let id: string | undefined;
		let gone = false;
		load()
			.then(() => {
				if (gone) return;
				const turnstile = (window as any).turnstile;
				id = turnstile.render(box, {
					sitekey: siteKey,
					callback: (value: string) => (token = value),
					'expired-callback': () => (token = ''),
					'error-callback': () => (token = '')
				});
				// A Turnstile answer is single-use: the form resets it after every send.
				reset = () => {
					token = '';
					turnstile.reset(id);
				};
			})
			.catch(() => (token = ''));
		return () => {
			gone = true;
			if (id) (window as any).turnstile?.remove(id);
		};
	});
</script>

<div bind:this={box} class="min-h-[65px]"></div>
