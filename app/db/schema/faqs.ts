import { pgTable, integer, text, serial } from "drizzle-orm/pg-core"

export const faqs = pgTable('faqs', {
    id: serial('serial'),
    text: text(),
    count: integer().default(0)
});