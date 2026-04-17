# Deployment & GitHub Guide for NRN Smart Learning

This guide explains how to push your code to GitHub and deploy the Frontend and Backend separately.

## 1. Preparing for GitHub

You already have a `.gitignore` file in the root. This will prevent your database and secret keys from being uploaded.

### Steps to Push Code:
1. Open a terminal in the root folder.
2. Initialize Git: `git init`
3. Add files: `git add .`
4. Commit: `git commit -m "Initial commit of NRN Smart Learning"`
5. Create a new repository on GitHub.
6. Copy the "Remote Add" command and run it: `git remote add origin YOUR_URL`
7. Push: `git push -u origin main`

---

## 2. Deployment Architecture

Since the Frontend and Backend use different technologies, they should be deployed separately.

### Backend (Python FastAPI)
**Recommended Platform**: [Render.com](https://render.com) or [Railway.app](https://railway.app)
1. Link your GitHub repository.
2. Set the root directory to `backend`.
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables**: Add your `OPENROUTER_API_KEY`, `ADMIN_EMAIL`, and `ADMIN_PASS` in the Render dashboard.

### Frontend (React + Vite)
**Recommended Platform**: [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
1. Link your GitHub repository.
2. Set the root directory to `frontend`.
3. **Framework Preset**: Vite.
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Connection Fix**: Once the backend is deployed, you will get a URL like `https://nrn-backend.onrender.com`. You must update the `fetch` calls in your React code to point to this URL instead of `localhost:8000`.

---

## 3. Post-Deployment (Crucial)
After both are live, you need to update the **Allowed Origins** in `backend/app/main.py` to allow your production frontend URL (e.g., `https://nrn-learning.vercel.app`) to communicate with the backend.
