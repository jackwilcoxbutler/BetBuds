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
  let iter = 0; 

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

        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden ">
            {league && (
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                  Standing
                </th>
                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                  Username
                </th>
                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                  Score
                </th>
                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                  Current Bet
                </th>
              </tr> 
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {league.users.map((user) => {
                iter++;
                return (
                  <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{iter}.</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.username}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">-4.3u</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Titans (-4) @ Colts, Mon @ 7:30pm</td>
                  </tr> 
              )})}
              </tbody>
              </table>
              )}
              </div>
          </div>
        </div>
      </div>
      </div>
    );
  }