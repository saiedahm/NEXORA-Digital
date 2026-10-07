-- NEXORA automation foundation

create table if not exists public.automation_workflows (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'paused', 'archived')),
  trigger_type text not null default 'manual'
    check (trigger_type in ('manual', 'schedule', 'webhook', 'event')),
  definition jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists automation_workflows_org_idx
  on public.automation_workflows(organization_id);

create index if not exists automation_workflows_project_idx
  on public.automation_workflows(project_id);

create index if not exists automation_workflows_creator_idx
  on public.automation_workflows(created_by);

alter table public.automation_workflows enable row level security;

create policy "members can view automation workflows"
  on public.automation_workflows for select
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = automation_workflows.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can create automation workflows"
  on public.automation_workflows for insert
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.memberships m
      where m.organization_id = automation_workflows.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can update automation workflows"
  on public.automation_workflows for update
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = automation_workflows.organization_id
        and m.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.memberships m
      where m.organization_id = automation_workflows.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can delete automation workflows"
  on public.automation_workflows for delete
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = automation_workflows.organization_id
        and m.user_id = auth.uid()
    )
  );
