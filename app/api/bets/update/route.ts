import { NextResponse } from "next/server";

import axios from 'axios';
import prisma from "@/lib/prisma";
import { Bet,Outcome,Market } from "@/lib/betTypes";



async function fetchBetsBySport(sport_key : string ) {
    try {
        const url = "https://api.the-odds-api.com/v4/sports/" + sport_key + "/odds?apiKey=fdbb99959a10b219f4351a17167d7f0e&oddsFormat=american&regions=us&markets=h2h,spreads,totals&dateFormat=iso&bookmakers=fanduel"
        const response = await axios.get(url);
        //console.log(response.data);
                
        const events : Bet[] = await response.data;
        for (const event of events) {
            const bookmaker = event.bookmakers[0];

            if (bookmaker) {
                const h2hMarket = bookmaker.markets.find((m : Market) => m.key === 'h2h');
                const spreadsMarket = bookmaker.markets.find((m : Market) => m.key === 'spreads');
                const totalsMarket = bookmaker.markets.find((m : Market) => m.key === 'totals');

                const homeTeam = event.home_team;
                const awayTeam = event.away_team;
                const homeH2h = h2hMarket?.outcomes.find((o : Outcome) => o.name === homeTeam);
                const awayH2h = h2hMarket?.outcomes.find((o : Outcome) => o.name === awayTeam);
                const homeSpread = spreadsMarket?.outcomes.find((o : Outcome) => o.name === homeTeam);
                const awaySpread = spreadsMarket?.outcomes.find((o : Outcome) => o.name === awayTeam);
                const totalOver = totalsMarket?.outcomes.find((o : Outcome) => o.name === 'Over');
                const totalUnder = totalsMarket?.outcomes.find((o : Outcome) => o.name === 'Under');
                //console.log(homeTeam,awayTeam);

                const eventData = {
                    id: event.id,
                    sportTitle: event.sport_title,
                    sportKey:event.sport_key,
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
                    startDate: new Date(event.commence_time),
                };





                const newBet = await prisma.event.create({ data: {
                    id  : eventData.id,
                    sportTitle : eventData.sportTitle,
                    sportKey : eventData.sportKey,
                    homeTeam : eventData.homeTeam,
                    awayTeam : eventData.awayTeam,
                    awayML : eventData.awayML || null,
                    homeML : eventData.homeML || null,
                    awaySpreadPoint : eventData.awaySpreadPoint || null,
                    awaySpreadPrice : eventData.awaySpreadPrice || null,
                    homeSpreadPoint : eventData.homeSpreadPoint || null,
                    homeSpreadPrice : eventData.homeSpreadPrice || null,
                    totalPoint : eventData.totalPoint || null,
                    underPrice : eventData.underPrice || null,
                    overPrice : eventData.overPrice || null,
                    startDate : eventData.startDate
                } })
            }else{
                console.log("can't find bookmaker");
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function GET() {
    try {
        await fetchBetsBySport("americanfootball_nfl");
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }
}