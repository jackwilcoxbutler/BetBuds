import SignOut from "@/components/signout_button";

export default function Page({
    params,
  }: {
    params: { id: string }
  }) {
    return (
        <div>
        <header className="flex items-center justify-between p-4">
            {/*replace with homebutton component*/}
            <h1 className="text-2xl font-bold">BetBuds</h1>
            <SignOut/>
        </header>
        <h1>{params.id}</h1>
        </div>
    );
  }