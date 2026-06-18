# Supabase setup (auth + friends)

The app runs in **local mode** until you do this. Takes ~5 minutes.

## 1. Create a project
1. Go to [supabase.com](https://supabase.com) → sign in → **New project**.
2. Name it (e.g. `thai-buddy`), set a database password, pick a region near you, create.

## 2. Add your keys
1. In the dashboard: **Project Settings → API**.
2. Copy **Project URL** and the **anon / public** key.
3. Paste them into `.env.local` in this project:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```
4. Restart the dev server (`npm run dev`) so Next.js picks up the env vars.

## 3. Create the database tables
1. Dashboard → **SQL Editor → New query**.
2. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
   This creates `profiles` + `friendships`, row-level-security policies, and a
   trigger that makes a profile row automatically on signup.

## 4. Auth settings
- **Email/password** works out of the box. (Optionally turn *off* "Confirm email"
  under **Authentication → Providers → Email** for faster local testing.)
- Under **Authentication → URL Configuration**, set:
  - **Site URL**: `http://localhost:3000`
  - **Redirect URLs**: add `http://localhost:3000/auth/callback`
    (and your production URL + `/auth/callback` later).

## 5. (Optional) Google sign-in
1. **Authentication → Providers → Google** → enable.
2. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/)
   (OAuth client ID, type *Web*). Authorized redirect URI is the one Supabase shows
   on that provider page (`https://<your-project>.supabase.co/auth/v1/callback`).
3. Paste the Google **Client ID** and **Client secret** into Supabase and save.

## Done
Reload the app — you'll get sign-up / sign-in (and Google if configured), your
progress will sync to your account, and the Friends tab lets you search users by
username, send/accept requests, and see a real leaderboard.

> Note: the current RLS lets any signed-in user read profiles (needed for search
> and leaderboards). For production you may want to expose only safe columns via a
> view — fine to harden later.
