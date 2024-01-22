import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  // Only allow POST requests for this endpoint

    if (req.method === 'POST') {
        try {
            let userId :string;
            const session = await getServerSession(authOptions);
            if(session?.user?.id){
                userId = session?.user?.id;
            }else{
                return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
            }

            const today = new Date();
const timezoneOffset = today.getTimezoneOffset() * 60000; // Timezone offset in milliseconds
const localDate = new Date(today.getTime() - timezoneOffset);
localDate.setHours(0, 0, 0, 0); // Set to the beginning of the day in local time
const utcDate = new Date(localDate.getTime() + timezoneOffset);
const tomorrow = new Date(utcDate);
tomorrow.setUTCDate(utcDate.getUTCDate() + 1);

            const {odds} = await req.json();

            if(odds < 0){

            }else{

            }

            const leagues = await prisma.league.findMany({
                where: {
                  users: {
                    some: {
                      id: userId,
                    },
                  },
                  min_odds: {
                    lte : odds,
                  },
                  max_odds: {
                    gte: odds,
                  },
                  startDate: {
                    lte: today,
                  },
                  endDate: {
                    gte: today,
                  },
                  user_bets: {
                        none: {
                          AND: [
                            { userID: userId },
                            {
                              start_date: {
                                gte: utcDate,
                              },
                            },
                            {
                              start_date: {
                                lt: tomorrow,
                              },
                            },
                          ],
                        },
                  }
                },
                select: {
                  id: true,
                  league_name : true,
                },
              });
              console.log(utcDate);
              console.log(tomorrow)
            
            return NextResponse.json(leagues);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return NextResponse.json({ error: "User not found" }, { status: 400 });
                }
            }
            console.log("ERROR : ");
            
            console.log(error);
            return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
        }
    }
}