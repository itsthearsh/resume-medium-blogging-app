import { NavBar } from "../components/NavBar";
import { BlogCard } from "../components/BlogCard";
import { BlogCardSkeletonList } from "../components/Skeleton";
import { useBlogs } from "../hooks/useBlogs";
import { getCurrentUserId } from "../lib/auth";

export function Blogs() {
  const { posts, bookmarkedIds, isLoading, removePost } = useBlogs();
  const currentUserId = getCurrentUserId();

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-2xl px-4 py-8">
        {isLoading ? (
          <BlogCardSkeletonList />
        ) : posts.length === 0 ? (
          <p className="py-16 text-center text-zinc-500">No posts yet. Be the first to write one.</p>
        ) : (
          posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              currentUserId={currentUserId}
              bookmarked={bookmarkedIds.has(post.id)}
              onDeleted={removePost}
            />
          ))
        )}
      </div>
    </div>
  );
}
