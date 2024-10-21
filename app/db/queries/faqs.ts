"use server";
import { asc, eq, sql } from "drizzle-orm";
import db from "../db";
import { faqs } from "../schema/faqs";

export const GetFaqs = async () => {
    return await db
        .select()
        .from(faqs)
        .orderBy(asc(faqs.count))
        .limit(8);
}

const GetFaq = async (text: string) => {
    return await db
        .select()
        .from(faqs)
        .where(eq(faqs.text, text));
}

const AddFaq = async (text: string) => {
    return await db
        .insert(faqs)
        .values({
            text: text
        })
        .returning();
}

export const UpdateFaqCount = async (text: string) => {
    const faq = await GetFaq(text);

    if (faq.length > 0) {
        return await db
            .update(faqs)
            .set({ count: sql`${faqs.count} + 1` })
            .where(eq(faqs.text, text));
    } else {
        return await AddFaq(text);
    }
}