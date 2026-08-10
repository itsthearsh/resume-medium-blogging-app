import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Avatar } from "../components/Avatar";
import { BookmarkButton } from "../components/BookmarkButton";
import { BlogCardSkeletonList } from "../components/Skeleton";
import { api } from "../lib/api";
import { formatDate, readingTime } from "../lib/utils";
import type { Post } from "../types";

export function SavedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/v1/blog/bookmarks/mine")
      .then((res) => setPosts(res.data.posts))
      .finally(() => setIsLoading(false));
  }, []);

  function handleRemoved(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900">Saved posts</h1>
        {isLoading ? (
          <BlogCardSkeletonList />
        ) : posts.length === 0 ? (
          <p className="py-16 text-center text-zinc-500">You haven't saved any posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex items-start justify-between gap-4 border-b border-zinc-200 py-6 first:pt-0"
            >
              <Link to={`/blog/${post.id}`} className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2 text-sm text-zinc-600">
                  <Avatar name={post.author.name} email={post.author.email} />
                  <span>{post.author.name ?? post.author.email}</span>
                  <span>&middot;</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <h2 className="mb-1 text-lg font-semibold text-zinc-900">{post.title}</h2>
                <p className="line-clamp-1 text-sm text-zinc-500">
                  {readingTime(post.content)} min read
                </p>
              </Link>
              <BookmarkButton
                postId={post.id}
                initialBookmarked
                variant="remove"
                onChange={(bookmarked) => !bookmarked && handleRemoved(post.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
