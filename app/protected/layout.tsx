
// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
import Head from "next/head";
import SignOut from "@/components/signout_button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-blue-200 text-white">
    <header className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-bold">20 Questions</h1>
      <SignOut/>
    </header>
    <div>{children}</div>
    </div>
  );
}
