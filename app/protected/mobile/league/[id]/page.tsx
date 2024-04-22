import { LeagueTable } from "@/components/leagues/LeagueTable";
import prisma from "@/lib/prisma";
import { League } from "@/lib/types";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

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
                <div className="static flex flex-row w-full p-2 items-center">
                    <div className="left-4">
                        <a
                            href="/protected/mobile/league">
                            <div className="btn-primary p-2">
                                <ArrowLeftIcon />
                            </div>
                        </a>
                    </div>
                    <div className="inset-x-0 mx-auto ">
                        <text className="bg-t-light-blue border-2 border-t-dark-blue p-2 rounded-lg text-t-white shadow-md shadow-t-dark-blue ">
                            {leagueWithUsersAndBets.league_name}
                        </text>
                    </div>
                </div>
                <div className="mx-2 border-2 rounded-md border-t-dark-blue">
                    <div className="overflow-hidden "></div>
                    <div className="">
                        <LeagueTable league={leagueWithUsersAndBets} />
                    </div>
                </div>
            </div>
        </>
    )
}