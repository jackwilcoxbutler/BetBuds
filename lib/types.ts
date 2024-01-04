// types.ts

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    leagues: League[];
    user_bets: UserLeagueBet[];
    receivedInvites: Invitation[] | null;
    sentInvites: Invitation[] | null;
    createdAt: Date;
  };
  
  export type League = {
    id: string;
    league_name: string;
    users: User[];
    user_bets: UserLeagueBet[];
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
  };
  
  export type UserLeagueBet = {
    id: string;
    user: User;
    userID: string;
    league: League;
    leagueID: string;
    team_name: string;
    bet_type: string;
    line: number; // Assuming Decimal translates to number
    result: number; // Assuming Decimal translates to number
    createdAt: Date;
    start_date: Date;
  };
  
  export type Invitation = {
    id: number;
    sender: User;
    sender_id: string;
    receiver: User;
    receiver_id: string;
    timeSent: Date;
    accepted: boolean;
  };
  