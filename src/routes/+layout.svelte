<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	import '@fontsource-variable/plus-jakarta-sans';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="wrap">
	<div class="inner">
		<div class="header">
			<h2>Heardle New</h2>
		</div>
		<div class="content">
			{@render children()}
		</div>
	</div>
</div>

<style lang="scss">
	:global(body) {
		--color: white;
		--accent: #f67216;
		--border: #3b3b3c;
		--border-alt: #626262;
		--background: #1f1f1f;
		--background-alt: #2c2c2c;
		margin: 0px;
		padding: 0px;
	}

	:global(*) {
		font-family: 'Plus Jakarta Sans Variable', sans-serif;
		color: var(--color);
		box-sizing: border-box;
	}

	.wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100dvh;
		width: 100%;
		background-color: var(--background);
	}

	.inner {
		width: 100%;
		height: 100dvh;
	}

	.header {
		display: flex;
		width: 100%;
		background: var(--background-alt);
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid var(--border);
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 1rem;
	}
</style>
