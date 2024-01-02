import SignOut from "@/components/signout_button";
import { ListLeagues } from "@/components/leagues/ListLeagues";
import OpenLeagueFormButton from "@/components/leagues/CreateLeagueButton";
import mySvg from '@components/radiant-gradient.svg';
import { url } from "inspector";

export default function Home() {
  return (
  <div className="h-screen w-screen bg-min">
    <header className="bg-t-dark-blue sticky top-0 flex justify-center">
          <div className="flex w-5/6 items-center justify-between py-4">
            <a 
            href="/protected"
            className="text-3xl font-bold text-t-orange"
            >
            BetBuds
            </a>
            <SignOut/>
          </div>
        </header>
        <div className="w-full flex justify-center">
          <div className="flex flex-row w-5/6 h-screen justify-end space-x-4">
              <div className="text-t-dark-blue">
                Bets Coming Soon ...
              </div>
              <div className="flex flex-col w-1/3 h-screen justify-start pl-4 border-l-4 border-dotted">
                <ListLeagues/>
                <OpenLeagueFormButton/>
              </div>
        </div>
        </div>
  </div>
  );
}
