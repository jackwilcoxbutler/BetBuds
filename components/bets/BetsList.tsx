'use client'
import { Bet_Choice, Bet_Object } from '@/lib/betTypes';
import {  useState } from 'react';
import BetButtonGrid from './BetButton';


interface BetsListProp{
    bets : Bet_Object[]
}

export const BetsList: React.FC<BetsListProp> = ({bets}) => {

    const [bet, setBet] = useState<Bet_Choice | null>(null);

    return (
        <>
            <div className='flex flex-col w-full text-t-dark-blue rounded-md bg-t'>
                {(bets.length > 0) && bets.map((bet) => (
                    <div key={bet.id} className="flex border-b border-t-grey ml-3 mr-1 border-spacing-2 p-4">
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
                            {/* <BetSlip bet={bet}/> */}
                        </div>
                    </div>
                ))}
                {(bets.length == 0) && (
                    <div className="flex w-full h-full justify-center pt-11">
                        <div className="w-[400px] h-[400px] rounded bg-t-grey">
                            <div className="flex h-full justify-center items-center text-2xl">
                                No bets for today!
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}