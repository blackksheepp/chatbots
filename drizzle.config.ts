import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: 'postgresql',
    out: './supabase/migrations',
    schema: './app/db/schema',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})