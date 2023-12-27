'use client';
import { useSession } from "next-auth/react";
import SignOut from "@/components/signout_button";
import Head from "next/head";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
import CreateLeagueForm from "@/components/CreateLeagueForm";

export default function Home() {
  const { data: session, update } = useSession();

  return (
    <div>
    <header className="flex items-center justify-between p-4">
      {/*replace with homebutton component*/}
      <h1 className="text-2xl font-bold">BetBuds</h1>
      <SignOut/>
    </header>
    <div className="flex h-screen justify-center bg-white">
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <CreateLeagueForm/>
          </div>
      </div>
    </div>
  );
}
