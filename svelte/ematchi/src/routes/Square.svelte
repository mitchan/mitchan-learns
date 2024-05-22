<script lang="ts">
	import { send } from './transitions';
	import { get_twemoji_url } from './utils';

	export let emoji: string;
	export let selected: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
</script>

<div class="square" class:flipped={selected || found}>
	<button on:click />

	<div class="background" />

	{#if !found}
		<img src={get_twemoji_url(emoji)} alt={emoji} out:send={{ key: `${emoji}:${group}` }} />
	{/if}
</div>

<style>
	.square {
		display: flex;
		align-items: center;
		justify-content: center;
		transform-style: preserve-3d;
		transition: transform 0.4s;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		background: #eee;
		border: 0;
		border-radius: 1em;
		font-size: inherit;
	}

	img {
		height: 6em;
		width: 6em;
		pointer-events: none;
		transform: rotateY(180deg);
		backface-visibility: hidden;
	}

	.background {
		background: white;
		border: solid 0.5em #eee;
		border-radius: 1em;
		backface-visibility: hidden;
		transform: rotateY(180deg);
		height: 100%;
		width: 100%;
		position: absolute;
	}
</style>
