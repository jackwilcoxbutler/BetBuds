import React, { useState } from 'react';

const LeagueSelector: React.FC = () => {
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [countLeagues, setCount] = useState(0);

  const toggleLeague = (league: string) => {
    setSelectedLeagues(prevSelectedLeagues => {
      if (prevSelectedLeagues.includes(league)) {
        return prevSelectedLeagues.filter(l => l !== league);
      } else {
        return [...prevSelectedLeagues, league];
      }
    });
  };


  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='flex flex-row space-x-4'>
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          onClick={handleButtonClick}
        >
          Select Leagues {selectedLeagues.length}
          <svg className={`${isDropdownOpen ? 'transform rotate-180' : ''} -mr-1 ml-2 h-5 w-5`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.294-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div
          className="origin-bottom-right absolute right-0 bottom-full mb-2 w-56 rounded-md shadow-lg bg-t-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {['league1', 'league2', 'league3', 'league4'].map((league) => (
              <label key={league} className="text-gray-700 flex justify-start items-center px-4 py-2 text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value={league}
                  onChange={() => toggleLeague(league)}
                  checked={selectedLeagues.includes(league)}
                />
                <span className="ml-2">{league}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
    <button
    //1. check if bet is valid for each league
    //  min odds max odds
    //  league is still active
    //  no bet for that league today
    //2. write to db user league bet
    >
        Place Bet
    </button>
    </div>
  );
};

export default LeagueSelector;
