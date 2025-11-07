<script lang="ts">
	import { Clock, Github, Linkedin, Mail, MapPin, Send } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { contactSchema, type ContactSchema } from '$lib/schemas.js';
	import Discord from './ui/icons/discord.svelte';
	import ContactBody from './contact-body.svelte';
	import FormResult from '$ui/form/form-result.svelte';
	import FormButton from './ui/form/form-button.svelte';
	import { AppConfig } from '$config/app';
	import FormRootClient from '$ui/form/form-root-client.svelte';
	import { createFormEntry } from '$lib/utils/contactEntry';
</script>

<section class="relative py-24">
	<div class="relative z-10 container grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="h-full">
			<Card.Root class="border-primary/20 h-full">
				<Card.Header>
					<Card.Title>Get in touch</Card.Title>
				</Card.Header>
				<Card.Content>
					<FormRootClient
						schema={contactSchema}
						onFormData={(data) => {
							createFormEntry(data);
						}}
					>
						{#snippet children({ form, formData, formState })}
							<FormResult {formState} />
							<ContactBody {form} {formData} />
							<FormButton disabled={formState === 'submitting'} class="w-full">
								Send Message                                 <Send class="ml-2 h-4 w-4" />
							</FormButton>
						{/snippet}
					</FormRootClient>
				</Card.Content>
			</Card.Root>
		</div>
		<div
			class="border-border bg-card flex h-full flex-col justify-between rounded-xl border p-8 backdrop-blur-sm"
		>
			<h3 class="text-card-foreground mb-6 text-2xl font-bold">Connect With Me</h3>
			<div class="space-y-6">
				<div class="flex items-center gap-4">
					<div
						class="bg-primary/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
					>
						<Github class="text-primary" />
					</div>
					<div>
						<p class="text-card-foreground font-medium">GitHub:</p>
						<a
							href={AppConfig.socialLinks.github}
							class="hover:text-primary text-muted-foreground transition-colors"
						>
							{AppConfig.socialLinks.githubUsername}
						</a>
					</div>
				</div>
				<div class="flex items-center gap-4">
					<div
						class="bg-primary/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
					>
						<Discord class="text-primary size-6" />
					</div>
					<div>
						<p class="text-card-foreground font-medium">Discord:</p>
						<p class="text-muted-foreground">{AppConfig.socialLinks.discordUsername}</p>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<div
						class="bg-primary/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
					>
						<Mail class="text-primary" />
					</div>
					<div>
						<p class="text-card-foreground font-medium">Email:</p>
						<a
							href={`mailto:${AppConfig.contact.email}`}
							class="hover:text-primary text-muted-foreground transition-colors"
						>
							{AppConfig.contact.email}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="absolute inset-0 z-0">
		<div
			class="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"
		></div>
	</div>
</section>
