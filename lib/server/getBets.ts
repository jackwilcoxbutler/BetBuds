'use server';
import prisma from '@/lib/prisma';

export async function getBetsBySport(sport : string) {
    const bets = await prisma.bet.findMany({
        where: {
          sportKey: sport,
        },
    });

    return bets;   
}