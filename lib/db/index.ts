import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env.mjs";
export const client = postgres({
          host: env.PGHOST,
          port: +env.PGPORT!,
          database: 'project-bc584120-a7ba-4597-ab1c-e0336a7dc188',
          username: env.PGUSERNAME,
          password: env.PGPASSWORD,
          ssl: require
        });
export const db = drizzle(client)
