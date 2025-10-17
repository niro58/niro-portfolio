<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { appPages } from '$config/pages';
	let canvasEl: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvasEl) return;
		const canvas = canvasEl;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const fontSize = 15;
		const columns = canvas.width / fontSize;

		const drops: number[] = $state([]);
		for (let i = 0; i < columns; i++) {
			drops[i] = 1;
		}

		const codes =
			'01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

		function draw() {
			if (ctx === null) return;

			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = '#FF4645';
			ctx.font = `${fontSize}px monospace`;
			for (let i = 0; i < drops.length; i++) {
				const text = codes[Math.floor(Math.random() * codes.length)];
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);

				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}

				drops[i]++;
			}
		}

		const interval = setInterval(draw, 33);

		return () => clearInterval(interval);
	});
</script>

<section class="relative h-screen overflow-hidden" id="home">
	<canvas bind:this={canvasEl} class="absolute inset-0"></canvas>
	<div class="from-background/80 to-background absolute inset-0 bg-gradient-to-b"></div>
	<div class="relative container flex h-full flex-col items-start justify-center gap-4">
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
			Full Stack
			<br />
			Developer
		</h1>
		<p class="text-muted-foreground max-w-[600px] text-lg sm:text-xl">
			Crafting digital experiences with code. Specialized in building modern web applications with
			cutting-edge technologies.
		</p>
		<div class="flex flex-row gap-4">
			<Button href={appPages.portfolio.path()} size="lg" class="mt-4">
				Portfolio <ChevronRight class="ml-2 h-4 w-4" />
			</Button>
			<Button href={appPages.blog.path()} variant="outline" size="lg" class="mt-4">
				Blog <ChevronRight class="ml-2 h-4 w-4" />
			</Button>
		</div>
	</div>
</section>
