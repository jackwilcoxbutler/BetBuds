import { League } from "@/lib/types";
import { ScoreText } from "./ScoreText";
import { formatPrice } from "@/lib/betService";

interface LeagueTableProps{
    league : League
}

export const LeagueTable =  ({league} : LeagueTableProps) => {
    const processedData = league?.users.map(user => {
        if (user.user_bets.length === 0) {
          return {
            userId: user.id,
            username: user.username,
            todayBet: null,
            totalScore: 0,
          };
        }
    
        console.log(user.username);
        const todayBet = user.user_bets.find((bet) =>{
          console.log("-- bet.start date : ", bet.start_date);
          const today = new Date();
          console.log("-- today before new hours: ", today);
    
          today.setHours(0, 0, 0, 0);
          console.log("-- today after new hours: ", today);
    
          // Parse the Prisma date
          const betDate = new Date(bet.start_date);
          console.log("-- betDate before: ", betDate);
    
          betDate.setHours(0, 0, 0, 0);
          console.log("-- betDate  after: ", betDate);
    
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
    var iter = 0;

    return(
    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 bg-t-white cursor-default">
                <thead className="  bg-t-light-blue dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="text-left py-3 px-6 text-lg font-medium tracking-wider text-t-white uppercase dark:text-gray-400">
                      Standing
                    </th>
                    <th scope="col" className="text-left py-3 px-6 text-lg font-medium tracking-wider text-t-white uppercase dark:text-gray-400">
                      Username
                    </th>
                    <th scope="col" className="text-center py-3 px-6 text-lg font-medium tracking-wider text-t-white uppercase dark:text-gray-400">
                      {league.scoring_type === "UNITS" ? (<div>Units</div>) : (<div>Record</div>)}
                    </th>
                    <th scope="col" className="text-center py-3 px-6 text-lg font-medium tracking-wider text-t-white uppercase dark:text-gray-400">
                      {"Today's Bet"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-t-light-grey divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {processedData.map((user) => {
                    
                    iter++;
                    return (
                      <tr key={user.userId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="text-left py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">{iter}.</td>
                        <td className="text-left py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.username}</td>
                        <td className={`text-center py-2 px-6 text-xl font-medium ${(user.totalScore == 0) ?  ' text-t-dark-blue' : ''} ${user.totalScore > 0 ? ' text-green10 ' : ' text-red10 '} whitespace-nowrap `}>
                          <ScoreText score={user.totalScore}/>
                        </td>
                        {user.todayBet ? (
                          (user.todayBet.bet_type === "OVER") && (
                            <td className="text-center py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">o{user.todayBet.point?.toString()} ({formatPrice(user.todayBet.price)}),{user.todayBet.team_name} vs. {user.todayBet.Opponent}</td>
                          ) ||
                          (user.todayBet.bet_type === "UNDER") && (
                            <td className="text-center py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">u{user.todayBet.point?.toString()} ({formatPrice(user.todayBet.price)}),{user.todayBet.team_name} vs. {user.todayBet.Opponent}</td>
                          ) ||
                          (user.todayBet.bet_type === "ML") && (
                            <td className="text-center py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.todayBet.team_name} ({formatPrice(user.todayBet.price)}) vs. {user.todayBet.Opponent}</td>
                          ) ||
                          (user.todayBet.bet_type === "SPREAD") && (
                            <td className="text-center py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.todayBet.team_name} ({formatPrice(user.todayBet.point || 0)})({formatPrice(user.todayBet.price)}) vs. {user.todayBet.Opponent}</td>
                          )
                        ) : (
                          <td className="text-center py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">No Bet for today!</td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>)
              }