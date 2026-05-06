# Deployment Guide

Deploy your Humanizer AI app to the cloud in minutes!

## 🚀 Quick Deploy

### Frontend → GitHub Pages (Free)
### Backend → Render.com (Free)

---

## Step 1: Prepare Your GitHub Repository

```bash
# If not already a git repo
git init
git add .
git commit -m "Initial commit"

# Create a new repo on GitHub (https://github.com/new)
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/ReconstructAI.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render.com

### Create Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Connect your GitHub account

### Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Select your **ReconstructAI** repository
3. Fill in settings:
   - **Name**: `humanizer-ai-backend`
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`

4. Add Environment Variables:
   - **GROQ_API_KEY**: `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`
   - **PORT**: `3000`
   - **NODE_ENV**: `production`

5. Select Plan: **Free**
6. Click **"Create Web Service"**

### Get Your Backend URL
After deployment, you'll get a URL like: `https://humanizer-ai-backend.onrender.com`

**Save this URL!** You'll need it for the frontend.

---

## Step 3: Deploy Frontend to GitHub Pages

### Enable GitHub Pages
1. Go to your repository settings
2. Navigate to **Settings** → **Pages**
3. Select:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Click **Save**

### Update Frontend Config

The GitHub Actions workflow will automatically:
- Build your React app
- Deploy to GitHub Pages
- Use your Render backend URL

**Just push to main branch!**

```bash
git push origin main
```

The workflow (`.github/workflows/deploy.yml`) will:
1. Install dependencies
2. Build React with production settings
3. Deploy to GitHub Pages at: `https://YOUR_USERNAME.github.io/ReconstructAI`

---

## Step 4: Verify Deployment

1. **Frontend**: Visit `https://YOUR_USERNAME.github.io/ReconstructAI`
2. **Backend**: Visit `https://humanizer-ai-backend.onrender.com/health`
3. **Test**: Use the app and humanize some text!

---

## 📊 Architecture

```
┌─────────────────────────────┐
│   GitHub Pages Frontend     │
│  YOUR_USERNAME.github.io    │
└────────────┬────────────────┘
             │
             │ API Calls
             ▼
┌─────────────────────────────┐
│   Render.com Backend        │
│  humanizer-ai-backend.com   │
└─────────────────────────────┘
             │
             │ Groq API
             ▼
┌─────────────────────────────┐
│   Groq API (Mixtral-8x7b)   │
│    Fast Inference Engine    │
└─────────────────────────────┘
```

---

## 🔄 Making Updates

### Update Frontend
```bash
git push origin main
# GitHub Actions automatically deploys to GitHub Pages
```

### Update Backend
```bash
git push origin main
# Render.com automatically redeploys on push
```

### Update API Key (if needed)
1. Go to Render dashboard
2. Select your service
3. Click **"Environment"**
4. Update `GROQ_API_KEY`
5. Click **"Save"** → Service redeploys

---

## ⚠️ Important Notes

### API Key Security
- ✅ Backend API key is **private** (only on Render)
- ✅ Frontend never exposes the API key
- ✅ All requests go through your backend

### CORS Configuration
The backend has CORS enabled for GitHub Pages origin:
```typescript
app.use(cors())
```

---

## 🆘 Troubleshooting

### "Build failed on Render"
- Check backend dependencies
- Verify Node version compatibility
- Check build logs on Render dashboard

### "Frontend can't reach backend"
- Verify backend URL in frontend build
- Check Render backend is running (visit `/health`)
- Check browser console for CORS errors

### "API Key not working"
- Verify key in Render environment variables
- Restart the service
- Check Groq console for API status

---

## 📈 Next Steps

### Monitor & Maintain
- **Render**: Free tier has limits (may sleep after inactivity)
- **GitHub Pages**: Unlimited free hosting
- Consider upgrading to paid if you get high traffic

### Enhancements
- Add authentication
- Store user history in database
- Add analytics
- Custom domain (DNS configuration)

---

## 🎯 Summary

| Component | Platform | URL | Cost |
|-----------|----------|-----|------|
| Frontend | GitHub Pages | `https://github.com/YOUR_USERNAME` | Free |
| Backend | Render.com | `https://humanizer-ai-backend.onrender.com` | Free |
| AI | Groq | - | Free (generous tier) |

**Total cost: $0** 🎉

---

## 📚 Resources

- [GitHub Pages Docs](https://pages.github.com/)
- [Render.com Docs](https://render.com/docs)
- [GitHub Actions](https://github.com/features/actions)
- [Groq API Docs](https://console.groq.com/docs)

---

Happy deploying! 🚀
