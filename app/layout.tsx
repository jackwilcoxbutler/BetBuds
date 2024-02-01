// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
import Head from "next/head";
import NextAuth, { getServerSession } from "next-auth/next";
import Provider from "./context/client-provider";
import { authOptions } from "./api/auth/[...nextauth]/route";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
