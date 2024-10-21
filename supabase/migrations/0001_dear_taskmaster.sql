ALTER TABLE "faqs" DROP CONSTRAINT "faqs_id_unique";--> statement-breakpoint
ALTER TABLE "faqs" ALTER COLUMN "id" SET DATA TYPE serial;