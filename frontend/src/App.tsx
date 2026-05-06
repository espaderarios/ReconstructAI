import { useState } from 'react'
import axios from 'axios'
import './App.css'
import TextInput from './components/TextInput'
import ToneSelector from './components/ToneSelector'
import HumanizedOutput from './components/HumanizedOutput'
import WritingStylePreferences from './components/WritingStylePreferences'

type Tone = 'professional' | 'semi-professional' | 'casual'
type WritingStyle = {
  useContractions: boolean
  useSlang: boolean
  useExclamations: boolean
  sentenceLength: 'short' | 'medium' | 'long'
  tone: Tone
}

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [tone, setTone] = useState<Tone>('professional')
  const [loading, setLoading] = useState(false)
  const [writingStyle, setWritingStyle] = useState<WritingStyle>({
    useContractions: false,
    useSlang: false,
    useExclamations: false,
    sentenceLength: 'medium',
    tone: 'professional'
  })

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to humanize')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/humanize', {
        text: inputText,
        tone,
        writingStyle
      })
      setOutputText(response.data.humanizedText)
    } catch (error) {
      console.error('Error humanizing text:', error)
      alert('Failed to humanize text. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText)
    alert('Copied to clipboard!')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>✨ Humanizer AI</h1>
        <p>Make your text more human-like with your personal writing style</p>
      </div>

      <div className="content">
        <div className="left-panel">
          <TextInput 
            value={inputText}
            onChange={setInputText}
            placeholder="Paste your text here... it can be anything - emails, articles, code comments, etc."
          />
        </div>

        <div className="middle-panel">
          <ToneSelector 
            selectedTone={tone}
            onToneChange={setTone}
          />
          
          <WritingStylePreferences
            writingStyle={writingStyle}
            onStyleChange={setWritingStyle}
            currentTone={tone}
            setCurrentTone={setTone}
          />

          <button 
            onClick={handleHumanize}
            disabled={loading || !inputText.trim()}
            className="humanize-btn"
          >
            {loading ? 'Humanizing...' : '🚀 Humanize'}
          </button>
        </div>

        <div className="right-panel">
          <HumanizedOutput
            text={outputText}
            loading={loading}
            onCopy={handleCopyOutput}
          />
        </div>
      </div>
    </div>
  )
}

export default App
