'use client'

import { Bet_Choice } from "@/lib/betTypes";
import { PropsWithChildren, createContext, useState } from "react";

interface BetContextType {
    bet: Bet_Choice | null;
    setBet: React.Dispatch<React.SetStateAction<Bet_Choice | null>>;
}
export const BetContext = createContext<BetContextType | null>(null);


export default function BetProvider ({
  children,
}:PropsWithChildren): React.ReactNode {
    const [bet, setBet] = useState<Bet_Choice | null>(null);

  return <BetContext.Provider value={{bet,setBet}}>
    {children}
  </BetContext.Provider>
}