import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await updateBettingResults()

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }
}

async function updateBettingResults() {
    const bets = await prisma.userLeagueBet.findMany({
        where: {
            status: 0,
            event: {
                status: 1
            }
        },
        include: {
            event: true
        }
    });

    console.log("api/bets/checkResults number of bets : ", bets.length)

    const computeResult = (price: number) => {
        const num = price < 0 ? (100 / Math.abs(price)) : (price / 100);
        return parseFloat(num.toFixed(2));
    };

    for (const bet of bets) {
        let newResult = 0; // default to 0 (tie)
        
        
        if (bet.event && bet.event.status == 1 && bet.event.homeScore !== null && bet.event.awayScore !== null) {
            const totalScore = bet.event.homeScore + bet.event.awayScore;
            const home = bet.event.homeScore
            const away = bet.event.awayScore
            const spread = bet.point !== null ? bet.point : 0;

            switch (bet.bet_type) {
                case 'OVER':
                    newResult = totalScore > bet.point! ? computeResult(bet.price) : totalScore === bet.point ? 0 : -1;
                    break;
                case 'UNDER':
                    newResult = totalScore < bet.point! ? computeResult(bet.price) : totalScore === bet.point ? 0 : -1;
                    break;
                case 'ML':
                    if (bet.team_name == bet.event.homeTeam) {
                        newResult = home > away ? computeResult(bet.price) : home === away ? 0 : -1;
                    } else if (bet.team_name == bet.event.awayTeam) {
                        newResult = away > home ? computeResult(bet.price) : home === away ? 0 : -1;
                    } else {
                        console.log("No matching teams")
                    }
                    break;
                case 'SPREAD':

                    if (bet.team_name == bet.event.homeTeam) {
                        newResult = home + spread  > away ? computeResult(bet.price) : home + spread === away ? 0 : -1;
                    } else if (bet.team_name == bet.event.awayTeam) {
                        newResult = away + spread > home ? computeResult(bet.price) : home + spread === away ? 0 : -1;
                    }else {
                        console.log("No matching teams")
                    }

                    break;
                default:
                    console.error('Unsupported bet type:', bet.bet_type);
                    continue;
            }

            // Update the bet in the database
            await prisma.userLeagueBet.update({
                where: {
                    id: bet.id
                },
                data: {
                    status: 1,
                    result: newResult
                }
            });
        }
    }
}


