import { DocsLayout, PreCodeBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function SQLitePage() {
  return (
    <DocsLayout 
      title="SQLite Support" 
      description="Complete guide to using SQLite with Akron ORM - file-based database perfect for development and small applications."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          SQLite is a lightweight, file-based database that requires no separate server process. 
          It&apos;s perfect for development, testing, prototyping, and small to medium applications.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">✅ Advantages</h3>
          <ul className="text-green-800 space-y-1">
            <li>• Zero configuration required</li>
            <li>• Single file database storage</li>
            <li>• ACID compliant transactions</li>
            <li>• Cross-platform compatibility</li>
            <li>• Perfect for development and testing</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Setup</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Connection</h3>
        <PreCodeBlock title="SQLite Connection Examples">
{`from akron import Akron

# File database (recommended for production)
db = Akron("sqlite:///app.db")

# In-memory database (testing only)
db = Akron("sqlite:///:memory:")

# Relative path
db = Akron("sqlite:///./data/app.db")

# Absolute path
db = Akron("sqlite:///C:/projects/myapp/database.db")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection URLs</h3>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">File Database</h4>
            <CodeBlock>sqlite:///path/to/database.db</CodeBlock>
            <p className="text-gray-600 text-sm mt-2">Creates or connects to a file-based database</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">In-Memory Database</h4>
            <CodeBlock>sqlite:///:memory:</CodeBlock>
            <p className="text-gray-600 text-sm mt-2">Creates a temporary database in RAM (lost on disconnect)</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Types</h2>
        <p className="text-gray-600 mb-4">
          SQLite uses dynamic typing with storage classes. Akron maps Python types automatically:
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">Python Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left">SQLite Storage</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>int</code></td>
                <td className="border border-gray-200 px-4 py-2">INTEGER</td>
                <td className="border border-gray-200 px-4 py-2">42, -123</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>str</code></td>
                <td className="border border-gray-200 px-4 py-2">TEXT</td>
                <td className="border border-gray-200 px-4 py-2">&quot;Hello World&quot;</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>float</code></td>
                <td className="border border-gray-200 px-4 py-2">REAL</td>
                <td className="border border-gray-200 px-4 py-2">3.14, -2.5</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>bool</code></td>
                <td className="border border-gray-200 px-4 py-2">INTEGER</td>
                <td className="border border-gray-200 px-4 py-2">1 (True), 0 (False)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>bytes</code></td>
                <td className="border border-gray-200 px-4 py-2">BLOB</td>
                <td className="border border-gray-200 px-4 py-2">Binary data</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Example</h2>
        <PreCodeBlock title="SQLite Full CRUD Example">
{`from akron import Akron
from pydantic import BaseModel
from akron.models import ModelMixin

# Define your model
class User(BaseModel, ModelMixin):
    id: int
    name: str
    email: str
    age: int
    active: bool = True

# Connect to SQLite database
db = Akron("sqlite:///users.db")

# Create table
User.create_table(db)

# Insert data
user1 = User(id=1, name="Alice Johnson", email="alice@example.com", age=28)
user2 = User(id=2, name="Bob Smith", email="bob@example.com", age=35)

User.insert(db, user1)
User.insert(db, user2)

# Query data
all_users = User.select(db)
print(f"Total users: {len(all_users)}")

# Find specific user
alice = User.find(db, {"name": "Alice Johnson"})
print(f"Found: {alice.name} ({alice.email})")

# Update user
User.update(db, {"id": 1}, {"age": 29})

# Delete user
User.delete(db, {"id": 2})

# Verify changes
remaining_users = User.select(db)
print(f"Remaining users: {len(remaining_users)}")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Optimization</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">SQLite-Specific Tips</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">WAL Mode</h4>
            <p className="text-blue-800 mb-2">Enable Write-Ahead Logging for better concurrency:</p>
            <PreCodeBlock>
{`# Enable WAL mode for better performance
db.execute_raw("PRAGMA journal_mode=WAL;")`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Indexing</h4>
            <p className="text-blue-800 mb-2">Create indexes for frequently queried columns:</p>
            <PreCodeBlock>
{`# Create index on email column
db.execute_raw("CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);")`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Batch Operations</h4>
            <p className="text-blue-800 mb-2">Use transactions for bulk operations:</p>
            <PreCodeBlock>
{`# Batch insert with transaction
users = [
    User(id=i, name=f"User {i}", email=f"user{i}@example.com", age=20+i)
    for i in range(1000)
]

# This is automatically wrapped in a transaction
for user in users:
    User.insert(db, user)`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CLI Commands</h2>
        <p className="text-gray-600 mb-4">
          Use Akron CLI for database management tasks:
        </p>
        
        <PreCodeBlock title="SQLite CLI Examples">
{`# Create a table
akron create-table users --db "sqlite:///app.db" --schema '{"id": "int", "name": "str", "email": "str"}'

# Inspect database schema
akron inspect-schema --db "sqlite:///app.db"

# Seed with test data
akron seed users --db "sqlite:///app.db" --data '[{"id": 1, "name": "Test User", "email": "test@example.com"}]'

# Execute raw SQL
akron raw-sql --db "sqlite:///app.db" --query "SELECT name FROM sqlite_master WHERE type='table';"

# Create migration
akron makemigrations add_users_table --db "sqlite:///app.db" --schema '{"id": "int", "name": "str", "email": "str", "created_at": "str"}'`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">✅ Do</h3>
            <ul className="text-green-800 space-y-1">
              <li>• Use file databases for persistent data</li>
              <li>• Enable WAL mode for production applications</li>
              <li>• Create indexes on frequently queried columns</li>
              <li>• Use :memory: databases for testing</li>
              <li>• Backup database files regularly</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">❌ Don&apos;t</h3>
            <ul className="text-red-800 space-y-1">
              <li>• Use SQLite for high-concurrency write scenarios</li>
              <li>• Store large blobs directly in the database</li>
              <li>• Use network storage for database files</li>
              <li>• Rely on :memory: databases for important data</li>
              <li>• Forget to handle file locking issues</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Issues & Solutions</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Database is locked</h3>
            <p className="text-gray-600 mb-2">
              This usually happens when another process has the database open or a transaction wasn&apos;t properly closed.
            </p>
            <PreCodeBlock>
{`# Solution: Enable WAL mode and check for proper connection handling
db.execute_raw("PRAGMA journal_mode=WAL;")
db.execute_raw("PRAGMA busy_timeout=30000;")  # 30 second timeout`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">File not found</h3>
            <p className="text-gray-600 mb-2">
              SQLite will create the database file if it doesn&apos;t exist, but the directory must exist.
            </p>
            <PreCodeBlock>
{`import os
from akron import Akron

# Ensure directory exists
os.makedirs("./data", exist_ok=True)
db = Akron("sqlite:///./data/app.db")`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/docs/api/constructor" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Akron Constructor</h3>
            <p className="text-gray-600 text-sm">Learn about connection setup and configuration</p>
          </a>
          
          <a href="/docs/cli/create-table" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">CLI Commands</h3>
            <p className="text-gray-600 text-sm">Command-line tools for database management</p>
          </a>
          
          <a href="/docs/database-support/mysql" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">MySQL Support</h3>
            <p className="text-gray-600 text-sm">Compare with MySQL features and capabilities</p>
          </a>
          
          <a href="/docs/api/models" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Model Definitions</h3>
            <p className="text-gray-600 text-sm">Learn about Pydantic model integration</p>
          </a>
        </div>
      </section>
    </DocsLayout>
  );
}
