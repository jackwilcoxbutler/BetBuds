import SignOut from "@/components/signout_button";

export default function Page({
    params,
  }: {
    params: { id: string }
  }) {
    return (
    <div>
        <header 
        className="flex items-center justify-between p-4 bg-blue-400"
        >
            <a 
            href="/protected"
            className="text-2xl font-bold"
            >
            BetBuds
            </a>
            <SignOut/>
        </header>
        <h1>{params.id}</h1>
    </div>
    );
  }