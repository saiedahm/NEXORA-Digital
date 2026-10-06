-- NEXORA foundation schema
-- This migration creates the first multi-tenant data layer.
-- Authentication is handled by Supabase Auth (auth.users).

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member'
    check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists memberships_user_id_idx
  on public.memberships(user_id);

create index if not exists projects_organization_id_idx
  on public.projects(organization_id);

alter table public.organizations enable row level security;
alter table public.memberships enable row level security;
alter table public.projects enable row level security;

comment on table public.organizations is 'NEXORA tenant organizations.';
comment on table public.memberships is 'Users belonging to NEXORA organizations.';
comment on table public.projects is 'Projects owned by a NEXORA organization.';


-- Workspace project creation policies
create policy "members can view their organization"
  on public.memberships for select
  using (auth.uid() = user_id);

create policy "members can view organization projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = projects.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can create organization projects"
  on public.projects for insert
  with check (
    exists (
      select 1 from public.memberships m
      where m.organization_id = projects.organization_id
        and m.user_id = auth.uid()
    )
    and created_by = auth.uid()
  );

create policy "members can update organization projects"
  on public.projects for update
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = projects.organization_id
        and m.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.memberships m
      where m.organization_id = projects.organization_id
        and m.user_id = auth.uid()
    )
  );


-- AI Studio persistence
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'New AI conversation',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists conversations_project_id_idx on public.conversations(project_id);
create index if not exists conversations_user_id_idx on public.conversations(user_id);
create index if not exists messages_conversation_id_idx on public.messages(conversation_id);

alter table public.conversations enable row level security;
alter table public.messages enable row level security;

create policy "members can view organization conversations"
  on public.conversations for select
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = conversations.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can create organization conversations"
  on public.conversations for insert
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.memberships m
      where m.organization_id = conversations.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "members can update organization conversations"
  on public.conversations for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "members can view conversation messages"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and c.user_id = auth.uid()
    )
  );

create policy "members can create conversation messages"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and c.user_id = auth.uid()
    )
  );


-- Usage accounting
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  event_type text not null check (event_type in ('ai_message','ai_response')),
  units integer not null default 1 check (units > 0),
  created_at timestamptz not null default now()
);

create index if not exists usage_events_org_id_idx on public.usage_events(organization_id);
create index if not exists usage_events_user_id_idx on public.usage_events(user_id);
create index if not exists usage_events_created_at_idx on public.usage_events(created_at);

alter table public.usage_events enable row level security;

create policy "members can view organization usage"
  on public.usage_events for select
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = usage_events.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "users can create own usage"
  on public.usage_events for insert
  with check (user_id = auth.uid());


-- Subscription foundation
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free','starter','business','growth','enterprise')),
  status text not null default 'active' check (status in ('active','trialing','past_due','canceled')),
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id)
);

alter table public.subscriptions enable row level security;

create policy "members can view organization subscription"
  on public.subscriptions for select
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = subscriptions.organization_id
        and m.user_id = auth.uid()
    )
  );
