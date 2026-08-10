import { getInitials } from "../lib/utils";

interface AvatarProps {
  name: string | null;
  email: string;
  size?: "sm" | "md";
}

export function Avatar({ name, email, size = "sm" }: AvatarProps) {
  const dimension = size === "sm" ? "h-8 w-8 text-xs" : "h-12 w-12 text-base";
  return (
    <div
      className={`flex ${dimension} shrink-0 items-center justify-center rounded-full bg-zinc-800 font-medium text-white`}
    >
      {getInitials(name, email)}
    </div>
  );
}
