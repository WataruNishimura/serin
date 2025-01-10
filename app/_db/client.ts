import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "@dotenvx/dotenvx";
config();
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });