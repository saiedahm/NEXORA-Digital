import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function WorkspacePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  let workspace: any = null;
  let projects: any[] = [];

  if (user) {
    const { data: membership } = await supabase
      .from("memberships")
      .select("organization_id, role, organizations(id, name, slug)")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    workspace = membership?.organizations ?? null;

    if (workspace?.id) {
      const { data } = await supabase
        .from("projects")
        .select("id, name, description, created_at, updated_at")
        .eq("organization_id", workspace.id)
        .order("created_at", { ascending: false });
      projects = data ?? [];
    }
  }

  return (
    <main className="inner-page">
      <Link className="back-link" href="/">← NEXORA</Link>
      <div className="inner-kicker">NEXORA · WORKSPACE</div>
      <h1>Your digital <span>workspace.</span></h1>

      {!user ? (
        <section className="account-panel">
          <div className="account-side">
            <span className="account-label">SECURE ACCESS</span>
            <h2>Sign in to<br /><span>your workspace.</span></h2>
            <p>Your projects and organization data are private to your account.</p>
          </div>
          <div className="account-form-area">
            <p className="account-intro">You need an authenticated NEXORA account to access the workspace.</p>
            <Link className="primary-button" href="/account">Sign in →</Link>
          </div>
        </section>
      ) : (
        <>
          <section className="account-panel">
            <div className="account-side">
              <span className="account-label">ACTIVE WORKSPACE</span>
              <h2>{workspace?.name || "NEXORA Workspace"}</h2>
              <p>Signed in as <strong>{user.email}</strong>. Your workspace is isolated by organization membership.</p>
            </div>
            <div className="account-form-area">
              <span className="account-label">PROJECTS</span>
              <h2>{projects.length} project{projects.length === 1 ? "" : "s"}</h2>
              <p>Project records will become the foundation for your AI Studio and automation work.</p>
              <Link className="primary-button" href="/ai-studio">Open AI Studio →</Link>
            </div>
          </section>

          <section className="feature-grid">
            {projects.length ? projects.map((project) => (
              <article className="feature-card" key={project.id}>
                <span>PROJECT</span>
                <h3>{project.name}</h3>
                <p>{project.description || "NEXORA project workspace."}</p>
              </article>
            )) : (
              <article className="feature-card">
                <span>READY</span>
                <h3>Your first project</h3>
                <p>The project creation layer is the next workspace step.</p>
              </article>
            )}
          </section>
        </>
      )}
    </main>
  );
}
