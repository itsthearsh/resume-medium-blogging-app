## Scope (ALL of this is required — not optional)

### Backend (Cloudflare Workers + Hono)
- POST /api/v1/user/signup — creates user, returns JWT
- POST /api/v1/user/signin — returns JWT
- POST /api/v1/blog — create post (auth required)
- PUT /api/v1/blog — update post (auth + owner-only)
- GET /api/v1/blog/bulk — all posts
- GET /api/v1/blog/:id — single post
- DELETE /api/v1/blog/:id — delete post (auth + owner-only)
- POST /api/v1/blog/:id/bookmark — toggle bookmark for current user (auth)
- GET /api/v1/blog/bookmarks/mine — current user's bookmarked posts (auth)
- GET /api/v1/tags — list the 10 fixed tags
- Auth middleware on all blog write routes
- hono/cors middleware enabled

### Data model (Prisma)
- User: id (uuid), email (unique), password, name?
- Post: id (uuid), title, content, published, authorId, createdAt
- Tag: id, name — many-to-many with Post (10 fixed seeded tags)
- SavedPost: join model for User <-> Post bookmarks

### Shared package
- Zod schemas (signupInput, signinInput, createBlogInput, updateBlogInput)
- Published to npm as @itsthearsh/common-blog-app
- updateBlogInput.id MUST be z.string() (UUID), not z.number()

### Frontend (React + TS + Vite + Tailwind v3)
- Signup page (shared Auth + Quote components)
- Signin page
- Blogs listing page (BlogCard + NavBar components)
- Single blog page
- Publish/create blog page
- Saved Posts page (/saved, SavedPosts.tsx) — lists the current user's bookmarked posts via GET /api/v1/blog/bookmarks/mine
- Loading indicators (isLoading state + skeleton/spinner) on every page that fetches data
- axios with JWT from localStorage in headers

### Advance features (all required)
- createdAt timestamp displayed on each blog card
- Computed "X min read" from content length
- Initials-based author avatar (no image upload)
- Tag system — select from 10 fixed tags when publishing, display on cards
- Persisted bookmarks via SavedPost model (BookmarkPlus icon toggles + saves to DB)
- Functional icon buttons: BookmarkPlus, CircleMinus, Ellipsis (lucide-react)
  - Ellipsis opens a dropdown with Edit and Delete, shown only on the current user's own posts
  - Edit opens a page/modal that wires to PUT /api/v1/blog

### Deployment
- Backend → Cloudflare Workers
- Frontend → Vercel
- Seed script for the 10 tags (use normal @prisma/client, NOT /edge, + dotenv/config)