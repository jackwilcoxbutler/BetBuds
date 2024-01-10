import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch('https://api.the-odds-api.com/v4/sports/?apiKey=fdbb99959a10b219f4351a17167d7f0e');

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const sports = await response.json();
        const filteredSports = sports
            .map((sport: any) => sport.key)
            .filter((key: string) => [
                'americanfootball_nfl',
                'basketball_nba',
                'basketball_ncaab',
                'icehockey_nhl',
                'soccer_epl'
            ].includes(key));

        return NextResponse.json(filteredSports, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 401 });
    }
}