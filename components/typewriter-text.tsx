"use client"

import { useState, useEffect } from "react"
import { MarkdownRenderer } from "./markdown-renderer"

interface TypewriterTextProps {
  text: string
  speed?: number
  showCursor?: boolean
  onComplete?: () => void
}

export function TypewriterText({ text, speed = 30, showCursor = true, onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursorState, setShowCursorState] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text, speed, isComplete, onComplete])

  useEffect(() => {
    if (showCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursorState((prev) => !prev)
      }, 500)

      return () => clearInterval(cursorInterval)
    }
  }, [showCursor])

  return (
    <div className="relative arabic-text">
      <MarkdownRenderer content={displayedText} />
      {showCursor && !isComplete && (
        <span
          className={`inline-block w-0.5 h-5 bg-gradient-to-b from-purple-500 to-pink-500 ml-1 typewriter-cursor ${
            showCursorState ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  )
}
