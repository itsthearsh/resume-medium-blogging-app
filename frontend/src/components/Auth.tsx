import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../lib/api";
import { setToken } from "../lib/auth";

interface AuthProps {
  type: "signup" | "signin";
}

export function Auth({ type }: AuthProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const payload = type === "signup" ? { name, email, password } : { email, password };
      const res = await api.post(`/api/v1/user/${type}`, payload);
      setToken(res.data.jwt);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-2xl font-semibold text-zinc-900">
          {type === "signup" ? "Create an account" : "Sign in"}
        </h1>
        <p className="mb-6 text-sm text-zinc-500">
          {type === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="font-medium text-zinc-900 underline"
          >
            {type === "signup" ? "Sign in" : "Sign up"}
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {type === "signup" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
                placeholder="Jane Doe"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-md bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
          >
            {isSubmitting ? "Please wait..." : type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
