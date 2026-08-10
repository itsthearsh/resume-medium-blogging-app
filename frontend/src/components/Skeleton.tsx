export function BlogCardSkeleton() {
  return (
    <div className="animate-pulse border-b border-zinc-200 py-8">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-zinc-200" />
        <div className="h-3 w-32 rounded bg-zinc-200" />
      </div>
      <div className="mb-2 h-6 w-3/4 rounded bg-zinc-200" />
      <div className="mb-1 h-4 w-full rounded bg-zinc-200" />
      <div className="h-4 w-2/3 rounded bg-zinc-200" />
    </div>
  );
}

export function BlogCardSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-800" />
    </div>
  );
}
