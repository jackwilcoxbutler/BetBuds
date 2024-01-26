import BetProvider from "@/app/context/bet-provider";
import AddUserFormModal from "@/components/Invitations/AddUserFormModal";
import BetButtonGrid from "@/components/bets/BetButton";
import { Bet_Object } from "@/lib/betTypes";
import prisma from "@/lib/prisma";

interface leagueTableProps{
    leagueID : string
}

export default async function LeagueTable({leagueID} : leagueTableProps) {
  
  
    // First, get the league and extract user IDs
    const leagueWithUsersAndBets = await prisma.league.findUnique({
      where: {
        id: leagueID,
      },
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
  
    function formatPrice(odds : number) : string{
      if(odds > 0){
        return "+" + odds.toString();
      }
      else return odds.toString();
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
                              {user.latestBet ? (
                                (user.latestBet.bet_type === "OVER") && (
                                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">o{user.latestBet.point?.toString()} ({formatPrice(user.latestBet.price)}),{user.latestBet.team_name} vs. {user.latestBet.Opponent}</td>
  
                                ) ||
                                (user.latestBet.bet_type === "UNDER") && (
                                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">u{user.latestBet.point?.toString()} ({formatPrice(user.latestBet.price)}),{user.latestBet.team_name} vs. {user.latestBet.Opponent}</td>
                                ) ||
                                (user.latestBet.bet_type === "ML") && (
                                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.latestBet.team_name} ({formatPrice(user.latestBet.price)}) vs. {user.latestBet.Opponent}</td>
                                ) ||
                                (user.latestBet.bet_type === "SPREAD") && (
                                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.latestBet.team_name} ({formatPrice(user.latestBet.point || 0)})({formatPrice(user.latestBet.price)}) vs. {user.latestBet.Opponent}</td>
  
                                )
                                // <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.latestBet.team_name} {user.latestBet.line.toString()},{user.latestBet.start_date.toDateString()}</td>
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
              <AddUserFormModal league_id={leagueID} />
            </div>
          </div>
    );
  }