"use client"

import type { Message } from "@/hooks/use-chat"
import { motion } from "framer-motion"
import { User, Bot, Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react"
import { TypewriterText } from "./typewriter-text"
import { MarkdownRenderer } from "./markdown-renderer"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MessageProps {
  message: Message
  isLast?: boolean
  isStreaming?: boolean
}

export function MessageComponent({ message, isLast, isStreaming }: MessageProps) {
  const isUser = message.role === "user"
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState<boolean | null>(null)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`message-bubble mb-6`}
    >
      <div className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
            isUser
              ? "bg-gradient-to-br from-blue-500 to-cyan-500"
              : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500"
          }`}
        >
          {isUser ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
        </motion.div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? "text-right" : "text-left"}`}>
          {/* Header */}
          <div className={`flex items-center gap-2 mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{isUser ? "أنت" : "Hamedenho"}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {message.timestamp.toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Message Bubble */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`p-4 max-w-screen rounded-2xl shadow-sm border ${
              isUser
                ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-blue-200"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="prose prose-sm max-w-screen dark:prose-invert arabic-text">
              {isLast && !isUser && isStreaming ? (
                <TypewriterText text={message.content} speed={15} />
              ) : (
                <MarkdownRenderer content={message.content} />
              )}
            </div>
          </motion.div>

          {/* Actions */}
          {!isUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mt-2 justify-start"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span className="text-xs mr-1">{copied ? "تم النسخ" : "نسخ"}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(liked === true ? null : true)}
                className={`transition-colors ${
                  liked === true ? "text-green-500 hover:text-green-600" : "text-gray-500 hover:text-green-500"
                }`}
              >
                <ThumbsUp size={14} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(liked === false ? null : false)}
                className={`transition-colors ${
                  liked === false ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-red-500"
                }`}
              >
                <ThumbsDown size={14} />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
