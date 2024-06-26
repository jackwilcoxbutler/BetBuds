'use client';
import {Bet_Object } from "@/lib/betTypes";
import BetButtonGrid from "./BetButton";

interface BetCardProps {
    bet: Bet_Object
    
}

export default function BetCard({bet} : BetCardProps) {
    return (
        <div key={bet.id} className="flex border-b sm:ml-3 mr-1 border-spacing-2 p-4">
                        <div
                            className="flex w-full flex-col ml-1 text-sm md:text-md">
                            <text className="">{`${bet.startDate.toLocaleTimeString()}, ${bet.startDate.toLocaleDateString()}`}</text>
                            {/*need to pass utc string into client component and let client convert */}
                            <div className="flex sm:w-18 flex-row justify-between items-center sm:ml-4 text-base sm:text-lg md:text-xl">
                                <div>{bet.awayTeam}</div>
                                {/* Button bar */}
                                <BetButtonGrid bet={bet} is_home={false} />
                            </div>
                            <div className="flex flex-row items-center">
                                <div className="h-[1px] bg-t-dark-blue w-1/12 "></div>
                                <div className="text-2xl mx-4">@</div>
                                <div className="h-[1px] bg-t-dark-blue w-2/5"></div>
                            </div>
                            <div className="flex sm;w-18 flex-row justify-between items-center sm:ml-4 text-base sm:text-lg md:text-xl">
                                <div>{bet.homeTeam}</div>
                                {/* Button bar */}
                                <BetButtonGrid bet={bet} is_home={true} />
                            </div>
                        </div>
                    </div>
    )
}
