// import { drizzle } from "drizzle-orm/neon-http";

// export const db = drizzle(process.env.DATABASE_URL!);

import { drizzle } from "drizzle-orm/neon-serverless"; // or 'neon-http' for HTTP

// or for WebSocket driver
import { Pool } from "@neondatabase/serverless";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool); // Transactions supported
