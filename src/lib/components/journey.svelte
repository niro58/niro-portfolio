<script lang="ts">
	import { Terminal } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	const journeySteps = [
		{
			year: '2018 - 2022',
			title: 'Naive Newbie Developer',
			role: 'High School',
			description:
				'Started with the basics: HTML, CSS, and a dream. Built my first websites and fell in love with coding.',
			tech: ['HTML', 'CSS', 'JavaScript'],
			command: '$ ./hello_world.sh'
		},
		{
			year: '2020 - 2022',
			title: 'Unity Developer',
			role: 'My Projects',
			description:
				'Dived into game development, 3D modeling, and pixel art. Made games that were more fun to build than to play.',
			tech: ['Unity', 'C#', 'Blender', 'Pixel Art'],
			command: '$ ./game_on.sh'
		},
		{
			year: '2024 - Present',
			title: 'Web Development',
			role: 'My Projects',
			description:
				'After a brief stint with React (0.5-1 year of pain), I switched to Svelte and never looked back. Now building fast, modern web apps with a focus on clean, efficient code.',
			tech: ['Svelte', 'JavaScript', 'TailwindCSS'],
			command: '$ ./svelte_is_love.sh'
		},
		{
			year: '2022 - Present',
			title: 'Back-End Development',
			role: 'My Projects',
			description:
				'Started with PHP and .NET (C#), but in 2024, I made the switch to Go (Golang) for building efficient, scalable back-end systems. Also worked with databases like PostgreSQL and MongoDB.',
			tech: ['Go (Golang)', 'PHP', '.NET (C#)', 'PostgreSQL', 'MongoDB', 'REST APIs'],
			command: '$ ./go_build_everything.sh'
		},
		{
			year: '2023 - Present',
			title: 'Full-Stack Developer & Data Analytics',
			role: 'VJM Frigotrans & Everest Solutions',
			description:
				'Combining my full-stack skills to build internal tools, dashboards, and web pages. Using Svelte for front-end and Go for back-end, along with data visualization tools like Power BI. Also created pages in both Svelte and React for various projects.',
			tech: ['Svelte', 'Go (Golang)', 'Power BI', 'Python', 'PostgreSQL', 'React'],
			command: '$ ./full_stack_wizardry.sh'
		}
	];
</script>

<section class="py-20">
	<div class="container mx-auto px-4">
		<h2 class="mb-10 text-center text-3xl font-bold">
			<span class="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
				$ ./my_dev_journey.sh
			</span>
		</h2>
		<div class="space-y-8">
			{#each journeySteps as step, index}
				<div
					class="border-primary-500/20 bg-card rounded-lg border p-6 shadow-lg"
					transition:fly={{ y: 20, duration: 300 }}
				>
					<div class="mb-4 flex items-center">
						<Terminal class="text-primary mr-2 h-6 w-6" />
						<span class="text-primary font-mono">{step.command}</span>
					</div>
					<h3 class="text-primary mb-2 text-xl font-semibold">{step.title}</h3>
					<p class="mb-2 font-medium">{step.role}</p>
					<p class="text-muted-foreground mb-4">{step.description}</p>
					<div class="flex flex-wrap gap-2">
						{#each step.tech as t}
							<span
								class="border-primary/50 bg-primary/30 rounded-full border px-2 py-1 text-xs text-red-100"
							>
								{t}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
