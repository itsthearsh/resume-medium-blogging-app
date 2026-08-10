import { Hono } from "hono";
import { getPrisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { createBlogInput, updateBlogInput } from "@itsthearsh/common-blog-app";
import type { Bindings, Variables } from "../types";

const blogRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

const postSelect = {
  id: true,
  title: true,
  content: true,
  published: true,
  createdAt: true,
  authorId: true,
  author: { select: { id: true, name: true, email: true } },
  tags: { select: { id: true, name: true } },
} as const;

blogRouter.get("/bulk", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: postSelect,
  });
  return c.json({ posts });
});

blogRouter.get("/bookmarks/mine", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const prisma = getPrisma(c.env.DATABASE_URL);
  const saved = await prisma.savedPost.findMany({
    where: { userId },
    select: { post: { select: postSelect } },
  });
  return c.json({ posts: saved.map((s) => s.post) });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = getPrisma(c.env.DATABASE_URL);
  const post = await prisma.post.findUnique({
    where: { id },
    select: postSelect,
  });
  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }
  return c.json({ post });
});

blogRouter.post("/", authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = createBlogInput.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid input" }, 400);
  }

  const userId = c.get("userId");
  const prisma = getPrisma(c.env.DATABASE_URL);
  const post = await prisma.post.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      published: parsed.data.published ?? true,
      authorId: userId,
      tags: parsed.data.tagIds
        ? { connect: parsed.data.tagIds.map((id) => ({ id })) }
        : undefined,
    },
    select: postSelect,
  });
  return c.json({ post });
});

blogRouter.put("/", authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = updateBlogInput.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid input" }, 400);
  }

  const userId = c.get("userId");
  const prisma = getPrisma(c.env.DATABASE_URL);
  const existing = await prisma.post.findUnique({
    where: { id: parsed.data.id },
  });
  if (!existing) {
    return c.json({ error: "Post not found" }, 404);
  }
  if (existing.authorId !== userId) {
    return c.json({ error: "Forbidden" }, 403);
  }

  const post = await prisma.post.update({
    where: { id: parsed.data.id },
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      published: parsed.data.published,
      tags: parsed.data.tagIds
        ? { set: parsed.data.tagIds.map((id) => ({ id })) }
        : undefined,
    },
    select: postSelect,
  });
  return c.json({ post });
});

blogRouter.delete("/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const userId = c.get("userId");
  const prisma = getPrisma(c.env.DATABASE_URL);
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return c.json({ error: "Post not found" }, 404);
  }
  if (existing.authorId !== userId) {
    return c.json({ error: "Forbidden" }, 403);
  }

  await prisma.savedPost.deleteMany({ where: { postId: id } });
  await prisma.post.delete({ where: { id } });
  return c.json({ success: true });
});

blogRouter.post("/:id/bookmark", authMiddleware, async (c) => {
  const postId = c.req.param("id");
  const userId = c.get("userId");
  const prisma = getPrisma(c.env.DATABASE_URL);

  const existing = await prisma.savedPost.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existing) {
    await prisma.savedPost.delete({ where: { id: existing.id } });
    return c.json({ bookmarked: false });
  }

  await prisma.savedPost.create({ data: { userId, postId } });
  return c.json({ bookmarked: true });
});

export default blogRouter;
