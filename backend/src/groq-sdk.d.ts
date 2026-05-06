declare module 'groq-sdk' {
  interface ChatCompletionMessageParam {
    role: 'user' | 'assistant' | 'system' | 'developer'
    content: string
  }

  interface ChatCompletionsCreateParams {
    model: string
    messages: ChatCompletionMessageParam[]
    max_tokens?: number
  }

  interface ChatCompletionChoice {
    message: {
      content?: string | null
    }
  }

  interface ChatCompletion {
    choices: ChatCompletionChoice[]
  }

  class Groq {
    constructor(options?: { apiKey?: string })
    chat: {
      completions: {
        create(params: ChatCompletionsCreateParams): Promise<ChatCompletion>
      }
    }
  }

  export default Groq
}
