import { useNavigate } from "react-router-dom";
import type { CreateBlogInput } from "@itsthearsh/common-blog-app";
import { NavBar } from "../components/NavBar";
import { BlogForm, type BlogFormValues } from "../components/BlogForm";
import { api } from "../lib/api";

export function Publish() {
  const navigate = useNavigate();

  async function handleSubmit(values: BlogFormValues) {
    const payload: CreateBlogInput = values;
    const res = await api.post("/api/v1/blog", payload);
    navigate(`/blog/${res.data.post.id}`);
  }

  return (
    <div>
      <NavBar />
      <BlogForm submitLabel="Publish" onSubmit={handleSubmit} />
    </div>
  );
}
