import { ListLeagues } from "@/components/leagues/ListLeagues";
import SignOut from "@/components/signout_button";

export default function Page({
    params,
  }: {
    params: { id: string }
  }) {
    return (
    <div>
        <header className="bg-t-dark-blue">
        {/*replace with homebutton component*/}
          <div className="flex items-center justify-between p-4 bg-t-dark-blue mx-32">
            <a 
            href="/protected"
            className="text-2xl font-bold text-t-orange"
            >
            BetBuds
            </a>
            <SignOut/>
          </div>
        </header>

        <div className="flex w-screen h-screen bg-t-orange justify-center">
          <div className="flex w-2/3 border justify-center">
            <ListLeagues/>
          </div>
        </div>
    
    </div>
    );
  }