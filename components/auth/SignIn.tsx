
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <div className="space-y-3">
        <p>
          Signed in as{" "}
          <span className="font-medium">{session.user?.email}</span>
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="py-2.5 px-3.5 rounded-md bg-red-500 text-white hover:opacity-80 text-sm"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <p>Not signed in </p>
      <button
        onClick={() => signIn()}
        className="bg-neutral-900 py-2.5 px-3.5 rounded-md font-medium text-white text-sm hover:opacity-90 transition-opacity"
      >
        Sign in
      </button>
    </div>
  );
}
