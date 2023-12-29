import SignOut from "@/components/signout_button";
import CreateLeagueForm from "@/components/leagues/CreateLeagueForm";
import { ListLeagues } from "@/components/leagues/ListLeagues";

export default function Home() {
  return (
  <div>
    <header className="bg-t-dark-blue sticky top-0">
        {/*replace with homebutton component*/}
          <div className="flex items-center justify-between p-4 bg-t-dark-blue mx-32">
            <a 
            href="/protected"
            className="text-2xl font-bold text-t-orange"
            >
            BetBuds
            </a>
            <SignOut/>
          </div>
        </header>
        <div className="flex w-screen h-screen bg-t-orange justify-center">
          <div className="flex w-2/3 justify-center">
            <ListLeagues/>
          </div>
        </div>
  </div>
  );
}
