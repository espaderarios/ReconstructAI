import './HumanizedOutput.css'

interface HumanizedOutputProps {
  text: string
  loading: boolean
  onCopy: () => void
}

export default function HumanizedOutput({ text, loading, onCopy }: HumanizedOutputProps) {
  const hasText = text.trim().length > 0

  return (
    <div className="output-container">
      <label htmlFor="output-textarea">Humanized Text</label>
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Humanizing your text...</p>
        </div>
      ) : hasText ? (
        <>
          <textarea
            id="output-textarea"
            value={text}
            readOnly
            className="textarea"
          />
          <button onClick={onCopy} className="copy-button">
            📋 Copy to Clipboard
          </button>
        </>
      ) : (
        <div className="empty-state">
          <p>✨ Your humanized text will appear here</p>
          <p className="hint">Enter text and click "Humanize" to get started</p>
        </div>
      )}
    </div>
  )
}
