<script lang="ts">
	import { durations } from './durations';
	import PlayIcon from '~icons/ph/play';
	import SkipIcon from '~icons/ph/fast-forward';

	const {
		songUrl,
		duration,
		onSkip
	}: {
		songUrl: string;
		duration: number; // seconds, number between 1 and 16
		onSkip: VoidFunction;
	} = $props();

	let audioElement: undefined | HTMLAudioElement = undefined;

	$effect(() => {
		audioElement = new Audio();
		audioElement.src = songUrl;
	});

	let playing = false;
	let startTime = Date.now();

	let to = setTimeout(() => {}, 0);

	const doPlay = () => {
		if (!audioElement) {
			console.log('no audio element');
			return;
		}

		if (playing) {
			audioElement.pause();
			audioElement.currentTime = audioElement.duration;
			clearTimeout(to);
			playing = false;
			doPlay();
			return;
		}

		playing = true;
		guessTrackerRender();
		startTime = Date.now();
		audioElement.play();
		to = setTimeout(() => {
			console.log('stopping');
			if (!audioElement) {
				console.log('no audio element');
				return;
			}
			audioElement.pause();
			audioElement.currentTime = audioElement.duration;
			playing = false;
		}, duration * 1000);
	};

	let canvasWidth = $state(0);
	let canvasHeight = $state(0);
	let canvasElement: HTMLCanvasElement | undefined = $state(undefined);
	const guessTrackerRender = () => {
		if (!playing) {
			return;
		}
		const duration = (Date.now() - startTime) / 1000 / 16;

		if (!canvasElement) {
			return;
		}
		canvasElement.width = canvasWidth;
		canvasElement.height = canvasHeight;

		const ctx = canvasElement.getContext('2d');
		if (!ctx) {
			return;
		}
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvasWidth * duration, canvasHeight);
		requestAnimationFrame(guessTrackerRender);

		// draw the bars
		ctx.fillStyle = 'purple';
		for (const item of durations) {
			ctx.beginPath();
			ctx.fillRect((item / 16) * canvasWidth, 0, 3, canvasHeight);
			ctx.stroke();
		}
	};
</script>

<div class="player">
	<canvas
		class="guessTracker"
		bind:this={canvasElement}
		bind:clientHeight={canvasHeight}
		bind:clientWidth={canvasWidth}
	>
	</canvas>
	<div class="buttons">
		<button class="skipIcon" style="opacity: 0"><SkipIcon /></button>
		<button class="playButton" onclick={doPlay}><PlayIcon /></button>
		<button
			class="skipIcon"
			onclick={() => {
				onSkip();
			}}><SkipIcon /></button
		>
	</div>
</div>

<style lang="scss">
	.player {
		display: flex;
		flex-direction: column;
		width: 100%;

		.guessTracker {
			width: 100%;
			height: 1rem;
			border: 1px solid var(--border);
		}
	}

	.buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.5rem;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1rem;
			border-radius: 1rem;
			aspect-ratio: 1/1;
			background: transparent;
			border: 0px;
			background: rgba(0, 0, 0, 0.1);
			height: 2rem;
			width: 2rem;
		}
	}
</style>
