import SignOut from "@/components/signout_button";
import CreateLeagueForm from "@/components/leagues/CreateLeagueForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ListLeagues } from "@/components/leagues/ListLeagues";
import { Suspense } from "react";

export default function Home() {
  return (
  <div>
    <header className="flex items-center justify-between p-4 bg-blue-400">
      {/*replace with homebutton component*/}
      <a 
      href="/protected"
      className="text-2xl font-bold"
      >
        BetBuds
        </a>
      <SignOut/>
    </header>
    <div className="h-screen w-screen flex flex-col flex-grow items-center justify-center bg-blue-200">
      <Suspense fallback={<p>Loading feed...</p>}>
        <ListLeagues />
      </Suspense>
      <CreateLeagueForm/>
    </div>
  </div>
  );
}
