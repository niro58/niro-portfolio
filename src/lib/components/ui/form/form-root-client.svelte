<script lang="ts" generics="TForm extends z.ZodType<any, any, any>">
	import { defaults, superForm } from 'sveltekit-superforms';
	import { z } from 'zod';
	import { zod4, zod4Client, zodClient } from 'sveltekit-superforms/adapters';

	import type { Snippet } from 'svelte';
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
		onFormData?: (data: any) => void;
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
	const data = defaults(zod4(schema));

	const form = superForm(data, {
		SPA: true,
		validators: zod4Client(schema),
		dataType: dataType,
		resetForm: resetForm,
		clearOnSubmit: 'errors-and-message',
		onUpdate: async (res) => {
			switch (res.result.type) {
				case 'success':
					formState = 'success';
					if (onFormData) {
						onFormData(res.result.data.form.data);
					}
					break;
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

	$effect(() => {
		if (formState != 'idle' && resetFormState) {
			setTimeout(() => {
				formState = 'idle';
				errorMessage = 'undefined';
			}, 3000);
		}
	});
</script>

<form method="POST" use:enhance class={cn('space-y-6', className)} {enctype}>
	{@render childrenProp({ form, formState, errorMessage, formData, validate })}
</form>
