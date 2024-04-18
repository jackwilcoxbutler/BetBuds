'use client';
import { BetContext } from "@/app/context/bet-provider";
import { Bet_Choice } from "@/lib/betTypes"
import { useContext, useEffect, useState } from "react";
import LeagueSelector from "./LeagueSelect";
import ToolTip from "../ui/tooltipNew";

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

  function clearBet() {
    setBet(null);
  }




  return (
    <>{bet && (
      <div className="relative">
        <div className="text-t-white absolute -top-8 left-4 bg-t-light-blue border-t-2 border-l-2 border-r-2 border-t-dark-blue border-l-t-dark-blue border-r-t-dark-blue py-1 px-3 rounded-t-lg">
          <span className="text-sm font-medium text-blue-500">Bet Slip</span>
        </div>
        <div className="flex flex-row w-full border-2 rounded-md h-14 border-t-dark-blue justify-between items-center bg-t-light-blue text-lg lg:text-xl font-semibold text-t-white p-3">
          <div
            className="flex flex-row justify-center space-x-8 items-center">
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
            {/* <text className="text-sm">
              {bet.start_date.getMonth() + 1}/{bet.start_date.getDate()}
            </text> */}
              <button type="button" className="text-t-white bg-t-dark-blue hover:outline hover:outline-2 hover:outline-t-white rounded-full text-sm text-center inline-flex items-center me-2 p-2"
              onClick={clearBet}>
              <svg className="h-[16px] w-[16px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red">
                <line x1="4" y1="4" x2="20" y2="20" stroke="white" stroke-width="2" />
                <line x1="20" y1="4" x2="4" y2="20" stroke="white" stroke-width="2" />
              </svg>
            </button>
            
      
          </div>
          <LeagueSelector clearBet={clearBet} />
        </div>
      </div>
      )}</>)
}