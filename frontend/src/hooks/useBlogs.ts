import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { isLoggedIn } from "../lib/auth";
import type { Post } from "../types";

export function useBlogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      const requests: [Promise<Post[]>, Promise<string[]>] = [
        api.get("/api/v1/blog/bulk").then((res) => res.data.posts),
        isLoggedIn()
          ? api
              .get("/api/v1/blog/bookmarks/mine")
              .then((res) => res.data.posts.map((p: Post) => p.id))
              .catch(() => [])
          : Promise.resolve([]),
      ];
      const [fetchedPosts, savedIds] = await Promise.all(requests);
      if (!cancelled) {
        setPosts(fetchedPosts);
        setBookmarkedIds(new Set(savedIds));
        setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function removePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return { posts, bookmarkedIds, isLoading, removePost };
}
