import { ListLeagues } from "@/components/leagues/ListLeagues";
import SignOut from "@/components/signout_button";
import prisma from '@/lib/prisma';


export default async function Page({
    params,
  }: {
    params: { id: string }
  }) {

    const league = await prisma.league.findUniqueOrThrow(
      {
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
        id : params.id
      }
    }
  );

    return (
      <div>
        <header className="bg-t-dark-blue sticky top-0">
        {/*replace with homebutton component*/}
          <div className="flex items-center justify-between p-4 bg-t-dark-blue mx-32">
            <a 
            href="/protected"
            className="text-2xl font-bold text-t-orange"
            >
            BetBuds
            </a>
            <SignOut/>
          </div>
        </header>

        <div className="flex w-screen h-screen bg-t-orange justify-center">
          <div className="flex w-2/3 justify-center">
            {league && (
              league.league_name
              )}
          </div>
        </div>
      </div>
    );
  }