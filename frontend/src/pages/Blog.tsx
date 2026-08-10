import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Avatar } from "../components/Avatar";
import { BookmarkButton } from "../components/BookmarkButton";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { EllipsisMenu } from "../components/EllipsisMenu";
import { FullPageSpinner } from "../components/Skeleton";
import { useBlog } from "../hooks/useBlog";
import { api } from "../lib/api";
import { getCurrentUserId } from "../lib/auth";
import { formatDate, readingTime } from "../lib/utils";

export function Blog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, bookmarked, isLoading } = useBlog(id);
  const currentUserId = getCurrentUserId();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (isLoading) {
    return (
      <div>
        <NavBar />
        <FullPageSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <NavBar />
        <p className="py-16 text-center text-zinc-500">Post not found.</p>
      </div>
    );
  }

  const isOwner = currentUserId === post.authorId;

  const handleDelete = async () => {
    await api.delete(`/api/v1/blog/${post.id}`);
    navigate("/");
  };

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-4 text-3xl font-bold text-zinc-900">{post.title}</h1>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={post.author.name} email={post.author.email} size="md" />
            <div>
              <div className="font-medium text-zinc-900">
                {post.author.name ?? post.author.email}
              </div>
              <div className="text-sm text-zinc-500">
                {formatDate(post.createdAt)} &middot; {readingTime(post.content)} min read
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <BookmarkButton postId={post.id} initialBookmarked={bookmarked} />
            {isOwner && (
              <EllipsisMenu
                onEdit={() => navigate(`/edit/${post.id}`)}
                onDelete={() => setConfirmingDelete(true)}
              />
            )}
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="whitespace-pre-wrap text-lg leading-relaxed text-zinc-800">
          {post.content}
        </div>
      </div>

      {confirmingDelete && (
        <ConfirmDialog
          message="Delete this post? This can't be undone."
          onConfirm={handleDelete}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  );
}
