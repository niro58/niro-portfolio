<script lang="ts" generics="TForm extends z.ZodType<any, any, any>">
	import { type SuperValidated, superForm, superValidate } from 'sveltekit-superforms';
	import { z } from 'zod';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';

	import type { Snippet } from 'svelte';
	import { cn, type FormState } from '$lib/utils';

	interface Props {
		data: SuperValidated<z.infer<TForm>>;
		schema: TForm;
		action: string;
		class?: string;
		onformdata?: (data: typeof formData) => void;
		children: Snippet<
			[
				{
					form: typeof form;
					formData: typeof formData;
					formState: typeof formState;
					validate?: typeof validate;
				}
			]
		>;
	}

	let { data, schema, action, children: childrenProp, class: className }: Props = $props();

	let formState: FormState = $state('idle');

	const form = superForm(data, {
		validators: zodClient(schema),
		onResult: async (res) => {
			if (res.result.status === 200) {
				formState = 'success';
			} else if (res.result.status === 400) {
				formState = 'input-error';
			} else {
				formState = 'error';
			}
		}
	});

	const { form: formData, enhance, submitting, validate } = form;

	$effect(() => {
		if ($submitting) {
			formState = 'submitting';
		}
	});
</script>

<form method="POST" use:enhance {action} class={cn('space-y-6', className)}>
	{@render childrenProp({ form, formState, formData, validate })}
</form>
