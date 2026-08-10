import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { getPrisma } from "../lib/prisma";
import { signupInput, signinInput } from "../zod/schemas";
import type { Bindings } from "../types";

const userRouter = new Hono<{ Bindings: Bindings }>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const parsed = signupInput.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid input" }, 400);
  }

  const prisma = getPrisma(c.env.DATABASE_URL);
  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return c.json({ error: "User already exists" }, 409);
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      password: hashedPassword,
      name: parsed.data.name,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET, "HS256");
  return c.json({ jwt: token });
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const parsed = signinInput.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid input" }, 400);
  }

  const prisma = getPrisma(c.env.DATABASE_URL);
  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user) {
    return c.json({ error: "Invalid credentials" }, 403);
  }

  const valid = await bcrypt.compare(parsed.data.password, user.password);
  if (!valid) {
    return c.json({ error: "Invalid credentials" }, 403);
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET, "HS256");
  return c.json({ jwt: token });
});

export default userRouter;
