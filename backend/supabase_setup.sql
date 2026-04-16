-- Run this once in the Supabase SQL editor to create the leaderboard table
-- Dashboard → SQL Editor → New query → paste this → Run

create table if not exists leaderboard_entries (
  id                 bigserial primary key,
  rank               integer not null unique,
  username           text    not null,
  points             integer not null default 0,
  watch_time_minutes integer,
  trend              text check (trend in ('up', 'down', 'stable')),
  avatar_url         text,
  updated_at         timestamptz default now()
);

-- Enable Row Level Security (anyone can read, only service key can write)
alter table leaderboard_entries enable row level security;

create policy "Public read" on leaderboard_entries
  for select using (true);

create policy "Service write" on leaderboard_entries
  for all using (auth.role() = 'service_role');
