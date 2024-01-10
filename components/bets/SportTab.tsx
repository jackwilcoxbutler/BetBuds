import { getSportNames } from "@/lib/betService";
import React from "react";

interface SportTabProps {
    sport_key: string
}

export const SportTabContent: React.FC<SportTabProps> = ({ sport_key }: SportTabProps) => {

    const keys = getSportNames(sport_key);

    return (
        <>
            <div className='text-t-dark-blue p-5 rounded-md bg-t-orange'>
                {keys.map((sport_key) => (
                    <div key={sport_key}>
                        {sport_key}
                    </div>
                ))}
            </div>
        </>
    )
}