<script lang="ts">
	import * as Accordion from '$ui/accordion/index';
	const {
		items,
		title = 'Frequently Asked Questions'
	}: {
		items: {
			question: string;
			answer: string;
		}[];
		title?: string;
	} = $props();
</script>

<section class="relative py-16 md:py-24 lg:pt-16 lg:pb-32" id="faq">
	<div class="container px-4 md:px-6">
		<h2 class="text-primary mb-12 text-center text-3xl font-bold md:text-4xl">
			Frequently Asked Questions
		</h2>
		<Accordion.Root type="single" class="mx-auto max-w-3xl space-y-4">
			{#each items as { question, answer }}
				<Accordion.Item>
					<Accordion.Trigger>{question}</Accordion.Trigger>
					<Accordion.Content>
						{answer}
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</section>
