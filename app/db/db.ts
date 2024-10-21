import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!);
console.log("Postgres client created:", client);
const db = drizzle(client);

export default db;