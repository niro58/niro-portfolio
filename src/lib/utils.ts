import { browser } from '$app/environment';
import { type ClassValue, clsx } from 'clsx';
import { cubicOut, quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export type FormState = 'success' | 'error' | 'input-error' | 'submitting' | 'idle';

export function getIdYPos(id: string, offset: number) {
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

function split_css_unit(value: number | string) {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split ? [parseFloat(split[1]), split[2] || 'px'] : [/** @type {number} */ value, 'px'];
}

export function flyAbsolute(
	node: Element,
	{ delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}
) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	const [x_value, x_unit] = split_css_unit(x);
	const [y_value, y_unit] = split_css_unit(y);
	return {
		delay,
		duration,
		easing,
		css: (t: any, u: any) => `
		transform: ${transform} translate(${(1 - t) * Number(x_value)}${x_unit}, ${(1 - t) * Number(y_value)}${y_unit});
			  opacity: ${target_opacity - od * u};
			  position: absolute;`
	};
}
