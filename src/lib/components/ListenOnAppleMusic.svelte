<script lang="ts">
	import type { SongObject } from '$lib/types/song';

	const {
		song
	}: {
		song: SongObject;
	} = $props();
</script>

<a href="https://music.apple.com/us/song/{song.id}" target="_blank"
	><img src="/listenOnAppleMusic.svg" alt="Listen on Apple Music" /></a
>

<style lang="scss">
	a {
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
