import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { LeagueDropdown, leagueTabs } from "../LeagueDropDown";


export default async function LeagueLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      startDate: true,
      endDate: true
    }, where: {
      users: {
        some: {
          id: user_id,
        }
      }
    }
  });

  //@ts-nocheck
  const leagueTabs: leagueTabs[] = leagues.map((league) => ({ leagueID: league.id, leagueName: league.league_name }))

  return (
    <>
      {leagues.length > 1 && (
        <div className="flex flex-row w-screen h-screen mr-32">
          <div className="basis-1/6  text-white mt-16">
            <LeagueDropdown leagues={leagueTabs} />
          </div>
          <div className="flex-1 basis-5/6 px-10">
            {children}
          </div>
        </div>
      )}
      {leagues.length <= 1 && (
        <div className="flex w-screen h-screen mx-32">
          <div className="flex-1 px-10 w-full">
            {children}
          </div>
        </div>
      )}
    </>

  );
}
