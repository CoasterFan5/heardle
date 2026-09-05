import { pickFromArray } from '$lib/utils/pickFromArray';
import { songBank } from '../../../lib/server/songBank';
import { getSongFromId } from '$lib/server/getSongFromId';

export const load = async () => {
	// pick a song
	const songId = pickFromArray(songBank);
	const song = await getSongFromId(songId);

	return {
		data: song
	};
};
