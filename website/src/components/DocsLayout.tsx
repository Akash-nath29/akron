"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors ${className}`}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

interface CodeBlockProps {
  children: string;
  showCopy?: boolean;
  className?: string;
}

export function CodeBlock({ children, showCopy = true, className = "" }: CodeBlockProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 relative flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 ${className}`}>
      <code className="text-gray-800 text-xs sm:text-sm font-mono flex-1 break-all sm:break-normal mr-0 sm:mr-4 mb-2 sm:mb-0">{children}</code>
      {showCopy && <CopyButton text={children} className="self-end sm:self-auto flex-shrink-0" />}
    </div>
  );
}

export function PreCodeBlock({ children, showCopy = true, title }: { children: string; showCopy?: boolean; title?: string }) {
  const highlightPython = (code: string) => {
    const lines = code.split('\n');
    
    const tokenize = (line: string) => {
      if (!line.trim()) {
        return [{text: line, type: 'default'}];
      }

      // Simple but effective tokenization
      const result = line;
      
      // Handle comments first (everything after # becomes a comment)
      const commentIndex = result.indexOf('#');
      if (commentIndex !== -1) {
        const beforeComment = result.slice(0, commentIndex);
        const comment = result.slice(commentIndex);
        
        // Process non-comment part
        const beforeTokens = tokenizeNonComment(beforeComment);
        return [...beforeTokens, {text: comment, type: 'comment'}];
      }
      
      return tokenizeNonComment(result);
    };
    
    const tokenizeNonComment = (text: string) => {
      if (!text) return [];
      
      const tokens: Array<{text: string, type: string}> = [];
      const patterns = [
        { regex: /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, type: 'string' },
        { regex: /\b(from|import|class|def|if|else|elif|for|while|try|except|finally|with|as|return|yield|break|continue|pass|lambda|and|or|not|in|is|None|True|False|print|len|range|str|int|float|bool|list|dict|set|tuple)\b/g, type: 'keyword' },
        { regex: /\b(\d+(?:\.\d+)?)\b/g, type: 'number' },
        { regex: /\b([A-Z][a-zA-Z0-9_]*)\b/g, type: 'class' },
      ];
      
      let remaining = text;
      
      while (remaining) {
        let found = false;
        
        // Try each pattern
        for (const pattern of patterns) {
          const regex = new RegExp(pattern.regex.source);
          const match = regex.exec(remaining);
          
          if (match && match.index === 0) {
            // Add the matched token
            tokens.push({text: match[0], type: pattern.type});
            remaining = remaining.slice(match[0].length);
            found = true;
            break;
          }
        }
        
        if (!found) {
          // No pattern matched, consume one character as default
          tokens.push({text: remaining[0], type: 'default'});
          remaining = remaining.slice(1);
        }
      }
      
      // Merge consecutive default tokens
      const merged: Array<{text: string, type: string}> = [];
      for (const token of tokens) {
        if (merged.length > 0 && merged[merged.length - 1].type === 'default' && token.type === 'default') {
          merged[merged.length - 1].text += token.text;
        } else {
          merged.push(token);
        }
      }
      
      return merged;
    };
    
    return lines.map((line, lineIndex) => (
      <div key={lineIndex} className="flex">
        <span className="text-gray-400 text-xs mr-2 sm:mr-4 select-none w-6 sm:w-8 text-right flex-shrink-0">
          {lineIndex + 1}
        </span>
        <span className="flex-1 min-w-0">
          {tokenize(line).map((token, tokenIndex) => (
            <span
              key={tokenIndex}
              className={
                token.type === 'keyword' ? 'text-purple-600' :
                token.type === 'string' ? 'text-green-600' :
                token.type === 'comment' ? 'text-gray-500' :
                token.type === 'number' ? 'text-orange-600' :
                token.type === 'class' ? 'text-blue-600' :
                'text-gray-800'
              }
            >
              {token.text}
            </span>
          ))}
        </span>
      </div>
    ));
  };

  return (
    <div className="mb-6">
      {title && (
        <div className="bg-gray-100 border border-gray-200 rounded-t-lg px-3 sm:px-4 py-2 border-b-0">
          <span className="text-xs sm:text-sm font-medium text-gray-700">{title}</span>
        </div>
      )}
      <div className={`bg-gray-50 border border-gray-200 ${title ? 'rounded-b-lg' : 'rounded-lg'} p-3 sm:p-6 overflow-x-auto relative group`}>
        <div className="text-xs sm:text-sm leading-relaxed" style={{fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace'}}>
          {highlightPython(children)}
        </div>
        {showCopy && (
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(children);
              } catch (err) {
                console.error('Failed to copy:', err);
              }
            }}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 rounded-md transition-colors border border-gray-200 text-xs sm:text-sm"
            title="Copy to clipboard"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function OutputBlock({ children, title = "Expected Output" }: { children: string; title?: string }) {
  return (
    <div className="mb-6">
      <div className="bg-green-100 border border-green-200 rounded-t-lg px-3 sm:px-4 py-2 border-b-0">
        <span className="text-xs sm:text-sm font-medium text-green-700">{title}</span>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-b-lg p-3 sm:p-6 overflow-x-auto">
        <pre className="text-xs sm:text-sm text-green-800 leading-relaxed" style={{fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace'}}>
          {children}
        </pre>
      </div>
    </div>
  );
}

interface DocsLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function DocsLayout({ children, title, description }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-2"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Akron ORM"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-xl font-bold text-gray-900 hidden sm:block">Akron ORM</span>
                <span className="text-lg font-bold text-gray-900 sm:hidden">Akron</span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              <Link href="/docs" className="text-blue-600 px-3 py-2 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden lg:inline">Documentation</span>
                <span className="lg:hidden">Docs</span>
              </Link>
              <Link href="https://github.com/Akash-nath29/akron" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Link>
            </div>
            
            {/* Mobile menu toggle for nav items */}
            <div className="md:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Mobile navigation links */}
              <div className="mb-6 md:hidden">
                <Link href="/docs" className="block text-blue-600 px-3 py-2 text-sm font-medium mb-2" onClick={() => setSidebarOpen(false)}>
                  📖 Documentation
                </Link>
                <Link href="https://github.com/Akash-nath29/akron" className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium" onClick={() => setSidebarOpen(false)}>
                  💻 GitHub
                </Link>
              </div>
              
              {/* Sidebar navigation */}
              <MobileSidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <DesktopSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="max-w-none">
              <div className="mb-6 lg:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4 leading-tight">{title}</h1>
                {description && (
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed">{description}</p>
                )}
              </div>
              <div className="prose prose-gray max-w-none prose-headings:scroll-mt-24">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate component for desktop sidebar
function DesktopSidebar() {
  return (
    <nav className="space-y-2">
      <SidebarContent />
    </nav>
  );
}

// Separate component for mobile sidebar
function MobileSidebar({ onClose }: { onClose: () => void }) {
  return (
    <nav className="space-y-2">
      <SidebarContent onLinkClick={onClose} />
    </nav>
  );
}

// Shared sidebar content
function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <>
      <div className="pb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Getting Started
        </h3>
        <ul className="mt-2 space-y-1">
          <li><Link href="/docs/getting-started/installation" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>Installation</Link></li>
          <li><Link href="/docs/getting-started/quick-start" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>Quick Start</Link></li>
          <li><Link href="/docs/getting-started/basic-usage" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>Basic Usage</Link></li>
        </ul>
      </div>
      
      <div className="pb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          API Reference
        </h3>
        <ul className="mt-2 space-y-1">
          <li><Link href="/docs/api/create-table" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>create_table()</Link></li>
          <li><Link href="/docs/api/insert" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>insert()</Link></li>
          <li><Link href="/docs/api/find" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>find()</Link></li>
          <li><Link href="/docs/api/update" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>update()</Link></li>
          <li><Link href="/docs/api/delete" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>delete()</Link></li>
          <li><Link href="/docs/api/close" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>close()</Link></li>
          <li><Link href="/docs/api/transaction" className="text-gray-600 hover:text-blue-800 text-sm block py-1" onClick={onLinkClick}>transaction()</Link></li>
        </ul>
      </div>

      <div className="pb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          CLI Reference
        </h3>
        <ul className="mt-2 space-y-1">
          <li><Link href="/docs/cli/create-table" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>create-table</Link></li>
          <li><Link href="/docs/cli/drop-table" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>drop-table</Link></li>
          <li><Link href="/docs/cli/seed" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>seed</Link></li>
          <li><Link href="/docs/cli/inspect-schema" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>inspect-schema</Link></li>
          <li><Link href="/docs/cli/makemigrations" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>makemigrations</Link></li>
          <li><Link href="/docs/cli/migrate" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>migrate</Link></li>
          <li><Link href="/docs/cli/raw-sql" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>raw-sql</Link></li>
        </ul>
      </div>
      
      <div className="pb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Database Support
        </h3>
        <ul className="mt-2 space-y-1">
          <li><Link href="/docs/database-support/sqlite" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>SQLite</Link></li>
          <li><Link href="/docs/database-support/mysql" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>MySQL</Link></li>
          <li><Link href="/docs/database-support/postgresql" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>PostgreSQL</Link></li>
          <li><Link href="/docs/database-support/mongodb" className="text-gray-600 hover:text-blue-600 text-sm block py-1" onClick={onLinkClick}>MongoDB</Link></li>
        </ul>
      </div>

      <div className="pb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
          </svg>
          More Docs
        </h3>
        <ul className="mt-2 space-y-1">
          <li><Link href="/docs/schema-management" className="text-gray-600 hover:text-blue-800 text-sm block py-1" onClick={onLinkClick}>Prisma-like Schema Management</Link></li>
        </ul>
      </div>
    </>
  );
}
