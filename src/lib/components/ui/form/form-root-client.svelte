<script lang="ts" generics="TForm extends z.ZodType<any, any, any>">
	import { defaults, superForm } from 'sveltekit-superforms';
	import { z } from 'zod';
	import { zod4, zod4Client, zodClient } from 'sveltekit-superforms/adapters';

	import type { Snippet } from 'svelte';
	import type { ResultFetch } from '$lib/types/common';
	import { cn, type FormState } from '$lib/utils/common';

	type Props = {
		schema: TForm;
		class?: string;
		formState?: FormState;
		enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
		dataType?: 'form' | 'json' | undefined;
		resetForm?: boolean;
		debug?: boolean;
		resetFormState?: boolean;
		onFormData?: (data: any) => void | Promise<ResultFetch<unknown> | void>;
		children: Snippet<
			[
				{
					form: typeof form;
					formData: typeof formData;
					formState: typeof formState;
					validate?: typeof validate;
					errorMessage: string;
				}
			]
		>;
	};

	let {
		schema,
		dataType = 'form',
		enctype = undefined,
		children: childrenProp,
		class: className,
		onFormData,
		resetForm = true,
		resetFormState = true,
		formState = $bindable('idle')
	}: Props = $props();

	let errorMessage = $state('');
	let sent = false;
	const data = defaults(zod4(schema));

	const form = superForm(data, {
		SPA: true,
		validators: zod4Client(schema),
		dataType: dataType,
		// Reset only after a send that really went through: superforms would also wipe a
		// failed send, and the visitor would lose the message they just typed.
		resetForm: () => resetForm && sent,
		clearOnSubmit: 'errors-and-message',
		onUpdate: async (res) => {
			switch (res.result.type) {
				case 'success': {
					const result = onFormData ? await onFormData(res.result.data.form.data) : undefined;
					if (result && result.type === 'FAILURE') {
						sent = false;
						formState = 'error';
						errorMessage = result.error;
						break;
					}
					sent = true;
					formState = 'success';
					break;
				}
				case 'failure':
					if (res.result.data && res.result.data.form.message) {
						formState = 'error';
						errorMessage = res.result.data.form.message;
					} else {
						formState = 'input-error';
						errorMessage = 'Chyba v inputu';
					}
					break;
			}
		}
	});

	const { form: formData, enhance, submitting, validate } = form;

	$effect(() => {
		if ($submitting) {
			formState = 'submitting';
		}
	});

	// Success and input errors clear themselves; an error stays until the next send, because it
	// is what tells the visitor why nothing arrived. The cleanup drops a timer a newer state outdates.
	$effect(() => {
		if (!resetFormState || (formState != 'success' && formState != 'input-error')) return;
		const timer = setTimeout(() => {
			formState = 'idle';
			errorMessage = '';
		}, 3000);
		return () => clearTimeout(timer);
	});
</script>

<form method="POST" use:enhance class={cn('space-y-6', className)} {enctype}>
	{@render childrenProp({ form, formState, errorMessage, formData, validate })}
</form>
