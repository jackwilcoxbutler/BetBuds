import InboxModal from "./Invitations/InboxModal"
import SignOut from "./signout_button"

export const DefaultHeader = () => {
    return(
        <header className="bg-t-dark-blue sticky top-0">
        {/*replace with homebutton component*/}
        <div className="flex items-center justify-between p-4 bg-t-dark-blue mx-20">
          <a
            href="/protected/home/americanfootball_nfl"
            className="text-2xl font-bold text-t-orange"
          >
            Wager Wars
          </a>
          <div className="flex space-x-8 items-center">
            <InboxModal/>
            <SignOut />
          </div>
        </div>
      </header>
    )
}

export default DefaultHeader;