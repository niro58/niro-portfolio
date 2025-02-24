<script lang="ts">
	import { Cloud, Code, Database, Server, Zap } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	const skillCategories = [
		{
			name: 'Frontend',
			icon: Code,
			color: 'from-red-500 to-pink-500',
			currentSkills: ['Svelte', 'TypeScript'],
			archivedSkills: ['React', 'Wordpress', 'jQuery']
		},
		{
			name: 'Backend',
			icon: Server,
			color: 'from-red-500 to-purple-500',
			currentSkills: ['Go', 'Python', 'APIs'],
			archivedSkills: ['C#', 'PHP', 'Unity (C#) Game Dev']
		},
		{
			name: 'Database & Data Analysis',
			icon: Database,
			color: 'from-red-500 to-yellow-500',
			currentSkills: ['PostgreSQL', 'MongoDB', 'Redis', 'Power BI']
		},
		{
			name: 'DevOps',
			icon: Cloud,
			color: 'from-red-500 to-blue-500',
			currentSkills: ['Docker', 'AWS', 'CI/CD', 'Github Actions']
		}
	];
	let activeCategoryIndex = $state(0);
	let activeCategory = $derived(skillCategories[activeCategoryIndex]);
</script>

<section class=" py-20" id="stack">
	<div class="container mx-auto px-4">
		<h2 class="mb-10 text-center text-3xl font-bold">
			<span class="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
				Tech Stack Mastery
			</span>
		</h2>
		<div class="mb-8 flex justify-center space-x-4">
			{#each skillCategories as category, index}
				<button
					onclick={() => (activeCategoryIndex = index)}
					class={`rounded-full px-4 py-2 transition-all ${
						activeCategory.name === category.name
							? `bg-gradient-to-r ${category.color} `
							: 'bg-card text-muted-foreground hover:bg-card/50 hover:border-primary/50 border border-transparent'
					}`}
				>
					<category.icon class="mr-2 inline-block h-5 w-5" />
					{category.name}
				</button>
			{/each}
		</div>
		<div class="h-96">
			{#key activeCategoryIndex}
				<div
					class="border-primary/20 bg-card w-full rounded-lg border p-6 shadow-lg"
					in:fly={{ duration: 300, delay: 300, y: -20 }}
					out:fly={{ duration: 200, y:20 }}
				>
					<h3 class="mb-4 flex items-center text-2xl font-semibold">
						<activeCategory.icon
							class={`mr-2 h-6 w-6 bg-gradient-to-r ${activeCategory.color} rounded p-1`}
						/>
						{activeCategory.name} Skills
					</h3>
					<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
						<h4 class="text-primary col-span-2 mt-4 text-lg font-semibold md:col-span-3">
							Current Skills
						</h4>
						{#each activeCategory.currentSkills as skill}
							<div class="flex items-center">
								<Zap class="text-rprimary mr-2 h-4 w-4" />
								<span class="text-red-100">{skill}</span>
							</div>
						{/each}
					</div>
					<div class="text-muted-foreground grid grid-cols-2 gap-4 md:grid-cols-3">
						{#if activeCategory.archivedSkills}
							<h4 class="col-span-2 mt-4 text-lg font-semibold md:col-span-3">Archived Skills</h4>
							{#each activeCategory.archivedSkills as skill}
								<div class="flex items-center">
									<Zap class="text-rprimary mr-2 h-4 w-4" />
									<span>{skill}</span>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			{/key}
		</div>
	</div>
</section>
