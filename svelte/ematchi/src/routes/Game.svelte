<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Countdown from './Countdown.svelte';
	import Found from './Found.svelte';
	import Grid from './Grid.svelte';
	import type { Level } from './levelts';
	import { shuffle } from './utils';

	const dispath = createEventDispatcher();

	let size: number;
	let grid: string[] = [];
	let found: string[] = [];
	let remaining = 0;
	let duration = 0;
	let playing = true;

	export function start(level: Level) {
		size = level.size;
		grid = create_grid(level);
		remaining = level.duration;
		duration = level.duration;

		resume();
	}

	function resume() {
		playing = true;
		countdown();

		dispath('play');
	}

	function create_grid(level: Level): string[] {
		const copy = level.emojis.slice();
		const pairs: string[] = [];

		for (let i = 0; i < (level.size * level.size) / 2; i++) {
			const index = Math.floor(Math.random() * copy.length);
			const emoji = copy[index];

			// remove emoji
			copy.splice(index, 1);
			pairs.push(emoji);
		}

		pairs.push(...pairs);
		return shuffle(pairs);
	}

	function countdown() {
		let start = Date.now();
		let remaining_at_start = remaining;

		function loop() {
			if (!playing) {
				return;
			}

			requestAnimationFrame(loop);

			remaining = remaining_at_start - (Date.now() - start);

			if (remaining <= 0) {
				dispath('lose');
				playing = false;
			}
		}

		loop();
	}
</script>

<div class="game" style="--size: {size};">
	<div class="info">
		{#if playing}
			<Countdown
				{duration}
				{remaining}
				on:click={() => {
					playing = false;
					dispath('pause');
				}}
			/>
		{/if}
	</div>

	<div class="grid-container">
		<Grid
			{grid}
			{found}
			on:found={(e) => {
				found = [...found, e.detail.emoji];

				if (found.length === (size * size) / 2) {
					dispath('win');
				}
			}}
		/>
	</div>

	<div class="info">
		<Found {found} />
	</div>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: min(1vmin, 0.5rem);
	}

	.info {
		width: 80em;
		height: 10em;
	}

	.grid-container {
		width: 80em;
		height: 80em;
	}
</style>
