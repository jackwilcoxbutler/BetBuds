import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import prisma from '@/lib/prisma';

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

export const ListLeagues: React.FC = async () => {
  let user_id : string;
  const session = await getServerSession(authOptions);
  let leagues : League[]
      
  if(session?.user?.id){
    user_id = session?.user?.id;
    
    leagues = await prisma.league.findMany({
        select: {
          id: true,
          league_name: true,
          users: {
            select: {
              id: true,
              username: true,
              email: true,
              password: false,
              leagues: false,
              receivedInvites: false,
              sentInvites: false,
            },
          },
        },where : {
          users : {
            some: {
              id: user_id,
            }
          }
        }
      });
    }else{
      leagues = [];
    }

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
  let iter : number = 0;
  let units : number = 6.5;
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
                {league.users.map((user) => {
                  iter++;
                  units--;
                  return (
                    <li 
                    key={user.id}
                    className="text-sm">
                      {iter}. {user.username}   +{units}u
                    </li>
                )})}
                </ul>
            </div>
          </a>
    );
}