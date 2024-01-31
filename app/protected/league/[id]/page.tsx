
import prisma from '@/lib/prisma';
import AddUserFormModal from "@/components/Invitations/AddUserFormModal";

export default async function Page({
  params,
}: {
  params: { id: string }
}) {

  if (params.id === '0') {

  }
  const leagueId = (params.id === '0') ? params.id : prisma.league.findFirst; // Replace with the actual league ID

  // First, get the league and extract user IDs
  const leagueWithUsersAndBets = (params.id != '0') ? await prisma.league.findUnique({
    where: {
      id: params.id,
    },
    include: {
      users: {
        include: {
          user_bets: {
            where: {
              leagueID: params.id
            }
          }
        }
      }
    }
  }) : await prisma.league.findFirst({

    include: {
      users: {
        include: {
          user_bets: true
        }
      }
    }
  });
  console.log(leagueWithUsersAndBets);

  if (!leagueWithUsersAndBets || !leagueWithUsersAndBets.users) {
    throw new Error('League not found');
  }

  function formatPrice(odds: number): string {
    if (odds > 0) {
      return "+" + odds.toString();
    }
    else return odds.toString();
  }

  const processedData = leagueWithUsersAndBets?.users?.map(user => {
    console.log(user.user_bets);
    if (user.user_bets.length === 0) {
      return {
        userId: user.id,
        username: user.username,
        todayBet: null,
        totalScore: 0,
      };
    }


    const todayBet = user.user_bets.find(bet => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Parse the Prisma date
      const betDate = new Date(bet.start_date);
      //betDate.setHours(0, 0, 0, 0);
      console.log(betDate,bet.start_date)
      console.log("Bet date : ", betDate.getMonth(),betDate.getDate(),betDate.getFullYear());
      console.log("Todays date : ", today.getMonth(),today.getDate(),today.getFullYear());

      console.log(betDate.getTime());
      console.log(today)
      console.log(today.getTime());

      return betDate.getTime() === today.getTime()
    })

    const totalScore = user.user_bets.reduce((total, bet) => {
      return total + Number(bet.result); // Assuming 'result' can be converted to a number
    }, 0);


    return {
      userId: user.id,
      username: user.username,
      todayBet,
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
    <div className="flex w-full flex-col ">
      <div className='flex w-full justify-start py-4 text-4xl m-2'>
        {leagueWithUsersAndBets.league_name}
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
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.totalScore}</td>
                        {user.todayBet ? (
                          (user.todayBet.bet_type === "OVER") && (
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">o{user.todayBet.point?.toString()} ({formatPrice(user.todayBet.price)}),{user.todayBet.team_name} vs. {user.todayBet.Opponent}</td>

                          ) ||
                          (user.todayBet.bet_type === "UNDER") && (
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">u{user.todayBet.point?.toString()} ({formatPrice(user.todayBet.price)}),{user.todayBet.team_name} vs. {user.todayBet.Opponent}</td>
                          ) ||
                          (user.todayBet.bet_type === "ML") && (
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.todayBet.team_name} ({formatPrice(user.todayBet.price)}) vs. {user.todayBet.Opponent}</td>
                          ) ||
                          (user.todayBet.bet_type === "SPREAD") && (
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.todayBet.team_name} ({formatPrice(user.todayBet.point || 0)})({formatPrice(user.todayBet.price)}) vs. {user.todayBet.Opponent}</td>

                          )
                          // <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.todayBet.team_name} {user.todayBet.line.toString()},{user.todayBet.start_date.toDateString()}</td>
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
      <div className="pt-12 flex w-full justify-center">
        <AddUserFormModal league_id={params.id} />
      </div>
    </div>
  );
}