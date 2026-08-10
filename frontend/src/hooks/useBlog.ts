import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { isLoggedIn } from "../lib/auth";
import type { Post } from "../types";

export function useBlog(id: string | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      const requests: [Promise<Post>, Promise<string[]>] = [
        api.get(`/api/v1/blog/${id}`).then((res) => res.data.post),
        isLoggedIn()
          ? api
              .get("/api/v1/blog/bookmarks/mine")
              .then((res) => res.data.posts.map((p: Post) => p.id))
              .catch(() => [])
          : Promise.resolve([]),
      ];
      const [postRes, savedIds] = await Promise.all(requests);
      if (!cancelled) {
        setPost(postRes);
        setBookmarked(savedIds.includes(postRes.id));
        setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { post, bookmarked, isLoading };
}
