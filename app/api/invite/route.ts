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

            const { receiverUsername } = await req.json(); 


            const receiver_id = await prisma.user.findUniqueOrThrow({
                select : {
                    id : true
                },
                where : {
                    username : receiverUsername
                }
            });

            if(receiver_id.id === user_id){
                return NextResponse.json({ error: "Can not invite yourself" }, { status: 500 });
            }

            const invitation = await prisma.invitation.create({
                data: {
                  sender: { connect: { id: user_id } },
                  receiver: { connect: { username: receiverUsername } },
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
