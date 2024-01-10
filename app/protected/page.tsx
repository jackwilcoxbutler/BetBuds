import { ListLeagues } from "@/components/leagues/ListLeagues";
import OpenLeagueFormButton from "@/components/leagues/CreateLeagueButton";
import DefaultHeader from "@/components/header";
import { BetsList } from "@/components/bets/BetsList";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-t-white">
      <DefaultHeader />
      <div className="w-full flex justify-center">
        <div className="flex flex-row w-full h-screen justify-end space-x-4">
            <BetsList />
          <div className="flex flex-col w-1/3 h-screen justify-start pl-4 border-l-4 border-dotted">
            <ListLeagues />
            <OpenLeagueFormButton />
          </div>
        </div>
      </div>
    </div>
  );
}
