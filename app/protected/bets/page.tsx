import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { subDays, addDays } from 'date-fns';


export default async function Page() {
  function isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  function getDates(): Date[] {
    let dates: Date[] = [];

    // Get today's date
    const today = new Date();
    dates.push(today);

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dates.unshift(tomorrow); // Add tomorrow to the beginning of the array

    // Get the previous four days
    for (let i = 1; i <= 4; i++) {
      const previousDay = new Date(today);
      previousDay.setDate(previousDay.getDate() - i);
      dates.push(previousDay); // Add each day to the end of the array
    }

    return dates;
  }

  async function getUserBets(userId: string) {
    const fourDaysAgo = subDays(new Date(), 4);
    const tomorrow = addDays(new Date(), 1);

    try {
      const bets = await prisma.userLeagueBet.findMany({
        where: {
          userID: userId,
          start_date: {
            gte: fourDaysAgo, // Greater than or equal to 4 days ago
            lt: tomorrow      // Less than tomorrow
          }
        },
        include: {
          league: {
            select: {
              id: true,   // Select league ID
              league_name: true  // Select league name
            }
          }, // Include related league data
          event: true,  // Include related event data
        }
      });
      return bets;
    } catch (error) {
      console.error("Error fetching user bets:", error);
    }
  }

  const session = await getServerSession(authOptions);
  const userID = session?.user.id;

  const bets = await getUserBets(userID ? userID : "");
  const dateArray = getDates();

  //const bets = 
  return (<>
    {bets && (<div>
      {dateArray.map((day) => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let dateString = ""

        if (isSameDay(day, today)) {
          dateString = "Today";
        } else if (isSameDay(day, tomorrow)) {
          dateString = "Tomorrow"
        } else {
          dateString = day.toDateString();
        }

        return (
          <div>
            <div className="sticky top-24">
            <div className="text-t-white bg-t-dark-blue block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:bg-t-dark-blue focus:shadow-[0_0_0_2px]">
            {dateString}
            </div>
            </div>
            <div className="flex">
              {bets.map((bet) => {
                if(isSameDay(day,bet.start_date) && (bet.bet_type == "ML" || bet.bet_type=="SPREAD")){
                return(
                  <div key={bet.id}>
                    {bet.team_name} vs. {bet.Opponent}
                  </div>
                )}
              })}
            </div>
          </div>
        )
      })}
    </div>
    )}
    
  </>
  );
}
