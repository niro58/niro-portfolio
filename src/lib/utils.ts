import { browser } from '$app/environment';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export type FormState = 'success' | 'error' | 'input-error' | 'submitting' | 'idle';

export function moveToSection(e: Event, id: string) {
	if (browser) {
		const element = document.getElementById(id);
		if (element) {
			e.preventDefault();
			const yPos = element.getBoundingClientRect().top + window.scrollY - 100;
			window.scrollTo({ top: yPos, behavior: 'smooth' });
		}
	}
}
