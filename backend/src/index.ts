import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { humanizeText } from './humanizer.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
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
