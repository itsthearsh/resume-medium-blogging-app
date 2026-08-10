import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import type { Bindings, Variables } from "../types";

export const authMiddleware = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET, "HS256");
    if (!payload || typeof payload.id !== "string") {
      return c.json({ error: "Unauthorized" }, 401);
    }
    c.set("userId", payload.id);
    await next();
  } catch {
    return c.json({ error: "Unauthorized" }, 401);
  }
});
