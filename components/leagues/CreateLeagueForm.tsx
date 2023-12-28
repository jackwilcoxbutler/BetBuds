// CreateLeagueForm.tsx
"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CreateLeagueForm: React.FC = () => {
  const {data : session} =  useSession();
  const session_id = session?.user.id;
  const [leagueName, setLeagueName] = useState('');
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
        body: JSON.stringify({ league_name: leagueName},),
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
      className='text-xl text-t-orange'>Create a League</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label
        className="block text-xs text-gray-600 uppercase"
      >
      League Name:
        <input
          type="text"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </label>
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
