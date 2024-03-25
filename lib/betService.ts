import { Bet_Object } from "./betTypes";

// sportsService.ts
type Sport = {
    key: string;
};

export function removeDuplicates(data: string[]): String[] {
    return data.filter((value: string, index: number) => data.indexOf(value) === index);
}

export async function getSports(): Promise<string[]> {
    try {        
        const url = "https://api.the-odds-api.com/v4/sports/?apiKey=" + process.env.ODDS_API

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const sports: Sport[] = await response.json();
        return sports
            .map(sport => sport.key)
            .filter(key => [
                'americanfootball_nfl',
                'basketball_nba',
                'basketball_ncaab',
                'icehockey_nhl',
                'soccer_epl',
                'baseball_mlb'
            ].includes(key));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};

export function getSportNames(a: string) {
    if (a === "Football") {
        return ["americanfootball_nfl"];
    } else if (a === 'Basketball') {
        return ["basketball_nba", "basketball_ncaab"];
    } else if (a === 'Hockey') {
        return ["icehockey_nhl"];
    } else if (a === 'Soccer') {
        return ["soccer_epl"];
    } else {
        return [];
    }
};


export const mapJsonToBetObjects = (jsonData: any[]): Bet_Object[] => {
    return jsonData.map((item) => ({
      id: item.id,
      sportTitle: item.sportTitle,
      sportKey: item.sportKey,
      homeTeam: item.homeTeam,
      awayTeam: item.awayTeam,
      lastUpdate: new Date(item.lastUpdate),
      awayML: item.awayML ?? null,
      homeML: item.homeML ?? null,
      awaySpreadPoint: item.awaySpreadPoint ?? null,
      homeSpreadPoint: item.homeSpreadPoint ?? null,
      awaySpreadPrice: item.awaySpreadPrice ?? null,
      homeSpreadPrice: item.homeSpreadPrice ?? null,
      totalPoint: item.totalPoint ?? null,
      overPrice: item.overPrice ?? null,
      underPrice: item.underPrice ?? null,
      startDate: new Date(item.startDate),
    }));
  };
  