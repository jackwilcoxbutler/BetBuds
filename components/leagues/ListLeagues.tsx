'use client';

import { useEffect, useState } from "react";

//import { League,User } from "@prisma/client";

interface User{
    id : string,
    username : string,
    email : string,
}

interface League {
    id : string,
    league_name : string,
    users : User[]
}

export const ListLeagues: React.FC = () => {
    const findLeagues = async () => {
        setLoading(true);
        const response = await fetch('/api/league', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }});
        const leagues = await response.json();
        console.log(leagues);
        const leagueObjects = leagues.map((league : League) => ({
            id: league.id,
            league_name: league.league_name,
            users: league.users,
        }));
        console.log(leagueObjects);

        return leagueObjects;
    }

    const [leagues, setLeagues] = useState<League[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        findLeagues().then((leagues) => setLeagues(leagues));
      }, []);


    return(
        <div className="flex flex-col space-y-4 rounded my-4">
            {leagues.map((league) => (
                <LeagueBox key={league.id} league={league} />
            ))}
        </div>
    )
}

type leagueBoxProps = {
    league : League,
}

const LeagueBox: React.FC<leagueBoxProps> = ({league}) => {
    return (
            <div className="border p-3 rounded ">
              <h1
              className="bold text-xl">
                {league.league_name}
              </h1>
              <ul>
                {league.users.map((user) => (
                  <li 
                  key={user.id}
                  className="text-sm">
                    {user.username}
                  </li>
                ))}
                </ul>
            </div>
    );
}