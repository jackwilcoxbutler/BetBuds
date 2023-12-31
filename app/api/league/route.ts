import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  let user_id :string;
  const session = await getServerSession(authOptions);
      
  if(session?.user?.id){
    user_id = session?.user?.id;
  }else{
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  console.log(req.method);

  if (req.method === 'POST') {
    try {
      const {league_name,scoring_type,number_bets,number_periods,period_type,is_private,
      max_number_users,max_odds,min_odds,allow_ml,allow_spread,allow_total,
    startDate,endDate} = await req.json();
      const newLeague = await prisma.league.create({
        data: {
          league_name,
          scoring_type,
          number_bets,
          number_periods,
          period_type,
          is_private,
          max_number_users,
          max_odds,
          min_odds,
          allow_ml,
          allow_spread,
          allow_total,
          startDate,
          endDate,
          users: {
            connect: { id:  user_id },
          },
        },
      });

      // Return the created league
      return NextResponse.json(newLeague);
    } catch (error) {
      console.error('Error creating league:', error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}

export async function GET(req: Request) {
  let user_id :string;
  const session = await getServerSession(authOptions);
      
  if(session?.user?.id){
    user_id = session?.user?.id;
  }else{
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }
  if (req.method === "GET") {
    try {
      const leagues = await prisma.league.findMany({
        select: {
          id: true,
          league_name: true,
          users: {
            select: {
              id: true,
              username: true,
              email: true,
              password: false,
              leagues: false,
              receivedInvites: false,
              sentInvites: false,
            },
          },
        },where : {
          users : {
            some: {
              id: user_id,
            }
          }
        }
      });
      
      // Return the created league
      return NextResponse.json(leagues);
    } catch (error) {
      console.error('Error creating league:', error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  else{
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
