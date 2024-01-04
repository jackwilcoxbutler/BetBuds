'use client';

import { signOut } from "next-auth/react";
import { InfoLogo } from "public/info";

export default function ViewRules() {
  return (
    <div className="rounded-sm bg-blue">
    <button
      className="text-t-orange hover:text-stone-800 "
      onClick={() => {
        console.log("Viewing Rules");
      }
      }
    >
        Info
    </button>
    </div>
  );
}