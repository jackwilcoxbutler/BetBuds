'use client';

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="rounded-sm bg-blue">
    <button
      className="text-stone-600 hover:text-stone-800 "
      onClick={() => {
        //console.log("Signing out");
        signOut({callbackUrl: 'http://localhost:3000/'});
      }
      }
    >
      Sign Out
    </button>
    </div>
  );
}
