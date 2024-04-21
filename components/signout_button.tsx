'use client';

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
            className=""
            onClick={() => {
        //console.log("Signing out");
        signOut({callbackUrl: 'http://localhost:3000/'});
      }
      }
    >
      Sign Out
    </button>
  );
}
