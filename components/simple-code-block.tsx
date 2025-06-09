"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimpleCodeBlockProps {
  code: string;
  language?: string;
  inline?: boolean;
}

export function SimpleCodeBlock({
  code,
  language,
  inline = false,
}: SimpleCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  if (inline) {
    return (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-purple-600 dark:text-purple-400 break-words">
        {code}
      </code>
    );
  }

  return (
    <div className="relative w-full max-w-full sm:max-w-screen-sm group my-4">
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {language || "code"}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </Button>
      </div>
      <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-b-lg border border-gray-200 dark:border-gray-700 text-sm whitespace-pre-wrap break-words overflow-hidden">
        <code className="font-mono text-gray-800 dark:text-gray-200">
          {code}
        </code>
      </pre>
    </div>
  );
}
