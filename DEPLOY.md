# Deploying Thai Buddy

Recommended host: **Vercel** (built by the Next.js team; free Hobby tier).
Supabase is already hosted — you only deploy the Next.js frontend.

## Environment variables (set these in your host)

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kzlgdlygcioqmkyatsln.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key (from `.env.local`) |

> These are the same two values as `.env.local`. The anon key is the public
> browser key, so it's safe in client env vars. Never put the **service_role** key here.

---

## Option A — Vercel CLI (fastest)

From the `thai-buddy` folder, in your own terminal:

```bash
npx vercel login        # one-time: sign in via email/GitHub
npx vercel              # creates the project, links it, deploys a preview
# add env vars (paste the values above when prompted):
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
npx vercel --prod       # deploy to production
```

(You can also add the env vars in the Vercel dashboard → Project → Settings →
Environment Variables, then re-run `npx vercel --prod`.)

## Option B — GitHub + Vercel dashboard (no CLI)

1. Create an empty repo on GitHub (e.g. `thai-buddy`).
2. Push this project:
   ```bash
   git remote add origin https://github.com/<you>/thai-buddy.git
   git add -A && git commit -m "Thai Buddy app"
   git branch -M main && git push -u origin main
   ```
3. In [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
4. Add the two environment variables (table above) → **Deploy**.

---

## After the first deploy — point Supabase at your live URL

In the Supabase dashboard → **Authentication → URL Configuration**:
- **Site URL**: `https://<your-app>.vercel.app`
- **Redirect URLs**: add `https://<your-app>.vercel.app/auth/callback`
  (keep `http://localhost:3000/auth/callback` for local dev)

If you set up Google sign-in, also add the Vercel URL anywhere the localhost URL
was used.

That's it — your app is live with accounts, cloud sync, and friends.
