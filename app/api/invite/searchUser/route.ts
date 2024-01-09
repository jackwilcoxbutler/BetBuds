// pages/api/searchUser.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
    const { username_query } = await req.json(); 

  if (!username_query) {
    return NextResponse.json({ error: "Username Required" }, { status: 400 });
}

  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: username_query,
          mode: 'insensitive', // Case-insensitive
        },
      },
      select: {
        id:true,
        username: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error searching for users:', error);
    return NextResponse.json({ error: "Internal Server" }, { status: 500 });
  }
}
