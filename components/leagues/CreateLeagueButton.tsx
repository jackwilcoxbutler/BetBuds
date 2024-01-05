'use client';

import { useRouter } from "next/navigation";


export default function OpenLeagueFormButton() {
  const router = useRouter();

  return (
    <div>
    <button
      className="border-t-dark-blue bg-t-light-blue text-t-white flex h-10 w-full items-center justify-center rounded-md border text-lg transition-all focus:outline-none"
      onClick={() => {
        //console.log("Signing out");
        router.push("/protected/league/create");
      }
      }
    >
      Create New League
    </button>
    </div>
  );
}
