<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';
	import { searchSongs, type SearchResultsObject } from './search.remote';
	import AppleMusicIcon from '$lib/components/AppleMusicIcon.svelte';
	import type { SongObject } from '$lib/types/song';

	const {
		onSelect
	}: {
		onSelect: (song: SongObject) => void;
	} = $props();

	let res: SearchResultsObject = $state([]);

	const doSearch = async (term: string) => {
		const results = await searchSongs({
			term: term
		});
		if (results) {
			res = results.results.songs.data;
		}
	};

	let to = setTimeout(() => {}, 100);

	const searchHandler: FormEventHandler<HTMLInputElement> = (e) => {
		const val = e.currentTarget.value;
		clearTimeout(to);
		to = setTimeout(() => {
			doSearch(val);
		}, 250);
	};
</script>

<div class="wrap">
	<input placeholder="search" oninput={searchHandler} />

	{#if res.length > 0}
		<div class="floatingSearch">
			{#each res as result (result.id)}
				<button
					class="searchResult"
					onclick={() => {
						onSelect(result);
					}}
				>
					<div class="image">
						<AppleMusicIcon url={result.attributes.artwork.url} />
					</div>
					<div class="text">
						<div class="songName">
							{result.attributes.name}
						</div>
						<div class="artistName">
							{result.attributes.artistName}
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.wrap {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;

		input {
			background: var(--background-alt);
			border: 1px solid var(--border);
			outline: 0px;
			padding: 0.5rem;
			border-radius: 0.25rem;
			transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s;

			&:hover {
				border: 1px solid var(--border-alt);
			}
		}

		.floatingSearch {
			position: absolute;
			top: calc(100% + 0.25rem);
			left: 0px;
			padding: 0.5rem;
			background: var(--background-alt);
			border: 1px solid var(--border);
			border-radius: 0.25rem;
			width: 100%;
			box-sizing: border-box;
			max-height: 20rem;
			overflow-y: auto;
		}
	}

	.searchResult {
		border: 0px;
		outline: 0px;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		background: transparent;
		cursor: pointer;
		height: 2rem;
		margin-bottom: 0.5rem;
		align-items: center;
		justify-content: start;
		gap: 0.25rem;
		width: 100%;
	}

	.text {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		overflow-x: hidden;
		width: 100%;

		.songName {
			white-space: nowrap;
			overflow-x: hidden;
		}

		.artistName {
			font-size: 0.8rem;
			white-space: nowrap;
		}
	}
</style>
