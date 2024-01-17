'use client'
import { getSports, getSportNames, removeDuplicates } from '@/lib/betService';
import * as Tabs from '@radix-ui/react-tabs';
import { SportTabContent } from './SportTabContent';


export const BetsList: React.FC = () => {

    const tab_names = ['Football', 'Basketball', 'Baseball', 'Hockey', 'Soccer']

    
    return (
        <>
            <div className="flex w-full h-full items-start justify-center text-t-dark-blue">
                <Tabs.Root
                    className="flex flex-col w-full"
                    defaultValue="Basketball"
                >
                    <Tabs.List className="shrink-0 flex mx-3 pb-4 border-b border-t-dark-blue">
                        {tab_names.map((sport) => {
                            return (
                                <div
                                    key={sport}
                                    className='flex  text-mauve11 w-full justify-center rounded-lg bg-t-white hover:text-t-dark-blue hover:bg-t-grey border border-t-dark-blue px-5 mt-4 mx-2 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black '>
                                    <Tabs.Trigger
                                        className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-noneselect-none data-[state=active]:text-t-dark-blue  cursor-default"
                                        value={sport}
                                        aria-label={sport}
                                        key={sport}
                                    >
                                        {sport}
                                    </Tabs.Trigger>
                                </div>)
                        })}
                    </Tabs.List>
                    {tab_names.map((sport) => {
                        const sportKeys = getSportNames(sport);
                        return (
                            <Tabs.Content
                                className="w-full h-screen"
                                value={sport}
                                key={sport}
                            >
                                <div className='flex h-full w-full justify-center'>
                                    <SportTabContent sport={sport} />
                                </div>
                            </Tabs.Content>
                        )
                    })}
                </Tabs.Root>
            </div>
        </>
    )
}