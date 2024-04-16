import BetButtonGrid from "@/components/bets/BetButton";
import BetCard from "@/components/bets/BetCard";
import { Bet_Object } from "@/lib/betTypes";
import { formatPrismaDateToLocale, getNowInUTC } from "@/lib/dateHelpers";
import prisma from "@/lib/prisma";
import { format } from 'date-fns';


export default async function Page({
    params,
}: {
    params: { id: string }
}) {
    //function to return two dates that are 
    //map sport title
    const now = new Date();
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
            <div className='flex flex-col w-full text-t-dark-blue rounded-md pt-2 bg-t-grey border-2 border-grey-400 mt-4'>
                {(bets.length > 0) && bets.map((bet) => (
                    <BetCard bet={bet} key={bet.id}/>
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