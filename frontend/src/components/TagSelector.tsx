import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Tag } from "../types";

interface TagSelectorProps {
  selected: string[];
  onChange: (tagIds: string[]) => void;
}

export function TagSelector({ selected, onChange }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/v1/tags")
      .then((res) => setTags(res.data.tags))
      .finally(() => setIsLoading(false));
  }, []);

  function toggle(tagId: string) {
    if (selected.includes(tagId)) {
      onChange(selected.filter((id) => id !== tagId));
    } else {
      onChange([...selected, tagId]);
    }
  }

  if (isLoading) {
    return <div className="h-8 w-full animate-pulse rounded bg-zinc-100" />;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag.id}
          type="button"
          onClick={() => toggle(tag.id)}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            selected.includes(tag.id)
              ? "border-zinc-900 bg-zinc-900 text-white"
              : "border-zinc-300 text-zinc-600 hover:border-zinc-500"
          }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}
