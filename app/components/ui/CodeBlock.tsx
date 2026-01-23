"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { CodeBlock as ReactCodeBlock, dracula, monokai, github, nord, railscast } from "react-code-blocks";

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Theme selection - change this to try different themes:
// dracula (current) - vibrant purple/pink theme
// monokai - classic dark theme with bright colors
// github - clean light theme
// nord - cool blue/gray theme
// railscast - warm dark theme
const selectedTheme = dracula; // Change to: monokai, github, nord, or railscast

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="group relative">
      {/* Header Bar - VS Code style */}
      <div className="flex items-center justify-between border border-white/10 border-b-0 px-4 py-2.5 rounded-t-lg" style={{ backgroundColor: selectedTheme.backgroundColor }}>
        <div className="flex items-center gap-3">
          {/* Window Controls */}
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          {/* Language Badge */}
          <span className="text-xs text-foreground/60 font-mono uppercase tracking-wider px-2 py-0.5 bg-white/5 rounded border border-white/10">
            {language}
          </span>
        </div>
        {/* Copy Button */}
        <motion.button
          onClick={copyToClipboard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground/70 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 hover:border-emerald-400/30 transition-all duration-200"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Code Block */}
      <div className="relative border border-white/10 border-t-0 rounded-b-lg overflow-hidden shadow-xl" style={{ backgroundColor: selectedTheme.backgroundColor }}>
        <div className="code-wrapper [&_pre]:!m-0 [&_pre]:!p-4 [&_pre]:!rounded-none [&_pre]:!overflow-x-auto [&_code]:!text-sm [&_code]:!font-mono [&_span]:!leading-6">
          <ReactCodeBlock
            text={code}
            language={language}
            theme={selectedTheme}
            showLineNumbers={true}
            startingLineNumber={1}
            customStyle={{
              padding: "1rem",
              borderRadius: "0",
              fontSize: "0.875rem",
              fontFamily: "'Courier New', 'Monaco', 'Menlo', monospace",
              margin: "0",
              lineHeight: "1.5rem",
            }}
            codeBlockStyle={{
              backgroundColor: selectedTheme.backgroundColor,
            }}
          />
        </div>
      </div>
    </div>
  );
}
