import Groq from 'groq-sdk'

type Tone = 'professional' | 'semi-professional' | 'casual'

interface WritingStyle {
  useContractions: boolean
  useSlang: boolean
  useExclamations: boolean
  sentenceLength: 'short' | 'medium' | 'long'
  tone: string
}

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
})

function buildSystemPrompt(tone: Tone, writingStyle: WritingStyle): string {
  const baseInstructions = `You are a text humanizer AI. Your job is to rewrite text to make it sound more human and natural while preserving its meaning.`

  const toneInstructions = {
    professional:
      'Write in a professional, formal tone. Use proper grammar and structured sentences. Avoid casual language and slang.',
    'semi-professional':
      'Write in a balanced, semi-professional tone. Be friendly but maintain professionalism. Use some contractions naturally.',
    casual:
      'Write in a casual, conversational tone. Use natural language as if talking to a friend. Be friendly and warm.'
  }

  const stylePreferences = []

  if (writingStyle.useContractions) {
    stylePreferences.push('- Use contractions (I\'ll, don\'t, can\'t, etc.)')
  } else {
    stylePreferences.push('- Avoid contractions, spell out full forms')
  }

  if (writingStyle.useSlang) {
    stylePreferences.push('- Include casual slang and colloquialisms where appropriate')
  } else {
    stylePreferences.push('- Avoid slang, keep language professional')
  }

  if (writingStyle.useExclamations) {
    stylePreferences.push('- Use exclamation marks to convey enthusiasm and emotion')
  } else {
    stylePreferences.push('- Use exclamation marks sparingly')
  }

  const sentenceLengthInstructions = {
    short: 'Use short, punchy sentences. Keep sentences under 10 words on average.',
    medium: 'Use a mix of sentence lengths for natural flow. Average 12-15 words per sentence.',
    long:
      'Use longer, more complex sentences with proper punctuation. Average 15-20 words per sentence.'
  }

  return `${baseInstructions}

Tone: ${toneInstructions[tone]}

Writing Style Preferences:
${stylePreferences.join('\n')}

Sentence Structure: ${sentenceLengthInstructions[writingStyle.sentenceLength]}

Requirements:
- Keep the core message and meaning intact
- Make the text sound natural and human-like
- Adapt to the specified tone and style preferences
- Do not add information that wasn't in the original
- Output only the humanized text, no explanations
- Preserve any formatting or structure from the original`
}

export async function humanizeText(
  text: string,
  tone: Tone,
  writingStyle: WritingStyle
): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    console.warn(
      'GROQ_API_KEY not set. Using fallback text processing...'
    )
    return getFallbackHumanizedText(text, tone, writingStyle)
  }

  try {
    const systemPrompt = buildSystemPrompt(tone, writingStyle)

    const response = await client.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `${systemPrompt}\n\nPlease humanize the following text:\n\n${text}`
        }
      ]
    })

    const humanizedText = response.choices[0].message.content || text
    return humanizedText
  } catch (error) {
    console.error('Error calling Groq API:', error)
    return getFallbackHumanizedText(text, tone, writingStyle)
  }
}

function getFallbackHumanizedText(
  text: string,
  tone: Tone,
  writingStyle: WritingStyle
): string {
  let result = text

  // Apply basic transformations based on style
  if (writingStyle.useContractions) {
    result = result
      .replace(/I am /g, "I'm ")
      .replace(/do not /g, "don't ")
      .replace(/cannot /g, "can't ")
      .replace(/will not /g, "won't ")
      .replace(/have not /g, "haven't ")
  } else {
    result = result
      .replace(/I'm /g, 'I am ')
      .replace(/don't /g, 'do not ')
      .replace(/can't /g, 'cannot ')
      .replace(/won't /g, 'will not ')
      .replace(/haven't /g, 'have not ')
  }

  // Adjust based on tone
  if (tone === 'casual' && writingStyle.useExclamations) {
    // Add some natural enthusiasm
    const sentences = result.split('. ')
    result = sentences
      .map((s, i) => {
        if (i < sentences.length - 1 && Math.random() > 0.7) {
          return s.replace(/\.?$/, '!')
        }
        return s
      })
      .join('. ')
  }

  if (tone === 'professional') {
    // Remove casual expressions
    result = result
      .replace(/kinda/g, 'somewhat')
      .replace(/gonna/g, 'going to')
      .replace(/wanna/g, 'want to')
      .replace(/yeah/g, 'yes')
  }

  return result
}
