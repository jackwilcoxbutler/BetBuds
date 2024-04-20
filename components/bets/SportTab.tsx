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
        <div className="flex flex-row sm:w-full">
            {tabNames.map((tab) => {
            const url = "/protected/home/" + tab.sportKey
            return(
            <div key={tab.sportTitle}
            className='btn-primary flex w-full justify-center px-2 sm:px-5 mx-2 '>
                <Link
                    className="text-xs sm:text-lg sm:px-5 h-[36px] sm:h-[45px] sm:flex-1 flex items-center justify-center cursor-pointer leading-none select-none"
                    href={url}
                >
                    {tab.sportTitle}
                </Link>
            </div>
            )})}
        </div>
    )
}