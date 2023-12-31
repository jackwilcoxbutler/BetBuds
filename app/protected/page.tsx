import SignOut from "@/components/signout_button";
import { ListLeagues } from "@/components/leagues/ListLeagues";
import OpenLeagueFormButton from "@/components/leagues/CreateLeagueButton";

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
        <div className="flex w-screen h-screen justify-end bg-t-orange">
            <div className="flex flex-col w-1/3 justify-start ">
              <ListLeagues/>
              <OpenLeagueFormButton/>
            </div>
        </div>
  </div>
  );
}
