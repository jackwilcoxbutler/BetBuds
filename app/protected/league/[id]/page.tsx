
import prisma from '@/lib/prisma';
import AddUserFormModal from "@/components/Invitations/AddUserFormModal";
import { ScoreText } from '@/components/leagues/ScoreText';
import { League, User } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CreateLeagueButton } from '@/components/leagues/CreateLeagueButton';
import { LeagueTable } from '@/components/leagues/LeagueTable';

export default async function Page({
  params,
}: {
  params: { id: string }
}) {
 
  // First, get the league and extract user IDs
  const leagueWithUsersAndBets = await prisma.league.findUnique({
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
  }) as League;
  

  const processedData = leagueWithUsersAndBets?.users.map(user => {
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

  if (!processedData) {
    // Handle the case where leagueWithUsersAndBets or leagueWithUsersAndBets.users is null
    console.error("No league or users found");
  }

  let iter: number = 0;
  processedData.sort((a, b) => {
    // Assuming totalResult is always available; otherwise, consider fallbacks or checks
    const bNum = b.totalScore !== null && b.totalScore !== undefined ? b.totalScore : 0
    const aNum = a.totalScore !== null && a.totalScore !== undefined ? a.totalScore : 0
    return bNum - aNum;
  });

  // Now, use these user IDs to filter UserLeagueBet records
  const today = new Date();

  return (
    <>
    {leagueWithUsersAndBets && (
      <div className="flex w-full flex-col ">
      <div className='flex w-full justify-start text-4xl mt-28 m-2'>
        <div className='bg-t-light-blue border-2 border-t-dark-blue p-2 rounded-lg text-t-white shadow-md shadow-t-dark-blue'>
        {leagueWithUsersAndBets.league_name}
        </div>
      </div>
      <div className="min-w-full overflow-x-auto shadow-md sm:rounded-lg border-2 border-t-dark-blue bg-t-light-grey">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden ">
            {leagueWithUsersAndBets && (
              <LeagueTable league={leagueWithUsersAndBets}/>
            )}
          </div>
        </div>
      </div>
      <div className="pt-12 flex w-full justify-center">
        <AddUserFormModal league_id={params.id} />
      </div>
    </div>)}
    {!leagueWithUsersAndBets && (
      <div className="flex flex-col space-y-8 w-full items-center justify-center pt-4">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-t-dark-blue shadow-xl bg-t-dark-blue">
        <div className="flex flex-col items-center justify-center space-y-3  bg-white px-4 py-6 pt-8 text-center sm:px-16 text-t-white text-xl">
            You have no Leagues!
        </div>
      </div>
      <CreateLeagueButton expanded={true}/>
    </div>
      )}
                  
                  </>
  );
}