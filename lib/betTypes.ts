export interface Bet {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface Market {
  key: string;
  last_update: string;
  outcomes: Outcome[];
}

export interface Outcome {
  name: string;
  price: number;
  point?: number;
}

export interface Bet_Object {
  id: string;
  sportTitle: string;
  sportKey: string;
  homeTeam: string;
  awayTeam: string;
  lastUpdate: Date;
  awayML?: number | null; // '?' denotes an optional field, which can be undefined or null
  homeML?: number | null;
  awaySpreadPoint?: number | null; // Floats are represented as 'number' in TypeScript
  homeSpreadPoint?: number | null;
  awaySpreadPrice?: number | null;
  homeSpreadPrice?: number | null;
  totalPoint?: number | null;
  overPrice?: number | null;
  underPrice?: number | null;
  startDate: Date;
}

export interface Bet_Choice {
  id: string,
  team_name?: string | null;
  other_team?: string | null;
  bet_type:  string;
  price:      number;
  point?: number | null;
  start_date: Date;
}

