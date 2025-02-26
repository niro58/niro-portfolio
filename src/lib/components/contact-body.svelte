<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { ContactSchema, contactSchema } from '$lib/schemas';
	import type { SuperForm, SuperFormData } from 'sveltekit-superforms/client';
	import type { z } from 'zod';
	const {
		form,
		formData
	}: {
		form: SuperForm<z.TypeOf<ContactSchema>>;
		formData: SuperFormData<z.TypeOf<ContactSchema>>;
	} = $props();
</script>

<div class="space-y-2">
	<Form.Field {form} name="name" class="space-y-2">
		<Form.Control>
			{#snippet children({ props })}
				<Input {...props} bind:value={$formData.name} placeholder={'Name'} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</div>
<div class="space-y-2">
	<Form.Field {form} name="email" class="space-y-2">
		<Form.Control>
			{#snippet children({ props })}
				<Input {...props} bind:value={$formData.email} placeholder={'Email'} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</div>
<div class="space-y-2">
	<Form.Field {form} name="message" class="space-y-2">
		<Form.Control>
			{#snippet children({ props })}
				<Textarea {...props} bind:value={$formData.message} placeholder="Message" class="min-h-[100px]" />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</div>
