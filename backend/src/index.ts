import { Hono } from "hono";
import { cors } from "hono/cors";
import userRouter from "./routes/user";
import blogRouter from "./routes/blog";
import tagRouter from "./routes/tags";
import type { Bindings, Variables } from "./types";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use(
  "*",
  cors({
    origin: (origin, c) => c.env.CORS_ORIGIN ?? origin,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) => c.text("Blog API is running"));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/tags", tagRouter);

export default app;
