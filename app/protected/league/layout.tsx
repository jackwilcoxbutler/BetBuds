import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import LeagueTable from "./LeagueTable";
import { leagueTabs } from "./LeagueDropDown";
import { LeagueDropdown } from "./LeagueDropDown";


export default async function LeagueLayout({
  children,
}: {
  children: React.ReactNode
}){

  const session = await getServerSession(authOptions);
    const user_id = session?.user?.id;
    const leagues = await prisma.league.findMany({
      select: {
        id: true,
        league_name: true,
        users: {
          select: {
            id: true,
            username: true,
          },
        },
        startDate : true,
        endDate :true
      }, where: {
        users: {
          some: {
            id: user_id,
          }
        }
      }
    });

    const leagueTabs : leagueTabs[] = leagues.map((league) => ({leagueID : league.id, leagueName : league.league_name}))

  return (
    <>
    {leagues && (
    <div className="w-full flex flex-row justify-between space-x-8 mx-32 my-16">

      <div className="w-64">
      <LeagueDropdown leagues={leagueTabs}/>
      </div>
      <div className="w-full">
      {children}
      </div>
    </div>
    )}
    {!leagues && (<div> User has no leagues</div>)}
    </>
    
  );
    }
