import { query } from '$app/server';
import { createDeveloperToken } from '$lib/server/createToken';
import { songZodObject } from '$lib/types/song';
import { z } from 'zod';

const searchResultZodObject = z.object({
	results: z.object({
		songs: z.object({
			href: z.string(),
			next: z.string(),
			data: z.array(songZodObject)
		})
	})
});

export type SearchResultsObject = z.Infer<typeof searchResultZodObject>['results']['songs']['data'];

export const searchSongs = query(
	z.object({
		term: z.string()
	}),
	async (params) => {
		const token = createDeveloperToken();

		const searchReq = await fetch(
			`https://api.music.apple.com/v1/catalog/US/search?term=${params.term}&types=songs&limit=25`,
			{
				headers: {
					authorization: `Bearer ${token}`
				}
			}
		);

		if (searchReq.status != 200) {
			return;
		}

		const j = await searchReq.json();

		const items = searchResultZodObject.safeParse(j);

		if (items.error) {
			return;
		}

		return items.data;
	}
);
