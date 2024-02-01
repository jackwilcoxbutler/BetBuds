import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { leagueTabs } from "../LeagueDropDown";
import { LeagueDropdown } from "../LeagueDropDown";
import { League } from "@/lib/types";


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

    const leagueTabs : leagueTabs[] = leagues.map((league : League) => ({leagueID : league.id, leagueName : league.league_name}))

  return (
    <>
    {leagues && (
    <div className="flex w-screen h-screen mx-32">
      <div className="w-1/5  text-white mt-32">
        <LeagueDropdown leagues={leagueTabs}/>
      </div>
      <div className="flex-1 p-10 w-full">
      {children}
      </div>
    </div>
    )}
    {!leagues && (<div> User has no leagues</div>)}
    </>
    
  );
    }
