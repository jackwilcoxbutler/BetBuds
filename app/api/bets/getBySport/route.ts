import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
            const {sport_key} = await req.json();

            if(!sport_key){
                return NextResponse.json({ error: "No sport key" }, { status: 500 });
            }

            const bets = await prisma.event.findMany({
                where: {
                    sportKey: sport_key,
                     startDate: {
                         gte: new Date(),
                     },
                },
            });
            //search all bets
            return NextResponse.json(bets);
        } catch (error) {
            console.error('Error searching bets:', error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
}