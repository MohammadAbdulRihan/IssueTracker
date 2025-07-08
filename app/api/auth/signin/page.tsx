"use client";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [providers, setProviders] = useState<any>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) setError("Invalid email or password");
    if (res?.ok) window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-white via-sky-100 to-blue-100 dark:from-zinc-900 dark:via-indigo-900 dark:to-violet-700 overflow-hidden">
      <div className="relative flex flex-col items-center justify-center bg-white/80 dark:bg-zinc-900/80 rounded-3xl shadow-2xl p-6 max-w-xl w-full border border-blue-200 dark:border-violet-700 backdrop-blur-md overflow-hidden min-h-[320px]">
        {/* Decorative floating shapes */}
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-blue-200 dark:bg-violet-900 rounded-full blur-2xl opacity-50 animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-200 dark:bg-indigo-800 rounded-full blur-2xl opacity-40 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-sky-200 dark:bg-blue-900 rounded-full blur-3xl opacity-30 animate-pulse -translate-x-1/2 -translate-y-1/2" />
        {/* Main content */}
        <h1 className="text-3xl font-extrabold text-sky-700 dark:text-blue-200 mb-4 drop-shadow-lg tracking-wide z-10">
          <span className="inline-block align-middle mr-2 animate-bounce">🔑</span>
          Welcome! Sign in to continue
        </h1>
        <p className="text-base text-zinc-700 dark:text-zinc-200 mb-8 text-center max-w-xl font-medium z-10">
          Choose a provider to securely access your Issue Tracker dashboard.
        </p>
        <div className="flex flex-col gap-4 w-full z-10">
          {providers &&
            Object.values(providers)
              .filter((provider: any) => provider.id !== "credentials")
              .map((provider: any) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className={
                    provider.id === "google"
                      ? "px-8 py-3 rounded-full bg-white border border-gray-300 text-gray-800 font-bold text-lg shadow transition-all duration-300 hover:bg-gray-100 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      : "px-8 py-3 rounded-full bg-gray-800 text-white font-bold text-lg shadow transition-all duration-300 hover:bg-gray-900 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  }
                >
                  {provider.id === "google" && (
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.36 30.77 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.36 13.13 17.73 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.5z"/><path fill="#FBBC05" d="M10.67 28.65c-1.01-2.99-1.01-6.31 0-9.3l-7.98-6.2C.64 17.1 0 20.47 0 24c0 3.53.64 6.9 1.69 10.05l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.15 15.9-5.85l-7.19-5.6c-2.01 1.35-4.6 2.15-8.71 2.15-6.27 0-11.64-3.63-13.33-8.85l-7.98 6.2C6.73 42.52 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
                  )}
                  Sign in with {provider.name}
                </button>
              ))}
        </div>
        <div className="flex items-center w-full my-4 z-10">
          <div className="flex-grow border-t border-blue-200 dark:border-violet-700"></div>
          <span className="mx-4 text-lg text-blue-500 dark:text-blue-300 font-bold">or</span>
          <div className="flex-grow border-t border-blue-200 dark:border-violet-700"></div>
        </div>
        {/* Email/Password form */}
        <form onSubmit={handleCredentialsSignIn} className="flex flex-col gap-4 w-full z-10 mt-6">
          <label className="text-left text-blue-700 dark:text-blue-200 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-blue-200 dark:border-violet-700 bg-white/90 dark:bg-zinc-800/90 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label className="text-left text-blue-700 dark:text-blue-200 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-lg border border-blue-200 dark:border-violet-700 bg-white/90 dark:bg-zinc-800/90 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 hover:from-red-400 hover:to-yellow-300 text-white font-extrabold text-lg shadow-xl transition-all duration-300 hover:scale-105 tracking-wider focus:outline-none focus:ring-4 focus:ring-red-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v10.5A2.25 2.25 0 009.75 19.5h4.5a2.25 2.25 0 002.25-2.25v-1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12l3-3m0 0l-3-3m3 3H9" /></svg>
            Sign in with Email
          </button>
        </form>
      </div>
    </div>
  );
}

