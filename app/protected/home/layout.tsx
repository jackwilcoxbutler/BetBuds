import BetProvider from "@/app/context/bet-provider";
import { BetSlip } from "@/components/bets/BetSlip";
import { SportTab } from "@/components/bets/SportTab"
import DefaultHeader from "@/components/header"
import OpenLeagueFormButton from "@/components/leagues/CreateLeagueButton"
import { ListLeagues } from "@/components/leagues/ListLeagues"


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
          <div className="h-full w-full flex justify-center">
            <div className="flex flex-row w-full justify-end space-x-4 mx-40">
              <div className="flex flex-col w-full">
                <BetProvider>
                  <div className="sticky top-16 -z-0">
                  <SportTab/>
                  </div>
                {children}
                <div className="sticky bottom-12 -z-0 px-12 pt-4">
                  <BetSlip/>
                </div>
                </BetProvider>
              </div>
              <div className="flex flex-col w-1/3 justify-start pl-4 ">
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
