'use client';

import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";


interface CreateLeagueButtonProps {
  expanded : boolean 
}

export const CreateLeagueButton: React.FC<CreateLeagueButtonProps> = ({expanded = false}) => {
    const router = useRouter();
    return (
      <>
      {!expanded && (
      <button className='text-t-white bg-t-orange hover:bg-t-orange-200 p-4 rounded-full'
      onClick={() => {
        //console.log("Signing out");
        router.push("/protected/league/create");
      }
      }>
        <PlusIcon className="h-[16px] w-[16px] font-bold"/>
      </button>)}
      {expanded && (
        <div className="w-full flex justify-center">
        <button className='text-t-white bg-t-orange hover:bg-t-orange-200 p-4 rounded-full'
        onClick={() => {
          //console.log("Signing out");
          router.push("/protected/league/create");
        }
        }>
          <div className="flex flex-col justify-center items-center w-[180px]  text-xl">
            <span className="px-2">
              Create League
            </span>
            <PlusIcon className="h-[24px] w-[24px] font-bold"/>
          </div>
        </button>
        </div>
      )}
      </>
    );
  };
