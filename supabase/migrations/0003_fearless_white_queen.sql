ALTER TABLE "faqs" ADD COLUMN "serial" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "faqs" DROP COLUMN IF EXISTS "id";