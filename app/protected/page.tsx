import SignOut from "@/components/signout_button";
import CreateLeagueForm from "@/components/CreateLeagueForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default function Home() {
  return (
  <div>
    <header className="flex items-center justify-between p-4">
      {/*replace with homebutton component*/}
      <h1 className="text-2xl font-bold">BetBuds</h1>
      <SignOut/>
    </header>
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue">
      <CreateLeagueForm/>
    </div>
  </div>
  );
}
