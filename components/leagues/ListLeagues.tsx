import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from '@/lib/prisma';
import { CreateLeagueButton } from "./CreateLeagueButton";


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

    return(<>
        <span className="sticky top-[96px] w-full text-center text-xl font-semibold bg-t-light-blue text-t-white border-2 border-t-dark-blue rounded-md ">
          Leagues
        </span>
        {leagues.length > 0 && (<div className="w-full justify-center grid grid-cols-1 justify-items-center">
            {leagues.map((league) => (
                  <LeagueBox key={league.id} league={league}/>
            ))}
        </div>)}{leagues.length == 0 && (
          <div className="py-12 flex flex-col mx-4">
          <button className="flex justify-center items-center text-center w-full hover:bg-t-dark-blue bg-t-light-blue text-t-white border-2 rounded-md border-t-dark-blue text-xl">
            You have no leagues, create one now!
          </button>
          </div>
        )
        }
        </>
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
          className="w-full border-2 rounded-tr-lg border-t-dark-blue p-3 m-3 bg-t-light-blue hover:bg-t-dark-blue">
            <div>
              <h1
              className="bold text-3xl text-t-white pb-2">
                {league.league_name}
              </h1>
              <ul>
                {league.users.map((user) => {
                  iter++;
                  units--;
                  return (
                    <li 
                    key={user.id}
                    className="text-sm text-t-white">
                      {iter}. {user.username}   +{units}u
                    </li>
                )})}
                </ul>
            </div>
          </a>
    );
}