import BetProvider, { BetContext } from "@/app/context/bet-provider";
import { BetSlip } from "@/components/bets/BetSlip";
import { SportTab } from "@/components/bets/SportTab"
import DefaultHeader from "@/components/header"
import OpenLeagueFormButton from "@/components/leagues/CreateLeagueButton"
import { ListLeagues } from "@/components/leagues/ListLeagues"
import { Bet_Choice } from "@/lib/betTypes";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen w-screen bg-t-white">
          <DefaultHeader />
          <div className="w-full flex justify-center">
            <div className="flex flex-row w-full justify-end space-x-4 mx-32">
              <div className="flex flex-col w-full">
                <BetProvider>
                  <SportTab />
                {children}
                <BetSlip/>
                </BetProvider>
              </div>
              <div className="flex flex-col w-1/3 h-screen justify-start pl-4 border-l-4 border-dotted">
                <ListLeagues />
                <OpenLeagueFormButton />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
