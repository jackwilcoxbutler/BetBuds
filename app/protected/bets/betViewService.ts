import { addDays, subDays } from "date-fns";
import prisma from "@/lib/prisma";

export function isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  export function getDates(): Date[] {
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

  export async function getUserBets(userId: string) {
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