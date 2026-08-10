// src/index.ts
import { z } from "zod";
var signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});
var signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
var createBlogInput = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().optional(),
  tagIds: z.array(z.string()).optional()
});
var updateBlogInput = z.object({
  id: z.string(),
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  published: z.boolean().optional(),
  tagIds: z.array(z.string()).optional()
});
export {
  createBlogInput,
  signinInput,
  signupInput,
  updateBlogInput
};
