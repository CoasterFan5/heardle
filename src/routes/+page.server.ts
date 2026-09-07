import { db } from '$lib/server/db';
import { dailySong } from '$lib/server/db/schema';
import { pickFromArray } from '$lib/utils/pickFromArray.js';
import Dayjs from 'dayjs';
import { eq } from 'drizzle-orm';
import { songBank } from '../lib/server/songBank';
import { getSongFromId } from '$lib/server/getSongFromId';

let dailySongItem: typeof dailySong.$inferSelect | undefined = undefined;

export const load = async () => {
	const d = Dayjs();
	const dayId = d.format('DD-MM-YYYY');
	const expires = Dayjs();
	const expiresDate = expires.add(1, 'day').startOf('day').toDate();

	if (!dailySongItem || dailySongItem.dayId != dayId) {
		// check if we have one in the database
		const dbPick = await db
			.select()
			.from(dailySong)
			.limit(1)
			.orderBy(dailySong.picked)
			.where(eq(dailySong.dayId, dayId));

		if (dbPick.length < 1) {
			// we need a new song baby
			const newSongId = pickFromArray(songBank);
			dailySongItem = (
				await db
					.insert(dailySong)
					.values({
						dayId: dayId,
						songId: newSongId,
						picked: d.toDate()
					})
					.returning()
			)[0];
		} else {
			dailySongItem = dbPick[0];
		}
	}

	const dailySongDetails = await getSongFromId(dailySongItem.songId);

	return {
		dailySongDetails,
		expiresDate,
		dayId
	};
};
