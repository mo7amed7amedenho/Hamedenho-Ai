"use client"

import ReactMarkdown from "react-markdown"
import { SimpleCodeBlock } from "./simple-code-block"
import { MathRenderer } from "./math-renderer"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Process math expressions before rendering
  const processedContent = content
    // Handle block math expressions $$...$$
    .replace(/\$\$([^$]+)\$\$/g, (match, expr) => {
      return `<MATH_BLOCK>${expr.trim()}</MATH_BLOCK>`
    })
    // Handle inline math expressions $...$
    .replace(/\$([^$]+)\$/g, (match, expr) => {
      return `<MATH_INLINE>${expr.trim()}</MATH_INLINE>`
    })

  return (
    <ReactMarkdown
    
      components={{
        code({ node, className, children, ...props }) {
          const codeContent = String(children).replace(/\n$/, "")

        

          return <SimpleCodeBlock code={codeContent} inline={true} />
        },
        p({ children }) {
          const content = String(children)

          // Check for math blocks
          if (content.includes("<MATH_BLOCK>")) {
            const parts = content.split(/(<MATH_BLOCK>.*?<\/MATH_BLOCK>)/g)
            return (
              <div className="mb-3">
                {parts.map((part, index) => {
                  if (part.startsWith("<MATH_BLOCK>")) {
                    const expr = part.replace(/<\/?MATH_BLOCK>/g, "")
                    return <MathRenderer key={index} expression={expr} inline={false} />
                  }
                  return part && <span key={index}>{part}</span>
                })}
              </div>
            )
          }

          // Check for inline math
          if (content.includes("<MATH_INLINE>")) {
            const parts = content.split(/(<MATH_INLINE>.*?<\/MATH_INLINE>)/g)
            return (
              <p className="mb-3 leading-relaxed text-right text-gray-700 dark:text-gray-300 text-base">
                {parts.map((part, index) => {
                  if (part.startsWith("<MATH_INLINE>")) {
                    const expr = part.replace(/<\/?MATH_INLINE>/g, "")
                    return <MathRenderer key={index} expression={expr} inline={true} />
                  }
                  return part && <span key={index}>{part}</span>
                })}
              </p>
            )
          }

          return (
            <p className="mb-3 leading-relaxed text-right text-gray-700 dark:text-gray-300 text-base">{children}</p>
          )
        },
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mb-3 text-right text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold mb-2 text-right text-gray-800 dark:text-gray-200">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-medium mb-2 text-right text-gray-700 dark:text-gray-300">{children}</h3>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-3 text-right space-y-1 text-gray-700 dark:text-gray-300 mr-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-3 text-right space-y-1 text-gray-700 dark:text-gray-300 mr-4">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="text-right leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-r-4 border-blue-500 dark:border-blue-400 pr-4 italic text-gray-600 dark:text-gray-400 my-3 bg-gray-50 dark:bg-gray-800/50 py-2 rounded-r">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-800 dark:text-gray-200">{children}</em>,
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-700 font-semibold text-right">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right">{children}</td>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
          >
            {children}
          </a>
        ),
      }}
    >
      {processedContent}
    </ReactMarkdown>
  )
}
