import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (path === "/" && !session) {
    return NextResponse.next();
  }else if(path === "/" && session){
    return NextResponse.redirect(new URL("/protected/home/americanfootball_nfl", req.url));
  }

  if (!session && path === "/protected/home/americanfootball_nfl") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/protected/home/americanfootball_nfl", req.url));
  }
  return NextResponse.next();
}
