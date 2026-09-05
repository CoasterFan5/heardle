CREATE TABLE "dailySong" (
	"id" serial PRIMARY KEY NOT NULL,
	"dayId" text NOT NULL,
	"songId" text NOT NULL,
	"picked" timestamp NOT NULL,
	CONSTRAINT "dailySong_dayId_unique" UNIQUE("dayId")
);
