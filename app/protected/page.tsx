import SignOut from "@/components/signout_button";
import Head from "next/head";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
import CreateLeagueForm from "@/components/CreateLeagueForm";

export default function Home() {
  return (
    <div>
    <header className="flex items-center justify-between p-4">
      {/*replace with homebutton component*/}
      <h1 className="text-2xl font-bold">BetBuds</h1>
      <SignOut/>
    </header>
    <div className="flex h-screen justify-center bg-white">
          <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center bg-black">
          Hello World
          </div>
          <CreateLeagueForm/>
      </div>
    </div>
  );
}
