"use client";
import AuthGuard from "@/app/auth/AuthGuard";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import { AiFillPlusCircle } from "react-icons/ai";

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { 
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);

export default function NewIssuePageClient() {
  return (
    <AuthGuard>
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700 overflow-hidden p-0 m-0">
        {/* Animated floating shapes for depth and energy */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute animate-pulse bg-blue-200/40 rounded-full w-[32rem] h-[32rem] -top-40 -left-40 blur-3xl" />
          <div className="absolute animate-spin-slow bg-sky-200/40 rounded-full w-96 h-96 -bottom-32 right-20 blur-2xl" />
          <div className="absolute animate-bounce bg-yellow-200/30 rounded-full w-60 h-60 top-1/2 left-1/2 blur-2xl" />
          <div className="absolute animate-float bg-indigo-200/30 rounded-full w-40 h-40 top-1/4 right-1/4 blur-2xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center w-full px-0 py-0 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          <div className="flex flex-col items-center mb-8 mt-8">
            <AiFillPlusCircle className="text-6xl text-blue-400 drop-shadow-glow animate-pop" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-sky-700 dark:text-blue-200 mt-2 mb-2 tracking-tight drop-shadow-2xl animate-gradient-text bg-gradient-to-r from-blue-400 via-sky-400 to-yellow-400 bg-clip-text text-transparent">Create a New Issue</h1>
            <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-200 font-medium animate-fade-in-up delay-100 text-center max-w-2xl shadow-lg rounded-xl px-6 py-2 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-blue-200/40 dark:border-blue-900/40">Describe your problem, bug, or feature request. The more details, the faster we can squash it! <span className="animate-wiggle inline-block">🚀</span></p>
          </div>
          <div className="w-full flex justify-center">
            <IssueForm />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
