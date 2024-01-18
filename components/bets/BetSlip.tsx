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
    


    return (
        <div className="flex w-full border rounded h-8 justify-center items-center">
                {bet && (<div>
                    {bet.team_name} vs. {bet.other_team}, {bet.start_date.toLocaleDateString()}
                </div>)}
        </div>
    )
}