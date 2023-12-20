import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <div>
      {session && (
        <p className="text-white text-sm">
          Signed in as {session.user?.email}
        </p>
      )}
      {!session && (
        <p className="text-white text-sm">
          Logged out
        </p>
      )}
    </div>
  );
}
