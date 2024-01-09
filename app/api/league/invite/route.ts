import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    if (req.method === 'POST') {
        const { receiver_id,league_id,invite_id } = await req.json(); 

        if (!receiver_id || !league_id || !invite_id) {
            return NextResponse.json({ error: "Missing Request Parameters" }, { status: 400});
        }

        try{
            const result = await prisma.$transaction(async (prisma) => {
                // Update Invitation status
                await prisma.invitation.update({
                    where: { id: invite_id },
                    data: { status: 2 }
                });
    
                // Add User to League's Users[]
                await prisma.league.update({
                    where: { id: league_id },
                    data: { users: { connect: { id: receiver_id } } }
                });
    
                // Add League to User's Leagues[]
                await prisma.user.update({
                    where: { id: receiver_id },
                    data: { leagues: { connect: { id: league_id } } }
                });
    
                return { message: 'Invitation accepted successfully' };
            });
    
            return NextResponse.json(result, { status: 200 });
        }catch (error) {
            console.error('Error accepting invitation:', error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }

    }else{
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 });

    }
}
