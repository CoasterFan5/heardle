<script lang="ts">
	import Game from '$lib/components/Game.svelte';
	import type { PageData } from './$types';

	const {
		data
	}: {
		data: PageData;
	} = $props();
</script>

<div class="container">
	<Game song={data.data} />
</div>

<style lang="scss">
	.container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
