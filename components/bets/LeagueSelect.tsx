import React, { useContext, useEffect, useState } from 'react';
import { BetContext } from '@/app/context/bet-provider';
import toast, { Toaster } from 'react-hot-toast';
import LoadingDots from '../loading-dots';



interface leagueName {
  id: string,
  league_name: string
}

interface LeagueSelectorProps{
  clearBet : () => void
}

const LeagueSelector: React.FC<LeagueSelectorProps> = ({clearBet} : LeagueSelectorProps) => {
  const [leagueChoices, setLeagueChoices] = useState<leagueName[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<leagueName[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(BetContext);



  const toggleLeague = (league: leagueName) => {
    setSelectedLeagues(prevSelectedLeagues => {
      if (prevSelectedLeagues.includes(league)) {
        return prevSelectedLeagues.filter(l => l !== league);
      } else {
        return [...prevSelectedLeagues, league];
      }
    });
  };

  async function handlePlaceBet() {
    setLoading(true);
    const response = await fetch('/api/bets/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ betChoice: context?.bet, leagueIDs: selectedLeagues.map((league) => league.id) }),
    });
    if (!response.ok) {
      toast.error(`Error: ${response.status}`);
    }
    //const data = await response.json();
    if (response.ok) {
      setIsDropdownOpen(false);
      setSelectedLeagues([]);
      clearBet();
    }
    setLoading(false);

  }

  useEffect(() => {
    setIsDropdownOpen(false);
    async function fetchLeagues() {
      try {
        const response = await fetch('/api/league/geteligible', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ odds: context?.bet?.price, date: context?.bet?.start_date.toISOString() }),
        });

        if (!response.ok) {
          toast.error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setLeagueChoices(data);
      } catch (error) {
        console.error('Failed to fetch leagues:', error);
      }
    }

    if (context?.bet) { // Assuming selectedBet 0 means no bet is selected
      fetchLeagues();
    }
  }, [context?.bet]);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='flex flex-row space-x-4'>
      <Toaster />
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className={`inline-flex justify-center bg-t-dark-blue ${(leagueChoices.length > 0) ? ' hover:outline hover:outline-2 hover:outline-t-white ' : ''} text-t-white rounded-md shadow-mg px-2 py-1 text-sm font-medium`}
            id="menu-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            onClick={handleButtonClick}
            disabled={(leagueChoices.length === 0)}
          >
            {(leagueChoices.length > 0) ? "Select Leagues " : "No leagues"}
            {(leagueChoices.length > 0) && <svg className={`${isDropdownOpen ? 'transform rotate-180' : ''} -mr-1 ml-2 h-5 w-5`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.294-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>}
          </button>
        </div>

        {isDropdownOpen && (
          <div
            className="text-t-dark-blue origin-bottom-right absolute right-0 bottom-full mb-2 w-56 rounded-md shadow-lg bg-t-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              {leagueChoices.map((league) => (
                <label key={league.id} className="text-gray-700 flex justify-start items-center px-4 py-2 text-sm">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    value={league.league_name}
                    onChange={() => toggleLeague(league)}
                    checked={selectedLeagues.includes(league)}
                  />
                  <span className="ml-2">{league.league_name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        className="inline-block text-left">
          {selectedLeagues.length > 0 && (
          <button
            onClick={handlePlaceBet}
            className={` inline-flex justify-center bg-t-dark-blue ${(selectedLeagues.length > 0) ? ' hover:outline hover:outline-2 hover:outline-t-white ' : ''} text-t-white rounded-md shadow-mg px-2 py-1 text-sm font-medium`}
            disabled={loading || (selectedLeagues.length == 0)}
          >
            {!loading ? "Place Bet" : <LoadingDots color='t-orange' />}
          </button>
          // <TooltipDemo/>
          )}
      </div>

    </div>
  );
};

export default LeagueSelector;
