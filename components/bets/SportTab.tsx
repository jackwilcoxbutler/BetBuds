import { getSportNames } from "@/lib/betService"
import Link from "next/link"
import prisma from "@/lib/prisma"

interface tab {
    sportTitle : string,
    sportKey : string,
}

export const SportTab: React.FC = async () => {

    const tabNames = await prisma.event.findMany({
        where: {
            startDate: {
                gt: new Date(), // Filter for events with a startDate greater than the current date
            },
        },
        select: {
            sportTitle: true,
            sportKey:true, // Select only the sportTitle field
        },
        distinct: ['sportTitle'], // Ensure each sportTitle is unique
    }) as tab[];

    return (
        <div className="flex flex-row w-full">
            {tabNames.map((tab) => {
            const url = "/protected/home/" + tab.sportKey
            return(
            <div key={tab.sportTitle}
            className='flex  text-t-white w-full justify-center rounded-lg bg-t-light-blue border-4 border-t-white hover:border-t-dark-blue   px-5 mt-4 mx-2 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black '>
                <Link
                    className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"
                    href={url}
                >
                    {tab.sportTitle}
                </Link>
            </div>
            )})}
            {/* <div
                className='flex  text-mauve11 w-full justify-center rounded-lg bg-t-white hover:text-t-dark-blue hover:bg-t-grey border border-t-dark-blue px-5 mt-4 mx-2 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black '>
                <Link
                    className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"
                    href="/protected/home/americanfootball_nfl"
                >
                    Football
                </Link>
            </div>
            <div
                className='flex  text-mauve11 w-full justify-center rounded-lg bg-t-white hover:text-t-dark-blue hover:bg-t-grey border border-t-dark-blue px-5 mt-4 mx-2 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black '>
                <Link
                    className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"
                    href="/protected/home/basketball_nba"
                >
                    Basketball
                </Link>
            </div><div
                className='flex  text-mauve11 w-full justify-center rounded-lg bg-t-white hover:text-t-dark-blue hover:bg-t-grey border border-t-dark-blue px-5 mt-4 mx-2 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black '>
                <Link
                    className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"
                    href="/protected/home/baseball_mlb"
                >
                    Baseball
                </Link>
            </div><div
                className='flex  text-mauve11 w-full justify-center rounded-lg bg-t-white hover:text-t-dark-blue hover:bg-t-grey border border-t-dark-blue px-5 mt-4 mx-2 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black '>
                <Link
                    className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"
                    href="/protected/home/soccer_epl"
                >
                    Soccer
                </Link>
            </div>
            <div
                className='flex  text-mauve11 w-full justify-center rounded-lg bg-t-white hover:text-t-dark-blue hover:bg-t-grey border border-t-dark-blue px-5 mt-4 mx-2 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black '>
                <Link
                    className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"
                    href="/protected/home/icehockey_nhl"
                >
                    Hockey
                </Link>
            </div> */}

        </div>
    )
}