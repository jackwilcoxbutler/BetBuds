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
          <div className="flex flex-col w-1/3 h-screen justify-start px-4 border-l-4 border-dotted">
            <ListLeagues />
            <OpenLeagueFormButton />
          </div>
        </div>
      </div>
    </div>
  );
}


/*
americanfootball_nfl

basketball_nba
basketball_ncaab

icehockey_nhl

soccer_epl


each tab:

/v4/sports/{sport}/odds
https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?apiKey=fdbb99959a10b219f4351a17167d7f0e&oddsFormat=american&regions=us&markets=h2h,spreads,totals&dateFormat=iso&bookmakers=fanduel

bet_event

eventID
sport
homeTeam
awayTeam
last_update
awayML?
homeML?
awaySpreadPoint?
homeSpreadPoint?
awaySpreadPrice?
homeSpreadPrice?
totalPoint?
overPrice?
underPrice?


*/