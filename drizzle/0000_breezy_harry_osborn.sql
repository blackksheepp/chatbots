CREATE TABLE `faqs` (
	`id` integer PRIMARY KEY NOT NULL,
	`text` text,
	`count` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `faqs_id_unique` ON `faqs` (`id`);