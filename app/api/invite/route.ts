// pages/api/send-invite.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendInvite } from '@/lib/server/SendInvite'; // Adjust the import path accordingly
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

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
            const invitation = await sendInvite({ senderId : user_id, receiverUsername });
            return NextResponse.json(invitation);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
        }
    }
}
