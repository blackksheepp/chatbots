CREATE TABLE IF NOT EXISTS "faqs" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" text,
	"count" integer DEFAULT 0,
	CONSTRAINT "faqs_id_unique" UNIQUE("id")
);
