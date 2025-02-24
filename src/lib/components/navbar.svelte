<script lang="ts">
	import { moveToSection } from '$lib/utils';
	import { Github, Linkedin } from 'lucide-svelte';
	import NiroLogo from './ui/niro-logo.svelte';
	import { LINKS } from '$config/links';
	import Discord from './ui/discord.svelte';
</script>

<nav
	class="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur"
>
	<div class="container flex h-16 items-center justify-between">
		<a href="/" class="text-primary text-2xl font-bold">
			<NiroLogo class="h-8 w-8" />
		</a>
		<div class="flex items-center gap-6">
			<a
				href="/#home"
				onclick={(e) => {
					moveToSection(e, 'home');
				}}
				class="text-sm font-medium"
				>Home
			</a>
			<a
				href="#about"
				onclick={(e) => {
					moveToSection(e, 'about');
				}}
				class="text-sm font-medium"
				>About
			</a>
			<a
				href="#stack"
				onclick={(e) => {
					moveToSection(e, 'stack');
				}}
				class="text-sm font-medium"
				>Stack
			</a>
			<a
				href="#blog"
				onclick={(e) => {
					moveToSection(e, 'blog');
				}}
				class="text-sm font-medium">Blog</a
			>
			<a
				href="#contact"
				onclick={(e) => {
					moveToSection(e, 'contact');
				}}
				class="text-sm font-medium"
				>Contact
			</a>
		</div>
		<div class="flex items-center gap-4">
			<a href={LINKS.DISCORD_LINK} class="fill-muted-foreground hover:fill-primary">
				<Discord class="h-5 w-5" />
			</a>
			<a href={LINKS.GITHUB_LINK} class="text-muted-foreground hover:text-primary">
				<Github class="h-5 w-5" />
			</a>
			<a
				href={LINKS.LINKEDIN_LINK}
				class="text-muted-foreground hover:text-primary"
			>
				<Linkedin class="h-5 w-5" />
			</a>
		</div>
	</div>
</nav>
