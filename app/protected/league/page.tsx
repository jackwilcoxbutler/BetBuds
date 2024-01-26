import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import LeagueTable from "./LeagueTable";

export default async function Page() {
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

  return (
    <>
    {leagues && (<LeagueTable leagueID={leagues[0].id}/>)}
    {!leagues && (<div> User has no leagues</div>)}
    </>
  );
}
