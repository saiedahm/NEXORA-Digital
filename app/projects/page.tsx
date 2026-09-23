"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load projects");
        }

        const data = await response.json();
        setProjects(data.projects ?? []);
      } catch {
        setError("Unable to load your projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-[#202A46] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#00D9FF]">
              NEXORA DIGITAL
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Your Projects
            </h1>

            <p className="mt-3 text-[#A7B0C0]">
              Projects created through the NEXORA platform.
            </p>
          </div>

          <a
            href="/dashboard"
            className="rounded-xl border border-[#202A46] bg-[#0B1022] px-5 py-3 text-sm font-semibold transition hover:border-[#00D9FF]"
          >
            Dashboard
          </a>
        </header>

        {loading && (
          <div className="card mt-10 p-8 text-[#A7B0C0]">
            Loading projects...
          </div>
        )}

        {!loading && error && (
          <div className="card mt-10 border-red-900 p-8 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="card mt-10 p-10 text-center">
            <h2 className="text-2xl font-bold">
              No projects yet
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-[#A7B0C0]">
              Your first project will appear here after it has been created.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold">
                    {project.name}
                  </h2>

                  <span className="rounded-full border border-[#202A46] px-3 py-1 text-xs text-[#A7B0C0]">
                    {project.status}
                  </span>
                </div>

                {project.description && (
                  <p className="mt-4 text-sm leading-6 text-[#A7B0C0]">
                    {project.description}
                  </p>
                )}

                <p className="mt-6 text-xs text-[#667085]">
                  Created{" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
} 
