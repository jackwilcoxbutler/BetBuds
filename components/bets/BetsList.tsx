'use client';
import * as Tabs from '@radix-ui/react-tabs';


export const BetsList: React.FC =   () => {

    const testSports = ["NFL", "NBA", "NCAAM", "MLB", "NHL"];
    let iter = 0;

    return (
        <>
            <div className="flex w-full h-full items-start justify-center text-t-dark-blue bg-t-orange">
                <Tabs.Root
                    className="flex flex-col"
                    defaultValue="tab1"
                >
                    <Tabs.List className="shrink-0 flex border-b border-mauve6">
                        {testSports.map((sport) => 
                        {
                        iter++;
                        return(
                            <Tabs.Trigger
                            className="bg-t-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                            value={"tab" + iter.toString()}
                            aria-label={sport}
                          >
                            {sport}
                          </Tabs.Trigger>
                        )})}
                    </Tabs.List>
                    <Tabs.Content
                        className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                        value="tab1"
                    >
                        
                    </Tabs.Content>
                    <Tabs.Content
                        className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                        value="tab1"
                    ></Tabs.Content>
                </Tabs.Root>
            </div>
        </>
    )
}