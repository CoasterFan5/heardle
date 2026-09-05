<script lang="ts">
	const {
		url,
		imageSize = 64
	}: {
		url: string;
		imageSize?: number;
	} = $props();

	let formatted = $derived(
		url.replace('{w}', imageSize.toFixed(0)).replace('{h}', imageSize.toFixed(0))
	);
</script>

<img src={formatted} loading="lazy" alt="cover" />

<style lang="scss">
	img {
		height: 100%;
		width: 100%;
		aspect-ratio: 1/1;
	}
</style>
