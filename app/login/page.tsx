import { signIn } from "@/lib/auth/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="card w-full max-w-md p-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to NEXORA DIGITAL</h1>

        <p className="mt-3 text-[#A7B0C0]">
          Sign in to access your NEXORA workspace.
        </p>

        <div className="mt-8 flex flex-col gap-4">
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
              className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:opacity-90"
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
              className="w-full rounded-xl bg-[#1877F2] px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Continue with Facebook
            </button>
          </form>

          <div className="my-2 flex items-center gap-3 text-[#A7B0C0]">
            <span className="h-px flex-1 bg-white/10" />
            <span>or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form
            action={async (formData: FormData) => {
              "use server";
              const email = String(formData.get("email") ?? "").trim();

              if (!email) {
                return;
              }

              await signIn("email", {
                email,
                redirectTo: "/dashboard",
              });
            }}
            className="flex flex-col gap-3"
          >
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none transition placeholder:text-[#7F8999] focus:border-cyan-400"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
            >
              Send magic link by email
            </button>
          </form>

          <p className="text-sm text-[#A7B0C0]">
            We will send a secure sign-in link to your email. No password is required.
          </p>
        </div>
      </section>
    </main>
  );
}
