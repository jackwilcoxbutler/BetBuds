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
  result: number,
  leagueID : string
}

interface League {
  id: string,
  league_name: string,
  users: User[]
}

function getUnitsOutput(score: number) {
  return score === 0 ? "0u" : score > 0 ? ` +${score}u` : `${score}u`;
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
                leagueID:true
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
      users: league.users.map(user => {
        const userBetsForThisLeague = user.user_bets.filter(bet => bet.leagueID === league.id);
        const totalResult = userBetsForThisLeague.reduce((sum, bet) => sum + bet.result, 0);
        return {
          ...user,
          totalResult  // Assign computed totalResult specific to this league
        };
      })
    }));
  } else {
    leagues = [];
  }

  return (<div className="px-4">
    <div
      className='bg-t-light-blue text-t-white rounded-lg border-2 border-t-dark-blue text-sm md:text-lg sticky  left-0 right-0 top-[96px] flex  w-full justify-center '>
      <span
        className="px-5 h-[45px] flex-1 flex items-center justify-center">
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
  league.users.sort((a, b) => {
    // Assuming totalResult is always available; otherwise, consider fallbacks or checks
    const bNum = b.totalResult !== null && b.totalResult !== undefined ? b.totalResult : 0
    const aNum = a.totalResult !== null && a.totalResult !== undefined ? a.totalResult : 0
    return bNum - aNum;
  });
  return (
    <a
      href={url}
      className="w-full border-2 rounded-tr-lg border-t-dark-blue p-1 lg:p-2 m-3 bg-t-light-grey hover:bg-t-grey text-t-dark-blue">
      <div>
        <h1
          className="bold text-lg md:text-2xl font-bold  pb-2">
          {league.league_name}
        </h1>
        <ul
        className="flex flex-col w-full ">
          {league.users.map((user) => {
            var color = " text-t-dark-blue "
            if (user.totalResult) {
              if (user.totalResult > 0) {
                color = "text-green11"
              } else if (user.totalResult < 0) {
                color = " text-red10 "
              }
            }
            iter++;
            if (iter < 6) {
              return (
                <li
                  key={user.id}
                  className={` text-t-dark-blue`}>
                  <div className="space-x-2 md:space-x-4 align-middle">
                    <span className="basis-2/5 text-xs lg:text-sm">{iter}. {user.username}</span>
                    <span className={`${color} text-md`}>{getUnitsOutput(user.totalResult ?? 0)}</span>
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