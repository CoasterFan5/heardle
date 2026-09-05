import { songZodObject } from '$lib/types/song';
import z from 'zod';
import { createDeveloperToken } from './createToken';

const respObject = z.object({
	data: z.array(songZodObject)
});

export const getSongFromId = async (id: string) => {
	const token = createDeveloperToken();
	const detailsReq = await fetch(`https://api.music.apple.com/v1/catalog/us/songs/${id}`, {
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

	return parsed.data.data[0];
};
