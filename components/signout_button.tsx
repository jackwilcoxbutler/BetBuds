'use client';

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-stone-400 hover:text-stone-200 "
      onClick={() => {
        console.log("Signing out");
        signOut({callbackUrl: 'http://localhost:3000/'});
      }
      }
    >
      Sign Out
    </button>
  );
}
