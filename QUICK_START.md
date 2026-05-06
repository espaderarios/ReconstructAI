# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install All Dependencies

```bash
npm run install-all
```

This installs dependencies for the root, frontend, and backend.

### Step 2: Configure API Key

```bash
# Copy the example .env file
cd backend
cp .env.example .env

# Edit .env with your Groq API key
# GROQ_API_KEY=gsk_your_key_here
```

Get your **FREE** API key from [Groq Console](https://console.groq.com/) - no credit card required!

### Step 3: Start Development Servers

**Option A: Run Both Simultaneously**

```bash
npm run dev
```

**Option B: Run Separately**

Terminal 1:
```bash
npm run dev:backend
```

Terminal 2:
```bash
npm run dev:frontend
```

### Step 4: Open in Browser

```
http://localhost:5173
```

## ✨ Features to Try

1. **Paste Sample Text**: Try copying some formal text
2. **Select a Tone**: Choose Professional, Semi-Professional, or Casual
3. **Customize Style**: 
   - Toggle contractions
   - Add/remove slang
   - Control exclamations
   - Adjust sentence length
4. **Humanize**: Click the Humanize button
5. **Copy**: Use the copy button to grab your text

## 🎯 Example Use Cases

### Email Humanizer
Paste a formal email and convert it to casual for a friendly tone.

### Technical Writer
Convert technical documentation to more conversational style.

### Content Creator
Transform AI-written content to sound more human.

### Social Media
Make professional content more engaging for casual platforms.

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Vite, Axios |
| **Backend** | Node.js, Express, TypeScript |
| **AI** | Groq API (Mixtral-8x7b) - 100+ tokens/sec ⚡ |
| **Styling** | CSS3 with gradients and animations |

## 📁 Project Structure

```
ReconstructAI/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── backend/           # Express API
│   ├── src/
│   │   ├── index.ts
│   │   └── humanizer.ts
│   └── package.json
├── README.md          # Full documentation
├── DEVELOPMENT.md     # Developer guide
└── QUICK_START.md     # This file
```

## 🔧 Available Commands

### Development

```bash
npm run dev                # Start both frontend and backend
npm run dev:frontend       # Frontend only
npm run dev:backend        # Backend only
```

### Production

```bash
npm run build              # Build frontend and backend
npm run build:frontend     # Frontend only
npm run build:backend      # Backend only
npm start                  # Start production backend
```

## 🐛 Troubleshooting

### Port Already in Use

**Frontend (port 5173):**
```bash
# Edit frontend/vite.config.ts and change port
```

**Backend (port 3000):**
```bash
# Edit backend/.env and change PORT
```

### API Key Issues

1. Ensure `.env` file exists in `/backend` directory
2. Verify key format: `sk_ant_...`
3. Check Anthropic Console for valid key
4. Without key, app uses fallback text processing

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install-all
```

### API Errors

```bash
# Check backend is running
curl http://localhost:3000/health

# Expected response:
# {"status":"ok"}
```

## 📚 Learning Resources

- **React**: https://react.dev
- **Express**: https://expressjs.com
- **TypeScript**: https://www.typescriptlang.org
- **Groq API**: https://console.groq.com/docs
- **Vite**: https://vitejs.dev

## 🎓 Next Steps

1. **Customize Prompts**: Edit `backend/src/humanizer.ts` to change AI behavior
2. **Add Presets**: Create more writing style presets in the UI
3. **Persist Data**: Add database for user profiles and history
4. **Deploy**: Push to Vercel (frontend) and Heroku (backend)
5. **Enhance**: Add batch processing, export options, etc.

## 💡 Tips

- The app works without an API key using fallback processing
- Groq is **extremely fast** - responses come back in milliseconds!
- Get a free Groq API key with no credit card required
- Longer texts take more time to process
- Experiment with different tone + style combinations
- Check the browser console for debugging (F12)
- Backend logs show API calls and processing time

## 🚨 Important

**Never commit your `.env` file to git!** It's already in `.gitignore`.

Always use `.env.example` as a template for other developers.

---

---

## 🌐 Ready to Deploy?

After testing locally, deploy your app **for free**:

→ **[Full Deployment Guide](DEPLOYMENT.md)**

**Deployed in 5 minutes on:**
- **Frontend**: GitHub Pages (`https://your-github.io/ReconstructAI`)
- **Backend**: Render.com (free tier)
- **AI**: Groq (free tier)

---

Happy humanizing! 🎉
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