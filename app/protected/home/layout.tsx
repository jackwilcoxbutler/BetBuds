import BetProvider from "@/app/context/bet-provider"
import { BetSlip } from "@/components/bets/BetSlip"
import { SportTab } from "@/components/bets/SportTab"
import OpenLeagueFormButton from "@/components/leagues/CreateLeagueButton"
import { ListLeagues } from "@/components/leagues/ListLeagues"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row w-full justify-end space-x-4 mx-32 pb-20 ">
      <BetProvider>
        <div className="flex flex-col w-full justify-center">
          <SportTab />
          {children}
        </div>
        <aside>
          <div className="flex flex-col">
            <ListLeagues />
            <OpenLeagueFormButton />
          </div>
        </aside>
        <div className="fixed bottom-24 w-2/3 -z-0 px-12 pt-4">
          <BetSlip />
        </div>
      </BetProvider>
    </div>
  )
}