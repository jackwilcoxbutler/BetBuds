import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import SignOut from "./signout_button";
import Link from "next/link";

export default async function ProtectedHeader() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session && (
          <SignOut/>
      )}
      {!session && (
        <Link
            className="text-t-white hover:bg-t-orange-200 focus:shadow-t-orange block select-none rounded-[4px] px-3 py-2 text-[20px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
            href={"/login"}
      >
        Sign In
      </Link>
      )}
    </div>
  );
}
