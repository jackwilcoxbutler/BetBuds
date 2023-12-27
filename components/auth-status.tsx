import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session && (
        <p className="text-black text-sm">
          Signed in as {session.user.id}
        </p>
      )}
      {!session && (
        <p className="text-black text-sm">
          Logged out
        </p>
      )}
    </div>
  );
}
