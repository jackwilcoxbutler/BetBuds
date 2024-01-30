import Link from "next/link";

export interface leagueTabs {
  leagueID: string
  leagueName: string
}

interface LeagueDropdownProps {
  leagues: leagueTabs[]
}

export const LeagueDropdown: React.FC<LeagueDropdownProps> = ({ leagues }: LeagueDropdownProps) => {

  return (
    <div className="sticky left-2 z-[1] flex w-full justify-center">
      <div className="center shadow-blackA4 space-y-4 m-0 flex flex-col rounded-[6px] bg-t-light-blue p-1 shadow-lg">
      {leagues.map((league) => {
        return (<div key={league.leagueID}>
          <Link
          className="text-t-white hover:bg-t-dark-blue block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:bg-t-dark-blue focus:shadow-[0_0_0_2px]"
          href={"/protected/league/" + league.leagueID}
          >
            {league.leagueName}
          </Link>
        </div>)
      })}
    </div></div>
  );
};