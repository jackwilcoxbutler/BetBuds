import { ListLeagues } from "@/components/leagues/ListLeagues";
import ViewRules from "@/components/leagues/ViewRulesButton";
import SignOut from "@/components/signout_button";
import prisma from '@/lib/prisma';
import { League, UserLeagueBet } from "@prisma/client";
import { InboxButton } from "@/components/Invitations/ViewInboxButton";

export default async function Page({
  params,
}: {
  params: { id: string }
}) {

  function getLatestBetForEachUser(userLeagueBets: UserLeagueBet[]): UserLeagueBet[] {
    const latestBets: { [userId: string]: UserLeagueBet } = {};

    userLeagueBets.forEach(bet => {
      // Check if this is the first bet for the user or if it's more recent than the current latest
      if (!latestBets[bet.userID] || latestBets[bet.userID].createdAt < bet.createdAt) {
        latestBets[bet.userID] = bet;
      }
    });

    return Object.values(latestBets);
  }

  const leagueId = params.id; // Replace with the actual league ID

  // First, get the league and extract user IDs
  const leagueWithUsersAndBets = await prisma.league.findUnique({
    where: {
      id: leagueId,
    },
    include: {
      users: {
        include: {
          user_bets: true
        }
      }
    }
  });

  if (!leagueWithUsersAndBets || !leagueWithUsersAndBets.users) {
    throw new Error('League not found');
  }

  const processedData = leagueWithUsersAndBets?.users?.map(user => {
    if (user.user_bets.length === 0) {
      return {
        userId: user.id,
        username: user.username,
        latestBet: null,
        totalScore: 0,
      };
    }

    const latestBet = user.user_bets.reduce((latest, current) => {
      return latest.createdAt > current.createdAt ? latest : current;
    }, user.user_bets[0]);

    const totalScore = user.user_bets.reduce((total, bet) => {
      return total + Number(bet.result); // Assuming 'result' can be converted to a number
    }, 0);

    return {
      userId: user.id,
      username: user.username,
      latestBet,
      totalScore,
    };
  });

  if (!processedData) {
    // Handle the case where leagueWithUsersAndBets or leagueWithUsersAndBets.users is null
    console.error("No league or users found");
    return;
  }

  // Now, use these user IDs to filter UserLeagueBet records
  let iter = 0;

  return (
    <div>
      <header className="bg-t-dark-blue sticky top-0">
        {/*replace with homebutton component*/}
        <div className="flex items-center justify-between p-4 bg-t-dark-blue mx-20">
          <a
            href="/protected"
            className="text-2xl font-bold text-t-orange"
          >
            BetBuds
          </a>
          <div className="flex space-x-8 items-center">
            <InboxButton notificationCount={3} />
            <SignOut />
          </div>
        </div>
      </header>

      <div className="flex justify-center pt-8">
        <div className="flex w-5/6 flex-col">
          <div className="flex justify-end mx-6 pb-4">
                <ViewRules/>
          </div>
          <div className="min-w-full overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden ">
                {leagueWithUsersAndBets && (
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-t-grey dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          Standing
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          Username
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          {leagueWithUsersAndBets.scoring_type === "UNITS" ? (<div>Units</div>) : (<div>Record</div>)}
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          Current Bet
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {processedData.map((user) => {
                        iter++;
                        return (
                          <tr key={user.userId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{iter}.</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.username}</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">-4.3u</td>
                            {user.latestBet ? (
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.latestBet.team_name} {user.latestBet.line.toString()},{user.latestBet.start_date.toDateString()}</td>
                            ) : (
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">No Current Bet</td>
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}