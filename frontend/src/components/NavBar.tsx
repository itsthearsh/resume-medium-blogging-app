import { Link, useNavigate } from "react-router-dom";
import { Bookmark, PenSquare } from "lucide-react";
import { clearToken, isLoggedIn } from "../lib/auth";

export function NavBar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  function handleAuthClick() {
    if (loggedIn) clearToken();
    navigate("/signin");
  }

  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-4 py-4 sm:px-8">
      <Link to="/" className="text-xl font-semibold tracking-tight text-zinc-900">
        Medium
      </Link>
      <div className="flex items-center gap-4">
        {loggedIn && (
          <>
            <Link
              to="/publish"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
            >
              <PenSquare size={16} />
              Write
            </Link>
            <Link
              to="/saved"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
            >
              <Bookmark size={16} />
              Saved
            </Link>
          </>
        )}
        <button
          onClick={handleAuthClick}
          className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm text-white hover:bg-zinc-700"
        >
          {loggedIn ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}
