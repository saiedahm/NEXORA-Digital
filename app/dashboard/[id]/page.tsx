 import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-20 text-white">
        <div className="container">
          <h1 className="text-3xl font-bold">
            Login required
          </h1>

          <Link
            href="/login"
            className="mt-6 inline-block text-[#00D9FF] hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const { id } = await params;

  const membership =
    await prisma.organizationMember.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        id: "asc",
      },
      select: {
        organizationId: true,
      },
    });

  if (!membership) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-20 text-white">
        <div className="container">
          <h1 className="text-3xl font-bold">
            Organization not found
          </h1>

          <Link
            href="/dashboard"
            className="mt-6 inline-block text-[#00D9FF] hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const project = await prisma.project.findFirst({
    where: {
      id,
      organizationId: membership.organizationId,
      customerId: session.user.id,
    },
    include: {
      tasks: {
        include: {
          agent: {
            select: {
              id: true,
              key: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },

      activities: {
        orderBy: {
          createdAt: "desc",
        },
        take: 50,
      },
    },
  });

  if (!project) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-20 text-white">
        <div className="container">
          <h1 className="text-3xl font-bold">
            Project not found
          </h1>

          <Link
            href="/dashboard"
            className="mt-6 inline-block text-[#00D9FF] hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="container px-6 py-12">

        <Link
          href="/dashboard"
          className="text-sm text-[#00D9FF] hover:underline"
        >
          ← Dashboard
        </Link>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#00D9FF]">
              NEXORA PROJECT
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              {project.name}
            </h1>

            {project.description && (
              <p className="mt-4 max-w-3xl text-[#A7B0C0]">
                {project.description}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-[#202A46] bg-[#0B1022] px-5 py-4">
            <div className="text-xs uppercase tracking-wider text-[#667085]">
              Status
            </div>

            <div className="mt-1 font-semibold">
              {project.status}
            </div>
          </div>

        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-4">

          <div className="card p-5">
            <div className="text-sm text-[#A7B0C0]">
              Type
            </div>

            <div className="mt-2 font-semibold">
              {project.type || "Not specified"}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm text-[#A7B0C0]">
              Payment
            </div>

            <div className="mt-2 font-semibold">
              {project.paymentStatus}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm text-[#A7B0C0]">
              Execution
            </div>

            <div className="mt-2 font-semibold">
              {project.executionUnlocked
                ? "Unlocked"
                : "Locked"}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm text-[#A7B0C0]">
              Progress
            </div>

            <div className="mt-2 font-semibold">
              {project.progress}%
            </div>
          </div>

        </section>

        <section className="mt-10 card p-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                AI Tasks
              </h2>

              <p className="mt-2 text-sm text-[#A7B0C0]">
                Tasks assigned to the NEXORA AI managers.
              </p>
            </div>

            <span className="rounded-full border border-[#202A46] px-3 py-1 text-xs">
              {project.tasks.length} tasks
            </span>

          </div>

          <div className="mt-6 grid gap-4">

            {project.tasks.length === 0 && (
              <div className="rounded-xl border border-[#202A46] bg-[#070B1C] p-6 text-[#A7B0C0]">
                No AI tasks have been created for this
                project yet.
              </div>
            )}

            {project.tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-[#202A46] bg-[#070B1C] p-5"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                  <div>
                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#A7B0C0]">
                      {task.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {task.agent.name}
                    </div>

                    <div className="mt-1 text-xs text-[#667085]">
                      {task.agent.role}
                    </div>
                  </div>

                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">

                  <span className="rounded-full border border-[#202A46] px-3 py-1">
                    {task.status}
                  </span>

                  <span className="rounded-full border border-[#202A46] px-3 py-1">
                    Priority {task.priority}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </section>

        <section className="mt-10 card p-6">

          <h2 className="text-2xl font-bold">
            Execution
          </h2>

          <p className="mt-3 text-[#A7B0C0]">
            AI execution becomes available only after
            payment is confirmed and the project is
            unlocked.
          </p>

          <div className="mt-5 rounded-xl border border-[#202A46] bg-[#070B1C] p-5">

            {project.executionUnlocked ? (
              <div>

                <div className="font-semibold text-[#00D9FF]">
                  Execution unlocked
                </div>

                <p className="mt-2 text-sm text-[#A7B0C0]">
                  The project has passed the payment gate.
                  Tasks can now be executed through the
                  NEXORA AI workflow.
                </p>

              </div>
            ) : (
              <div>

                <div className="font-semibold">
                  Execution locked
                </div>

                <p className="mt-2 text-sm text-[#A7B0C0]">
                  Complete the required payment before AI
                  task execution can begin.
                </p>

              </div>
            )}

          </div>

        </section>

        <section className="mt-10 card p-6">

          <h2 className="text-2xl font-bold">
            Activity
          </h2>

          <p className="mt-2 text-sm text-[#A7B0C0]">
            Recent project events recorded by NEXORA.
          </p>

          <div className="mt-6 grid gap-3">

            {project.activities.length === 0 && (
              <div className="rounded-xl border border-[#202A46] bg-[#070B1C] p-5 text-sm text-[#A7B0C0]">
                No activity has been recorded yet.
              </div>
            )}

            {project.activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-[#202A46] bg-[#070B1C] p-4"
              >

                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                  <div>
                    <div className="text-sm font-semibold">
                      {activity.eventType}
                    </div>

                    <div className="mt-1 text-sm text-[#A7B0C0]">
                      {activity.message}
                    </div>
                  </div>

                  <div className="text-xs text-[#667085]">
                    {activity.createdAt.toLocaleString()}
                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>
    </main>
  );
}
