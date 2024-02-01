import BetProvider from "@/app/context/bet-provider"
import { BetSlip } from "@/components/bets/BetSlip"
import { SportTab } from "@/components/bets/SportTab"
import { ListLeagues } from "@/components/leagues/ListLeagues"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <div className="flex flex-row w-full justify-end space-x-4 mx-32">
  <div className="flex flex-col w-full">
    <BetProvider>
      <div className="sticky top-[96px] -z-0">
      <SportTab/>
      </div>
      <div className="pb-20 pt-4">{children}</div>
    <div className="sticky bottom-24 -z-0 px-12 pt-4">
      <BetSlip/>
    </div>
    </BetProvider>
  </div>
  <div className="flex flex-col w-1/3 justify-start pl-4 ">
    <ListLeagues />
  </div>
</div>
)
}