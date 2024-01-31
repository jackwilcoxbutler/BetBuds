import AuthButton from "./auth-status";


export const DefaultHeader = () => {


  return (
    <header className="bg-t-dark-blue sticky top-0">
      {/*replace with homebutton component*/}
      <div className="flex items-center justify-between p-4 bg-t-dark-blue mx-32">
        <a
          href="/protected/home/americanfootball_nfl"
          className="text-2xl font-bold text-t-grey"
        >
         BetBuds
        </a>
        <div className="flex space-x-8 items-center">
          <AuthButton />
        </div>
      </div>
    </header>
  )
}

export default DefaultHeader;