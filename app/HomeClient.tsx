"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomeClient({ open, inProgress, closed }: { open: number; inProgress: number; closed: number }) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700 overflow-x-hidden overflow-y-auto">
      {/* Animated SVG Wave */}
      <svg className="absolute top-0 left-0 w-full h-40 md:h-64" viewBox="0 0 1440 320"><path fill="#60a5fa" fillOpacity="0.18" d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,133.3C672,107,768,85,864,101.3C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 via-sky-400 to-yellow-400 bg-clip-text text-transparent mb-8 text-center drop-shadow-2xl animate-gradient-text">Issue Tracker</h1>
      <p className="text-2xl md:text-3xl text-zinc-700 dark:text-zinc-100 mb-10 text-center max-w-3xl animate-fade-in-up font-semibold shadow-lg rounded-xl px-8 py-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-blue-200/40 dark:border-blue-900/40">
        <span className="text-blue-500 font-bold">Effortlessly manage your team&apos;s workflow.</span> <br />
        <span className="text-sky-500 font-bold">Track bugs, assign tasks, and monitor progress</span> in real time.<br />
        <span className="text-yellow-500 font-bold">Stay organized, collaborate, and deliver faster.</span>
      </p>
      <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up">
        <div className="bg-gradient-to-r from-blue-400 to-sky-400 text-white px-10 py-6 rounded-3xl shadow-2xl font-bold text-xl flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200">
          <span className="text-3xl">⚡</span> Instant Issue Creation
          <span className="text-base font-medium text-white/80">Log bugs and tasks in seconds with a beautiful, intuitive UI.</span>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-blue-400 text-white px-10 py-6 rounded-3xl shadow-2xl font-bold text-xl flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200">
          <span className="text-3xl">📈</span> Real-Time Analytics
          <span className="text-base font-medium text-white/80">Visualize project health and progress with live charts.</span>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-10 py-6 rounded-3xl shadow-2xl font-bold text-xl flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200">
          <span className="text-3xl">🔒</span> Secure & Reliable
          <span className="text-base font-medium text-white/80">Your data is protected with enterprise-grade security.</span>
        </div>
      </div>
      {/* Removed the Open, In Progress, and Closed stats boxes here */}
      <div className="mb-10 animate-fade-in-up">
        {isAuthenticated ? (
          <Link href="/dashboard">
            <button className="px-12 py-5 rounded-full bg-gradient-to-r from-blue-400 via-sky-400 to-yellow-400 hover:from-blue-300 hover:to-yellow-300 text-white font-extrabold text-2xl shadow-2xl transition-all duration-300 animate-bounce tracking-wider">
              See Live Dashboard
            </button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <button className="px-12 py-5 rounded-full bg-gradient-to-r from-blue-400 via-sky-400 to-yellow-400 hover:from-blue-300 hover:to-yellow-300 text-white font-extrabold text-2xl shadow-2xl transition-all duration-300 animate-bounce tracking-wider">
              Sign In
            </button>
          </Link>
        )}
      </div>
      <footer className="mt-16 text-zinc-700 dark:text-zinc-300 text-lg animate-fade-in-up">
        Made by <a className="underline hover:text-blue-400 dark:hover:text-yellow-300">Abdul Rihan</a>
      </footer>
    </div>
  );
}
