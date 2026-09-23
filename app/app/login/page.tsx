 import { signIn } from "@/lib/auth/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <div className="mx-auto max-w-md">
        <div className="card p-8">
          <h1 className="text-3xl font-bold">Welcome to NEXORA DIGITAL</h1>

          <p className="mt-3 text-[#A7B0C0]">
            Sign in to create and manage your AI-powered projects.
          </p>

          <div className="mt-8 grid gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("google", {
                  redirectTo: "/dashboard",
                });
              }}
            >
              <button
                type="submit"
                className="w-full rounded-xl border border-[#202A46] bg-white px-5 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Continue with Google
              </button>
            </form>

            <form
              action={async () => {
                "use server";
                await signIn("facebook", {
                  redirectTo: "/dashboard",
                });
              }}
            >
              <button
                type="submit"
                className="w-full rounded-xl border border-[#202A46] bg-[#1877F2] px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Continue with Facebook
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-xs text-[#667085]">
            By continuing, you agree to the NEXORA DIGITAL terms and privacy
            policy.
          </p>
        </div>
      </div>
    </main>
  );
}
