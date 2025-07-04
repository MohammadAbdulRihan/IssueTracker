"use client";
import AuthGuard from "@/app/auth/AuthGuard";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import Pagination from "@/app/components/Pagination";
import IssueActions from "./IssueActions";
import { Flex } from "@radix-ui/themes";

export default function IssuesPageClient({ issues, issueCount, searchParams, pageSize, page }: {
  issues: any[];
  issueCount: number;
  searchParams: IssueQuery;
  pageSize: number;
  page: number;
}) {
  return (
    <AuthGuard>
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700 overflow-x-hidden overflow-y-auto p-0 m-0">
        {/* Animated SVG Wave */}
        <svg className="absolute top-0 left-0 w-full h-40 md:h-64" viewBox="0 0 1440 320"><path fill="#60a5fa" fillOpacity="0.18" d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,133.3C672,107,768,85,864,101.3C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-sky-400 to-yellow-400 bg-clip-text text-transparent mb-8 text-center drop-shadow-2xl animate-gradient-text tracking-tight">All Issues</h2>
        <div className="w-full max-w-6xl z-10 flex flex-col gap-8">
          <div className="bg-white/80 dark:bg-zinc-900/80 border border-blue-200 dark:border-blue-900 rounded-2xl shadow-2xl px-8 py-6 backdrop-blur-md">
            <IssueActions />
            <div className="w-full mt-6">
              <IssueTable searchParams={searchParams} issues={issues} />
            </div>
            <div className="mt-8">
              <Pagination
                pageSize={pageSize}
                currentPage={page}
                itemCount={issueCount}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
