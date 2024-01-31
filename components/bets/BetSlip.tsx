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

  function clearBet(){
    setBet(null);
  }




  return (
    <>{bet && (
      <div className="flex flex-row w-full border-2 rounded-md h-14 border-t-white justify-between items-center bg-t-light-blue text-lg xl:text-xl font-semibold text-t-white p-3">
        <div
          className="flex flex-row justify-center space-x-8">
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
          <button type="button" className="text-white bg-t-dark-blue hover:outline hover:outline-2 hover:outline-t-white rounded-full text-sm text-center inline-flex items-center me-2 px-1"
          onClick={clearBet}>
            <svg className="h-[16px] w-[16px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red">
              <line x1="4" y1="4" x2="20" y2="20" stroke="orange" stroke-width="2" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="orange" stroke-width="2" />
            </svg>
          </button>
        </div>
        <LeagueSelector clearBet={clearBet}/>
      </div>)}</>)
}