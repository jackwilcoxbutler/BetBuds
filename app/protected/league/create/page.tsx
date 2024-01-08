import SignOut from "@/components/signout_button";
import CreateLeagueForm from "@/components/leagues/CreateLeagueForm";
import InboxModal from "@/components/Invitations/InboxModal";

export default function Home() {
  return (
  <div>
    <header className="bg-t-dark-blue sticky top-0">
        {/*replace with homebutton component*/}
        <div className="flex items-center justify-between p-4 bg-t-dark-blue mx-20">
          <a
            href="/protected"
            className="text-2xl font-bold text-t-orange"
          >
            BetBuds
          </a>
          <div className="flex space-x-8 items-center">
            <InboxModal/>
            <SignOut />
          </div>
        </div>
      </header>
        <div className="flex w-screen h-screen bg-t-orange justify-center items-center">
          <div className="flex flex-col h-2/3 w-2/3 justify-center">
            <CreateLeagueForm/>
          </div>
        </div>
  </div>
  );
}