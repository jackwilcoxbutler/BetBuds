import CreateLeagueForm from "@/components/leagues/CreateLeagueForm";
import DefaultHeader from "@/components/header";

export default function Home() {
  return (
    <div>
      <DefaultHeader />
      <div className="flex w-screen h-screen bg-t-orange justify-center items-center">
        <div className="flex flex-col h-2/3 w-2/3 justify-center">
          <CreateLeagueForm />
        </div>
      </div>
    </div>
  );
}