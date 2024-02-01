import CreateLeagueForm from "@/components/leagues/CreateLeagueForm";

export default function Home() {
  return (
      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg border-2 border-t-dark-blue bg-t-white my-4 mx-32">
          <CreateLeagueForm />
      </div>
  );
} 