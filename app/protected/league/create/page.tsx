import CreateLeagueForm from "@/components/leagues/CreateLeagueForm";

export default function Home() {
  return (
    <div className="flex w-full flex-colz mt-12">
      <div className="min-w-full overflow-x-auto shadow-md sm:rounded-lg border-2 border-t-dark-blue bg-t-white">
          <CreateLeagueForm />
      </div>
    </div>
  );
} 