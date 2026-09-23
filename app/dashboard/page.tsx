 "use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  description: string | null;
  type: string | null;
  status: string;
  paymentStatus: string;
  executionUnlocked: boolean;
  progress: number;
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function loadProjects() {
    try {
      setError("");

      const response = await fetch("/api/projects", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load projects."
        );
      }

      setProjects(data.projects ?? []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function createProject(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter a project name.");
      return;
    }

    try {
      setCreating(true);
      setError("");

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          description:
            description.trim() || undefined,
          type: type.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to create project."
        );
      }

      setProjects((current) => [
        data.project,
        ...current,
      ]);

      setName("");
      setDescription("");
      setType("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create project."
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="container px-6 py-12">

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#00D9FF]">
              NEXORA DIGITAL
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Dashboard
            </h1>

            <p className="mt-3 text-[#A7B0C0]">
              Create and manage your AI projects.
            </p>
          </div>

          <Link
            href="/"
            className="text-sm text-[#00D9FF] hover:underline"
          >
            Back to website
          </Link>

        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-3">

          <div className="card p-6">
            <div className="text-sm text-[#A7B0C0]">
              Projects
            </div>

            <div className="mt-2 text-3xl font-bold">
              {projects.length}
            </div>
          </div>

          <div className="card p-6">
            <div className="text-sm text-[#A7B0C0]">
              AI Managers
            </div>

            <div className="mt-2 text-3xl font-bold">
              15
            </div>
          </div>

          <div className="card p-6">
            <div className="text-sm text-[#A7B0C0]">
              Execution
            </div>

            <div className="mt-2 text-3xl font-bold">
              {projects.some(
                (project) =>
                  project.executionUnlocked
              )
                ? "Ready"
                : "Locked"}
            </div>
          </div>

        </section>

        <section className="mt-10 card p-6">

          <h2 className="text-2xl font-bold">
            Create a project
          </h2>

          <form
            onSubmit={createProject}
            className="mt-6 grid gap-4"
          >

            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Project name"
              maxLength={120}
              className="rounded-xl border border-[#202A46] bg-[#070b1c] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
            />

            <input
              value={type}
              onChange={(event) =>
                setType(event.target.value)
              }
              placeholder="Project type, e.g. Website"
              maxLength={100}
              className="rounded-xl border border-[#202A46] bg-[#070b1c] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
            />

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Describe what you want NEXORA to build..."
              maxLength={5000}
              rows={5}
              className="rounded-xl border border-[#202A46] bg-[#070b1c] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
            />

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={creating}
              className="rounded-xl bg-[#00D9FF] px-5 py-3 font-semibold text-[#050816] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating
                ? "Creating..."
                : "Create Project"}
            </button>

          </form>

        </section>

        <section className="mt-10">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Your Projects
            </h2>

            {loading && (
              <span className="text-sm text-[#A7B0C0]">
                Loading...
              </span>
            )}

          </div>

          <div className="mt-6 grid gap-5">

            {!loading &&
              projects.length === 0 && (
                <div className="card p-8 text-center text-[#A7B0C0]">
                  No projects yet. Create your first
                  NEXORA project above.
                </div>
              )}

            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/${project.id}`}
                className="card block p-6 transition hover:border-[#00D9FF]"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>
                    <h3 className="text-xl font-semibold">
                      {project.name}
                    </h3>

                    {project.description && (
                      <p className="mt-2 text-[#A7B0C0]">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">

                    <span className="rounded-full border border-[#202A46] px-3 py-1">
                      {project.status}
                    </span>

                    <span className="rounded-full border border-[#202A46] px-3 py-1">
                      Payment:{" "}
                      {project.paymentStatus}
                    </span>

                    <span className="rounded-full border border-[#202A46] px-3 py-1">
                      {project.executionUnlocked
                        ? "Execution unlocked"
                        : "Execution locked"}
                    </span>

                  </div>

                </div>

                <div className="mt-5">

                  <div className="mb-2 flex justify-between text-xs text-[#A7B0C0]">
                    <span>Progress</span>

                    <span>
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#202A46]">

                    <div
                      className="h-full bg-[#00D9FF] transition-all"
                      style={{
                        width: `${Math.min(
                          Math.max(
                            project.progress,
                            0
                          ),
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </section>

      </div>
    </main>
  );
}
