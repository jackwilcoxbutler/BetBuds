'use client';
import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import SignOut from './signout_button';
import InboxModal from './Invitations/InboxModal';
import { CreateLeagueButton } from './leagues/CreateLeagueButton';

const NavBar = () => {
  return (
    <div  className="sticky top-0 z-[1] flex w-screen justify-center py-4 space-x-4">
    <div className='flex flex-row items-center rounded-[6px] bg-t-orange p-1 shadow-lg border-4 border-t-orange-200'>
    <NavigationMenu.Root>
      <NavigationMenu.List className="center shadow-blackA4 space-x-4 m-0 flex list-none ">
        <NavigationMenu.Item>
        <NavigationMenu.Link
            className="text-t-white hover:bg-t-orange-200 focus:shadow-t-orange block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
            href="/protected/home/basketball_nba"
          >
            Home
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
        <NavigationMenu.Link
            className="text-t-white hover:bg-t-orange-200 focus:shadow-t-orange block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
            href="/protected/league/0"
          >
            Leagues
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        {/*Bets page is work in progress*/}
        {/* <NavigationMenu.Item>
        <NavigationMenu.Link
            className="text-t-white hover:bg-t-orange-200 focus:shadow-t-orange block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
            href="/protected/bets"
          >
            My Bets
          </NavigationMenu.Link>
        </NavigationMenu.Item> */}
        {/* <NavigationMenu.Item>
        <NavigationMenu.Link
            className="text-t-white hover:bg-t-orange-200 focus:shadow-t-orange block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
            href="/protected/account"
          >
            Account
          </NavigationMenu.Link>
        </NavigationMenu.Item> */}

       
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
    <SignOut/>
    </div>
    <InboxModal />
    <CreateLeagueButton expanded={false}/>
    </div>
  );
};


export default NavBar;