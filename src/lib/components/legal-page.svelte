<script lang="ts">
	/**
	 * The shared shell for /privacy and /terms.
	 *
	 * Two pages with identical structure and no interactivity, so the layout
	 * lives here once rather than being copied and then drifting — which is how
	 * one legal page ends up with a "last updated" date the other lost.
	 *
	 * `updated` is passed in rather than computed. A privacy policy that silently
	 * re-dates itself on every deploy tells a reader the terms changed when they
	 * did not, and hides it when they did.
	 */
	type Props = {
		title: string;
		standfirst: string;
		updated: string;
		children: import('svelte').Snippet;
	};

	let { title, standfirst, updated, children }: Props = $props();
</script>

<div class="min-h-screen">
	<article class="pt-16 lg:ml-64 lg:pt-0">
		<div class="mx-auto max-w-3xl px-4 py-12 lg:px-8">
			<div class="border-card mb-12 border-b pb-8">
				<h1 class="mb-4 font-mono text-3xl font-bold lg:text-4xl">{title}</h1>
				<p class="text-lg leading-relaxed text-gray-300">{standfirst}</p>
				<p class="mt-4 font-mono text-xs text-gray-500">Last updated: {updated}</p>
			</div>

			<div class="legal space-y-8 leading-relaxed text-gray-300">
				{@render children()}
			</div>
		</div>
	</article>
</div>

<style>
	.legal :global(h2) {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 1.25rem;
		font-weight: 700;
		color: rgb(229 231 235);
		margin-bottom: 0.75rem;
	}
	.legal :global(p) {
		margin-bottom: 0.75rem;
	}
	.legal :global(ul) {
		list-style: disc;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
	}
	.legal :global(li) {
		margin-bottom: 0.375rem;
	}
	.legal :global(a) {
		color: var(--color-primary, #7dd3fc);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.legal :global(strong) {
		color: rgb(229 231 235);
		font-weight: 600;
	}
</style>
