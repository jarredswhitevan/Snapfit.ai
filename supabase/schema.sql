create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  created_at timestamptz default now(),
  onboarding_complete boolean default false,
  age int,
  height_cm int,
  weight_lbs int,
  goal text,
  training_days int,
  equipment text,
  dietary_prefs text,
  free_generation_used boolean default false
);

create table if not exists plans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  plan_json jsonb not null,
  active boolean default true
);

create table if not exists progress_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  weight_lbs int,
  workout_completed boolean default false
);

create table if not exists regen_limits (
  user_id uuid references profiles(id) on delete cascade,
  date text not null,
  count int default 0,
  primary key (user_id, date)
);

create table if not exists subscriptions (
  user_id uuid primary key references profiles(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text,
  current_period_end timestamptz
);

alter table profiles enable row level security;
alter table plans enable row level security;
alter table progress_logs enable row level security;
alter table regen_limits enable row level security;
alter table subscriptions enable row level security;

create policy "Profiles are viewable by owners" on profiles
  for select using (auth.uid() = id);

create policy "Profiles are updatable by owners" on profiles
  for update using (auth.uid() = id);

create policy "Profiles are insertable by owners" on profiles
  for insert with check (auth.uid() = id);

create policy "Plans are viewable by owners" on plans
  for select using (auth.uid() = user_id);

create policy "Plans are insertable by owners" on plans
  for insert with check (auth.uid() = user_id);

create policy "Plans are updatable by owners" on plans
  for update using (auth.uid() = user_id);

create policy "Progress logs are viewable by owners" on progress_logs
  for select using (auth.uid() = user_id);

create policy "Progress logs are insertable by owners" on progress_logs
  for insert with check (auth.uid() = user_id);

create policy "Regen limits are viewable by owners" on regen_limits
  for select using (auth.uid() = user_id);

create policy "Regen limits are insertable by owners" on regen_limits
  for insert with check (auth.uid() = user_id);

create policy "Regen limits are updatable by owners" on regen_limits
  for update using (auth.uid() = user_id);

create policy "Subscriptions are viewable by owners" on subscriptions
  for select using (auth.uid() = user_id);

create policy "Subscriptions are insertable by owners" on subscriptions
  for insert with check (auth.uid() = user_id);

create policy "Subscriptions are updatable by owners" on subscriptions
  for update using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, onboarding_complete)
  values (new.id, false)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
