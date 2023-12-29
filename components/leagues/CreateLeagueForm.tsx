// CreateLeagueForm.tsx
"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CreateLeagueForm: React.FC = () => {
  const {data : session} =  useSession();
  const session_id = session?.user.id;
  const [league_name, setLeagueName] = useState('');
  const [number_bets, setnumber_bets] = useState(1);
  const [number_periods, setnumber_periods] = useState(1);
  const [period_type, setperiod_type] = useState("Day(s)");


  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
       const response = await fetch('/api/league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ league_name: league_name},),
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
      <h2
      className='text-3xl text-bold text-t-orange'>Create a League</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label
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
      </label>
        <div className='flex flex-row justify-between'>
          <div
            className=" space-x-2 text-md text-t-grey uppercase"
          >
            Record Type :
            <br/>
            <input type="radio" id="units" name="fav_language" value="Units"/>
            <label htmlFor="units">Units </label>
            <input type="radio" id="w/l" name="fav_language" value="W/L"/>
            <label htmlFor="w/l">Wins/Losses</label>
          </div>
          <div
            className=" space-x-2 text-md text-t-grey uppercase"
          >
            Joinability
            <br/>
            <input type="radio" id="private" name="fav_language" value="private"/>
            <label htmlFor="private">Private </label>
            <input type="radio" id="public" name="fav_language" value="public"/>
            <label htmlFor="public">Public</label>
          </div>
        </div>
        <div>
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
          <select name="period" id="period" onChange={(e) => setperiod_type(e.target.value)} 
            className="text-t-dark-blue mt-1 block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm">
              <option value="Day(s)">Day(s)</option>
              <option value="Week(s)">Week(s)</option>
              <option value="Month(s)">Month(s)</option>
              <option value="Year(s)">Year(s)</option>
            </select>
          </div>
        </div>
      <button 
      type="submit"
      disabled={loading}
      className={`${
        loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100"
          : "border-black bg-black text-white hover:bg-white hover:text-black"
      } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        Create League
      </button>
    </form>
  );
};

export default CreateLeagueForm;
