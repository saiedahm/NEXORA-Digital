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
