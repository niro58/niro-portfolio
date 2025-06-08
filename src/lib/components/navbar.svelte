<script module>
	const pages = {
		home: {
			title: 'Home',
			link: '/#home'
		},
		about: {
			title: 'About',
			link: '/#about'
		},
		stack: {
			title: 'Stack',
			link: '/#stack'
		},
		portfolio: {
			title: 'Portfolio',
			link: '/portfolio'
		},
		blog: {
			title: 'Blog',
			link: '/blog'
		},
		contact: {
			title: 'Contact',
			link: '/#contact'
		}
	};
</script>

<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Github, Linkedin, Menu, X } from '@lucide/svelte';
	import * as Card from './ui/card/index';
	import { fade, slide } from 'svelte/transition';
	import NiroLogo from './ui/niro-logo.svelte';
	import { SOCIALS } from '$config/socials';
	import Discord from './ui/discord.svelte';
	import { getIdYPos, moveToSection } from '$lib/utils';
	import { page } from '$app/state';
	import { scrollY } from 'svelte/reactivity/window';
	import SuperDebug from 'sveltekit-superforms';

	let isOpen = $state(false);
	let pageIndex = $derived.by(() => {
		const currentPage = Object.values(pages).find((item) =>
			page.url.pathname.startsWith(item.link)
		);
		if (currentPage) {
			return Object.values(pages).indexOf(currentPage);
		}
		return 0;
	});
	let pageSections = $derived.by(() => {
		const s = Object.values(pages).map((m, index) => {
			const link = m.link.split('#')[0];

			if (link === page.url.pathname) {
				return {
					yPos: getIdYPos(m.link.split('#')[1], 400) || 0,
					index: index
				};
			}
		});
		return s.filter((d) => d !== undefined);
	});
	let hoveredIndex = $state<number | null>(null);
	let activeIndex = $state(0);
	let hoverStyle: {
		left?: string;
		width?: string;
	} = $state({});
	let activeStyle: {
		left: string;
		width: string;
	} = $state({ left: '0px', width: '0px' });

	let tabRefs = $state<HTMLAnchorElement[]>([]);

	$effect(() => {
		let newIndex = pageIndex;

		for (let i = 0; i < pageSections.length; i++) {
			const yp = pageSections[i].yPos || 0;
			if (!scrollY.current || scrollY.current < yp) {
				break;
			}
			newIndex = pageSections[i].index;
		}

		if (newIndex != activeIndex) {
			activeIndex = newIndex;
		}
	});

	$effect(() => {
		if (hoveredIndex !== null) {
			const hoveredElement = tabRefs[hoveredIndex];
			if (hoveredElement) {
				const { offsetLeft, offsetWidth } = hoveredElement;
				hoverStyle = {
					left: `${offsetLeft}px`,
					width: `${offsetWidth}px`
				};
			}
		}
	});
	$effect(() => {
		const activeElement = tabRefs[activeIndex];
		if (activeElement) {
			const { offsetLeft, offsetWidth } = activeElement;
			activeStyle = {
				left: `${offsetLeft}px`,
				width: `${offsetWidth}px`
			};
		}
	});

	$effect(() => {
		requestAnimationFrame(() => {
			const overviewElement = tabRefs[activeIndex];
			if (overviewElement) {
				const { offsetLeft, offsetWidth } = overviewElement;
				activeStyle = {
					left: `${offsetLeft}px`,
					width: `${offsetWidth}px`
				};
			}
		});
	});
</script>

{#snippet pageLinks()}
	<div in:fade={{ duration: 300, delay: 200 }} class="gap-5 sm:flex sm:flex-row">
		{#each Object.values(pages) as item, index}
			<a
				bind:this={tabRefs[index]}
				class={`h-[30px] cursor-pointer px-3 py-2 transition-colors duration-300 ${
					index === activeIndex ? 'text-primary font-semibold' : 'text-foreground/50'
				}`}
				onmouseenter={() => (hoveredIndex = index)}
				onmouseleave={() => (hoveredIndex = null)}
				onclick={(e) => {
					if (item.link.includes('#')) {
						moveToSection(e, item.link.split('#')[1]);
					}
					activeIndex = index;
				}}
				href={item.link}
			>
				<div
					transition:fade={{ duration: 300, delay: 10000 + 100 * index }}
					class="flex h-full items-center justify-center text-sm leading-5 font-[var(--www-mattmannucci-me-geist-regular-font-family)] whitespace-nowrap"
				>
					{item.title}
				</div>
			</a>
		{/each}
	</div>
{/snippet}
<nav class="sticky top-0 z-40 w-full">
	<div class="flex h-16 justify-center">
		<Card.Root
			class="relative hidden h-[75px] w-full items-center justify-center rounded-t-none border-none shadow-none sm:flex"
		>
			<a
				href="/"
				class="text-primary absolute top-0 bottom-0 left-8 flex items-center gap-2 text-2xl font-bold"
			>
				<NiroLogo class="h-8 w-8" />
			</a>
			<Card.Content class="p-0">
				<div class="relative">
					<div
						class="bg-primary/10 absolute flex h-[30px] items-center rounded-[6px] transition-all duration-300 ease-out"
						style:left={hoverStyle.left ? hoverStyle.left : ''}
						style:width={hoverStyle.width ? hoverStyle.width : ''}
						style:opacity={hoveredIndex !== null ? 1 : 0}
					></div>

					<div
						class="bg-primary absolute bottom-[-6px] h-[2px] transition-all duration-300 ease-out"
						style:left={activeStyle.left}
						style:width={activeStyle.width}
						in:fade={{ delay: 300, duration: 300 }}
					></div>

					<div class="relative flex items-center space-x-[6px]">
						{@render pageLinks()}
					</div>
				</div>
				<div class="absolute top-0 right-8 bottom-0 flex items-center gap-2">
					<Button
						variant="outline"
						target="_blank"
						class="text-muted-foreground"
						size="icon"
						href={SOCIALS.DISCORD_LINK}><Discord class="h-5 w-5" /></Button
					>
					<Button
						variant="outline"
						target="_blank"
						class="text-muted-foreground"
						size="icon"
						href={SOCIALS.GITHUB_LINK}><Github class="h-5 w-5" /></Button
					>
					<Button
						variant="outline"
						target="_blank"
						class="text-muted-foreground"
						size="icon"
						href={SOCIALS.LINKEDIN_LINK}><Linkedin class="h-5 w-5" /></Button
					>
				</div>
			</Card.Content>
		</Card.Root>
		<div class="relative flex w-full items-center justify-between px-4 sm:hidden">
			<Button variant="outline" size="icon" onclick={() => (isOpen = !isOpen)}>
				{#if isOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</Button>
			<div class="h-10 w-10"></div>
			{#if isOpen}
				<div
					class="bg-background absolute top-16 left-0 w-full rounded-b-lg shadow-lg"
					in:slide={{ duration: 300 }}
					out:slide={{ duration: 300 }}
				>
					{@render pageLinks()}
				</div>
			{/if}
		</div>
	</div>
</nav>
