<script lang="ts">
	import Button from './ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	let isSetup: boolean = $state(true);

	function handleAccept() {
		localStorage.setItem('analytics-consent', 'true');
		isSetup = true;
	}

	onMount(() => {
		const consent = localStorage.getItem('analytics-consent');

		if (consent === 'true') {
			isSetup = true;
		} else {
			isSetup = false;
		}
	});
</script>

{#if !isSetup}
	<div
		class="border-border bg-background p- 4 fixed right-0 bottom-0 left-0 z-50 border-t md:p-6"
		in:fly={{ y: 20, duration: 300 }}
		out:fly={{ y: 20, duration: 300 }}
	>
		<div class="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
			<div class="text-foreground flex-grow text-sm">
				<p>
					I use analytics only for website traffic analysis. No data is shared for advertising,
					personalization, or marketing purposes.
				</p>
				<!-- <pre>
                    <code>
settings:{'{'}
	anonymize_ip: true,
	send_page_view: true
{'}'},
consent:{'{'}
	ad_user_data: 'denied',
	ad_personalization: 'denied',
	ad_storage: 'denied',
	analytics_storage: 'granted'
{'}'}
                    </code>
                </pre> -->
			</div>
			<div class="flex items-center gap-4">
				<Button size="icon" class="w-16" onclick={handleAccept} variant="outline">OK</Button>
			</div>
		</div>
	</div>
{/if}
