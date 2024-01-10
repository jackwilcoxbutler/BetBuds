'use client'
import { getSports,getSportName,removeDuplicates } from '@/lib/betService';
import * as Tabs from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';

enum SportName {
    'americanfootball_nfl' = 'Football',
    'basketball_nba' = 'Basketball',
    'icehockey_nhl' = 'Hockey',
}

export const BetsList: React.FC = () => {

    const [sports, setSports] = useState<string[]>([]);
    const tab_names = ['Football','Basketball','Baseball','Hockey','Soccer']

    console.log(getSports());

    async function fetchInvites() {
        try {
            setSports(await getSports());
        } catch (error) {
            console.error('Error fetching sports:', error);
            setSports([]);
        }
    }

    useEffect(() => {
        fetchInvites();
    },[])

    return (
        <>
            <div className="flex w-full h-full items-start justify-center text-t-dark-blue">
                <Tabs.Root
                    className="flex flex-col w-full"
                    defaultValue="tab1"
                >
                    <Tabs.List className="shrink-0 flex  border-mauve6">
                        {tab_names.map((sport) => {
                        return (
                            <div 
                            key={sport }
                            className='flex  text-mauve11 w-full justify-center rounded-lg bg-t-white hover:text-t-dark-blue hover:bg-t-grey border border-t-dark-blue px-5 mt-4 mx-2 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black'>
                            <Tabs.Trigger
                                className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"
                                value={sport}
                                aria-label={sport}
                                key={sport + "tab"}
                            >
                                {sport}
                            </Tabs.Trigger>
                            </div>)})}
                    </Tabs.List>
                    {tab_names.map((sport) =>
                    (
                        <Tabs.Content
                            className="w-full h-screen bg-t-white"
                            value={sport}
                            key={sport}
                        >
                            <div>{sport}</div>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </div>
        </>
    )
}