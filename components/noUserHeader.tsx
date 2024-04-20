import AuthButton from "./auth-status";


export const DefaultHeader = () => {


  return (
    <header className="bg-t-dark-blue sticky top-0">
      {/*replace with homebutton component*/}
      <div className="flex items-center justify-between p-2 sm:p-4 bg-t-dark-blue mx-4 sm:mx-32">
        <a
          href="/protected/home/americanfootball_nfl"
          className="text-lg sm:text-2xl font-bold text-t-orange"
        >
         BetBuds
        </a>
        <div className="flex space-x-2 sm:space-x-8 items-center">
          <AuthButton />
        </div>
      </div>
    </header>
  )
}

export default DefaultHeader;