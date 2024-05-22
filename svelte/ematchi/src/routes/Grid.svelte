<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Square from './Square.svelte';

	export let grid: string[];
	export let found: string[];

	const dispatch = createEventDispatcher();

	let a = -1;
	let b = -1;
	let reset_timeout: number;
</script>

<div class="grid">
	{#each grid as emoji, i}
		<Square
			{emoji}
			found={found.includes(emoji)}
			selected={i === a || i === b}
			on:click={() => {
				clearTimeout(reset_timeout);
				if (a === -1 && b === -1) {
					a = i;
				} else if (b === -1) {
					b = i;
					if (grid[a] === grid[b]) {
						// correct
						dispatch('found', { emoji });
					} else {
						// wrong
						reset_timeout = setTimeout(() => {
							a = b = -1;
						}, 1000);
					}
				} else {
					a = i;
					b = -1;
				}
			}}
			group={grid.indexOf(emoji) === i ? 'a' : 'b'}
		/>
	{/each}
</div>

<style>
	.grid {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		gap: 0.5em;
		perspective: 100vw;
	}
</style>
