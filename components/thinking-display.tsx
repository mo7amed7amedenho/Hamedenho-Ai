"use client"

import { motion } from "framer-motion"
import { Brain, Lightbulb } from "lucide-react"
import { TypewriterText } from "./typewriter-text"

interface ThinkingDisplayProps {
  content: string
  isVisible: boolean
}

export function ThinkingDisplay({ content, isVisible }: ThinkingDisplayProps) {
  if (!isVisible || !content) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="thinking-container mb-4"
    >
      <div className="thinking-header">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Brain size={16} />
        </motion.div>
        <span>Hamedenho يفكر...</span>
        <Lightbulb size={14} className="text-yellow-500" />
      </div>
      <div className="thinking-content">
        <TypewriterText text={content} speed={20} showCursor={false} />
      </div>
    </motion.div>
  )
}
