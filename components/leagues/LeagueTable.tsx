'use client';
import { League } from "@/lib/types";
import { ScoreText } from "./ScoreText";
import { formatPrice } from "@/lib/betService";

interface LeagueTableProps {
  league: League,
}

export const LeagueTable = ({ league }: LeagueTableProps) => {
  const processedData = league?.users.map(user => {
    if (user.user_bets.length === 0) {
      return {
        userId: user.id,
        username: user.username,
        todayBet: null,
        totalScore: 0,
      };
    }

    const todayBet = user.user_bets.find((bet) => {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      // Parse the Prisma date
      const betDate = new Date(bet.start_date);

      betDate.setHours(0, 0, 0, 0);

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
  processedData.sort((a, b) => {
    // Assuming totalResult is always available; otherwise, consider fallbacks or checks
    const bNum = b.totalScore !== null && b.totalScore !== undefined ? b.totalScore : 0
    const aNum = a.totalScore !== null && a.totalScore !== undefined ? a.totalScore : 0
    return bNum - aNum;
  });
  var iter = 0;

  return (
    <>{(<table className="sm:min-w-full divide-y divide-gray-200 sm:table-fixed dark:divide-gray-700 bg-t-white cursor-default">
      <thead className="  bg-t-light-blue dark:bg-gray-700">
        <tr>
          <th scope="col" className="text-left mobile-table-header sm:desktop-table-header">
            Rank
          </th>
          <th scope="col" className="text-left mobile-table-header sm:desktop-table-header">
            Username
          </th>
          <th scope="col" className="text-center mobile-table-header sm:desktop-table-header">
            {league.scoring_type === "UNITS" ? (<div>Units</div>) : (<div>Record</div>)}
          </th>
          <th scope="col" className="text-center mobile-table-header sm:desktop-table-header">
            {"Today's Pick"}
          </th>
        </tr>
      </thead>
      <tbody className="bg-t-light-grey divide-y divide-t-dark-blue">
        {processedData.map((user) => {
          const score = parseFloat(user.totalScore.toFixed(2))
          iter++;
          return (
            <tr key={user.userId} className="bg-t-light-grey hover:bg-t-grey">
              <td className="text-left mobile-table-row sm:desktop-table-row">{iter}.</td>
              <td className="text-center mobile-table-row sm:desktop-table-row">{user.username}</td>
              <td className={` text-center mobile-table-row sm:desktop-table-row ${(user.totalScore == 0) ? ' text-t-dark-blue' : ''} ${user.totalScore > 0 ? ' text-green10 ' : ' text-red10 '} `}>
                <ScoreText score={score} />
              </td>
              {user.todayBet ? (
                (user.todayBet.bet_type === "OVER") && (
                  <td className="text-center mobile-table-row sm:desktop-table-row">o{user.todayBet.point?.toString()} ({formatPrice(user.todayBet.price)}),{user.todayBet.team_name} vs. {user.todayBet.Opponent}</td>
                ) ||
                (user.todayBet.bet_type === "UNDER") && (
                  <td className="text-center mobile-table-row sm:desktop-table-row">u{user.todayBet.point?.toString()} ({formatPrice(user.todayBet.price)}),{user.todayBet.team_name} vs. {user.todayBet.Opponent}</td>
                ) ||
                (user.todayBet.bet_type === "ML") && (
                  <td className="text-center mobile-table-row sm:desktop-table-row">{user.todayBet.team_name} ({formatPrice(user.todayBet.price)}) vs. {user.todayBet.Opponent}</td>
                ) ||
                (user.todayBet.bet_type === "SPREAD") && (
                  <td className="text-center mobile-table-row sm:desktop-table-row">{user.todayBet.team_name} ({formatPrice(user.todayBet.point || 0)})({formatPrice(user.todayBet.price)}) vs. {user.todayBet.Opponent}</td>
                )
              ) : (
                <td className="text-center mobile-table-row sm:desktop-table-row">No Bet for today!</td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>)}
    </>
  )
}