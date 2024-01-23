import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Bet_Choice } from "@/lib/betTypes";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
    try {
        // Authenticate the user
        const session = await getServerSession(authOptions);
        const userID = session?.user?.id;
        if (!userID) {
            return NextResponse.json({ error: "No user authenticated" }, { status: 401 });
        }

        // Extract data from the request body
        const  data = await req.json();
        const betChoice : Bet_Choice= data.betChoice;
        const leagueIDs : string[] = data.leagueIDs;

        //if()

        // Create a UserLeagueBet for each league ID
        const createdBets = await Promise.all(leagueIDs.map(async (leagueID) => {
            return prisma.userLeagueBet.create({
                data: {
                    user: { connect: { id: userID } },
                    league: { connect: { id: leagueID } },
                    // Map other fields from betChoice to the create operation
                    event:{connect : {id : betChoice.id}},
                    team_name: betChoice.team_name,
                    Opponent: betChoice.other_team,
                    bet_type: betChoice.bet_type,
                    price: betChoice.price,
                    point: betChoice.point,
                    result: 0, // Default value, adjust as necessary
                    start_date: betChoice.start_date,
                    // Add other fields if necessary
                },
            });
        }));

        return NextResponse.json({ createdBets}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
