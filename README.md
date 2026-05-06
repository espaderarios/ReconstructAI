# Humanizer AI

A full-stack application that uses AI to humanize text with customizable tone and writing style preferences.

🌐 **[Live Demo](https://YOUR_USERNAME.github.io/ReconstructAI)** | 📖 **[Deployment Guide](DEPLOYMENT.md)** | 🚀 **[Quick Start](QUICK_START.md)**

## Features

✨ **Multiple Tone Options**
- Professional: Formal, structured, business-ready
- Semi-Professional: Balanced, friendly yet professional
- Casual: Friendly, conversational, relaxed

⚙️ **Writing Style Customization**
- Contraction preferences (I'll vs I will)
- Slang usage options
- Exclamation mark intensity
- Sentence length preferences (short, medium, long)

🎯 **Quick Presets**
- Formal preset
- Conversational preset
- Friendly preset

## Quick Links

- 📚 **[Development Guide](DEVELOPMENT.md)** - Set up your local environment
- 🚀 **[Deployment Guide](DEPLOYMENT.md)** - Deploy to GitHub Pages + Render.com
- ⚡ **[Quick Start](QUICK_START.md)** - Get running in 5 minutes

## Project Structure

```
ReconstructAI/
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── backend/               # Express.js + Node.js backend
    ├── src/
    │   ├── index.ts       # Express server
    │   └── humanizer.ts   # AI text processing
    ├── package.json
    └── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Groq API key (or use fallback mode)

### Installation

1. **Frontend Setup**

```bash
cd frontend
npm install
```

2. **Backend Setup**

```bash
cd backend
npm install
```

### Configuration

Create a `.env` file in the `backend` directory:

```env
GROQ_API_KEY=your_api_key_here
PORT=3000
```

Get your free API key from [Groq Console](https://console.groq.com/)

### Development

**Terminal 1 - Frontend:**

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

**Terminal 2 - Backend:**

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:3000`

### Production Build

**Frontend:**

```bash
cd frontend
npm run build
```

**Backend:**

```bash
cd backend
npm run build
npm start
```

## API Endpoints

### POST /humanize

Humanizes the provided text with specified tone and writing style.

**Request Body:**

```json
{
  "text": "Your text here",
  "tone": "professional|semi-professional|casual",
  "writingStyle": {
    "useContractions": boolean,
    "useSlang": boolean,
    "useExclamations": boolean,
    "sentenceLength": "short|medium|long",
    "tone": "professional|semi-professional|casual"
  }
}
```

**Response:**

```json
{
  "humanizedText": "Your humanized text here"
}
```

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "ok"
}
```

## How It Works

1. **Input Processing**: User enters text and selects tone and style preferences
2. **Style Customization**: Users can fine-tune how the text should be written
3. **AI Processing**: Text is sent to Claude AI (or fallback processor)
4. **Output**: Humanized text is displayed and can be copied to clipboard

## AI Integration

The application uses the **Groq API** with Mixtral-8x7b model for advanced text humanization. Groq provides:
- 🚀 **Lightning-fast inference** (100+ tokens/sec)
- 💰 **Generous free tier** with no credit card required
- 🔄 **Multiple model options** (Mixtral, LLaMA 2, etc.)

If the API key is not available, it falls back to basic text transformations.

## Customization

You can easily customize:
- The AI prompt in `backend/src/humanizer.ts`
- UI styling in `frontend/src/App.css` and component CSS files
- Tone options and presets in `frontend/src/components/`
- API endpoints in `frontend/src/App.tsx`

## Features to Add

- User accounts and history
- Save/load presets
- Text templates
- Batch processing
- Export to multiple formats
- Advanced analytics

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
