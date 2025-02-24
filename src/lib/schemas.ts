import { z } from 'zod';

export const contactSchema = z.object({
	name: z
		.string()
		.nonempty()
		.refine((val) => val.length <= 50, {
			message: 'Name must be less than 50 characters'
		}),
	email: z.string().email(),
	message: z
		.string()
		.nonempty()
		.refine((val) => val.length <= 500, {
			message: 'Message must be less than 500 characters'
		})
});

export type ContactSchema = typeof contactSchema;
