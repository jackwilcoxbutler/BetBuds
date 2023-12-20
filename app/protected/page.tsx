import SignOut from "@/components/signout_button";
import Head from "next/head";
import AuthStatus from "@/components/auth-status";

export default function Home() {
  return (
   
      <div className="flex h-screen justify-center bg-white">
          <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center bg-black">
            <AuthStatus/>
            Hello world
          </div>
        </div>
  );
}
