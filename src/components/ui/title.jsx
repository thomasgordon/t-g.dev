import React from "react"

export default function Title({text, darkMode = false}) {
  return (
    <div className={`mb-7 flex items-center gap-3 font-mono text-sm font-medium uppercase tracking-wider ${darkMode ? 'text-white' : 'text-text-muted'}`}>
      <span className={`h-0.5 w-7 rounded-full ${darkMode ? 'bg-accent-primary' : 'bg-accent-tertiary'}`} />
      {text}
    </div>
  )
}
