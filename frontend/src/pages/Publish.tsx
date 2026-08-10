import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { BlogForm, type BlogFormValues } from "../components/BlogForm";
import { api } from "../lib/api";

export function Publish() {
  const navigate = useNavigate();

  async function handleSubmit(values: BlogFormValues) {
    const res = await api.post("/api/v1/blog", values);
    navigate(`/blog/${res.data.post.id}`);
  }

  return (
    <div>
      <NavBar />
      <BlogForm submitLabel="Publish" onSubmit={handleSubmit} />
    </div>
  );
}
