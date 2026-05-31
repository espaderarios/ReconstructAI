// Determine API URL based on environment
const getApiUrl = (): string => {
  // Production: use deployed backend
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://humanizer-ai-backend.onrender.com'
  }
  // Development: use localhost with proxy
  return '/api'
}

export const API_URL = getApiUrl()

export async function humanizeText(
  text: string,
  tone: string,
  writingStyle: {
    useContractions: boolean
    useSlang: boolean
    useExclamations: boolean
    sentenceLength: 'short' | 'medium' | 'long'
    tone: string
  }
): Promise<string> {
  const response = await fetch(`${API_URL}/humanize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
      tone,
      writingStyle
    })
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.humanizedText
}
