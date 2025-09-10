import { DocsLayout, PreCodeBlock, OutputBlock, CodeBlock } from "../../../components/DocsLayout";

export default function CLIOverviewPage() {
  return (
    <DocsLayout 
      title="CLI Commands" 
      description="Complete guide to Akron CLI commands for database management, migrations, and development workflow."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The Akron CLI provides powerful command-line tools for database management, schema migrations, 
          data seeding, and development workflows. Akron now supports both modern schema management commands 
          and legacy database operation commands.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium mr-3">
              NEW
            </div>
            <h3 className="text-lg font-semibold text-blue-900">Modern Schema Management</h3>
          </div>
          <p className="text-blue-800 mb-2">Akron features powerful declarative schema management:</p>
          <CodeBlock>akron db init --provider sqlite</CodeBlock>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Installation</h3>
          <p className="text-gray-600 mb-2">The CLI is automatically installed with the Akron package:</p>
          <CodeBlock>pip install akron</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Modern Schema Management Commands</h2>
        <p className="text-gray-600 mb-6">
          These commands provide a modern workflow for managing your database schema declaratively.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <a href="/docs/cli/db-init" className="text-blue-600 hover:text-blue-800">akron db init</a>
            </h3>
            <p className="text-gray-600 text-sm mb-3">Initialize a new Akron project with schema configuration file.</p>
            <CodeBlock>akron db init --provider sqlite</CodeBlock>
          </div>

          <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <a href="/docs/cli/db-makemigrations" className="text-blue-600 hover:text-blue-800">akron db makemigrations</a>
            </h3>
            <p className="text-gray-600 text-sm mb-3">Generate migration files from schema changes automatically.</p>
            <CodeBlock>akron db makemigrations --name &quot;initial&quot;</CodeBlock>
          </div>

          <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <a href="/docs/cli/db-migrate" className="text-blue-600 hover:text-blue-800">akron db migrate</a>
            </h3>
            <p className="text-gray-600 text-sm mb-3">Apply pending migrations to update your database schema.</p>
            <CodeBlock>akron db migrate --dry-run</CodeBlock>
          </div>

          <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <a href="/docs/cli/db-status" className="text-blue-600 hover:text-blue-800">akron db status</a>
            </h3>
            <p className="text-gray-600 text-sm mb-3">Show current schema and migration status information.</p>
            <CodeBlock>akron db status</CodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Legacy Commands</h2>
        <p className="text-gray-600 mb-6">
          These commands provide direct database operations and are maintained for backward compatibility.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schema Management</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs/cli/create-table" className="text-blue-600 hover:text-blue-800 text-sm block">
                  <strong>create-table</strong> - Create new database tables
                </a>
              </li>
              <li>
                <a href="/docs/cli/drop-table" className="text-blue-600 hover:text-blue-800 text-sm block">
                  <strong>drop-table</strong> - Remove existing tables
                </a>
              </li>
              <li>
                <a href="/docs/cli/inspect-schema" className="text-blue-600 hover:text-blue-800 text-sm block">
                  <strong>inspect-schema</strong> - View database structure
                </a>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Operations</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs/cli/seed" className="text-blue-600 hover:text-blue-800 text-sm block">
                  <strong>seed</strong> - Populate tables with test data
                </a>
              </li>
              <li>
                <a href="/docs/cli/raw-sql" className="text-blue-600 hover:text-blue-800 text-sm block">
                  <strong>raw-sql</strong> - Execute custom SQL queries
                </a>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Migration System</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs/cli/makemigrations" className="text-blue-600 hover:text-blue-800 text-sm block">
                  <strong>makemigrations</strong> - Generate migration files
                </a>
              </li>
              <li>
                <a href="/docs/cli/migrate" className="text-blue-600 hover:text-blue-800 text-sm block">
                  <strong>migrate</strong> - Apply pending migrations
                </a>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Development Tools</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-600 text-sm block">
                  <strong>--help</strong> - Show command usage
                </span>
              </li>
              <li>
                <span className="text-gray-600 text-sm block">
                  <strong>--version</strong> - Display Akron version
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Patterns</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Database Connection URLs</h3>
        <p className="text-gray-600 mb-4">
          All CLI commands use the <code>--db</code> parameter to specify database connections:
        </p>

        <PreCodeBlock title="Connection URL Examples">
{`# SQLite (file-based)
akron create-table users --db "sqlite:///./myapp.db" --schema '{"id": "int", "name": "str"}'

# SQLite (in-memory)
akron create-table users --db "sqlite:///:memory:" --schema '{"id": "int", "name": "str"}'

# MySQL
akron create-table users --db "mysql://user:password@localhost:3306/mydb" --schema '{"id": "int", "name": "str"}'

# PostgreSQL
akron create-table users --db "postgres://user:password@localhost:5432/mydb" --schema '{"id": "int", "name": "str"}'

# MongoDB
akron create-table users --db "mongodb://localhost:27017/mydb" --schema '{"id": "int", "name": "str"}'`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Schema Definition Format</h3>
        <p className="text-gray-600 mb-4">
          Schema definitions use JSON format with Akron type mapping:
        </p>

        <PreCodeBlock title="Schema JSON Format">
{`# Basic types
--schema '{"id": "int", "name": "str", "price": "float", "active": "bool"}'

# Foreign key relationships
--schema '{"id": "int", "user_id": "int->users.id", "title": "str", "content": "str"}'

# Complex example with multiple relationships
--schema '{
  "id": "int",
  "customer_id": "int->customers.id",
  "product_id": "int->products.id", 
  "quantity": "int",
  "price": "float",
  "order_date": "str"
}'`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Development Workflow</h3>
        <p className="text-gray-600 mb-4">
          Typical development workflow using Akron CLI:
        </p>

        <PreCodeBlock title="Complete Development Workflow">
{`# 1. Create initial schema
akron create-table users --db "sqlite:///app.db" --schema '{"id": "int", "username": "str", "email": "str"}'

# 2. Add related tables
akron create-table posts --db "sqlite:///app.db" --schema '{"id": "int", "user_id": "int->users.id", "title": "str", "content": "str"}'

# 3. Inspect current schema
akron inspect-schema --db "sqlite:///app.db"

# 4. Seed with test data
akron seed users --db "sqlite:///app.db" --data '[{"username": "alice", "email": "alice@example.com"}]'

# 5. Generate migration for schema changes
akron makemigrations users --db "sqlite:///app.db" --schema '{"id": "int", "username": "str", "email": "str", "created_date": "str"}'

# 6. Apply migrations
akron migrate --db "sqlite:///app.db"

# 7. Execute custom queries
akron raw-sql --db "sqlite:///app.db" --query "SELECT COUNT(*) FROM users WHERE email LIKE '%@example.com'"

# 8. Drop tables when cleaning up
akron drop-table test_table --db "sqlite:///app.db"`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Global Options</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--db (required)</h3>
            <p className="text-gray-600 mb-2">
              Database connection URL. Must be provided for all commands except --help and --version.
            </p>
            <CodeBlock>akron command --db &quot;sqlite:///database.db&quot;</CodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--help</h3>
            <p className="text-gray-600 mb-2">
              Display help information for any command.
            </p>
            <CodeBlock>akron create-table --help</CodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--version</h3>
            <p className="text-gray-600 mb-2">
              Show the installed Akron version.
            </p>
            <CodeBlock>akron --version</CodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Examples</h2>
        
        <PreCodeBlock title="Essential CLI Commands">
{`# Quick setup: Create a users table
akron create-table users --db "sqlite:///quickstart.db" --schema '{"id": "int", "name": "str", "email": "str"}'

# Add some test data
akron seed users --db "sqlite:///quickstart.db" --data '[
  {"name": "Alice", "email": "alice@example.com"},
  {"name": "Bob", "email": "bob@example.com"}
]'

# Check what's in the database
akron inspect-schema --db "sqlite:///quickstart.db"

# Run a custom query
akron raw-sql --db "sqlite:///quickstart.db" --query "SELECT * FROM users"

# Clean up
akron drop-table users --db "sqlite:///quickstart.db"`}
        </PreCodeBlock>

        <OutputBlock>
{`✓ Table 'users' created successfully
✓ Seeded 2 records into 'users' table

Database Schema:
├── users
│   ├── id (int)
│   ├── name (str)
│   └── email (str)

Query Results:
[
  {"id": 1, "name": "Alice", "email": "alice@example.com"},
  {"id": 2, "name": "Bob", "email": "bob@example.com"}
]

✓ Table 'users' dropped successfully`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          Explore specific CLI commands for detailed usage:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schema Commands</h3>
            <p className="text-gray-600 text-sm mb-2">Create and manage database tables</p>
            <a href="/docs/cli/create-table" className="text-blue-600 hover:text-blue-800 text-sm">
              → view create-table command
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Migration System</h3>
            <p className="text-gray-600 text-sm mb-2">Version control for database schemas</p>
            <a href="/docs/cli/makemigrations" className="text-blue-600 hover:text-blue-800 text-sm">
              → view migration commands
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Python API</h3>
            <p className="text-gray-600 text-sm mb-2">Use Akron programmatically in your code</p>
            <a href="/docs/api/constructor" className="text-blue-600 hover:text-blue-800 text-sm">
              → view Python API docs
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
