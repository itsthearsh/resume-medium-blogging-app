import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
import { BookmarkButton } from "./BookmarkButton";
import { ConfirmDialog } from "./ConfirmDialog";
import { EllipsisMenu } from "./EllipsisMenu";
import { api } from "../lib/api";
import { formatDate, readingTime } from "../lib/utils";
import type { Post } from "../types";

interface BlogCardProps {
  post: Post;
  currentUserId: string | null;
  bookmarked: boolean;
  onDeleted?: (id: string) => void;
}

export function BlogCard({ post, currentUserId, bookmarked, onDeleted }: BlogCardProps) {
  const navigate = useNavigate();
  const isOwner = currentUserId === post.authorId;
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  async function handleDelete() {
    setConfirmingDelete(false);
    await api.delete(`/api/v1/blog/${post.id}`);
    onDeleted?.(post.id);
  }

  return (
    <Link
      to={`/blog/${post.id}`}
      className="block border-b border-zinc-200 py-8 first:pt-0"
    >
      <div className="mb-3 flex items-center gap-2 text-sm text-zinc-600">
        <Avatar name={post.author.name} email={post.author.email} />
        <span>{post.author.name ?? post.author.email}</span>
        <span>&middot;</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="mb-1 text-xl font-semibold text-zinc-900">{post.title}</h2>
          <p className="mb-3 line-clamp-2 text-zinc-600">{post.content}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600"
            >
              {tag.name}
            </span>
          ))}
          <span className="text-xs text-zinc-500">{readingTime(post.content)} min read</span>
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

      {confirmingDelete && (
        <ConfirmDialog
          message="Delete this post? This can't be undone."
          onConfirm={handleDelete}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </Link>
  );
}
