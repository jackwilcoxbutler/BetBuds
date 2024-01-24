import BetProvider from "@/app/context/bet-provider";
import BetButtonGrid from "@/components/bets/BetButton";
import { Bet_Object } from "@/lib/betTypes";
import prisma from "@/lib/prisma";

export default async function Page({
    params,
}: {
    params: { id: string }
}) {
    //map sport title
    const bets = await prisma.event.findMany({
        where: {
            sportKey: params.id,
            startDate: {
                gte: new Date(),
            },
        },
    }) as Bet_Object[];

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
        <>
            <div className='flex flex-col w-full text-t-dark-blue rounded-md pt-2 bg-t-grey mt-4 '>
                {(bets.length > 0) && bets.map((bet) => (
                    <div key={bet.id} className="flex border-b border-t-light-blue ml-3 mr-1 border-spacing-2 p-4">
                    
                        <div
                            className="flex w-full flex-col ml-4 space-y-5 text-xl">
                            <div className="flex flex-row justify-between items-center">
                                <div>{bet.homeTeam}</div>
                                {/* Button bar */}
                                <BetButtonGrid bet={bet} is_home={true}/>
                            </div>
                            <div className="flex  w-18 content-center flex-row justify-between items-center">
                                <div>{bet.awayTeam}</div>
                                {/* Button bar */}
                                <BetButtonGrid bet={bet} is_home={false}/>
                            </div>

                        </div>
                    </div>
                ))}
                {(bets.length == 0) && (
                    <div className="flex w-full justify-center pt-11">
                        <div className="w-[400px] rounded-lg bg-t-grey p-4">
                            <div className="flex justify-center items-center text-2xl">
                                No bets for {params.id} today!
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}