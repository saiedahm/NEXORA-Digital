-- NEXORA bootstrap permissions
create policy "authenticated users can create organizations"
  on public.organizations for insert
  to authenticated
  with check (true);

create policy "users can create their own membership"
  on public.memberships for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "members can create their organization subscription"
  on public.subscriptions for insert
  to authenticated
  with check (
    exists (
      select 1 from public.memberships m
      where m.organization_id = subscriptions.organization_id
        and m.user_id = auth.uid()
    )
  );