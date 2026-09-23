import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userName = session.user.name || "NEXORA User";
  const userEmail = session.user.email || "";

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-3 border-b border-[#202A46] pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#00D9FF]">
              NEXORA DIGITAL
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Welcome, {userName}
            </h1>

            {userEmail && (
              <p className="mt-2 text-[#A7B0C0]">
                {userEmail}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-[#202A46] bg-[#0B1022] px-5 py-3 text-sm text-[#A7B0C0]">
            Account active
          </div>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <p className="text-sm text-[#667085]">Projects</p>
            <h2 className="mt-3 text-3xl font-bold">0</h2>
            <p className="mt-2 text-sm text-[#A7B0C0]">
              Your AI projects will appear here.
            </p>
          </div>

          <div className="card p-6">
            <p className="text-sm text-[#667085]">AI Agents</p>
            <h2 className="mt-3 text-3xl font-bold">15</h2>
            <p className="mt-2 text-sm text-[#A7B0C0]">
              Specialized managers available to the platform.
            </p>
          </div>

          <div className="card p-6">
            <p className="text-sm text-[#667085]">Execution</p>
            <h2 className="mt-3 text-3xl font-bold">Ready</h2>
            <p className="mt-2 text-sm text-[#A7B0C0]">
              Project execution will be connected to payment and task state.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="card p-8">
            <h2 className="text-2xl font-bold">
              Create your first project
            </h2>

            <p className="mt-3 max-w-2xl text-[#A7B0C0]">
              Describe what your business needs. NEXORA will use the project
              workflow to organize the work and connect the appropriate AI
              managers.
            </p>

            <button
              type="button"
              disabled
              className="mt-6 cursor-not-allowed rounded-xl bg-[#202A46] px-6 py-3 font-semibold text-[#667085]"
            >
              Project creation — next module
            </button>
          </div>
        </section>
      </div>
    </main>
  );
} 
