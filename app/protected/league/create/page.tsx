import CreateLeagueForm from "@/components/leagues/CreateLeagueForm";
import DefaultHeader from "@/components/noUserHeader";

export default function Home() {
  return (
    <div>
      <DefaultHeader />
      <div className="flex h-screen w-screen items-center justify-center bg-t-white">
      <div className="z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-t-dark-blue shadow-xl bg-t-dark-blue">
      {/* <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16"> */}
          <CreateLeagueForm />
        {/* </div> */}
      </div>
      </div>
    </div>
  );
}