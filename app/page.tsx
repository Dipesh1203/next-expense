import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignInButton from "./components/SignInButton";
import DashboardClient from "./components/DashboardClient";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6">
        <div className="max-w-sm text-center space-y-6">
          <h1 className="text-3xl font-bold tracking-tighter">Minimal Ledger</h1>
          <p className="text-sm text-zinc-400">Securely track and analyze your categorized daily expenses.</p>
          <SignInButton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-xl font-bold">Ledger Dashboard</h1>
            <p className="text-xs text-zinc-400">Signed in as {session.user?.email}</p>
          </div>
        </header>

        {/* Client component wrapper handling list fetching and stats rendering */}
        <DashboardClient />
      </div>
    </main>
  );
}