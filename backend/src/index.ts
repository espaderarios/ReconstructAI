import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { humanizeText } from './humanizer.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const allowedOrigins = new Set([
  'https://espaderarios.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
])

const corsOptions = {
  origin(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}

// Middleware
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

// Humanize endpoint
app.post('/humanize', async (req: Request, res: Response) => {
  try {
    const { text, tone, writingStyle } = req.body

    if (!text || text.trim().length === 0) {
      res.status(400).json({ error: 'Text is required' })
      return
    }

    const humanizedText = await humanizeText(text, tone, writingStyle)

    res.json({ humanizedText })
  } catch (error) {
    console.error('Error in humanize endpoint:', error)
    res.status(500).json({
      error: 'Failed to humanize text',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Humanizer API running on http://localhost:${PORT}`)
  console.log('📝 POST /humanize - Humanize your text')
  console.log('🏥 GET /health - Health check')
})
