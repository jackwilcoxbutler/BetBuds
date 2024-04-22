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
    <div className="flex flex-row w-full justify-end space-x-4 mx-4 sm:mx-16 xl:mx-32 relative">
      {/* <div className="w-1/4 bg-t-grey">
        ad space
      </div> */}
      <div className="flex flex-col w-full ml-2 md:ml-8">
        <BetProvider>
          <div className="relative">
            <div>
            <div className="sticky  left-0 right-0 top-[96px] -z-0 mt-2">
              <SportTab />
            </div>
            </div>
            <div className="pb-20 pt-4">
              {children}
            </div>
          </div>
          <div className="sticky bottom-24 -z-0 sm:px-12 sm:pt-4">
            <BetSlip />
          </div>
        </BetProvider>
      </div>
      <div className="hidden sm:block sm:w-1/3">
      <div className="flex flex-col  justify-start pl-2 border-l-2 border-dotted">
        <ListLeagues isMobile={false}/>
      </div>
      </div>
    </div>
  )
}