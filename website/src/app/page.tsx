"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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

function CodeBlock({ children, showCopy = true, className = "" }: CodeBlockProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 relative flex items-center justify-between ${className}`}>
      <code className="text-gray-800 text-sm font-mono flex-1">{children}</code>
      {showCopy && <CopyButton text={children} className="ml-4 flex-shrink-0" />}
    </div>
  );
}

function PreCodeBlock({ children, showCopy = true }: { children: string; showCopy?: boolean }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 overflow-x-auto relative">
      <pre className="text-gray-800 text-sm">{children}</pre>
      {showCopy && <CopyButton text={children} className="absolute top-4 right-4" />}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
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
              <span className="text-xl font-bold text-gray-900">Akron ORM</span>
            </div>
            <div className="flex space-x-8">
              <Link href="/docs" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documentation
              </Link>
              <Link href="https://github.com/Akash-nath29/akron" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Akron ORM"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Akron ORM
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Universal, framework-independent ORM for Python. Simple, lightweight, and developer-friendly.
          </p>
          
          {/* Installation Command */}
          <div className="mb-8 max-w-md mx-auto">
            <CodeBlock>pip install akron</CodeBlock>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Akron ORM?</h2>
            <p className="text-lg text-gray-600">Built for developers who value simplicity and performance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Single-Table ORM Support</h3>
              <p className="text-gray-600">
                Works with MySQL, PostgreSQL, and SQLite. Provides clean, simple APIs for CRUD operations. 
                No unnecessary abstractions — just enough to get started quickly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Unified SQL Interface</h3>
              <p className="text-gray-600">
                One consistent API across all supported SQL databases. 
                No need to write database-specific queries or boilerplate.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightweight & Developer-Friendly</h3>
              <p className="text-gray-600">
                Zero heavy dependencies; minimal footprint. 
                Focused on being fast to integrate for prototyping or early-stage products.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Built for Growth</h3>
              <p className="text-gray-600">
                Codebase is structured for future multi-table, relations, and foreign key support. 
                Clear architecture so developers can contribute or customize.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Early Adopter Friendly</h3>
              <p className="text-gray-600">
                Open-source, making it easy for devs to inspect and modify. 
                Clean, modern code that&apos;s easy to understand and extend.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Database Support</h3>
              <p className="text-gray-600">
                Supports SQLite, MySQL, PostgreSQL, and MongoDB with a unified interface. 
                Switch databases without changing your code.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Example</h2>
            <p className="text-lg text-gray-600">Get up and running in minutes</p>
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
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Akron ORM"
                width={40}
                height={40}
                className="mr-4"
              />
              <div>
                <span className="text-xl font-bold">Akron ORM</span>
                <p className="text-gray-300 text-sm">Universal Python ORM</p>
              </div>
            </div>
            
            {/* Team Section */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600 mr-4">
                  <Image
                    src="/we.jpg"
                    alt="Akash Nath and Rohit Debnath"
                    width={64}
                    height={64}
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't exist
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23374151'/%3E%3Ctext x='32' y='32' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='24' fill='%23fff'%3EAN%26RD%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-300 mb-2">Made with ❤️ by</p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">Akash Nath</span>
                      <div className="flex space-x-2">
                        <Link href="https://github.com/Akash-nath29" className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </Link>
                        <Link href="https://linkedin.com/in/akash-nath29" className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">Rohit Debnath</span>
                      <div className="flex space-x-2">
                        <Link href="https://github.com/rohitdebnath" className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </Link>
                        <Link href="https://linkedin.com/in/rohitdebnath" className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-6">
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="https://github.com/Akash-nath29/akron" className="text-gray-300 hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="https://pypi.org/project/akron/" className="text-gray-300 hover:text-white transition-colors">
                PyPI
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
