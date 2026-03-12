<script lang="ts">
	import type { SongObject } from '$lib/types/song/';
	import { durations } from './durations';
	import ListenOnAppleMusic from './ListenOnAppleMusic.svelte';
	import MusicPlayer from './MusicPlayer.svelte';
	import MusicSearch from './MusicSearch.svelte';
	import SongCard from './SongCard.svelte';
	import { Confetti } from 'svelte-confetti';

	const {
		song
	}: {
		song: SongObject;
	} = $props();

	let guesses: (string | null)[] = $state([null, null, null, null, null, null]);
	let hasWon = $state(false);
	let guessIndex = $state(0);

	const onGuess = (s: SongObject | undefined) => {
		if (s) {
			console.info(`Guessed ${s.id}, answer is ${song.id}`);

			if (song.id == s.id) {
				hasWon = true;
			}

			if (
				song.attributes.name == s.attributes.name &&
				song.attributes.artistName == song.attributes.artistName
			) {
				hasWon = true;
			}
			guesses[guessIndex] = `${s.attributes.name} - ${s.attributes.artistName}`;
			guessIndex += 1;
		} else {
			guesses[guessIndex] = 'Skipped';
			guessIndex += 1;
		}
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
			<MusicPlayer
				songUrl={song.attributes.previews[0].url}
				duration={durations[guessIndex]}
				onSkip={() => {
					onGuess(undefined);
				}}
			/>
			<MusicSearch onSelect={onGuess} />
		{:else}
			<span>You lose!</span>
			<SongCard {song} />
			<ListenOnAppleMusic {song} />
		{/if}
	{:else}
		<div class="confettiHolder">
			<Confetti
				x={[-5, 5]}
				y={[0, 0.1]}
				delay={[500, 2000]}
				infinite
				duration={5000}
				amount={300}
				fallDistance="100vh"
			/>
		</div>

		<span>A virtuoso performance!</span>
		<SongCard {song} />
		<ListenOnAppleMusic {song} />
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

	.confettiHolder {
		position: fixed;
		top: -50px;
		left: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		overflow: hidden;
		pointer-events: none;
	}
</style>
