<script lang="ts">
	import type { SongObject } from '$lib/types/song/';
	import type { Snippet } from 'svelte';
	import { durations } from './durations';
	import MusicPlayer from './MusicPlayer.svelte';
	import MusicSearch from './MusicSearch.svelte';
	import { Confetti } from 'svelte-confetti';

	let {
		song,
		winScreen,
		lossScreen,
		guessIndex = $bindable(0),
		onWin,
		onLoss
	}: {
		song: SongObject;
		winScreen: Snippet;
		lossScreen: Snippet;
		guessIndex?: number;
		onWin?: () => void;
		onLoss?: () => void;
	} = $props();

	let guesses: (string | null)[] = $state([null, null, null, null, null, null]);
	let hasWon = $state(false);

	const onGuess = (s: SongObject | undefined) => {
		if (s) {
			console.info(`Guessed ${s.id}, answer is ${song.id}`);

			if (song.id == s.id) {
				hasWon = true;
				onWin?.();
			}

			if (
				song.attributes.name == s.attributes.name &&
				song.attributes.artistName == song.attributes.artistName
			) {
				hasWon = true;
				onWin?.();
			}
			guesses[guessIndex] = `${s.attributes.name} - ${s.attributes.artistName}`;
			guessIndex += 1;
		} else {
			guesses[guessIndex] = 'Skipped';
			guessIndex += 1;
		}
		if (guessIndex >= 6) {
			onLoss?.();
		}
	};
</script>

<div class="wrap">
	{#if !hasWon}
		{#if guessIndex < 6}
			{#each guesses as g, index (`${g}-${index}`)}
				<div class="guess" class:active={index == guessIndex}>
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
			{@render lossScreen()}
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
		{@render winScreen()}
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
		padding: 1rem;
		justify-content: start;
		border-radius: 0.25rem;

		&.active {
			border: 1px solid var(--border-alt);
		}
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
