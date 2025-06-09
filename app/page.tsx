"use client";

import type React from "react";
import { useChat } from "@/hooks/use-chat";
import { MessageComponent } from "@/components/message";
import { ThinkingDisplay } from "@/components/thinking-display";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Trash2,
  Sparkles,
  Bot,
  Calculator,
  MessageCircle,
  Lightbulb,
  Code,
  Heart,
  Sigma,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const { messages, input, setInput, sendMessage, clearChat, isLoading } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [thinkingContent, setThinkingContent] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsStreaming(isLoading);
    if (isLoading) {
      setShowThinking(true);
      setThinkingContent(
        "دعني أفكر في إجابتك..."
      );
    } else {
      setTimeout(() => setShowThinking(false), 1000);
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  const suggestions = [
    {
      text: "أخبرني عن نفسك ومن أنت؟",
      icon: Bot,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      text: "حل هذه المعادلة: x² + 5x + 6 = 0",
      icon: Calculator,
      gradient: "from-green-500 to-emerald-500",
    },

    {
      text: "ساعدني في كتابة كود",
      icon: Code,
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      {/* Enhanced Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-10 shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
              className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Sparkles size={18} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                Hamedenho Ai
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                مساعدك الذكي المتطور • يدعم الرياضيات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full p-8 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center mb-8 shadow-2xl"
            >
              <Sparkles size={32} className="text-white" />
            </motion.div>

            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent arabic-text">
              أهلاً وسهلاً بك في Hamedenho Ai
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl text-lg max-sm:hidden leading-relaxed arabic-text">
              مساعدك الذكي المتطور جاهز لمساعدتك في جميع استفساراتك. أسألني أي
              شيء باللغة العربية أو الإنجليزية، وأستطيع حل المعادلات الرياضية
              وكتابة الكود البرمجي!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
              {suggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendMessage(suggestion.text)}
                    className={`p-4 text-sm bg-gradient-to-br ${suggestion.gradient} text-white rounded-xl hover:shadow-lg transition-all duration-300 text-right border border-white/20 backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-3 justify-end">
                      <span className="flex-1 font-medium">
                        {suggestion.text}
                      </span>
                      <IconComponent size={20} className="flex-shrink-0" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm"
            >
              <span>
                صنع بواسطة محمد حامد, لمساعدتك في الحياة اليومية والرياضيات
                والبرمجة
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto p-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageComponent
                  key={message.id}
                  message={message}
                  isLast={index === messages.length - 1}
                  isStreaming={isStreaming}
                />
              ))}
            </AnimatePresence>

            <ThinkingDisplay
              content={thinkingContent}
              isVisible={showThinking}
            />

            {/* {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-purple-700 dark:text-purple-300 ml-2 font-medium">
                    هامدنهو يحل المعادلة...
                  </span>
                  <div className="flex items-center gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0,
                      }}
                      className="w-2 h-2 bg-purple-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0.2,
                      }}
                      className="w-2 h-2 bg-pink-500 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0.4,
                      }}
                      className="w-2 h-2 bg-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )} */}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Enhanced Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-gray-200 dark:border-gray-700 bg-white/95 bottom-0 left-0 right-0 z-50 sticky dark:bg-gray-900/95 backdrop-blur-md p-4 shadow-lg"
      >
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3" dir="rtl">
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-gradient px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب رسالتك هنا... جرب: احسب $$x^2 + 5x + 6 = 0$$"
              disabled={isLoading}
              className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl text-right arabic-text text-base py-3 px-4 disabled:opacity-50"
              dir="auto"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            اضغط Enter للإرسال • يدعم العربية والإنجليزية والمعادلات الرياضية
            والبرمجة
          </p>
        </form>
      </motion.div>
    </div>
  );
}
