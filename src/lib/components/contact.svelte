<script lang="ts">
	import { Github, Linkedin, Send } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import FormRoot from '$lib/form/form-root.svelte';
	import { contactSchema, type ContactSchema } from '$lib/schemas.js';
	import type { z } from 'zod';
	import type { SuperValidated } from 'sveltekit-superforms/client';
	import { LINKS } from '$config/links';
	import Discord from './ui/discord.svelte';

	const {
		form
	}: {
		form: SuperValidated<z.TypeOf<ContactSchema>>;
	} = $props();
</script>

<section id="contact" class="relative py-24">
	<div class="relative z-10 container">
		<div class="mx-auto max-w-xl">
			<Card.Root class="border-primary/20">
				<Card.Header>
					<Card.Title>Get in touch</Card.Title>
				</Card.Header>
				<Card.Content>
					<FormRoot action="/" data={form} schema={contactSchema}>
						{#snippet children({ form, formData })}
							<div class="space-y-2">
								<Input placeholder="Name" />
							</div>
							<div class="space-y-2">
								<Input placeholder="Email" type="email" />
							</div>
							<div class="space-y-2">
								<Textarea placeholder="Message" class="min-h-[100px]" />
							</div>
							<Button class="w-full">
								Send Message
								<Send class="ml-2 h-4 w-4" />
							</Button>
						{/snippet}
					</FormRoot>

					<div class="mt-6 flex justify-center gap-4">
						<a
							href={LINKS.DISCORD_LINK}
							class="fill-muted-foreground fill:text-primary"
						>
							<Discord class="h-6 w-6" />
						</a>
						<a
							href={LINKS.GITHUB_LINK}
							class="text-muted-foreground hover:text-primary"
						>
							<Github class="h-6 w-6" />
						</a>
						<a
							href={LINKS.LINKEDIN_LINK}
							class="text-muted-foreground hover:text-primary"
						>
							<Linkedin class="h-6 w-6" />
						</a>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
	<div class="absolute inset-0 z-0">
		<div
			class="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"
		></div>
	</div>
</section>
