import './ToneSelector.css'

type Tone = 'professional' | 'semi-professional' | 'casual'

interface ToneSelectorProps {
  selectedTone: Tone
  onToneChange: (tone: Tone) => void
}

const toneOptions: { value: Tone; label: string; emoji: string; description: string }[] = [
  {
    value: 'professional',
    label: 'Professional',
    emoji: '💼',
    description: 'Formal, structured, business-ready'
  },
  {
    value: 'semi-professional',
    label: 'Semi-Professional',
    emoji: '🎯',
    description: 'Balanced, friendly yet professional'
  },
  {
    value: 'casual',
    label: 'Casual',
    emoji: '😊',
    description: 'Friendly, conversational, relaxed'
  }
]

export default function ToneSelector({ selectedTone, onToneChange }: ToneSelectorProps) {
  return (
    <div className="tone-selector">
      <label>Tone</label>
      <div className="tone-options">
        {toneOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onToneChange(option.value)}
            className={`tone-button ${selectedTone === option.value ? 'active' : ''}`}
            title={option.description}
          >
            <span className="emoji">{option.emoji}</span>
            <span className="label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
