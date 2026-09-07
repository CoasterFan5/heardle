<script lang="ts">
	import { resolve } from '$app/paths';
	import Game from '$lib/components/Game.svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import type { PageData } from './$types';
	import AppleMusicIcon from '$lib/components/AppleMusicIcon.svelte';
	import { onMount } from 'svelte';

	dayjs.extend(relativeTime);

	const {
		data
	}: {
		data: PageData;
	} = $props();

	let song = $derived(data.dailySongDetails);
	const expiresDate = $derived(dayjs(data.expiresDate));
	let expiresFormat = $state('');
	setInterval(() => {
		expiresFormat = expiresDate.fromNow();
	}, 1000);

	const doShare = async () => {
		const pluralized = guessIndex == 1 ? 'guess' : 'guesses';
		await navigator.share({
			text: `I got the Heardle in ${guessIndex} ${pluralized}! Can you do better? https://heardle.coasterfan5.com`
		});
	};

	const shareLoss = async () => {
		await navigator.share({
			text: "I didn't get todays Heardle, can you? https://heardle.coasterfan5.com"
		});
	};

	let guessIndex = $state(0);
	let alreadyPlayed = $state(false);
	let hasLost = $state(false);

	onMount(() => {
		const localStorePull = localStorage.getItem(data.dayId);
		if (localStorePull != null) {
			alreadyPlayed = true;
			const localStorageJson = JSON.parse(localStorePull);
			guessIndex = localStorageJson['guesses'];
			if (localStorageJson['lost']) {
				hasLost = true;
			}
		}
	});
</script>

{#snippet winScreen()}
	<div class="endScreen">
		<div class="image">
			<AppleMusicIcon url={song.attributes.artwork.url} imageSize={160} />
		</div>

		<p class="songArtist">{song.attributes.artistName}</p>
		<p class="songName">{song.attributes.name}</p>
		<p class="tagLine">A virtuoso performance!</p>
		<p class="cta">Play again in {expiresFormat}!</p>
		<div class="buttons">
			<a href="##" class="button shareButton" onclick={doShare}> Share </a>
			<a href={resolve('/play/unlimited')} class="button"> Unlimited mode </a>
			<a href="https://music.apple.com/us/song/{song.id}" class="button">Listen on Apple Music</a>
		</div>
	</div>
{/snippet}

{#snippet lossScreen()}
	<div class="endScreen">
		<div class="image">
			<AppleMusicIcon url={song.attributes.artwork.url} imageSize={160} />
		</div>

		<p class="songArtist">{song.attributes.artistName}</p>
		<p class="songName">{song.attributes.name}</p>
		<p class="tagLine">Almost!</p>
		<p class="cta">Try again in {expiresFormat}!</p>
		<div class="buttons">
			<a href="##" class="button shareButton" onclick={shareLoss}> Share </a>
			<a href={resolve('/play/unlimited')} class="button"> Unlimited mode </a>
			<a href="https://music.apple.com/us/song/{song.id}" class="button">Listen on Apple Music</a>
		</div>
	</div>
{/snippet}

<div class="container">
	{#if alreadyPlayed}
		{#if hasLost}
			{@render lossScreen()}
		{:else}
			{@render winScreen()}
		{/if}
	{:else}
		<Game
			song={data.dailySongDetails}
			{winScreen}
			{lossScreen}
			onWin={() => {
				localStorage.setItem(
					data.dayId,
					JSON.stringify({
						lost: false,
						guesses: guessIndex + 1
					})
				);
			}}
			onLoss={() => {
				localStorage.setItem(
					data.dayId,
					JSON.stringify({
						lost: true
					})
				);
			}}
			bind:guessIndex
		/>
	{/if}
</div>

<style lang="scss">
	.container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		margin-top: 0.75rem;

		.button {
			background: var(--background-alt);
			border: 1px solid var(--border);
			padding: 0.25rem;
			border-radius: 0.5rem;
			text-decoration: none;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
		}

		.shareButton {
			width: 100%;
			background: var(--accent);
			border: 1px solid var(--accent);
		}
	}

	.endScreen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		gap: 0.5rem;

		.image {
			width: 100%;
			max-width: 10rem;
			border-radius: 0.25rem;
			overflow: hidden;
		}

		.songArtist {
			font-size: 0.8rem;
			font-weight: 500;
			opacity: 0.8;
			margin: 0;
		}

		.songName {
			font-size: 1.1rem;
			font-weight: 600;
			opacity: 1;
			margin: 0;
		}

		.tagLine {
			font-weight: 500;
			font-size: 0.9rem;
			opacity: 0.8;
			margin: 0;
			margin-top: 0.75rem;
		}

		.cta {
			font-weight: 400;
			font-size: 0.8rem;
			opacity: 0.8;
			margin: 0;
		}
	}
</style>
