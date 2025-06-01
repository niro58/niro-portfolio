<script>
	import { ArrowRight } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from './ui/separator/separator.svelte';
</script>

<section id="about" class="relative py-24">
	<div class="container">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
			<p class="text-muted-foreground text-lg">
				I’m a developer based in Prague, Czech Republic, with a strong focus on full-stack
				development. Building seamless, end-to-end solutions is where I thrive—whether it’s crafting
				intuitive front-end interfaces or designing robust back-end systems. I love the challenge of
				bringing all the pieces together to create something functional and impactful.
			</p>
			<Separator class="my-3" />
			<p class="text-muted-foreground mb-8 text-lg">
				Beyond full-stack, I enjoy exploring other areas like game development, process automation,
				and data analytics. If a project is fun, challenging, and pushes me to learn something new,
				I’m all in. I’m constantly experimenting with new technologies and programming languages,
				always eager to expand my toolkit and tackle problems from fresh perspectives.
			</p>
		</div>
	</div>
	<div
		class="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"
	></div>
</section>
