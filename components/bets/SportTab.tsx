import Link from "next/link"

export const SportTab: React.FC = () => {
    return (
        <div className="flex flex-row w-full">
            <div
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
                <button
                    className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"

                >
                    Football
                </button>
            </div><div
                className='flex  text-mauve11 w-full justify-center rounded-lg bg-t-white hover:text-t-dark-blue hover:bg-t-grey border border-t-dark-blue px-5 mt-4 mx-2 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black '>
                <button
                    className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"

                >
                    Football
                </button>
            </div>

        </div>
    )
}