import { browser } from '$app/environment';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export type FormState = 'success' | 'error' | 'input-error' | 'submitting' | 'idle';

export function getIdYPos(id: string, offset:number) {
	if (browser) {
		const element = document.getElementById(id);
		if (element) {
			return element.getBoundingClientRect().top + window.scrollY - offset;
		}
	}
}

export function moveToSection(e: Event, id: string) {
	const yPos = getIdYPos(id, 100);
	if (yPos) {
		e.preventDefault();
		window.scrollTo({ top: yPos, behavior: 'smooth' });
	}
}
