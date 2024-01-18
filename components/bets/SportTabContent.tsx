'use client';
import { BetContext } from "@/app/context/bet-provider";
import { getSportNames, mapJsonToBetObjects } from "@/lib/betService";
import { Bet_Object } from "@/lib/betTypes";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SportTabProps {
    sport: string,
    //setLoading: () => {}
}

export const SportTabContent: React.FC<SportTabProps> = ({ sport }: SportTabProps) => {
    const [bets, setBets] = useState<Bet_Object[]>([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(BetContext);


    async function fetchBets() {
        //setLoading(true); // Assuming you have a setLoading function to handle UI loading state
        try {
            fetch('/api/bets/getBySport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    sport_key: keys[0],
                },)
            }).then(async (res) => {
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

    const keys = getSportNames(sport);

    useEffect(() => {
        setLoading(true);
        fetchBets();
        //console.log(bets);
    }, [sport]);

    return (
        <>
            {loading && (<div></div>)}
            {!loading && (<div className='flex flex-col w-full text-t-dark-blue rounded-md bg-t'>
                {(bets.length > 0) && bets.map((bet) => (
                    <div key={bet.id} className="flex border-b border-t-grey ml-3 mr-1 border-spacing-2 p-4">
                        <div
                            className="flex w-full flex-col ml-4 space-y-5 text-xl">
                            <div className="flex flex-row justify-between items-center">
                                <div>{bet.homeTeam}</div>
                                {/* Button bar */}
                                <div className="flex flex-row space-x-5" >
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white
                                        transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                                        onClick={() => {
                                            context?.setBet({
                                                event_id: bet.id,
                                                team_name: bet.homeTeam,
                                                bet_type: "ML",
                                                price: bet.homeML ?? 0,
                                                start_date: bet.startDate,
                                                other_team: bet.awayTeam
                                            })
                                        }}
                                    >
                                        {formatOdds(bet.homeML)}
                                    </button>
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white
transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"                                        onClick={() => {
                                            context?.setBet({
                                                event_id: bet.id,

                                                team_name: bet.homeTeam,
                                                other_team: bet.awayTeam,
                                                bet_type: "SPREAD",
                                                point: bet.homeSpreadPoint ?? 0,
                                                price: bet.homeSpreadPrice ?? 0,
                                                start_date: bet.startDate,
                                            })
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <div className="text-xl">{formatOdds(bet.homeSpreadPoint)}</div>
                                            <div className="text-md">{formatOdds(bet.homeSpreadPrice)}</div>
                                        </div>
                                    </button>
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white
transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"                                        onClick={() => {
                                            context?.setBet({
                                                event_id: bet.id,
                                                bet_type: "OVER",
                                                point: bet.totalPoint ?? 0,
                                                price: bet.overPrice ?? 0,
                                                start_date: bet.startDate,
                                            })
                                        }}
                                    >

                                        <div className="flex flex-col">
                                            <div className="text-xl">o{bet.totalPoint}</div>
                                            <div className="text-md">{formatOdds(bet.overPrice)}</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="flex  w-18 content-center flex-row justify-between items-center">
                                <div>{bet.awayTeam}</div>
                                {/* Button bar */}
                                <div className="flex flex-row space-x-5">
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white
transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"                                        onClick={() => {
                                            context?.setBet({
                                                event_id: bet.id,
                                                team_name: bet.awayTeam,
                                                other_team: bet.homeTeam,
                                                bet_type: "ML",
                                                price: bet.awayML ?? 0,
                                                start_date: bet.startDate,
                                            })
                                        }}
                                    >
                                        {formatOdds(bet.awayML)}
                                    </button>
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white
transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"                                        onClick={() => {
                                            context?.setBet({
                                                event_id: bet.id,
                                                team_name: bet.awayTeam,
                                                other_team: bet.homeTeam,
                                                bet_type: "SPREAD",
                                                point: bet.awaySpreadPoint ?? 0,
                                                price: bet.awaySpreadPrice ?? 0,
                                                start_date: bet.startDate,
                                            })
                                        }}
                                    >

                                        <div className="flex flex-col">
                                            <div className="text-xl">{formatOdds(bet.awaySpreadPoint)}</div>
                                            <div className="text-md">{formatOdds(bet.awaySpreadPrice)}</div>
                                        </div>
                                    </button>
                                    <button
                                        className="border w-18 content-center rounded-md bg-t-grey px-3 py-1 hover:bg-t-dark-blue hover:text-t-white
transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"                                        onClick={() => {
                                            context?.setBet({
                                                event_id: bet.id,
                                                bet_type: "UNDER",
                                                point: bet.totalPoint ?? 0,
                                                price: bet.underPrice ?? 0,
                                                start_date: bet.startDate,
                                            })
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <div className="text-xl">u{bet.totalPoint}</div>
                                            <div className="text-md">{formatOdds(bet.underPrice)}</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
                {(bets.length == 0) && (
                    <div className="flex w-full h-full justify-center pt-11">
                        <div className="w-[400px] h-[400px] rounded bg-t-grey">
                            <div className="flex h-full justify-center items-center text-2xl">
                                No bets for {sport} today!
                            </div>
                        </div>
                    </div>
                )}
            </div>)}
        </>
    )
}