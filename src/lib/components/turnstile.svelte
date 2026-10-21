<script lang="ts">
	// Cloudflare Turnstile: the human check the platform's public contact path requires.
	// Rendered explicitly, so the script loads only on a page that shows a form.
	// The check is never silent: while it runs the visitor sees `labels.checking`, and a
	// widget error, a failed script load or no answer in time shows `labels.failed` + retry.
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	type TurnstileStatus = 'checking' | 'ready' | 'failed';

	type Props = {
		siteKey: string;
		labels: { checking: string; failed: string; retry: string };
		token?: string;
		status?: TurnstileStatus;
		reset?: () => void;
	};

	let {
		siteKey,
		labels,
		token = $bindable(''),
		status = $bindable('checking'),
		reset = $bindable()
	}: Props = $props();
	let box: HTMLDivElement;
	let retry = $state<() => void>(() => {});

	const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
	// A non-interactive check answers in seconds. The timer is dropped once the widget asks
	// the visitor to act (before-interactive), so a slow human is never reported as a failure.
	const PATIENCE_MS = 25_000;

	function load(): Promise<void> {
		const w = window as any;
		if (w.turnstile) return Promise.resolve();
		w.__turnstileLoad ??= new Promise<void>((resolve, reject) => {
			const script = document.createElement('script');
			script.src = SRC;
			script.async = true;
			script.onload = () => resolve();
			script.onerror = () => {
				// A failed load must not be cached, or Retry could never succeed.
				w.__turnstileLoad = undefined;
				script.remove();
				reject(new Error('Turnstile failed to load'));
			};
			document.head.appendChild(script);
		});
		return w.__turnstileLoad;
	}

	onMount(() => {
		let id: string | undefined;
		let gone = false;
		let timer: ReturnType<typeof setTimeout> | undefined;

		const fail = () => {
			clearTimeout(timer);
			token = '';
			status = 'failed';
		};
		const watch = () => {
			clearTimeout(timer);
			timer = setTimeout(fail, PATIENCE_MS);
		};

		function start() {
			token = '';
			status = 'checking';
			watch();
			load()
				.then(() => {
					if (gone) return;
					const turnstile = (window as any).turnstile;
					if (id) turnstile.remove(id);
					id = turnstile.render(box, {
						sitekey: siteKey,
						callback: (value: string) => {
							clearTimeout(timer);
							token = value;
							status = 'ready';
						},
						'before-interactive-callback': () => clearTimeout(timer),
						'expired-callback': () => {
							token = '';
							status = 'checking';
							watch();
						},
						'timeout-callback': fail,
						'error-callback': () => {
							fail();
							return true;
						}
					});
				})
				.catch(() => !gone && fail());
		}

		// A Turnstile answer is single-use: the form resets it after every send.
		reset = () => {
			token = '';
			status = 'checking';
			watch();
			if (id) (window as any).turnstile?.reset(id);
		};
		retry = () => {
			if (id && (window as any).turnstile) {
				token = '';
				status = 'checking';
				watch();
				(window as any).turnstile.reset(id);
			} else start();
		};
		start();

		return () => {
			gone = true;
			clearTimeout(timer);
			if (id) (window as any).turnstile?.remove(id);
		};
	});
</script>

<div bind:this={box} class="min-h-[65px]"></div>
{#if status === 'checking'}
	<p role="status" class="text-muted-foreground text-sm">{labels.checking}</p>
{:else if status === 'failed'}
	<div
		role="alert"
		class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700"
	>
		<p>{labels.failed}</p>
		<Button type="button" variant="outline" size="sm" class="mt-2" onclick={() => retry()}>
			{labels.retry}
		</Button>
	</div>
{/if}
