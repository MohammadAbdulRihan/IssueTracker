"use client";
import AuthGuard from "@/app/auth/AuthGuard";
import IssueSummary from "../IssueSummary";
import LatestIssues from "../LatestIssues";
import IssueChart from "../IssueChart";

export default function DashboardPageClient({ open, inProgress, closed, latestIssues }: { open: number; inProgress: number; closed: number; latestIssues: any[] }) {
  return (
    <AuthGuard>
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700 overflow-x-hidden overflow-y-auto p-0 m-0">
        {/* Animated floating shapes for depth and energy */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute animate-pulse bg-blue-200/40 rounded-full w-[32rem] h-[32rem] -top-40 -left-40 blur-3xl" />
          <div className="absolute animate-spin-slow bg-sky-200/40 rounded-full w-96 h-96 -bottom-32 right-20 blur-2xl" />
          <div className="absolute animate-bounce bg-yellow-200/30 rounded-full w-60 h-60 top-1/2 left-1/2 blur-2xl" />
          <div className="absolute animate-float bg-indigo-200/30 rounded-full w-40 h-40 top-1/4 right-1/4 blur-2xl" />
        </div>
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-sky-400 to-yellow-400 bg-clip-text text-transparent mb-8 text-center drop-shadow-2xl animate-gradient-text tracking-tight z-10">Dashboard</h2>
        <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl z-10">
          <div className="flex-1 bg-white/80 dark:bg-zinc-900/80 border border-blue-200 dark:border-blue-900 rounded-2xl shadow-2xl px-8 py-6 flex flex-col mb-8 backdrop-blur-md w-full transition-transform hover:scale-[1.02]">
            <IssueSummary open={open} inProgress={inProgress} closed={closed} />
            <div className="mt-8 w-full">
              <IssueChart open={open} inProgress={inProgress} closed={closed} />
            </div>
          </div>
          <div className="flex-1 bg-white/80 dark:bg-zinc-900/80 border border-yellow-200 dark:border-blue-900 rounded-2xl shadow-2xl px-8 py-6 flex flex-col mb-8 backdrop-blur-md w-full transition-transform hover:scale-[1.02]">
            <LatestIssues issues={latestIssues} />
          </div>
        </div>
        <footer className="mt-16 text-zinc-700 dark:text-zinc-300 text-lg animate-fade-in-up z-10">
          Made with <span className="text-blue-400">&#10084;</span> by <a className="underline hover:text-blue-400 dark:hover:text-yellow-300">Abdul Rihan</a>
        </footer>
      </div>
    </AuthGuard>
  );
}
