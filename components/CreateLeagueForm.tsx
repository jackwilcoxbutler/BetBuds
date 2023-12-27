// CreateLeagueForm.tsx
"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';

const CreateLeagueForm: React.FC = () => {
  const {data : session} =  useSession();
  const session_id = session?.user.id;
  console.log(session_id);
  const [leagueName, setLeagueName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
       const response = await fetch('/api/league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ league_name: leagueName, id : session_id},),
      });


   
      if (response.ok) {
        // League created successfully
        console.log('League created successfully');
        setLeagueName('');
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create league');
      }
    } catch (error) {
      console.error('Error creating league:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a League</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        League Name:
        <input
          type="text"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
        />
      </label>
      <button type="submit">Create League</button>
    </form>
  );
};

export default CreateLeagueForm;
