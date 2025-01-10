import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "@dotenvx/dotenvx";
import postgres from "postgres";
config();
const sql = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
