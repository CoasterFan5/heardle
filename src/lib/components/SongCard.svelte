<script lang="ts">
	import type { SongObject } from '$lib/types/song';
	import AppleMusicIcon from './AppleMusicIcon.svelte';

	const {
		song
	}: {
		song: SongObject;
	} = $props();
</script>

<div class="songCard">
	<div class="image">
		<AppleMusicIcon url={song.attributes.artwork.url} />
	</div>
	<div class="text">
		<span class="songName">
			{song.attributes.name}
		</span>
		<span class="artist">
			{song.attributes.artistName}
		</span>
	</div>
</div>

<style lang="scss">
	.songCard {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 0.25rem;
	}

	.text {
		display: flex;
		flex-direction: column;
	}

	.artist {
		font-size: 0.8rem;
		opacity: 0.8;
	}
</style>
