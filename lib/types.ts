export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  leagues: League[];
  user_bets: UserLeagueBet[];
  receivedInvites: Invitation[];
  sentInvites: Invitation[];
  createdAt: Date;
}

export interface League {
  id: string;
  league_name: string;
  users: User[];
  user_bets: UserLeagueBet[];
  Invitations: Invitation[];
  scoring_type: string;
  number_bets: number;
  number_periods: number;
  period_type: string;
  is_private: boolean;
  max_number_users: number;
  max_odds: number;
  min_odds: number;
  allow_ml: boolean;
  allow_spread: boolean;
  allow_total: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface UserLeagueBet {
  id: string;
  user: User;
  userID: string;
  league: League;
  leagueID: string;
  event?: Event;
  eventID: string;
  team_name?: string;
  Opponent?: string;
  bet_type: string;
  price: number;
  point?: number;
  result: number;
  createdAt: Date;
  start_date: Date;
  status : Number | null;
}

export interface Event {
  id: string;
  gameID: string;
  sportTitle: string;
  sportKey: string;
  homeTeam: string;
  awayTeam: string;
  lastUpdate: Date;
  awayML?: number;
  homeML?: number;
  awaySpreadPoint?: number;
  homeSpreadPoint?: number;
  awaySpreadPrice?: number;
  homeSpreadPrice?: number;
  totalPoint?: number;
  overPrice?: number;
  underPrice?: number;
  startDate: Date;
  homeScore?: number;
  awayScore?: number;
  status: number; // 0 not started, 1 in progress, 2 complete
  userleaguebets: UserLeagueBet[];
}

  
  export type Invitation = {
    id: number;
    sender: User;
    sender_id: string;
    receiver: User;
    receiver_id: string;
    timeSent: Date;
    accepted: boolean;
  };
  