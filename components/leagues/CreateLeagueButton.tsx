'use client';

import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";



export const CreateLeagueButton: React.FC = () => {
    const router = useRouter();
    return (
      <>
      <button className='text-t-white bg-t-orange hover:bg-t-orange-200 p-4 rounded-full'
      onClick={() => {
        //console.log("Signing out");
        router.push("/protected/league/create");
      }
      }>
        <PlusIcon className="h-[16px] w-[16px] font-bold"/>
      </button>
      </>
    );
  };
