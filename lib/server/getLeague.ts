'use server'
import prisma from "../prisma";
 
export async function getLeague(id : string) {
    const leagueWithUsersAndBets = await prisma.league.findUnique({
        where: {
          id: id,
        },
        include: {
          users: {
            include: {
              user_bets: true
            }
          }
        }
      });
    return leagueWithUsersAndBets;
}