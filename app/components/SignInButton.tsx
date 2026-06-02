"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-medium rounded-lg transition-colors"
    >
      Sign In with GitHub
    </button>
  );
}