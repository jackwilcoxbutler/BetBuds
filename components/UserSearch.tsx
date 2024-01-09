// pages/searchUser.tsx
'use client';
import { useState, useEffect, ChangeEvent, createContext, useContext } from 'react';
var debounce = require('lodash.debounce');
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { UsernameContext } from './Invitations/AddUserFormModal';



interface User {
  id: string,
  username: string,
}



export default function SearchUser() {
  const [searchResults, setSearchResults] = useState<User[] | null>(null);
  const context = useContext(UsernameContext);


  const fetchSearchResults = async (username: string) => {
    const response = await fetch('/api/invite/searchUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username_query: username
      },),
    });
    const data = await response.json() as User[];
    setSearchResults(data);
  }

  

  // Debounced search function
  const debouncedSearch = debounce((username: string) => {
    fetchSearchResults(username);
  }, 300); // 300ms delay

  useEffect(() => {
    if (context?.username) {
      debouncedSearch(context?.username);
    } else {
      setSearchResults(null);
    }

    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [context?.username]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    context?.setUsername(event.target.value);
  };

  return (
    <div>
      <input
        className="text-t-dark-blue shadow-t-dark-blue focus:shadow-t-light-blue inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        type="text"
        value={context?.username ?? ""}
        onChange={handleInputChange}
        placeholder="Search for a username"
      />
      {searchResults && (
      <ScrollArea.Root className="w-[200px] h-[100px] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA4 bg-white">
        <ScrollArea.Viewport className="w-full h-full rounded">
          <div className="py-[15px] px-5">
            {searchResults.map((user) => (
              <div key={user.id}>
                <button
                className="text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6"
                onClick={() => {context?.setUsername(user.username); setSearchResults(null);debouncedSearch.cancel();}}
              >
                {user.username}
              </button>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-blackA5" />
      </ScrollArea.Root>)}
    </div>
  );
}