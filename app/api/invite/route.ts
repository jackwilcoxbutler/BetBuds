// pages/api/send-invite.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import toast from 'react-hot-toast';

export async function POST(req: Request) {
  // Only allow POST requests for this endpoint

    if (req.method === 'POST') {
        try {
            let user_id :string;
            const session = await getServerSession(authOptions);
            if(session?.user?.id){
                user_id = session?.user?.id;
            }else{
                return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
            }

            const { receiver_username,league_id } = await req.json(); 

            const receiver_id = await prisma.user.findUniqueOrThrow({
                select : {
                    id : true,
                    leagues : {
                      select : {
                        id : true
                    }
                  }
                },
                where : {
                    username : receiver_username
                }
            });

            const leagueExists = receiver_id.leagues.some(league => league.id === league_id);


            if(receiver_id.id === user_id){
                return NextResponse.json({ error: "Can not invite yourself" }, { status: 500 });
            }else if(leagueExists){
                return NextResponse.json({ error: "User is already in this league" }, { status: 500 });
            }

            const invitation = await prisma.invitation.create({
                data: {
                  sender: { connect: { id: user_id } },
                  receiver: { connect: { username: receiver_username } },
                  league : {connect : { id : league_id}},
                  // Set other fields as needed, for example:
                  accepted: false,
                },
              });
            return NextResponse.json(invitation);
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
        const invites = await prisma.invitation.findMany({
          select: {
            id : true,
            league : {
                select : {
                    id : true,
                    league_name : true,
                }
            },
            sender : {
                select : {
                    username : true,
                }
            },
            receiver : {
              select : {
                id : true
              }
            },
            status : true,
          },where : {
            receiver_id : user_id
          }
        });
        
        // Return the created league
        return NextResponse.json(invites);
      } catch (error) {
        console.error('Error creating league:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
    }
    else{
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
  }
  