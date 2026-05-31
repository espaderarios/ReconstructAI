import './TextInput.css'

interface TextInputProps {
  value: string
  onChange: (text: string) => void
  placeholder?: string
}

export default function TextInput({ value, onChange, placeholder }: TextInputProps) {
  const characterCount = value.length
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0

  return (
    <div className="text-input-container">
      <label htmlFor="input-textarea">Your Text</label>
      <textarea
        id="input-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="textarea"
      />
      <div className="stats">
        <span>{characterCount} characters</span>
        <span>•</span>
        <span>{wordCount} words</span>
      </div>
    </div>
  )
}
