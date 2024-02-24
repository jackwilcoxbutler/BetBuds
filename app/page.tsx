import DefaultHeader from "@/components/noUserHeader";
import { TrophyLogo } from "@/components/ui/logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-endless-constelation">
      <div className="w-screen h-screen ">
        <DefaultHeader />
        <div className="h-screen flex flex-col justify-evenly text-t-dark-blue text-center mx-32 ">
          <div>
            <div className="flex w-full justify-center">
            <TrophyLogo height={64} weight={64}/>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-t-white ">Join the Ultimate Sports Betting Experience</h1>
            <p className="text-xl mb-8">Compete with friends. Make daily picks. Win big.</p>
            <Link href={"/register"} className="bg-t-orange hover:bg-t-orange-200 text-t-white font-bold py-2 px-4 rounded text-lg">Sign Up Now</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className=" rounded-lg border p-4 bg-t-dark-blue">
              <h2 className="font-bold text-t-white text-xl mb-4">Daily Picks</h2>
              <p className="text-t-white">Choose your bets daily and challenge your friends to see who comes out on top.</p>
            </div>
            <div className=" rounded-lg border p-4 bg-t-dark-blue">
            <h2 className="font-bold text-t-white text-xl mb-4">Compete & Win</h2>
              <p className="text-t-white">Track your progress and climb the leaderboard in your betting league.</p>
            </div>
            <div className=" rounded-lg border p-4 bg-t-dark-blue">
            <h2 className="font-bold text-t-white text-xl mb-4">Compete & Win</h2>
              <p className="text-t-white">Invite your friends to join the fun and see who knows their sports the best.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
