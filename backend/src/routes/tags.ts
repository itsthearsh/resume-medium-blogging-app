import { Hono } from "hono";
import { getPrisma } from "../lib/prisma";
import type { Bindings } from "../types";

const tagRouter = new Hono<{ Bindings: Bindings }>();

tagRouter.get("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const tags = await prisma.tag.findMany({ orderBy: { name: "asc" } });
  return c.json({ tags });
});

export default tagRouter;
