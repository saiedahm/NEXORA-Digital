-- NEXORA automation run history

create table if not exists public.automation_runs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workflow_id uuid not null references public.automation_workflows(id) on delete cascade,
  triggered_by uuid not null references auth.users(id) on delete cascade,
  status text not null default 'running'
    check (status in ('running', 'completed', 'failed')),
  input text,
  output text,
  error text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists automation_runs_org_idx
  on public.automation_runs(organization_id, started_at desc);

create index if not exists automation_runs_workflow_idx
  on public.automation_runs(workflow_id, started_at desc);

create index if not exists automation_runs_trigger_idx
  on public.automation_runs(triggered_by, started_at desc);

alter table public.automation_runs enable row level security;

create policy "members can view automation runs"
  on public.automation_runs for select
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = automation_runs.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can create automation runs"
  on public.automation_runs for insert
  with check (
    triggered_by = auth.uid()
    and exists (
      select 1 from public.memberships m
      where m.organization_id = automation_runs.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can update automation runs"
  on public.automation_runs for update
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = automation_runs.organization_id
        and m.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.memberships m
      where m.organization_id = automation_runs.organization_id
        and m.user_id = auth.uid()
    )
  );
