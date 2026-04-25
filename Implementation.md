# 🚀 Nyxecure GitHub Upload & Deployment Guide

This guide will walk you step-by-step through uploading your full-stack application (client + server) to GitHub as a single repository, and deploying it to Vercel (Frontend) and Render/Railway (Backend).

---

## 🛠️ Phase 1: Upload to GitHub

Since both the `client` and `server` are in the same folder, we will initialize Git in the **root** folder (`Nyxsecure`) so everything goes into one repository.

### 0. Install Git (Important)
Your system currently does not have Git installed. 
1. Download Git for Windows from: [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Install it using the default settings.
3. Restart your terminal (or VS Code).

### 1. Root `.gitignore` Setup
I have already created a `.gitignore` file in your root folder for you. It ensures that large files like `node_modules`, secret `.env` files, and `dist` build folders are **not** uploaded to GitHub.

*(If you ever need to recreate it, just make sure it contains `node_modules/`, `.env`, and `client/dist/`)*.

### 2. Initialize and Push to GitHub
Open your terminal in the **root** folder (`c:\Users\jaymo\Downloads\Projects 2026\Nyxsecure`) and run the following exact commands:

\`\`\`bash
# 1. Initialize git in the root folder
git init

# 2. Add all your project files
git add .

# 3. Create your first commit
git commit -m "Initial commit: Fullstack Nyxecure project"

# 4. Create a new repository on GitHub (Go to github.com and click 'New')
# Do NOT check "Initialize with README" since you already have one.

# 5. Link your local folder to your GitHub repo 
# (Replace the URL with your actual GitHub repo URL)
git remote add origin https://github.com/your-username/nyxecure.git

# 6. Push the code to GitHub
git branch -M main
git push -u origin main
\`\`\`

### 3. Pushing Future Updates
Whenever you make changes to your code in the future, simply run:
\`\`\`bash
git add .
git commit -m "Describe what you changed"
git push
\`\`\`

---

## 🌐 Phase 2: Deploy the Backend (Render or Railway)

We deploy the backend first so we can get the live API URL to give to the frontend later.

### Option 1: Render.com (Recommended & Free)
1. Go to [Render.com](https://render.com) and sign in with GitHub.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository (`nyxecure`).
4. **Settings:**
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables:**
   Add the following under "Environment":
   - `MONGO_URI` : *(Your actual MongoDB Atlas connection string)*
   - `PORT` : `5000`
   - `CLIENT_URL` : *(Leave blank for now, we will update this later with Vercel URL)*
6. Click **Create Web Service**. 
7. Once deployed, Render will give you a live URL (e.g., `https://nyxecure-api.onrender.com`). **Copy this URL.**

---

## 💻 Phase 3: Deploy the Frontend (Vercel)

Now that the backend is live, we deploy the frontend and connect it to the backend.

1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your `nyxecure` repository from GitHub.
4. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** Edit this and select `client`
5. **Environment Variables:**
   - Name: `VITE_API_URL`
   - Value: `https://nyxecure-api.onrender.com/api` *(Paste the backend URL from Render here, and add `/api` at the end)*
6. Click **Deploy**.

---

## 🔗 Phase 4: Final Connection (CORS Setup)

Because of security rules (CORS), your backend needs to explicitly allow requests from your new Vercel frontend domain.

1. Go back to your Backend dashboard (on Render).
2. Go to **Environment Variables**.
3. Find or add the `CLIENT_URL` variable.
4. Set its value to your new Vercel frontend URL (e.g., `https://nyxecure.vercel.app`).
5. Save changes (Render will automatically redeploy the backend).

🎉 **Congratulations! Your full-stack cybersecurity application is now completely live and accessible to the world!**
