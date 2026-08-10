import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { BlogForm, type BlogFormValues } from "../components/BlogForm";
import { FullPageSpinner } from "../components/Skeleton";
import { useBlog } from "../hooks/useBlog";
import { api } from "../lib/api";
import { getCurrentUserId } from "../lib/auth";

export function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, isLoading } = useBlog(id);
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    if (!isLoading && post && post.authorId !== currentUserId) {
      navigate(`/blog/${post.id}`, { replace: true });
    }
  }, [isLoading, post, currentUserId, navigate]);

  if (isLoading || !post) {
    return (
      <div>
        <NavBar />
        <FullPageSpinner />
      </div>
    );
  }

  async function handleSubmit(values: BlogFormValues) {
    await api.put("/api/v1/blog", { id, ...values });
    navigate(`/blog/${id}`);
  }

  return (
    <div>
      <NavBar />
      <BlogForm
        submitLabel="Save"
        initialValues={{
          title: post.title,
          content: post.content,
          tagIds: post.tags.map((t) => t.id),
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
