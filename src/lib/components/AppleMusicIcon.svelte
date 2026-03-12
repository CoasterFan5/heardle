<script lang="ts">
	const {
		url
	}: {
		url: string;
	} = $props();

	let formatted = $derived(url.replace('{w}', '64').replace('{h}', '64'));
</script>

<img src={formatted} loading="lazy" alt="cover" />

<style lang="scss">
	img {
		height: 32px;
		width: 32px;
	}
</style>
