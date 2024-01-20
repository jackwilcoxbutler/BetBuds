'use client';
import { BetContext } from "@/app/context/bet-provider";
import { Bet_Choice } from "@/lib/betTypes"
import { useContext, useEffect, useState } from "react";

export const BetSlip: React.FC = () => {

    const context = useContext(BetContext);
    const [bet,setBet] = useState<Bet_Choice | null>();

    useEffect(() => {
        if (context?.bet) {
          setBet(context.bet);
        } else {
          setBet(null);
        }
    
        // Cleanup
        
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
        <div className="flex w-full border rounded h-8 justify-center items-center">
                {!bet && (<div>
                    Select a bet
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
        </div>
    )
}