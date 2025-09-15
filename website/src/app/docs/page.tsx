import { DocsLayout, PreCodeBlock, OutputBlock, CodeBlock } from "../../components/DocsLayout";
import Link from "next/link";

export default function DocsPage() {
  return (
    <DocsLayout 
      title="Akron ORM Documentation" 
      description="Complete guide to using Akron ORM - the universal Python ORM supporting SQLite, MySQL, PostgreSQL, and MongoDB with a unified API."
    >
      <section className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Welcome to Akron ORM
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A universal Python ORM that provides a consistent, type-safe API across SQLite, MySQL, 
            PostgreSQL, and MongoDB. Build database applications with confidence and flexibility.
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-orange-900 mb-3 flex items-center">
            🚀 <span className="ml-2">Quick Start</span>
          </h2>
          <PreCodeBlock>
{`# Install Akron
pip install akron

# Import and connect
from akron import Akron

# Works with any database
db = Akron("sqlite:///myapp.db")

# Create tables
db.create_table("users", {
    "id": "int",
    "username": "str", 
    "email": "str"
})

# Insert data
user_id = db.insert("users", {
    "username": "alice",
    "email": "alice@example.com"
})

# Query data
users = db.find("users", {"username": "alice"})
print(f"Found user: {users[0]}")

db.close()`}
          </PreCodeBlock>
          <OutputBlock>
{`Found user: {'id': 1, 'username': 'alice', 'email': 'alice@example.com'}`}
          </OutputBlock>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">🆕 New: Declarative Schema Management</h2>
          <p className="text-blue-800 mb-4">Akron now features powerful declarative schema management with automatic migrations!</p>
          <PreCodeBlock>
{`# Initialize a new project with schema template
akron db init --provider sqlite

# Edit the generated akron.json to define your schema
# Generate migrations from schema changes
akron db makemigrations --name "initial"

# Apply migrations to database
akron db migrate

# Check status
akron db status`}
          </PreCodeBlock>
          <div className="mt-4">
            <Link href="/docs/schema-management" className="text-blue-700 hover:text-blue-900 font-medium">
              Learn more about Schema Management →
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Documentation Sections</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Getting Started */}
          <Link href="/docs/getting-started" className="group">
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-orange-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 text-green-600 rounded-lg p-2 mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Getting Started</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Installation, setup, and your first database operations. Perfect for newcomers to Akron ORM.
              </p>
            </div>
          </Link>

          {/* Schema Management */}
          <Link href="/docs/schema-management" className="group">
            <div className="border border-orange-200 bg-orange-50 rounded-lg p-4 sm:p-6 hover:border-orange-300 hover:shadow-md transition-all duration-200 relative">
              <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                NEW
              </div>
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 text-orange-600 rounded-lg p-2 mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Schema Management</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Declarative schema definition with automatic migrations. Define your database structure in JSON.
              </p>
            </div>
          </Link>

          {/* CLI Tools */}
          <Link href="/docs/cli" className="group">
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-orange-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-3">
                <div className="bg-gray-100 text-gray-600 rounded-lg p-2 mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">CLI Tools</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Command-line tools for database management, migrations, and development workflow.
              </p>
            </div>
          </Link>

          {/* Database Support */}
          <Link href="/docs/database-support" className="group">
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-orange-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 text-purple-600 rounded-lg p-2 mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Database Support</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Learn about SQLite, MySQL, PostgreSQL, and MongoDB support with specific examples.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">API Methods Quick Reference</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Operations</h3>
            <div className="space-y-2">
              <Link href="/docs/api/constructor" className="block text-orange-600 hover:text-orange-800 text-sm transition-colors">
                <code className="bg-gray-100 px-2 py-1 rounded">Akron(connection_url)</code> - Database connection
              </Link>
              <Link href="/docs/api/create-table" className="block text-orange-600 hover:text-orange-800 text-sm transition-colors">
                <code className="bg-gray-100 px-2 py-1 rounded">create_table(name, schema)</code> - Create tables
              </Link>
              <Link href="/docs/api/insert" className="block text-orange-600 hover:text-orange-800 text-sm transition-colors">
                <code className="bg-gray-100 px-2 py-1 rounded">insert(table, data)</code> - Add records
              </Link>
              <Link href="/docs/api/find" className="block text-orange-600 hover:text-orange-800 text-sm transition-colors">
                <code className="bg-gray-100 px-2 py-1 rounded">find(table, filters)</code> - Query data
              </Link>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Management</h3>
            <div className="space-y-2">
              <Link href="/docs/api/update" className="block text-orange-600 hover:text-orange-800 text-sm transition-colors">
                <code className="bg-gray-100 px-2 py-1 rounded">update(table, filters, new_values)</code> - Modify records
              </Link>
              <Link href="/docs/api/delete" className="block text-orange-600 hover:text-orange-800 text-sm transition-colors">
                <code className="bg-gray-100 px-2 py-1 rounded">delete(table, filters)</code> - Remove records
              </Link>
              <Link href="/docs/api/close" className="block text-orange-600 hover:text-orange-800 text-sm transition-colors">
                <code className="bg-gray-100 px-2 py-1 rounded">close()</code> - Close connection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Supported Databases</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="text-2xl mb-2">🗄️</div>
              <h3 className="font-semibold text-gray-900 text-sm">SQLite</h3>
              <p className="text-xs text-gray-600 mt-1">File-based database</p>
            </div>
            <CodeBlock>{`sqlite:///app.db`}</CodeBlock>
          </div>

          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="text-2xl mb-2">🐬</div>
              <h3 className="font-semibold text-gray-900 text-sm">MySQL</h3>
              <p className="text-xs text-gray-600 mt-1">Popular web database</p>
            </div>
            <CodeBlock>{`mysql://user:pass@host/db`}</CodeBlock>
          </div>

          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="text-2xl mb-2">🐘</div>
              <h3 className="font-semibold text-gray-900 text-sm">PostgreSQL</h3>
              <p className="text-xs text-gray-600 mt-1">Advanced SQL features</p>
            </div>
            <CodeBlock>{`postgres://user:pass@host/db`}</CodeBlock>
          </div>

          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="text-2xl mb-2">🍃</div>
              <h3 className="font-semibold text-gray-900 text-sm">MongoDB</h3>
              <p className="text-xs text-gray-600 mt-1">Document database</p>
            </div>
            <CodeBlock>{`mongodb://host:port/db`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="bg-orange-100 text-orange-600 rounded-lg p-2 w-fit mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Universal API</h3>
            <p className="text-gray-600 text-sm">
              Same code works across SQLite, MySQL, PostgreSQL, and MongoDB.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="bg-green-100 text-green-600 rounded-lg p-2 w-fit mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Type Safety</h3>
            <p className="text-gray-600 text-sm">
              Built-in Pydantic integration for automatic data validation.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="bg-purple-100 text-purple-600 rounded-lg p-2 w-fit mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Migration</h3>
            <p className="text-gray-600 text-sm">
              Switch between databases with minimal code changes.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="bg-blue-100 text-blue-600 rounded-lg p-2 w-fit mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CLI Tools</h3>
            <p className="text-gray-600 text-sm">
              Powerful command-line interface for schema management.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="bg-red-100 text-red-600 rounded-lg p-2 w-fit mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Production Ready</h3>
            <p className="text-gray-600 text-sm">
              Connection pooling, error handling, and transaction support.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="bg-indigo-100 text-indigo-600 rounded-lg p-2 w-fit mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Zero Dependencies</h3>
            <p className="text-gray-600 text-sm">
              Minimal footprint with optional database drivers.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Community & Support</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="bg-orange-100 text-orange-600 rounded-lg p-3 w-fit mx-auto mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">GitHub</h3>
              <p className="text-gray-600 text-sm mb-3">
                Source code, issues, and contributions
              </p>
              <a 
                href="https://github.com/AkronORM/Akron" 
                className="text-orange-600 hover:text-orange-800 text-sm font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repository →
              </a>
            </div>

            <div className="text-center">
              <div className="bg-green-100 text-green-600 rounded-lg p-3 w-fit mx-auto mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600 text-sm mb-3">
                Comprehensive guides and examples
              </p>
              <Link href="/docs/getting-started" className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors">
                Get Started →
              </Link>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 rounded-lg p-3 w-fit mx-auto mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                </div>
              <h3 className="font-semibold text-gray-900 mb-2">Package</h3>
              <p className="text-gray-600 text-sm mb-3">
                Install via PyPI package manager
              </p>
              <a 
                href="https://pypi.org/project/akron/" 
                className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on PyPI →
              </a>
            </div>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
