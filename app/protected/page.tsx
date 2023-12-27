import SignOut from "@/components/signout_button";
import CreateLeagueForm from "@/components/leagues/CreateLeagueForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ListLeagues } from "@/components/leagues/ListLeagues";
import { Suspense } from "react";

export default function Home() {
  return (
  <div>
    <header className="flex items-center justify-between p-4">
      {/*replace with homebutton component*/}
      <h1 className="text-2xl font-bold">BetBuds</h1>
      <SignOut/>
    </header>
    <div className="h-screen w-screen flex flex-col flex-grow items-center justify-center bg-blue p-10">
      <Suspense fallback={<p>Loading feed...</p>}>
        <ListLeagues />
      </Suspense>
      <CreateLeagueForm/>
    </div>
  </div>
  );
}
