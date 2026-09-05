import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const dailySong = pgTable('dailySong', {
	id: serial('id').primaryKey(),
	dayId: text().notNull().unique(),
	songId: text().notNull(),
	picked: timestamp().notNull()
});
