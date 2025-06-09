"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MathRendererProps {
  expression: string
  inline?: boolean
}

export function MathRenderer({ expression, inline = false }: MathRendererProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(expression)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Convert LaTeX-like syntax to readable math
  const formatMath = (expr: string) => {
    return expr
      .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
      .replace(/\^(\d+)/g, "^$1")
      .replace(/\^{([^}]+)}/g, "^($1)")
      .replace(/_(\d+)/g, "₍$1₎")
      .replace(/_{([^}]+)}/g, "₍$1₎")
      .replace(/\\sin/g, "sin")
      .replace(/\\cos/g, "cos")
      .replace(/\\tan/g, "tan")
      .replace(/\\log/g, "log")
      .replace(/\\ln/g, "ln")
      .replace(/\\pi/g, "π")
      .replace(/\\alpha/g, "α")
      .replace(/\\beta/g, "β")
      .replace(/\\gamma/g, "γ")
      .replace(/\\delta/g, "δ")
      .replace(/\\theta/g, "θ")
      .replace(/\\lambda/g, "λ")
      .replace(/\\mu/g, "μ")
      .replace(/\\sigma/g, "σ")
      .replace(/\\phi/g, "φ")
      .replace(/\\omega/g, "ω")
      .replace(/\\infty/g, "∞")
      .replace(/\\sum/g, "∑")
      .replace(/\\int/g, "∫")
      .replace(/\\partial/g, "∂")
      .replace(/\\nabla/g, "∇")
      .replace(/\\pm/g, "±")
      .replace(/\\mp/g, "∓")
      .replace(/\\times/g, "×")
      .replace(/\\div/g, "÷")
      .replace(/\\leq/g, "≤")
      .replace(/\\geq/g, "≥")
      .replace(/\\neq/g, "≠")
      .replace(/\\approx/g, "≈")
      .replace(/\\equiv/g, "≡")
  }

  if (inline) {
    return (
      <span className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded border border-blue-200 dark:border-blue-700">
        <code className="font-mono text-blue-800 dark:text-blue-200 text-sm">{formatMath(expression)}</code>
      </span>
    )
  }

  return (
    <div className="my-6 max-w-screen-sm group">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200">معادلة رياضية</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </Button>
        </div>

        <div className="text-center">
          <div className="inline-block bg-white dark:bg-gray-800 px-6 py-4 rounded-lg border border-blue-300 dark:border-blue-600 shadow-sm">
            <code className="font-mono text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              {formatMath(expression)}
            </code>
          </div>
        </div>

        <div className="mt-4 text-xs text-blue-600 dark:text-blue-400 text-center">انقر على زر النسخ لنسخ المعادلة</div>
      </div>
    </div>
  )
}
