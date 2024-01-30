import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { subDays, addDays, isSameDay } from 'date-fns';
import { getDates, getUserBets } from "./betViewService";


export default async function Page() {

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
          <div key={dateString}>
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
