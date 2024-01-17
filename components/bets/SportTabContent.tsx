'use client';
import { getSportNames, mapJsonToBetObjects } from "@/lib/betService";
import { Bet_Object } from "@/lib/betTypes";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SportTabProps {
    sport : string
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
                  const temp_bets : Bet_Object[] = mapJsonToBetObjects(data);
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

    const keys = getSportNames(sport);

    useEffect(() => {
        fetchBets();
        //console.log(bets);
    }, [sport]);

    return (
        <>
            <div className='text-t-dark-blue p-5 rounded-md bg-t-orange'>
                {(bets.length > 0) && bets.map((bet) => (
                    <div key={bet.id}>
                        {bet.homeTeam} vs. {bet.awayTeam}
                    </div>
                ))}
                {(bets.length == 0) && (
                    <div>
                        Come back later!
                        </div>
                )}
            </div>
        </>
    )
}