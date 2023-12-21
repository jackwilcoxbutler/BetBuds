import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();
  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const usernameExists = await prisma.user.findUnique({
    where : {
      username,
    }
  })
  if (emailExists) 
  {
    return NextResponse.json({ error: "User with that email address already exists" }, { status: 400 });
  }
  else if (usernameExists)
  {
    return NextResponse.json({ error: "Username taken" }, { status: 400 });
  } 
  else {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
