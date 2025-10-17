<script lang="ts">
	export let variation: '1' | '2' | '3' | '4' | '5';

	const variations = {
		'1': [
			{ size: 500, left: 25, top: 25 },
			{ size: 300, left: 50, top: 20 }
		],
		'2': [
			{ size: 400, left: 10, top: 10 },
			{ size: 200, left: 70, top: 20 },
			{ size: 300, left: 40, top: 50 }
		],
		'3': [
			{ size: 350, left: 20, top: 30 },
			{ size: 450, left: 60, top: 40 }
		],
		'4': [
			{ size: 250, left: 30, top: 20 },
			{ size: 300, left: 40, top: 30 },
			{ size: 150, left: 20, top: 40 },
			{ size: 100, left: 50, top: 50 }
		],
		'5': [
			{ size: 350, left: 80, top: 20 },
			{ size: 150, right: 0, top: 50 }
		]
	};

	const circles = variations[variation];
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden">
	{#each circles as circle}
		<div
			class="absolute rounded-full bg-primary/10 blur-3xl"
			style="width: {circle.size}px; height: {circle.size}px; left: {circle.left}%; top: {circle.top}%;"
		></div>
	{/each}
</div>
