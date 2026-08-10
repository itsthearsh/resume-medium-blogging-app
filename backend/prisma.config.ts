import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // CLI-only (migrate/introspect). The origin DB, not the Accelerate proxy —
    // migrations cannot run through Accelerate. Runtime (Worker) queries use
    // DATABASE_URL/accelerateUrl instead; see src/lib/prisma.ts.
    url: env("DIRECT_DATABASE_URL"),
  },
});
