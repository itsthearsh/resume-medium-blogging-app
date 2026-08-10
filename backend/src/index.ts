import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import userRouter from "./routes/user";
import blogRouter from "./routes/blog";
import tagRouter from "./routes/tags";
import type { Bindings, Variables } from "./types";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use(
  "*",
  cors({
    origin: (origin, c: Context<{ Bindings: Bindings }>) => {
      const allowed = c.env.CORS_ORIGIN.split(",").map((o) => o.trim());
      return allowed.includes(origin) ? origin : "";
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) => c.text("Blog API is running"));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/tags", tagRouter);

export default app;
