"use client";

import {
  getIsUserSignedIn,
  onAuthStateChange,
  signInWithGoogle,
  signOutUser,
} from "@/helpers/firebase/auth";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const isUserSignedIn = getIsUserSignedIn();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChange((user) => {
      setUser(user ?? undefined);
    });
  }, []);

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
