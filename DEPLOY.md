# Deploy Badapathuria to Vercel (MongoDB + live uploads)

## 1. MongoDB Atlas (free database)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → create free account
2. Create a **free M0 cluster**
3. **Database Access** → Add user (username + password)
4. **Network Access** → **Allow Access from Anywhere** (`0.0.0.0/0`) so Vercel can connect
5. **Database** → **Connect** → **Drivers** → copy connection string

Example:

```
mongodb+srv://myuser:MyPassword123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Replace `<password>` with your real password.

## 2. Push to GitHub

Push the `badapathuria` folder to GitHub.

## 3. Import on Vercel

1. [vercel.com](https://vercel.com) → **Add New Project** → import repo
2. **Root Directory**: `badapathuria` (if repo root is parent folder)
3. Framework: **Vite**

## 4. Environment variables on Vercel

**Settings** → **Environment Variables**:

| Name | Value |
|------|--------|
| `MONGODB_URI` | Your Atlas connection string |
| `MONGODB_DB_NAME` | `badapathuria` (optional) |

Enable for **Production**, **Preview**, and **Development**.

## 5. Vercel Blob (photo uploads)

**Storage** → **Blob** → Create & connect (adds `BLOB_READ_WRITE_TOKEN`).

## 6. Deploy

Deploy, then **Redeploy** after env vars are saved.

## Local development

1. Copy `.env.example` to `.env` in the `badapathuria` folder
2. Paste your `MONGODB_URI`
3. Run:

```bash
cd badapathuria
npm run dev
```

Collections (`gallery`, `reviews`, `complaints`) are created automatically.

## Multi-device sync

- All devices share MongoDB Atlas
- Photos stored in Vercel Blob
- App polls every 4 seconds
- Original photos in `public/` are unchanged
