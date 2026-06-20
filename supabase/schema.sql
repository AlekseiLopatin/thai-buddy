-- Thai Buddy — Supabase schema.
-- Run this once in the Supabase dashboard → SQL Editor → New query → Run.
--
-- ALREADY RAN AN EARLIER VERSION? Just run this one line to add the gender column:
--   alter table public.profiles add column if not exists gender text default 'female';

-- ────────────────────────────── profiles ──────────────────────────────
create table if not exists public.profiles (
  id               uuid primary key references auth.users(id) on delete cascade,
  username         text unique,
  display_name     text,
  avatar_emoji     text default '🧑‍🎓',
  gender           text default 'female', -- drives polite ending (ค่ะ/ครับ); not personal data
  placed           boolean default false,
  level            int default 1,
  xp               int default 0,
  streak           int default 0,
  last_active_date date,
  daily_goal       int default 30,
  today_date       date,
  today_xp         int default 0,
  completed_lessons jsonb default '[]'::jsonb,
  srs              jsonb default '{}'::jsonb,
  updated_at       timestamptz default now()
);

alter table public.profiles enable row level security;

-- Any signed-in user can read profiles (needed for friend search + leaderboard).
drop policy if exists "profiles readable by authenticated" on public.profiles;
create policy "profiles readable by authenticated"
  on public.profiles for select
  to authenticated using (true);

drop policy if exists "users insert own profile" on public.profiles;
create policy "users insert own profile"
  on public.profiles for insert
  to authenticated with check (auth.uid() = id);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile"
  on public.profiles for update
  to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────────────────────── friendships ─────────────────────────────
create table if not exists public.friendships (
  requester_id uuid not null references public.profiles(id) on delete cascade,
  addressee_id uuid not null references public.profiles(id) on delete cascade,
  status       text not null default 'pending' check (status in ('pending', 'accepted')),
  created_at   timestamptz default now(),
  primary key (requester_id, addressee_id)
);

create index if not exists friendships_addressee_idx on public.friendships (addressee_id);

alter table public.friendships enable row level security;

drop policy if exists "see own friendships" on public.friendships;
create policy "see own friendships"
  on public.friendships for select
  to authenticated using (auth.uid() = requester_id or auth.uid() = addressee_id);

drop policy if exists "send requests as self" on public.friendships;
create policy "send requests as self"
  on public.friendships for insert
  to authenticated with check (auth.uid() = requester_id);

drop policy if exists "accept requests to me" on public.friendships;
create policy "accept requests to me"
  on public.friendships for update
  to authenticated using (auth.uid() = addressee_id) with check (auth.uid() = addressee_id);

drop policy if exists "remove own friendships" on public.friendships;
create policy "remove own friendships"
  on public.friendships for delete
  to authenticated using (auth.uid() = requester_id or auth.uid() = addressee_id);
