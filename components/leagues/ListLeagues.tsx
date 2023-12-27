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
        <div className="w-screen flex items-center grid grid-cols-3 space-x-8 space-y-8 my-4">
            {leagues.map((league) => (
                  <LeagueBox key={league.id} league={league}/>
            ))}
        </div>
    )
}

type leagueBoxProps = {
    league : League,
}

const LeagueBox: React.FC<leagueBoxProps> = ({league}) => {
  const url = "/protected/league/" + league.id;
  return (
          <a
          href={url}
          className="border p-3 rounded-md m-10 ">
            <div>
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
          </a>
    );
}