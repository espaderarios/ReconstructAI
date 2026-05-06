import { useState } from 'react'
import './WritingStylePreferences.css'

type Tone = 'professional' | 'semi-professional' | 'casual'

type WritingStyle = {
  useContractions: boolean
  useSlang: boolean
  useExclamations: boolean
  sentenceLength: 'short' | 'medium' | 'long'
  tone: Tone
}

interface WritingStylePreferencesProps {
  writingStyle: WritingStyle
  onStyleChange: (style: WritingStyle) => void
}

export default function WritingStylePreferences({
  writingStyle,
  onStyleChange
}: WritingStylePreferencesProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCheckboxChange = (key: keyof WritingStyle, value: boolean) => {
    onStyleChange({
      ...writingStyle,
      [key]: value
    })
  }

  const handleSentenceLengthChange = (length: 'short' | 'medium' | 'long') => {
    onStyleChange({
      ...writingStyle,
      sentenceLength: length
    })
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'formal':
        onStyleChange({
          ...writingStyle,
          tone: 'professional',
          useContractions: false,
          useSlang: false,
          useExclamations: false,
          sentenceLength: 'long'
        })
        break
      case 'friendly':
        onStyleChange({
          ...writingStyle,
          tone: 'casual',
          useContractions: true,
          useSlang: false,
          useExclamations: true,
          sentenceLength: 'medium'
        })
        break
      case 'conversational':
        onStyleChange({
          ...writingStyle,
          tone: 'semi-professional',
          useContractions: true,
          useSlang: false,
          useExclamations: false,
          sentenceLength: 'medium'
        })
        break
    }
  }

  return (
    <div className="writing-style-container">
      <button
        className="expand-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>⚙️ Writing Style</span>
        <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="style-content">
          <div className="preset-buttons">
            <button
              className="preset-btn"
              onClick={() => applyPreset('formal')}
            >
              Formal
            </button>
            <button
              className="preset-btn"
              onClick={() => applyPreset('conversational')}
            >
              Conversational
            </button>
            <button
              className="preset-btn"
              onClick={() => applyPreset('friendly')}
            >
              Friendly
            </button>
          </div>

          <div className="divider"></div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={writingStyle.useContractions}
                onChange={(e) =>
                  handleCheckboxChange('useContractions', e.target.checked)
                }
              />
              <span>Use contractions (I'll, don't, etc.)</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={writingStyle.useSlang}
                onChange={(e) =>
                  handleCheckboxChange('useSlang', e.target.checked)
                }
              />
              <span>Use casual slang</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={writingStyle.useExclamations}
                onChange={(e) =>
                  handleCheckboxChange('useExclamations', e.target.checked)
                }
              />
              <span>Use exclamation marks</span>
            </label>
          </div>

          <div className="divider"></div>

          <div className="sentence-length-group">
            <label>Sentence Length</label>
            <div className="radio-group">
              {(['short', 'medium', 'long'] as const).map((length) => (
                <label key={length} className="radio-label">
                  <input
                    type="radio"
                    name="sentence-length"
                    value={length}
                    checked={writingStyle.sentenceLength === length}
                    onChange={() => handleSentenceLengthChange(length)}
                  />
                  <span>
                    {length.charAt(0).toUpperCase() + length.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
