import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from '@/lib/prisma';


interface User {
  id: string,
  username: string,
  email: string,
  totalResult?: number
  user_bets: UserBet[]
}

interface UserBet {
  result: number
}

interface League {
  id: string,
  league_name: string,
  users: User[]
}

function getUnitsOutput(score: number) {
  if (score === 0) {
    return "0u"
  } else if (score > 0) {
    return " +" + score + "u"
  } else {
    return score + "u"
  }
}

export const ListLeagues: React.FC = async () => {
  let user_id: string;
  const session = await getServerSession(authOptions);
  let leagues: League[]

  if (session?.user?.id) {
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
            user_bets: {
              select: {
                result: true,
              },
            }
          },
        },
      }, where: {
        users: {
          some: {
            id: user_id,
          }
        }
      }
    });

    leagues = leagues.map(league => ({
      ...league,
      users: league.users.map(user => ({
        ...user,
        totalResult: user.user_bets.reduce((sum, bet) => sum + bet.result, 0)
      }))
    }));
  } else {
    leagues = [];
  }

  return (<div className="px-4">
    <div
      className='sticky  left-0 right-0 top-[96px] flex  text-t-white w-full justify-center rounded-lg bg-t-light-blue cursor-pointer hover:bg-t-dark-blue border-2 border-t-dark-blue data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black '>
      <span
        className="px-5 h-[45px] flex-1 flex items-center justify-center text-[15px]">
        Leagues
      </span>
    </div>
    <div className="pb-20 pt-4">
      {leagues.length > 0 && (<div className="w-full justify-center grid grid-cols-1 justify-items-center">
        {leagues.map((league) => (
          <LeagueBox key={league.id} league={league} />
        ))}
      </div>)}
    </div>
    {leagues.length == 0 && (
      <div className="py-12 flex flex-col mx-4">
        <button className="flex justify-center items-center text-center w-full hover:bg-t-dark-blue bg-t-light-blue text-t-white border-2 rounded-md border-t-dark-blue text-xl">
          You have no leagues, create one now!
        </button>
      </div>
    )
    }
  </div>
  )
}

type leagueBoxProps = {
  league: League,
}

const LeagueBox: React.FC<leagueBoxProps> = ({ league }) => {
  const url = "/protected/league/" + league.id;
  let iter: number = 0;
  return (
    <a
      href={url}
      className="w-full border-2 rounded-tr-lg border-t-dark-blue p-1 lg:p-2 m-3 bg-t-light-blue hover:bg-t-dark-blue">
      <div>
        <h1
          className="bold text-lg md:text-xl  text-t-white pb-2">
          {league.league_name}
        </h1>
        <ul
        className="flex flex-row w-full ">
          {league.users.map((user) => {
            var color = " text-t-white "
            if (user.totalResult) {
              if (user.totalResult > 0) {
                color = " text-green10"
              } else if (user.totalResult < 0) {
                color = " text-red10 "
              }
            }
            console.log(user.totalResult)
            iter++;
            if (iter < 6) {
              return (
                <li
                  key={user.id}
                  className={`text-xs lg:text-sm text-t-white`}>
                  <div className="space-x-2 md:space-x-4">
                    <span className="basis-2/5">{iter}. {user.username}</span>
                    <span className={`${color}`}>{getUnitsOutput(user.totalResult ?? 0)}</span>
                  </div>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </a>
  );
}