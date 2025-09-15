"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

interface CopyButtonProps {
  text: string;
  className?: string;
}

function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback method for older browsers or non-secure contexts
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
      // Still show copied state even if copy failed to prevent confusion
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors ${className} cursor-pointer`}
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

function CodeBlock({ children, showCopy = true, className = "" }: CodeBlockProps) {
  return (
    <div className={`bg-gray-100 border border-gray-300 rounded-lg p-4 relative flex items-center justify-between group ${className}`}>
      <div className="flex items-center space-x-3 flex-1">
        <span className="text-gray-500 text-sm font-mono">$</span>
        <code className="text-gray-800 text-sm font-mono flex-1">{children}</code>
      </div>
      {showCopy && <CopyButton text={children} className="ml-4 flex-shrink-0" />}
    </div>
  );
}

function PreCodeBlock({ children, showCopy = true }: { children: string; showCopy?: boolean }) {
  const highlightPython = (code: string) => {
    const lines = code.split('\n');
    
    const tokenize = (line: string) => {
      const tokens: Array<{text: string, type: string}> = [];
      const patterns = [
        { regex: /\b(from|import|class|def|if|else|elif|for|while|try|except|finally|with|as|return|yield|break|continue|pass|lambda|and|or|not|in|is|None|True|False)\b/g, type: 'keyword' },
        { regex: /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, type: 'string' },
        { regex: /(#.*$)/g, type: 'comment' },
        { regex: /\b(\d+(?:\.\d+)?)\b/g, type: 'number' },
        { regex: /\b([A-Z][a-zA-Z0-9_]*)\b/g, type: 'class' },
      ];
      
      // Simple tokenization - collect all matches
      const allMatches: Array<{match: RegExpMatchArray, type: string}> = [];
      
      patterns.forEach(pattern => {
        let match;
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        while ((match = regex.exec(line)) !== null) {
          allMatches.push({match, type: pattern.type});
        }
      });
      
      // Sort matches by position
      allMatches.sort((a, b) => a.match.index! - b.match.index!);
      
      let currentIndex = 0;
      allMatches.forEach(({match, type}) => {
        if (match.index! > currentIndex) {
          // Add text before match
          tokens.push({text: line.slice(currentIndex, match.index), type: 'default'});
        }
        // Add the match
        tokens.push({text: match[0], type});
        currentIndex = match.index! + match[0].length;
      });
      
      // Add remaining text
      if (currentIndex < line.length) {
        tokens.push({text: line.slice(currentIndex), type: 'default'});
      }
      
      return tokens.length > 0 ? tokens : [{text: line, type: 'default'}];
    };
    
    return lines.map((line, lineIndex) => (
      <div key={lineIndex} className="flex">
        <span className="text-gray-400 text-xs mr-4 select-none w-8 text-right">
          {lineIndex + 1}
        </span>
        <span className="flex-1">
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
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 overflow-x-auto relative group">
      <div className="text-sm leading-relaxed" style={{fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace'}}>
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
          className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 rounded-md transition-colors border border-gray-200 cursor-pointer"
          title="Copy to clipboard"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Akron ORM"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-lg sm:text-xl font-bold text-orange-600">
                <span className="hidden sm:inline">Akron ORM</span>
                <span className="sm:hidden">Akron</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <Link href="/docs" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documentation
              </Link>
              <Link href="https://github.com/AkronORM/Akron" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link 
                  href="/docs" 
                  className="text-gray-700 hover:text-orange-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📖 Documentation
                </Link>
                <Link 
                  href="https://github.com/AkronORM/Akron" 
                  className="text-gray-700 hover:text-orange-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  💻 GitHub
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <BackgroundRippleEffect />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="text-center">
            <div className="mb-6 sm:mb-8 flex justify-center">
              <Image
                src="/logo.png"
                alt="Akron ORM"
                width={80}
                height={80}
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-30 lg:h-30 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-medium mb-4">
                Universal Python ORM
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-gray-900">
                One ORM,
              </span>
              <br />
              <span className="text-orange-600">
                Every
              </span>
              <span className="text-gray-900">
                {" "}Database
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Power your Python applications with clean, type-safe database operations 
              across SQLite, MySQL, PostgreSQL, and MongoDB. It&apos;s also open source.
            </p>
            
            {/* Installation Command */}
            <div className="max-w-sm sm:max-w-md mx-auto px-4">
              <CodeBlock>pip install akron</CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 sm:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              We built something truly unique
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              With our modern Python architecture, and tight integration with multiple databases, 
              we created an ORM that feels like magic and scales as fast as your ideas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Feature Blocks */}
            <div className="space-y-8 sm:space-y-12 order-2 lg:order-1">
              {/* Get Started in an Instant */}
              <div className="relative">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">Get Started in an Instant</h3>
                    <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                      Spin up a production-ready database connection in seconds. 
                      Get always-on performance, even after scaling to zero.
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Blazing-fast from the first request on, all the way to thousands per second—Python ORM done right.
                    </p>
                  </div>
                </div>
              </div>

              {/* Type Safety */}
              <div className="relative">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">Redefining how your database works</h3>
                    <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                      Add query-level type safety with one line of code to serve data fast from our robust Python ecosystem.
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      <span className="text-emerald-600 underline">Pydantic-powered</span> models, running on modern Python servers, maximize database performance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Universal Support */}
              <div className="relative">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">Universal Database Support</h3>
                    <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                      Works seamlessly with SQLite, MySQL, PostgreSQL, and MongoDB. 
                      One consistent API across all your database needs.
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Switch between databases without changing your code. Perfect for development, testing, and production environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual/Code Demo */}
            <div className="relative order-1 lg:order-2">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-600">main.py</span>
                </div>
                  <div className="space-y-2 font-mono text-xs sm:text-sm overflow-x-auto" style={{fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace'}}>
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                      <span className="text-gray-400 text-xs">1</span>
                      <span className="text-purple-600">from</span>
                      <span className="text-blue-600">akron</span>
                      <span className="text-purple-600">import</span>
                      <span className="text-blue-600">Akron</span>
                    </div>
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                      <span className="text-gray-400 text-xs">2</span>
                      <span className="text-purple-600">from</span>
                      <span className="text-blue-600">akron.models</span>
                      <span className="text-purple-600">import</span>
                      <span className="text-blue-600">ModelMixin</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs">3</span>
                    </div>
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                      <span className="text-gray-400 text-xs">4</span>
                      <span className="text-orange-600">db</span>
                      <span className="text-gray-900">=</span>
                      <span className="text-blue-600">Akron</span>
                      <span className="text-gray-900">(</span>
                      <span className="text-green-600">&quot;sqlite:///app.db&quot;</span>
                      <span className="text-gray-900">)</span>
                    </div>
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                      <span className="text-gray-400 text-xs">5</span>
                      <span className="text-orange-600">users</span>
                      <span className="text-gray-900">=</span>
                      <span className="text-blue-600">User</span>
                      <span className="text-gray-900">.</span>
                      <span className="text-yellow-600">find</span>
                      <span className="text-gray-900">(</span>
                      <span className="text-orange-600">db</span>
                      <span className="text-gray-900">)</span>
                    </div>
                  </div>
                
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs text-gray-700">Database Connected</span>
                  </div>
                  <div className="text-emerald-700 text-xs sm:text-sm font-mono">
                    ✓ SQLite connection established
                  </div>
                  <div className="text-emerald-700 text-xs sm:text-sm font-mono">
                    ✓ Models synchronized
                  </div>
                  <div className="text-emerald-700 text-xs sm:text-sm font-mono">
                    ✓ Ready for queries
                  </div>
                </div>
              </div>
              
              {/* Floating elements for visual appeal */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example Section */}
      <div className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              See It In <span className="text-orange-600">Action</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Get up and running in minutes with our intuitive API
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <PreCodeBlock>
{`from pydantic import BaseModel
from akron import Akron
from akron.models import ModelMixin

class User(BaseModel, ModelMixin):
    id: int
    name: str
    age: int

# Initialize database connection
db = Akron("sqlite:///test.db")

# Create table
User.create_table(db)

# Insert data
User.insert(db, User(id=1, name="Alice", age=30))

# Query data
users = User.find(db)
print(users)`}
            </PreCodeBlock>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start mb-4">
                <Image
                  src="/logo.png"
                  alt="Akron ORM"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <span className="text-xl font-bold">Akron</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Universal Python ORM for modern applications
              </p>
              
              {/* Team Section with Tooltip */}
              <div className="flex items-center justify-center sm:justify-start">
                <div className="relative group">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-600 hover:border-orange-400 transition-colors cursor-pointer">
                    <Image
                      src="/me.jpg"
                      alt="Akash Nath and Rohit Debnath"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        // Fallback to a placeholder if image doesn't exist
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23374151'/%3E%3Ctext x='24' y='24' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='10' fill='%23fff'%3Ewe :)%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  {/* Cool Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-800 text-white text-sm py-2 px-3 rounded-lg shadow-lg whitespace-nowrap">
                      we :)
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-400">Made with ❤️ by</p>
                  <p className="text-sm text-white font-medium">Akash & Rohit</p>
                </div>
              </div>
            </div>

            {/* Resources Column */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</Link></li>
                <li><Link href="https://github.com/AkronORM/Akron" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</Link></li>
                <li><Link href="https://pypi.org/project/akron/" className="text-gray-400 hover:text-white transition-colors text-sm">PyPI</Link></li>
              </ul>
            </div>

            {/* Akash Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Akash Nath</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="https://github.com/Akash-nath29" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center sm:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com/in/akash-nath29" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center sm:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>

            {/* Rohit Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Rohit Debnath</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="https://github.com/rohitdebnath" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center sm:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com/in/rohitdebnath" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center sm:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm italic">
                &quot;It works on my machine!&quot; – Every developer ever
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
