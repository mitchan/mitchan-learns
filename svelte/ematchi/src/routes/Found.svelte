<script lang="ts">
	import { receive } from './transitions';
	import { get_twemoji_url } from './utils';

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<div class="pair">
			<img src={get_twemoji_url(emoji)} alt={emoji} in:receive={{ key: `${emoji}:a` }} />
			<img src={get_twemoji_url(emoji)} alt={emoji} in:receive={{ key: `${emoji}:b` }} />
		</div>
	{/each}
</div>

<style>
	.found {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		height: 100%;
		filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.2));
	}

	.pair {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 4em;
		width: 4em;
		background: white;
		padding: 1em;
		border-radius: 50%;
	}

	img {
		position: absolute;
		height: 2em;
		width: 2em;
	}
</style>
