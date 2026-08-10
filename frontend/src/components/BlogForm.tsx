import { useState } from "react";
import { TagSelector } from "./TagSelector";

export interface BlogFormValues {
  title: string;
  content: string;
  tagIds: string[];
}

interface BlogFormProps {
  initialValues?: BlogFormValues;
  submitLabel: string;
  onSubmit: (values: BlogFormValues) => Promise<void>;
}

export function BlogForm({ initialValues, submitLabel, onSubmit }: BlogFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [tagIds, setTagIds] = useState<string[]>(initialValues?.tagIds ?? []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ title, content, tagIds });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-5 px-4 py-10">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full border-none text-3xl font-bold text-zinc-900 outline-none placeholder:text-zinc-300"
      />
      <TagSelector selected={tagIds} onChange={setTagIds} />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tell your story..."
        required
        rows={16}
        className="w-full resize-none border-none text-lg leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-300"
      />
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
