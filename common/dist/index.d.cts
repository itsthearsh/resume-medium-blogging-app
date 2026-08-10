import { z } from 'zod';

declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type SignupInput = z.infer<typeof signupInput>;
declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
type SigninInput = z.infer<typeof signinInput>;
declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
    tagIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
type CreateBlogInput = z.infer<typeof createBlogInput>;
declare const updateBlogInput: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
    tagIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
type UpdateBlogInput = z.infer<typeof updateBlogInput>;

export { type CreateBlogInput, type SigninInput, type SignupInput, type UpdateBlogInput, createBlogInput, signinInput, signupInput, updateBlogInput };
