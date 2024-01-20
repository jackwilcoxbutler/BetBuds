import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import SignOut from "./signout_button";
import Link from "next/link";
import InboxModal from "./Invitations/InboxModal";

export default async function ProtectedHeader() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session && (
        <div className="flex space-x-8">
          <InboxModal/>
          <SignOut/>
        </div>
      )}
      {!session && (
        <div>
        <Link
        className="text-t-grey hover:text-stone-800 "
        href={"/login"}
      >
        Sign In
      </Link>
      </div>
      )}
    </div>
  );
}
