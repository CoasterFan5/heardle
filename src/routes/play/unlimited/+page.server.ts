import { createDeveloperToken } from '$lib/server/createToken';
import { pickFromArray } from '$lib/utils/pickFromArray';
import { songBank } from './songBank';
import z from 'zod';
import { songZodObject } from '$lib/types/song';

const respObject = z.object({
	data: z.array(songZodObject)
});
export const load = async () => {
	// pick a song
	const song = pickFromArray(songBank);

	console.info(song);

	const token = createDeveloperToken();
	const detailsReq = await fetch(`https://api.music.apple.com/v1/catalog/us/songs/${song}`, {
		headers: {
			authorization: `Bearer ${token}`
		}
	});

	if (detailsReq.status != 200) {
		throw new Error('Failed to pick song!');
	}

	const parsed = respObject.safeParse(await detailsReq.json());
	if (parsed.error) {
		console.error(parsed.error);
		throw new Error('Failed to parse');
	}

	return {
		data: parsed.data.data[0]
	};
};
