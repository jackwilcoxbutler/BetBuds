'use client';

import { BetContext } from "@/app/context/bet-provider";
import { Bet, Bet_Choice, Bet_Object } from "@/lib/betTypes";
import { useContext } from "react";

const formatOdds = (a: number | null | undefined): string => {
  if (a) {
    if (a > 0) {
      return ("+" + a.toString())
    } else {
      return a.toString()
    }
  } else {
    return "-"
  }
}

interface BetButtonGridProps {
  bet: Bet_Object,
  is_home: boolean
}

export default function BetButtonGrid({ bet, is_home }: BetButtonGridProps) {
  const context = useContext(BetContext);

  return (
    <div className="flex flex-row space-x-5" >
      <button
        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white
                                    transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
        onClick={() => {
          //console.log(context);
          context?.setBet({
            event_id: bet.id,
            team_name: is_home ? bet.homeTeam : bet.awayTeam,
            bet_type: "ML",
            price: is_home ? (bet.homeML ?? 0) : (bet.awayML ?? 0),
            start_date: bet.startDate,
            other_team: is_home ? bet.awayTeam : bet.homeTeam
          })
        }}
      >
        {is_home ? formatOdds(bet.homeML) : formatOdds(bet.awayML)}
      </button>
      <button
        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white
transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
        // onClick={() => {
        //   context?.setBet({
        //     event_id: bet.id,
        //     team_name: is_home ? bet.homeTeam : bet.awayTeam,
        //     bet_type: "ML",
        //     price: is_home ? (bet.homeML ?? 0) : (bet.awayML ?? 0),
        //     start_date: bet.startDate,
        //     other_team: is_home ? bet.awayTeam : bet.homeTeam
        //   })
        // }}
      >
        <div className="flex flex-col">
          <div className="text-xl">{is_home ? formatOdds(bet.homeSpreadPoint) : formatOdds(bet.awaySpreadPoint)}</div>
          <div className="text-md">{is_home ? formatOdds(bet.awaySpreadPoint) : formatOdds(bet.awaySpreadPrice)}</div>
        </div>
      </button>
      <button
        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white
transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
        // onClick={() => {
        //   context?.setBet({
        //     event_id: bet.id,
        //     bet_type: "OVER",
        //     point: bet.totalPoint ?? 0,
        //     price: bet.overPrice ?? 0,
        //     start_date: bet.startDate,
        //   })
        // }}
      >

        <div className="flex flex-col">
          <div className="text-xl">o{bet.totalPoint}</div>
          <div className="text-md">{is_home ? formatOdds(bet.overPrice) : formatOdds(bet.underPrice)}</div>
        </div>
      </button>
    </div>
  );
}