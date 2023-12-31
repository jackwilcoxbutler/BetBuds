// CreateLeagueForm.tsx
"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateLeagueForm: React.FC = () => {
  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to month because months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  const router = useRouter();
  const [league_name, setLeagueName] = useState('');
  const [record_type,setrecord_type] = useState('none');
  const [is_private,setIsPrivate] = useState(true);
  const [number_bets, setnumber_bets] = useState(1);
  const [number_periods, setnumber_periods] = useState(1);
  const [max_users, setmax_users] = useState(10);
  const [min_odds, setmin_odds] = useState(-130);
  const [max_odds, setmax_odds] = useState(+400);
  const [allow_ml, set_ml] = useState(true);
  const [allow_spread, set_spread] = useState(true);
  const [allow_total, set_total] = useState(true);
  const [period_type, setperiod_type] = useState("Day(s)");
  const [start_date,setstart_date] = useState(new Date())
  const [end_date,setend_date] = useState(new Date())

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const today = getTodayDate();

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setstart_date(selectedDate);
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setend_date(selectedDate);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setLoading(true);
    console.log(is_private);
    
    if(!allow_ml && !allow_spread && !allow_total){
      setError('At least one bet type must be allowed');
      setLoading(false);
      return;
    }else if(number_bets <= 0 || number_periods <= 0 || max_users <= 0){
      setError('Number of bets, periods, and max users must be greater than 0');
      setLoading(false);
      return;
    }else if(max_odds < min_odds){
      setError('Max odds must be greater than minimum');
      setLoading(false);
      return;
    }else if(end_date <= start_date){
      setError('Invalid Start and end date');
      setLoading(false);
      return;
    }else if(record_type === 'none'){
      setError('Please choose a scoring type');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          league_name : league_name ,
          scoring_type : record_type,
          number_bets : number_bets,
          number_periods : number_periods,
          period_type : period_type,
          is_private : is_private,
          max_number_users : max_users,
          max_odds : max_odds,
          min_odds : min_odds,
          allow_ml : allow_ml,
          allow_spread : allow_spread,
          allow_total : allow_total,
          startDate : start_date.toISOString(),
          endDate : end_date.toISOString()
        },),
      });
      if (response.ok) {
        // League created successfully
        setLeagueName('');
        setError(null);
        setLoading(false);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create league');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating league:', error);
      setError('Internal Server Error');
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-t-light-blue px-4 py-8 sm:px-16 rounded-md"
    >
      <div className='justify-left'>
        <button 
        onClick={() => {router.back()}}
        className='text-lg text-t-grey'>
          Exit
        </button>
      </div>
      <h2
        className='text-3xl text-bold text-t-orange'>Create a League</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div
        className="block text-md text-t-grey uppercase"
      >
        League Name:
        <input
          type="text"
          value={league_name}
          onChange={(e) => setLeagueName(e.target.value)}
          required
          className="text-t-dark-blue mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div className='flex flex-row justify-between'>
        <div
          className=" space-x-2 text-md text-t-grey uppercase"
        >
          Scoring Type :
          <br />
          <input type="radio" id="UNITS" name="record_type" onChange={() => {setrecord_type("UNITS")}}/>
          <label htmlFor="UNITS">Units </label>
          <input type="radio" id="W/L" name="record_type" onChange={() => {setrecord_type("W/L")}}/>
          <label htmlFor="W/L">Wins/Losses</label>
        </div>
        <div
          className=" space-x-2 text-md text-t-grey uppercase"
        >
          Joinability :
          <br />
          <input type="radio" id="private" name="isPrivate" value="private" checked={is_private} onChange={() => {setIsPrivate(true)}} />
          <label htmlFor="private">Private </label>
          <input type="radio" id="public" name="isPrivate" value="public" onChange={() => {setIsPrivate(false)}}/>
          <label htmlFor="public">Public</label>
        </div>
      </div>
      <div>
        <div
          className="block text-md text-t-grey uppercase"
        >
          Number of bets per time period :
          <div className='flex flex-row space-x-2 text-md text-t-grey uppercase'>
            <input
              type="number"
              id='number_bets'
              value={number_bets}
              onChange={(e) => setnumber_bets(e.target.valueAsNumber)}
              required
              className="w-14 text-t-dark-blue mt-1 block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
            <div className='flex justify-center items-center'>
              bets per
            </div>
            <input
              type="number"
              id='number_periods'
              value={number_periods}
              onChange={(e) => setnumber_periods(e.target.valueAsNumber)}
              required
              className="w-14 text-t-dark-blue mt-1 block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
            <select name="period" id="period" value={period_type} onChange={(e) => setperiod_type(e.target.value)}
              className="text-t-dark-blue mt-1 block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm">
              <option value="Day(s)">Day(s)</option>
              <option value="Week(s)">Week(s)</option>
              <option value="Month(s)">Month(s)</option>
              <option value="Year(s)">Year(s)</option>
            </select>
          </div>
        </div>
        <br />
        <div
          className="block text-md text-t-grey uppercase"
        >
          Max number of players :
          <input
            type="number"
            id='max_users'
            value={max_users}
            onChange={(e) => setmax_users(e.target.valueAsNumber)}
            required
            className="w-14 text-t-dark-blue mt-1 block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <br />
        <div
          className="block text-md text-t-grey"
        >
          ODDS RANGE :
          <br />
          <text className='text-xs'> Example : -130 to +150 means that any bet placed must be between -130 and +150</text>
          <div className='flex flex-row space-x-2'>
            <input
              type="number"
              id='min odds'
              value={min_odds}
              onChange={(e) => setmin_odds(e.target.valueAsNumber)}
              required
              className="w-20 text-t-dark-blue mt-1 block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
            <div className='flex justify-center items-center'>
              to
            </div>
            <input
              type="number"
              id='max odds'
              value={max_odds}
              onChange={(e) => setmax_odds(e.target.valueAsNumber)}
              required
              className="w-20 text-t-dark-blue mt-1 block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
        </div>
        <br/>
        <div
          className="block text-md text-t-grey uppercase"
        >
          Bet Types Allowed :
          <br/>
          <div className='flex flex-row space-x-2'>
          <input type="checkbox" id="ML" name="ML" checked={allow_ml} onChange={() => {if(allow_ml){set_ml(false);} else {set_ml(true);}}}/>
          <label htmlFor="vehicle1">MoneyLine</label>
          <input type="checkbox" id="Spread" name="Spread" checked={allow_spread} onChange={() => {if(allow_spread){set_spread(false);} else {set_spread(true);}}}/>
          <label htmlFor="vehicle2">Spread</label>
          <input type="checkbox" id="Total" name="Total" checked={allow_total}  onChange={() => {if(allow_total){set_total(false);} else {set_total(true);}}}/>
          <label htmlFor="vehicle3">Total</label>
          </div>
        </div>
        <br/>
        <div className='flex flex-row space-x-16'>
          <div          
          className="block text-md text-t-grey uppercase"
          >
            START DATE :
            <br/>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={start_date.toISOString().split('T')[0]}
              min={today}
              onChange={handleStartDateChange}
              max="2025-06-14" 
              className='text-t-dark-blue bg-t-light-blue'/>
          </div>
          <br/>
          <div          
          className="block text-md text-t-grey uppercase"
          >
            END DATE :
            <br/>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={end_date.toISOString().split('T')[0]}
              min={today}
              onChange={handleEndDateChange}
              max="2025-06-14" 
              className='text-t-dark-blue bg-t-light-blue'/>
          </div>
        </div>
      </div >
      <button
        type="submit"
        disabled={loading}
        className={`${loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100"
          : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        Create League
      </button>
    </form >
  );
};

export default CreateLeagueForm;
