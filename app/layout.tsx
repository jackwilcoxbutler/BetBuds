// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import Provider from "./context/client-provider";
import { authOptions } from "./api/auth/[...nextauth]/route";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "WagerWars - Bet against friends";
const description =
  "A sports picks competition against your friends.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
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
        <Suspense fallback="Loading...">
          {/* @ts-expect-error Async Server Component */}
          {/*<AuthStatus />*/}
        </Suspense>
      {children}
      </Provider>
      </body>
    </html>
  )
}
