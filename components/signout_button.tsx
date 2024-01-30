'use client';

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
            className="text-t-white hover:bg-t-orange-200 focus:shadow-t-orange block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
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
