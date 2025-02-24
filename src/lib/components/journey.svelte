<script lang="ts">
	import { Terminal } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	const journeySteps = [
		{
			year: 2016,
			title: 'Booting Up',
			role: 'Junior Web Developer @ StartupX',
			description:
				"Initialized my dev career. Learned to console.log('Hello World') professionally.",
			tech: ['JavaScript', 'HTML', 'CSS']
		},
		{
			year: 2018,
			title: 'Scaling Up',
			role: 'Full Stack Developer @ InnovateSoft',
			description:
				'Leveled up to full-stack. Turned coffee into code across the entire application spectrum.',
			tech: ['React', 'Node.js', 'MongoDB']
		},
		{
			year: 2021,
			title: 'System Administrator',
			role: 'Senior Full Stack Developer @ TechCorp',
			description:
				'Took on a leadership role. Architecting solutions and mentoring the next generation of developers.',
			tech: ['AWS', 'Docker', 'Kubernetes']
		},
		{
			year: 2024,
			title: 'Continuous Deployment',
			role: 'Tech Lead & AI Enthusiast',
			description:
				"Exploring the bleeding edge. Integrating AI into web applications and pushing the boundaries of what's possible.",
			tech: ['TensorFlow.js', 'GPT-3', 'Serverless']
		}
	];
</script>

<section class=" py-20">
	<div class="container mx-auto px-4">
		<h2 class="mb-10 text-center text-3xl font-bold">
			<span class="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
				My Development Journey
			</span>
		</h2>
		<div class="space-y-8">
			{#each journeySteps as step, index}
				<div class="border-primary-500/20 bg-card rounded-lg border p-6 shadow-lg">
					<div class="mb-4 flex items-center">
						<Terminal class="text-primary mr-2 h-6 w-6" />
						<span class="text-primary font-mono">$ ./career_progress.sh {step.year}</span>
					</div>
					<h3 class="text-primary mb-2 text-xl font-semibold">{step.title}</h3>
					<p class="mb-2">{step.role}</p>
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
