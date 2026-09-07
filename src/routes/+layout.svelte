<script lang="ts">
	let { children } = $props();
	import '@fontsource-variable/plus-jakarta-sans';
	import InfoIcon from '~icons/ph/info';
	import Guide from './Guide.svelte';

	let guideOpen = $state(false);
</script>

<div class="wrap">
	<div class="inner">
		<div class="header">
			<div class="left">
				<button
					class="iconButton"
					onclick={() => {
						guideOpen = !guideOpen;
					}}
				>
					<InfoIcon />
				</button>
			</div>
			<div class="center">
				<h2>Heardle</h2>
			</div>
			<div class="right"></div>
		</div>
		<div class="content">
			{#if guideOpen}
				<Guide />
			{:else}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
<meta name="theme-color" content="#d60017" />

<style lang="scss">
	:global(body) {
		--color: white;
		--accent: #d60017;
		--border: #3b3b3c;
		--border-alt: #626262;
		--background: #1f1f1f;
		--background-alt: #2c2c2c;
		margin: 0px;
		padding: 0px;

		background: var(--background);
		color: var(--color);
	}

	:global(*) {
		font-family: 'Plus Jakarta Sans Variable', sans-serif;
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

	.iconButton {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		padding: 0.25rem;
		border: 0px;
		outline: 0px;
		font-size: 1rem;
		background: unset;
		cursor: pointer;
		color: var(--color);

		&:hover {
			color: var(--accent) !important;
		}
	}

	.left {
		display: flex;
		align-items: center;
		justify-content: end;
		width: 100%;
		font-size: 1rem;
	}
	.center {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		h2 {
			font-weight: 500;
		}
	}

	.right {
		width: 100%;
	}

	.header {
		display: flex;
		width: 100%;
		background: var(--background-alt);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--border);
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}
</style>
