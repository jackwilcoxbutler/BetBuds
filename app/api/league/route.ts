import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      // Get the user session
      //const session = await getSession({ req });

      // If the user is not authenticated, return an unauthorized response
      //if (!session) {
      //  return  NextResponse.json({ error: "No User Logged In" }, { status: 400 });
      //}

      const {league_name} = await req.json();

      // Create a new league with the user making the API call as the only user
      const newLeague = await prisma.league.create({
        data: {
          league_name,
          users: {
            connect: { id: 1 },
          },
        },
      });

      // Return the created league
      return NextResponse.json(newLeague);
    } catch (error) {
      console.error('Error creating league:', error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  } else {
    // If the request method is not POST, return a method not allowed response
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}