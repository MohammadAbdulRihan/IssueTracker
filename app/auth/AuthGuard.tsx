// "use client";

// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect } from "react";

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//   const { status } = useSession();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = "";
//       };
//     }
//   }, [status]);

//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700">
//         <span className="text-2xl font-bold text-blue-400 animate-pulse">Checking authentication...</span>
//       </div>
//     );
//   }

//   if (status === "unauthenticated") {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700 overflow-hidden">
//         <div className="relative flex flex-col items-center justify-center bg-white/80 dark:bg-zinc-900/80 rounded-3xl shadow-2xl p-8 max-w-2xl w-full border border-blue-200 dark:border-violet-700 backdrop-blur-md overflow-hidden mt-[5px]">
//           {/* Decorative floating shapes */}
//           <div className="absolute -top-10 -left-10 w-28 h-28 bg-blue-200 dark:bg-violet-900 rounded-full blur-2xl opacity-50 animate-pulse" />
//           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-200 dark:bg-indigo-800 rounded-full blur-2xl opacity-40 animate-pulse" />
//           <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-sky-200 dark:bg-blue-900 rounded-full blur-3xl opacity-30 animate-pulse -translate-x-1/2 -translate-y-1/2" />
//           {/* Main content */}
//           <h1 className="text-4xl font-extrabold text-sky-700 dark:text-blue-200 mb-4 drop-shadow-lg tracking-wide animate-fade-in z-10">
//             <span className="inline-block align-middle mr-2 animate-bounce">🔒</span>
//             Sign in Required
//           </h1>
//           <p className="text-lg text-zinc-700 dark:text-zinc-200 mb-8 text-center max-w-xl font-medium z-10">
//             You must be logged in to use the Issue Tracker.<br />
//             Please sign in to continue.
//           </p>
//           <Link href="/api/auth/signin" className="z-10">
//             <button className="px-12 py-4 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-yellow-400 hover:from-blue-400 hover:to-yellow-300 text-white font-extrabold text-xl shadow-xl transition-all duration-300 hover:scale-105 tracking-wider focus:outline-none focus:ring-4 focus:ring-blue-300">
//               Sign In
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }



"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  // Ensure the hook is always called
  useEffect(() => {
    if (status === "unauthenticated") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [status]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700">
        <span className="text-2xl font-bold text-blue-400 animate-pulse">Checking authentication...</span>
      </div>
    );
  }

  // Not signed in
  if (status === "unauthenticated") {
    return (
      <div className="fixed inset-0 flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700 overflow-hidden">
        <div className="relative flex flex-col items-center justify-center bg-white/80 dark:bg-zinc-900/80 rounded-3xl shadow-2xl p-8 max-w-2xl w-full border border-blue-200 dark:border-violet-700 backdrop-blur-md overflow-hidden mt-[5px]">
          <div className="absolute -top-10 -left-10 w-28 h-28 bg-blue-200 dark:bg-violet-900 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-200 dark:bg-indigo-800 rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-sky-200 dark:bg-blue-900 rounded-full blur-3xl opacity-30 animate-pulse -translate-x-1/2 -translate-y-1/2" />

          <h1 className="text-4xl font-extrabold text-sky-700 dark:text-blue-200 mb-4 drop-shadow-lg tracking-wide animate-fade-in z-10">
            <span className="inline-block align-middle mr-2 animate-bounce">🔒</span>
            Sign in Required
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-200 mb-8 text-center max-w-xl font-medium z-10">
            You must be logged in to use the Issue Tracker.<br />
            Please sign in to continue.
          </p>
          <Link href="/api/auth/signin" className="z-10">
            <button className="px-12 py-4 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-yellow-400 hover:from-blue-400 hover:to-yellow-300 text-white font-extrabold text-xl shadow-xl transition-all duration-300 hover:scale-105 tracking-wider focus:outline-none focus:ring-4 focus:ring-blue-300">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
