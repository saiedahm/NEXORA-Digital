create table if not exists public.knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  source_type text not null default 'text' check (source_type in ('text','url','file','qa')),
  source_url text,
  content text not null default '',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists knowledge_documents_organization_id_idx
  on public.knowledge_documents(organization_id);

create index if not exists knowledge_documents_project_id_idx
  on public.knowledge_documents(project_id);

alter table public.knowledge_documents enable row level security;

create policy "members can view knowledge documents"
  on public.knowledge_documents for select
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = knowledge_documents.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can create knowledge documents"
  on public.knowledge_documents for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.memberships m
      where m.organization_id = knowledge_documents.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can update knowledge documents"
  on public.knowledge_documents for update
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = knowledge_documents.organization_id
        and m.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.memberships m
      where m.organization_id = knowledge_documents.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can delete knowledge documents"
  on public.knowledge_documents for delete
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = knowledge_documents.organization_id
        and m.user_id = auth.uid()
    )
  );
