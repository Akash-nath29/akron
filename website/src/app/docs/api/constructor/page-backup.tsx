'use client';

import { DocsLayout, PreCodeBlock, CodeBlock } from "@/components/DocsLayout";

export default function ConstructorPage() {
  return (
    <DocsLayout 
      title="Akron Constructor" 
      description="Initialize database connections with the Akron class constructor for SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The Akron constructor is your entry point to any database. It accepts a connection URL string and automatically 
          selects the appropriate driver based on the URL scheme.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Signature</h3>
          <CodeBlock>{`Akron(db_url: str = "sqlite:///akron.db")`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">db_url</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str</p>
            <p className="text-gray-600 mb-2"><strong>Default:</strong> &quot;sqlite:///akron.db&quot;</p>
            <p className="text-gray-600">
              Database connection URL. The scheme determines which driver to use:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li><code>sqlite://</code> - SQLite database</li>
              <li><code>mysql://</code> - MySQL database</li>
              <li><code>postgres://</code> - PostgreSQL database</li>
              <li><code>mongodb://</code> - MongoDB database</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 mb-2"><strong>Type:</strong> Akron</p>
          <p className="text-gray-600">
            An Akron instance configured with the appropriate database driver ready for operations.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <div className="space-y-8">
          {/* SQLite Example */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">SQLite Database</h3>
            <PreCodeBlock>
{`from akron import Akron

# Default SQLite database
db = Akron()

# Custom SQLite database
db = Akron("sqlite:///my_app.db")

# In-memory SQLite database
db = Akron("sqlite:///:memory:")`}
            </PreCodeBlock>
          </div>

          {/* MySQL Example */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MySQL Database</h3>
            <PreCodeBlock>
{`from akron import Akron

# MySQL connection
db = Akron("mysql://user:password@localhost:3306/database")

# MySQL with additional parameters
db = Akron("mysql://user:password@localhost:3306/database?charset=utf8mb4")`}
            </PreCodeBlock>
          </div>

          {/* PostgreSQL Example */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">PostgreSQL Database</h3>
            <PreCodeBlock>
{`from akron import Akron

# PostgreSQL connection
db = Akron("postgres://user:password@localhost:5432/database")

# PostgreSQL with SSL
db = Akron("postgres://user:password@localhost:5432/database?sslmode=require")`}
            </PreCodeBlock>
          </div>

          {/* MongoDB Example */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MongoDB Database</h3>
            <PreCodeBlock>
{`from akron import Akron

# MongoDB connection
db = Akron("mongodb://localhost:27017/database")

# MongoDB with authentication
db = Akron("mongodb://user:password@localhost:27017/database")`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection URL Formats</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SQLite</h3>
            <ul className="text-gray-600 space-y-1">
              <li><code>sqlite:///path/to/database.db</code> - File database</li>
              <li><code>sqlite:///:memory:</code> - In-memory database</li>
              <li><code>sqlite:///./relative/path.db</code> - Relative path</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">MySQL</h3>
            <ul className="text-gray-600 space-y-1">
              <li><code>mysql://user:password@host:port/database</code> - Standard format</li>
              <li><code>mysql://user@host/database</code> - No password</li>
              <li><code>mysql://user:password@host/database?option=value</code> - With options</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">PostgreSQL</h3>
            <ul className="text-gray-600 space-y-1">
              <li><code>postgres://user:password@host:port/database</code> - Standard format</li>
              <li><code>postgresql://user:password@host:port/database</code> - Alternative scheme</li>
              <li><code>postgres://user@host/database?sslmode=require</code> - With SSL</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">MongoDB</h3>
            <ul className="text-gray-600 space-y-1">
              <li><code>mongodb://host:port/database</code> - Simple connection</li>
              <li><code>mongodb://user:password@host:port/database</code> - With authentication</li>
              <li><code>mongodb://host1:port1,host2:port2/database</code> - Replica set</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        <PreCodeBlock>
{`from akron import Akron
from akron.exceptions import AkronError

try:
    db = Akron("mysql://invalid:credentials@localhost/db")
except AkronError as e:
    print(f"Connection failed: {e}")
    # Handle connection error
    
# Check if database is connected
if db.is_connected():
    print("Database connected successfully")
else:
    print("Failed to connect to database")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Environment Variables</h3>
            <p className="text-green-800 mb-2">
              Store database credentials in environment variables for security:
            </p>
            <PreCodeBlock>
{`import os
from akron import Akron

# Using environment variables
db_url = os.getenv("DATABASE_URL", "sqlite:///default.db")
db = Akron(db_url)`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Connection Pooling</h3>
            <p className="text-blue-800">
              Akron automatically handles connection pooling for database drivers that support it, 
              ensuring efficient resource usage in production applications.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Database-Specific Notes</h3>
            <ul className="text-yellow-800 space-y-2">
              <li><strong>SQLite:</strong> Automatic creation of database file if it doesn&apos;t exist</li>
              <li><strong>MySQL:</strong> Requires mysql-connector-python package</li>
              <li><strong>PostgreSQL:</strong> Requires psycopg2 package</li>
              <li><strong>MongoDB:</strong> Requires pymongo package</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Table Management</h3>
            <a href="/docs/api/create-table" className="text-blue-600 hover:text-blue-800 text-sm">
              → create_table() method
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Operations</h3>
            <a href="/docs/api/insert" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about insert()
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
