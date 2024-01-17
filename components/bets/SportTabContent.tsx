'use client';
import { getSportNames, mapJsonToBetObjects } from "@/lib/betService";
import { Bet_Object } from "@/lib/betTypes";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SportTabProps {
    sport: string
}

export const SportTabContent: React.FC<SportTabProps> = ({ sport }: SportTabProps) => {
    const [bets, setBets] = useState<Bet_Object[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchBets() {
        setLoading(true); // Assuming you have a setLoading function to handle UI loading state
        try {
            fetch('/api/bets/getBySport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    sport_key: keys[0],
                },)
            }).then(async (res) => {
                setLoading(false);
                if (res.status === 200) {
                    const data = await res.json();
                    const temp_bets: Bet_Object[] = mapJsonToBetObjects(data);
                    setBets(temp_bets);
                } else {
                    const { error } = await res.json();
                    toast.error(error);
                }
            });
        } catch (error) {
            console.error('Error fetching invites:', error);
            setBets([]);
        } finally {
            setLoading(false);
        }
    }

    const formatOdds = (a : number | null | undefined): string => {
        if(a){
            if(a > 0){
            return ("+" +a.toString()) 
        }else{
            return a.toString()
        }}else{
            return "-"
        }
    }

    const keys = getSportNames(sport);

    useEffect(() => {
        fetchBets();
        //console.log(bets);
    }, [sport]);

    return (
        <>
            <div className='flex flex-col w-full text-t-dark-blue rounded-md'>
                {(bets.length > 0) && bets.map((bet) => (
                    <div key={bet.id} className="flex border-b border-t-grey ml-3 mr-1 border-spacing-2 p-4">
                        <div
                            className="flex w-full flex-col ml-4 space-y-5 text-xl">
                            <div className="flex flex-row justify-between items-center">
                                <div>{bet.homeTeam}</div>
                                {/* Button bar */}
                                <div className="flex flex-row space-x-5" >
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white"
                                    >
                                        {formatOdds(bet.homeML)}
                                    </button>
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white"
                                    >
                                        <div className="flex flex-col">
                                            <text className="text-xl">{formatOdds(bet.homeSpreadPoint)}</text>
                                            <text className="text-md">{formatOdds(bet.homeSpreadPrice)}</text>
                                        </div>
                                    </button>
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey  px-3 py-1 hover:bg-t-dark-blue hover:text-t-white"
                                    >
                                       
                                        <div className="flex flex-col">
                                            <text className="text-xl">o{bet.totalPoint}</text>
                                            <text className="text-md">{formatOdds(bet.overPrice)}</text>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="flex  w-18 content-center flex-row justify-between items-center">
                                <div>{bet.awayTeam}</div>
                                {/* Button bar */}
                                <div className="flex flex-row space-x-5">
                                    <button
                                        className="border content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white"
                                    >
                                        {formatOdds(bet.awayML)}
                                    </button>
                                    <button
                                        className="border w-18 content-center  rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white"
                                    >
                                        
                                        <div className="flex flex-col">
                                            <text className="text-xl">{formatOdds(bet.awaySpreadPoint)}</text>
                                            <text className="text-md">{formatOdds(bet.awaySpreadPrice)}</text>
                                        </div>
                                    </button>
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white"
                                    >
                                        <div className="flex flex-col">
                                            <text className="text-xl">u{bet.totalPoint}</text>
                                            <text className="text-md">{formatOdds(bet.underPrice)}</text>
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
                {(bets.length == 0) && (
                    <div>
                        No bets for {sport}, come back another time!
                    </div>
                )}
            </div>
        </>
    )
}