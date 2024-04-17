import { NextResponse } from "next/server";

import axios from 'axios';
import prisma from "@/lib/prisma";
import { Bet, Outcome, Market, GameDetails } from "@/lib/betTypes";
import { getSports } from "@/lib/betService";
import { subHours } from "date-fns";
import { stat } from "fs";



async function fetchBetsBySport(sport_key: string) {
    try {
        const url = "https://api.the-odds-api.com/v4/sports/" + sport_key + "/odds?apiKey=" + process.env.ODDS_API + "&oddsFormat=american&regions=us&markets=h2h,spreads,totals&dateFormat=iso&bookmakers=fanduel"
        const response = await axios.get(url);

        const events: Bet[] = await response.data;
        if (events.length > 0) {
            //console.log("We have ",events.length, " events")
            for (const event of events) {
                const bookmaker = event.bookmakers[0];

                if (bookmaker) {
                    const h2hMarket = bookmaker.markets.find((m: Market) => m.key === 'h2h');
                    const spreadsMarket = bookmaker.markets.find((m: Market) => m.key === 'spreads');
                    const totalsMarket = bookmaker.markets.find((m: Market) => m.key === 'totals');

                    const homeTeam = event.home_team;
                    const awayTeam = event.away_team;
                    const homeH2h = h2hMarket?.outcomes.find((o: Outcome) => o.name === homeTeam);
                    const awayH2h = h2hMarket?.outcomes.find((o: Outcome) => o.name === awayTeam);
                    const homeSpread = spreadsMarket?.outcomes.find((o: Outcome) => o.name === homeTeam);
                    const awaySpread = spreadsMarket?.outcomes.find((o: Outcome) => o.name === awayTeam);
                    const totalOver = totalsMarket?.outcomes.find((o: Outcome) => o.name === 'Over');
                    const totalUnder = totalsMarket?.outcomes.find((o: Outcome) => o.name === 'Under');
                    //console.log(homeTeam,awayTeam);
                    //Store dates in UTC
                    const startTime = new Date(event.commence_time);

                    const eventData = {
                        gameID: event.id,
                        sportTitle: event.sport_title,
                        sportKey: event.sport_key,
                        homeTeam: homeTeam,
                        awayTeam: awayTeam,
                        awayML: awayH2h?.price,
                        homeML: homeH2h?.price,
                        awaySpreadPoint: awaySpread?.point,
                        homeSpreadPoint: homeSpread?.point,
                        awaySpreadPrice: awaySpread?.price,
                        homeSpreadPrice: homeSpread?.price,
                        totalPoint: totalOver?.point || totalUnder?.point,
                        overPrice: totalOver?.price,
                        underPrice: totalUnder?.price,
                        startDate: startTime,
                    };





                    const upsertData = {
                        where: { gameID: eventData.gameID },
                        update: {
                            awayML: awayH2h?.price,
                            homeML: homeH2h?.price,
                            awaySpreadPoint: awaySpread?.point,
                            homeSpreadPoint: homeSpread?.point,
                            awaySpreadPrice: awaySpread?.price,
                            homeSpreadPrice: homeSpread?.price,
                            totalPoint: totalOver?.point || totalUnder?.point,
                            overPrice: totalOver?.price,
                            underPrice: totalUnder?.price
                        },
                        create: eventData
                    };

                    const result = await prisma.event.upsert({
                        where: upsertData.where,
                        update: upsertData.update,
                        create: upsertData.create,
                    });

                    //console.log(result)

                    // Only include fields in update object if they are not null

                } else {
                    //console.log("can't find bookmaker");
                }
            }
        } else {
            console.log("No bets for ", sport_key)
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



async function updateEventsBySport(sport_key: string) {
    try {
        const url = "https://api.the-odds-api.com/v4/sports/" + sport_key + "/scores/?daysFrom=1&apiKey=" + process.env.ODDS_API
        const response = await axios.get(url);

        const gameResults: GameDetails[] = response.data;
        var status = 0;
        if (gameResults.length > 0) {
            for (const game of gameResults) {
                if (game.completed) {
                    status = 1;
                }
                let homeScore: number = 0;
                let awayScore: number = 0;

                if (game.scores && game.scores.length === 2) {
                    homeScore = parseInt(game.scores[0].score);
                    awayScore = parseInt(game.scores[1].score);
                }

                const result = await prisma.event.update({
                    where: {
                        gameID: game.id
                    },
                    data: {
                        homeScore: homeScore,
                        awayScore: awayScore,
                        status: status
                    }
                });
                //console.log('Event updated successfully:', result);
            }
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}



export const revalidate = 0
export async function GET() {
    try {
        const sports = await getSports();

        for (var val of sports) {
            await fetchBetsBySport(val);
            console.log("Update Events : ",val)
        }

        for(var val of sports){
            console.log("Update sport : ", val)
            await updateEventsBySport(val);
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }
}