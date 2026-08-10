import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkPlus, CircleMinus } from "lucide-react";
import { api } from "../lib/api";
import { isLoggedIn } from "../lib/auth";

interface BookmarkButtonProps {
  postId: string;
  initialBookmarked: boolean;
  variant?: "toggle" | "remove";
  onChange?: (bookmarked: boolean) => void;
}

export function BookmarkButton({
  postId,
  initialBookmarked,
  variant = "toggle",
  onChange,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  async function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!isLoggedIn()) {
      navigate("/signin");
      return;
    }
    if (pending) return;
    setPending(true);
    try {
      const res = await api.post(`/api/v1/blog/${postId}/bookmark`);
      setBookmarked(res.data.bookmarked);
      onChange?.(res.data.bookmarked);
    } finally {
      setPending(false);
    }
  }

  if (variant === "remove") {
    return (
      <button
        onClick={toggle}
        disabled={pending}
        aria-label="Remove from saved"
        className="rounded-full p-1.5 text-zinc-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      >
        <CircleMinus size={18} />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      aria-label={bookmarked ? "Remove bookmark" : "Save post"}
      className={`rounded-full p-1.5 hover:bg-zinc-100 disabled:opacity-50 ${
        bookmarked ? "text-zinc-900" : "text-zinc-400"
      }`}
    >
      <BookmarkPlus size={18} fill={bookmarked ? "currentColor" : "none"} />
    </button>
  );
}
