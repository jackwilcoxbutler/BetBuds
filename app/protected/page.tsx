import SignOut from "@/components/signout_button";
import Head from "next/head";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
    <header className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-bold">20 Questions</h1>
      <SignOut/>
    </header>
    <div className="flex h-screen justify-center bg-white">
          <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center bg-black">
            <Suspense>
              <AuthStatus/>
            </Suspense>
            Hello world
          </div>
        </div>
        </div>
  );
}
