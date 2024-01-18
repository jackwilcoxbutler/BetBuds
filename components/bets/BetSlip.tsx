import { Bet_Choice } from "@/lib/betTypes"

interface BetSlipProps{
    bet : Bet_Choice | null
}

export const BetSlip: React.FC<BetSlipProps> = ({bet}) => {

    return (
        <div className="flex w-full border rounded h-8 justify-center items-center">
                {bet && (<div>
                    {bet.team_name} vs. {bet.other_team}, {bet.start_date.toLocaleDateString()}
                </div>)}
        </div>
    )
}