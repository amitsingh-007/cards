"use client";

import { signInWithGoogle, signOutUser } from "@/helpers/firebase/auth";
import { useUser } from "./contexts/user-context";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {user ? (
        <>
          <p className="text-3xl">Signed in</p>
          <button onClick={signOutUser}>SIGN OUT</button>
          <a href="/dashboard">Dashboard</a>
        </>
      ) : (
        <>
          <p className="text-3xl">Not signed in</p>
          <button onClick={signInWithGoogle}>SIGN IN</button>
        </>
      )}
    </div>
  );
}
