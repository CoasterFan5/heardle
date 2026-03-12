<script lang="ts">
	import type { SongObject } from '$lib/types/song/';
	import { durations } from './durations';
	import MusicPlayer from './MusicPlayer.svelte';
	import MusicSearch from './MusicSearch.svelte';

	const {
		song
	}: {
		song: SongObject;
	} = $props();

	let guesses: (string | null)[] = $state([null, null, null, null, null, null]);
	let hasWon = $state(false);
	let guessIndex = $state(0);

	const onGuess = (s: SongObject) => {
		console.info(`Guessed ${s.id}, answer is ${song.id}`);

		if (song.id == s.id) {
			hasWon = true;
		}
		guesses[guessIndex] = `${s.attributes.name} - ${s.attributes.artistName}`;
		guessIndex += 1;
	};
</script>

<div class="wrap">
	<h2>Heardle New</h2>
	{#if !hasWon}
		{#if guessIndex < 6}
			{#each guesses as g, index (`${g}-${index}`)}
				<div class="guess">
					{g ?? ''}
				</div>
			{/each}
			<MusicPlayer songUrl={song.attributes.previews[0].url} duration={durations[guessIndex]} />
			<MusicSearch onSelect={onGuess} />
		{:else}
			<span>You Lose!</span>
		{/if}
	{:else}
		<span>You Won!</span>
	{/if}
</div>

<style lang="scss">
	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 30rem;
		max-width: 100%;
	}

	.guess {
		width: 100%;
		border: 1px solid var(--border);
		height: 1rem;
		display: flex;
		align-items: center;
		padding: 0.25rem;
		justify-content: start;
	}
</style>
