<script lang="ts">
	import Game from '$lib/components/Game.svelte';
	import ListenOnAppleMusic from '$lib/components/ListenOnAppleMusic.svelte';
	import SongCard from '$lib/components/SongCard.svelte';
	import type { PageData } from './$types';

	const {
		data
	}: {
		data: PageData;
	} = $props();

	let song = $derived(data.data);
</script>

{#snippet winScreen()}
	<h2>A virtuoso performance!</h2>
	<p>You got the heardle!</p>
	<SongCard {song} />
	<ListenOnAppleMusic {song} />
{/snippet}

{#snippet lossScreen()}
	<span>You lose!</span>
	<SongCard {song} />
	<ListenOnAppleMusic {song} />
{/snippet}

<div class="container">
	<Game song={data.data} {winScreen} {lossScreen} />
</div>

<style lang="scss">
	.container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
