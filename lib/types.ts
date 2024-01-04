type User =  {
    id        : string
    username : string
    email     : string
    password : string
    leagues : League,
    createdAt : Date
  }
  type  League = {
      id : string,
      league_name : string, 
      users : User[],
      scoring_type : string,
      number_bets : number,
      number_periods :number 
      period_type : string
      is_private : boolean
      max_number_users : number
      max_odds : number
      min_odds : number
      allow_ml : boolean
      allow_spread : boolean
      allow_total : boolean
      startDate : Date
      endDate : Date
      createdAt : Date
  }