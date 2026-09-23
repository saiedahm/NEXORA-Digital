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
        </div>
      </section>
    </main>
  );
}
