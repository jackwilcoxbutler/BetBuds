// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Provider from "./context/client-provider";
import { authOptions } from "./api/auth/[...nextauth]/route";


const title = "BetBuds - Bet with friends";
const description =
  "Your favorite betting app to compete with friends in making daily picks";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
      {children}
      </Provider>
      </body>
    </html>
  )
}
