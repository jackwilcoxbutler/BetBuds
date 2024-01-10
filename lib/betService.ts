// sportsService.ts

type Sport = {
    key: string;
};

export function removeDuplicates(data : string[]) : String[]{
    return data.filter((value : string, index : number) => data.indexOf(value) === index);
}

export async function getSports(): Promise<string[]> {
    try {
        const response = await fetch('https://api.the-odds-api.com/v4/sports/?apiKey=fdbb99959a10b219f4351a17167d7f0e');
        
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
                'soccer_epl'
            ].includes(key));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};

export function getSportNames(a : string){
    if(a === "Football"){
        return ["americanfootball_nfl"];
    }else if(a === 'Basketball'){
        return ["basketball_nba","basketball_ncaab"];
    }else if(a === 'Hockey'){
        return ["icehockey_nhl"];
    }else if(a === 'Soccer'){
        return ["soccer_epl"];
    }else{
        return [];
    }
};

