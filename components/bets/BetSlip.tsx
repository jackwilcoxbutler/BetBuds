'use client';
import { BetContext } from "@/app/context/bet-provider";
import { Bet_Choice } from "@/lib/betTypes"
import { useContext, useEffect, useState } from "react";
import LeagueSelector from "./LeagueSelect";

export const BetSlip: React.FC = () => {

  const context = useContext(BetContext);
  const [bet, setBet] = useState<Bet_Choice | null>();

  useEffect(() => {
    if (context?.bet) {
      setBet(context.bet);
    } else {
      setBet(null);
    }
  }, [context?.bet]);

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

  


  return (
    <>{bet && (
      <div className="flex flex-row w-full border-2 rounded h-12 border-t-dark-blue justify-between items-center bg-t-orange text-xl text-t-dark-blue px-6">
        {!bet && (<div>
          Bet Slip
        </div>)}
        {bet?.bet_type === "SPREAD" && (
          <div>
            {bet.team_name}({formatOdds(bet.point)}) vs. {bet.other_team}
          </div>
        )}
        {bet?.bet_type === "ML" && (
          <div>
            {bet.team_name}({formatOdds(bet.price)}) vs. {bet.other_team}
          </div>
        )}
        {bet?.bet_type === "OVER" && (
          <div>
            {bet.team_name} vs. {bet.other_team} o{bet.point}
          </div>
        )}
        {bet?.bet_type === "UNDER" && (
          <div>
            {bet.team_name} vs. {bet.other_team} u{bet.point}
          </div>
        )}
        <LeagueSelector/>
      </div>)}</>)
}