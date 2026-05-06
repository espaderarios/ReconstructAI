# Development Guide

## Setting Up Your Environment

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ReconstructAI.git
cd ReconstructAI
```

### 2. Install Dependencies

**Frontend:**

```bash
cd frontend
npm install
cd ..
```

**Backend:**

```bash
cd backend
npm install
cd ..
```

### 3. Environment Variables

Create `backend/.env`:

```env
GROQ_API_KEY=gsk_your_key_here
PORT=3000
NODE_ENV=development
```

Get a free API key at [Groq Console](https://console.groq.com/)

## Running the Application

### Development Mode

**Terminal 1 - Start Backend:**

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Humanizer API running on http://localhost:3000
```

**Terminal 2 - Start Frontend:**

```bash
cd frontend
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173` in your browser.

## Project Architecture

### Frontend (React + TypeScript)

- **Components:**
  - `TextInput`: Main text input area with character/word count
  - `ToneSelector`: Select between professional, semi-professional, casual
  - `WritingStylePreferences`: Fine-tune writing style with checkboxes and presets
  - `HumanizedOutput`: Display and manage humanized text output

- **Styling:** CSS Modules with responsive design
- **State Management:** React hooks (useState)
- **API Communication:** Axios

### Backend (Express.js)

- **Server:** Express application on port 3000
- **API:**
  - `POST /humanize` - Humanize text with AI
  - `GET /health` - Health check
- **AI:** Groq API (Mixtral-8x7b model) with lightning-fast inference and fallback processing
- **CORS:** Enabled for frontend communication

## Key Technologies

### Frontend
- React 18
- TypeScript 5
- Vite (build tool)
- Axios (HTTP client)

### Backend
- Express 4
- TypeScript 5
- Anthropic SDK
- Node.js 16+

## Making Changes

### Adding a New Tone Option

1. Update type in `frontend/src/App.tsx`
2. Add option to `frontend/src/components/ToneSelector.tsx`
3. Update prompt in `backend/src/humanizer.ts`

### Modifying the AI Behavior

Edit `backend/src/humanizer.ts` - the `buildSystemPrompt()` function controls how the AI processes text.

### Styling Changes

- Global styles: `frontend/src/index.css`, `frontend/src/App.css`
- Component styles: `frontend/src/components/*.css`

## Troubleshooting

### "Cannot find module 'openai'"

```bash
cd backend
npm install openai
```

### CORS Error

Ensure backend CORS is configured:

```typescript
app.use(cors())
```

### Port Already in Use

- Frontend: Change port in `frontend/vite.config.ts`
- Backend: Change `PORT` in `.env` or code

### API Key Errors

1. Check `.env` file exists with valid key
2. Verify API key format
3. Check API key has necessary permissions

## Building for Production

### Frontend

```bash
cd frontend
npm run build
```

Creates optimized bundle in `frontend/dist/`

### Backend

```bash
cd backend
npm run build
npm start
```

Runs compiled code from `backend/dist/`

## Testing

### Manual Testing

1. Start both servers
2. Enter test text in frontend
3. Try different tones and styles
4. Verify output quality

### API Testing

```bash
curl -X POST http://localhost:3000/humanize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "hello world",
    "tone": "professional",
    "writingStyle": {
      "useContractions": false,
      "useSlang": false,
      "useExclamations": false,
      "sentenceLength": "medium"
    }
  }'
```

## Performance Tips

- Frontend: Lazy load components if needed
- Backend: Cache AI responses for identical inputs
- Database: Add caching layer for frequently used styles

## Deployment

### Vercel (Frontend)

```bash
npm i -g vercel
vercel
```

### Heroku/Railway (Backend)

```bash
# Update PORT to use environment variable
# Deploy with git push
```

## Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Express Docs](https://expressjs.com)
- [Anthropic API Docs](https://docs.anthropic.com)
- [Vite Docs](https://vitejs.dev)
