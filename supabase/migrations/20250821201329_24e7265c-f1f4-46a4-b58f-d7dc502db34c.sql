-- ================================
-- RESET (si tables déjà existantes)
-- ================================
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user cascade;
drop function if exists public.update_updated_at_column cascade;

drop table if exists public.stories cascade;
drop table if exists public.orders cascade;
drop table if exists public.profiles cascade;

-- ================================
-- TABLES
-- ================================

-- 1) profiles : id = auth.users.id (clé unique, pas de user_id séparé)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2) orders : une commande d'histoire par utilisateur
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  child_name text not null,
  child_age integer not null,
  interests text[] default '{}',
  status text default 'draft' check (status in ('draft','generating','ready','paid','completed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3) stories : le contenu généré lié à une commande
create table public.stories (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  story_json jsonb,
  cover_url text,
  pdf_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index utiles
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_stories_order_id on public.stories(order_id);

-- ================================
-- RLS (Row Level Security)
-- ================================
alter table public.profiles enable row level security;
alter table public.orders   enable row level security;
alter table public.stories  enable row level security;

-- profiles : chaque utilisateur lit/modifie son propre profil (id = auth.uid())
create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "update own profile" on public.profiles
  for update using (auth.uid() = id);

-- orders : visibilité/écriture limitées au propriétaire
create policy "read own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "insert own orders" on public.orders
  for insert with check (auth.uid() = user_id);

create policy "update own orders" on public.orders
  for update using (auth.uid() = user_id);

-- stories : accès seulement si l'order lié appartient à l'utilisateur
create policy "read stories via own orders" on public.stories
  for select using (
    exists(
      select 1 from public.orders o
      where o.id = stories.order_id and o.user_id = auth.uid()
    )
  );

create policy "insert stories via own orders" on public.stories
  for insert with check (
    exists(
      select 1 from public.orders o
      where o.id = stories.order_id and o.user_id = auth.uid()
    )
  );

create policy "update stories via own orders" on public.stories
  for update using (
    exists(
      select 1 from public.orders o
      where o.id = stories.order_id and o.user_id = auth.uid()
    )
  );

-- ================================
-- STORAGE (bucket privé + policies)
-- ================================
insert into storage.buckets (id, name, public)
values ('books','books',false)
on conflict (id) do nothing;

-- Convention de chemin : `${user.id}/orders/${orderId}/...`
-- Split du chemin sur le premier dossier pour le contrôle d'accès
create policy "books: read own files" on storage.objects
  for select using (
    bucket_id = 'books' and
    auth.uid()::text = split_part(name, '/', 1)
  );

create policy "books: upload own files" on storage.objects
  for insert with check (
    bucket_id = 'books' and
    auth.uid()::text = split_part(name, '/', 1)
  );

create policy "books: update own files" on storage.objects
  for update using (
    bucket_id = 'books' and
    auth.uid()::text = split_part(name, '/', 1)
  )
  with check (
    bucket_id = 'books' and
    auth.uid()::text = split_part(name, '/', 1)
  );

create policy "books: delete own files" on storage.objects
  for delete using (
    bucket_id = 'books' and
    auth.uid()::text = split_part(name, '/', 1)
  );

-- ================================
-- TRIGGERS (updated_at + profil auto)
-- ================================

-- 1) updated_at auto
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger tg_orders_updated_at
  before update on public.orders
  for each row execute function public.update_updated_at_column();

create trigger tg_stories_updated_at
  before update on public.stories
  for each row execute function public.update_updated_at_column();

-- 2) création automatique du profil à l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, created_at, updated_at)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email), now(), now())
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();