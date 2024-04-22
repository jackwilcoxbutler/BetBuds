import { LeagueTable } from "@/components/leagues/LeagueTable";
import prisma from "@/lib/prisma";
import { League } from "@/lib/types";

export default async function Page({
    params,
}: {
    params: { id: string }
}) {
    const leagueWithUsersAndBets = await prisma.league.findUnique({
        where: {
            id: params.id,
        },
        include: {
            users: {
                include: {
                    user_bets: {
                        where: {
                            leagueID: params.id
                        }
                    }
                }
            }
        }
    }) as League;

    return (
        <>
        <div className="flex flex-col items-center space-y-2 mt-2">
            <div>
                <text>
                    {leagueWithUsersAndBets.league_name}
                </text>
            </div>
            <div className="w-full p-2 rounded-md">
                <LeagueTable league={leagueWithUsersAndBets} isMobile={true}/>
            </div>
        </div>
        </>
    )
}