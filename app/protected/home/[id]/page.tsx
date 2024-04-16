import BetButtonGrid from "@/components/bets/BetButton";
import { Bet_Object } from "@/lib/betTypes";
import { formatPrismaDateToLocale, getNowInUTC } from "@/lib/dateHelpers";
import prisma from "@/lib/prisma";


export default async function Page({
    params,
}: {
    params: { id: string }
}) {
    //function to return two dates that are 
    //map sport title
    const now = getNowInUTC();
    const bets = await prisma.event.findMany({
        where: {
            sportKey: params.id,
            startDate: {
                gte: now,
            },
        },
    }) as Bet_Object[];


    return (
        <>
         <div>
            {now}
        </div>
            <div className='flex flex-col w-full text-t-dark-blue rounded-md pt-2 bg-t-grey border-2 border-grey-400 mt-4'>
                {(bets.length > 0) && bets.map((bet) => (
                    <div key={bet.id} className="flex border-b border-t-light- ml-3 mr-1 border-spacing-2 p-4">
                        <div
                            className="flex w-full flex-col ml-1 text-md">
                            {formatPrismaDateToLocale(bet.startDate.toISOString())}
                            <div className="flex w-18 flex-row justify-between items-center ml-4 text-xl">
                                <div>{bet.awayTeam}</div>
                                {/* Button bar */}
                                <BetButtonGrid bet={bet} is_home={false} />
                            </div>
                            <div className="flex flex-row items-center">
                                <div className="h-[1px] bg-t-dark-blue w-1/12 "></div>
                                <div className="text-2xl mx-4">@</div>
                                <div className="h-[1px] bg-t-dark-blue w-2/5"></div>
                            </div>
                            <div className="flex  w-18 content-center flex-row justify-between items-center ml-4 text-xl">
                                <div>{bet.homeTeam}</div>
                                {/* Button bar */}
                                <BetButtonGrid bet={bet} is_home={true} />
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