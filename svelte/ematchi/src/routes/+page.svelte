<script lang="ts">
	import Game from './Game.svelte';

	import '../styles.css';
	import Modal from './Modal.svelte';
	import { levels } from './levelts';
	import { confetti } from '@neoconfetti/svelte';

	let state: 'idle' | 'playing' | 'lost' | 'won' = 'idle';

	let game: Game;
</script>

<Game
	bind:this={game}
	on:play={() => {
		state = 'playing';
	}}
	on:lose={() => {
		state = 'lost';
	}}
	on:pause={() => {
		state = 'lost';
	}}
	on:win={() => {
		state = 'won';
	}}
/>

{#if state !== 'playing'}
	<Modal>
		<header>
			<h1>e<span>match</span>i</h1>
			<p>the emoji matching game</p>
		</header>

		{#if state === 'won' || state === 'lost'}
			<p>you {state} the game</p>
		{:else if state === 'paused'}
			<p>game paused</p>
		{:else if state === 'idle'}
			<p>Choose a level</p>
		{/if}

		<div class="buttons">
			{#if state === 'paused'}
				<button>resume</button>
				<button>quit</button>
			{:else}
				{#each levels as level}
					<button
						on:click={() => {
							game.start(level);
						}}>{level.label}</button
					>
				{/each}
			{/if}
		</div>
	</Modal>
{/if}

{#if state === 'won'}
	<div
		class="confetti"
		use:confetti={{
			stageWidth: innerWidth,
			stageHeight: innerHeight
		}}
	/>
{/if}

<style>
	h1 {
		font-size: 4em;
		font-family: Grandstander;
	}

	span {
		color: purple;
		font-family: Grandstander;
	}

	.confetti {
		position: fixed;
		height: 100%;
		width: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}
</style>
