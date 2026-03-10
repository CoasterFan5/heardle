<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";
	import { searchSongs, type SearchResultsObject } from "./search.remote";
	import AppleMusicIcon from "$lib/assets/AppleMusicIcon.svelte";


	let res: SearchResultsObject = $state([])

	const doSearch = async (term: string) => {
	  const results = await searchSongs({
        term: term
      })
		if(results) {
		  res = results.results.songs.data
		}
	}




	const searchHandler: FormEventHandler<HTMLInputElement> = (e) => {
	  doSearch(e.currentTarget.value)
	}

</script>

<input placeholder="search" oninput={searchHandler}/>
{#each res as result (result.id)}
    <AppleMusicIcon url={result.attributes.artwork.url}/>
    <p>{result.attributes.name} - {result.attributes.artistName}</p>
{/each}
