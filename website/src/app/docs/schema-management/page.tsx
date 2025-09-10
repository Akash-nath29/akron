import { DocsLayout, PreCodeBlock, OutputBlock, CodeBlock } from "../../../components/DocsLayout";
import Link from "next/link";

export default function SchemaManagementPage() {
  return (
    <DocsLayout 
      title="Schema Management" 
      description="Declarative schema management with automatic migrations in Akron ORM."
    >
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-3">
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium mr-3">
              NEW FEATURE
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Schema Management</h1>
          </div>
          <p className="text-lg text-gray-600">
            Akron features powerful declarative schema management with automatic migration generation 
            and database synchronization. Define your schema in JSON and let Akron handle the implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">✨ Key Features</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Declarative schema definition in JSON
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Automatic migration generation
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Schema change detection
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Migration history tracking
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Multi-database support
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Foreign key relationships
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Quick Workflow</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">Initialize Project</p>
                  <p className="text-gray-600 text-sm">Run <code>akron db init</code> to create akron.json</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900">Define Schema</p>
                  <p className="text-gray-600 text-sm">Edit akron.json to define your database structure</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">Generate Migrations</p>
                  <p className="text-gray-600 text-sm">Run <code>akron db makemigrations</code> to create migration files</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  4
                </div>
                <div>
                  <p className="font-medium text-gray-900">Apply Changes</p>
                  <p className="text-gray-600 text-sm">Run <code>akron db migrate</code> to update your database</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Initialize a New Project</h3>
            <p className="text-gray-600 mb-4">
              Start by initializing a new Akron project. This creates the <code>akron.json</code> schema file and <code>.akron/</code> directory for migrations.
            </p>
            <PreCodeBlock>
{`# Initialize with SQLite (default)
akron db init

# Initialize with specific database
akron db init --provider postgresql --url "postgres://user:pass@localhost:5432/mydb"
akron db init --provider mysql --url "mysql://user:pass@localhost:3306/mydb"
akron db init --provider mongodb --url "mongodb://localhost:27017/mydb"`}
            </PreCodeBlock>
            <OutputBlock>
{`✅ Initialized Akron project
   Provider: sqlite
   Database: sqlite:///app.db
   Schema file: akron.json

📝 Next steps:
   1. Edit akron.json to define your schema
   2. Run 'akron db makemigrations' to generate migrations
   3. Run 'akron db migrate' to apply migrations`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Define Your Schema</h3>
            <p className="text-gray-600 mb-4">
              Edit the generated <code>akron.json</code> file to define your database structure with tables, columns, and relationships.
            </p>
            <PreCodeBlock>
{`{
  "database": {
    "provider": "sqlite",
    "url": "sqlite:///app.db"
  },
  "tables": {
    "users": {
      "columns": {
        "id": {
          "type": "int",
          "primary_key": true,
          "auto_increment": true
        },
        "email": {
          "type": "str",
          "unique": true,
          "nullable": false,
          "max_length": 255
        },
        "username": {
          "type": "str",
          "unique": true,
          "nullable": false,
          "max_length": 50
        },
        "created_at": {
          "type": "datetime",
          "default": "CURRENT_TIMESTAMP"
        }
      }
    },
    "posts": {
      "columns": {
        "id": {
          "type": "int",
          "primary_key": true,
          "auto_increment": true
        },
        "title": {
          "type": "str",
          "nullable": false,
          "max_length": 200
        },
        "content": {
          "type": "text",
          "nullable": true
        },
        "author_id": {
          "type": "int",
          "nullable": false
        },
        "published": {
          "type": "bool",
          "default": false
        }
      },
      "foreign_keys": {
        "author_id": {
          "references": "users",
          "column": "id",
          "on_delete": "CASCADE"
        }
      }
    }
  }
}`}
            </PreCodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Generate Migrations</h3>
            <p className="text-gray-600 mb-4">
              After defining your schema, generate migration files that describe the changes needed to transform your database.
            </p>
            <PreCodeBlock>
{`# Generate migrations with auto-generated name
akron db makemigrations

# Generate migrations with custom name
akron db makemigrations --name "add_user_posts"`}
            </PreCodeBlock>
            <OutputBlock>
{`✅ Generated migration: add_user_posts
   File: .akron/add_user_posts.json
   Steps: 2

📋 Migration preview:
   1. Create table 'users'
   2. Create table 'posts'`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Apply Migrations</h3>
            <p className="text-gray-600 mb-4">
              Apply the pending migrations to update your database schema.
            </p>
            <PreCodeBlock>
{`# Preview what will be migrated
akron db migrate --dry-run

# Apply all pending migrations
akron db migrate`}
            </PreCodeBlock>
            <OutputBlock>
{`📦 Applying 1 migration(s)...
   Applying add_user_posts.json...
   ✅ Applied add_user_posts.json
✅ All migrations applied successfully!`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Check Status</h3>
            <p className="text-gray-600 mb-4">
              Monitor your schema and migration status at any time.
            </p>
            <PreCodeBlock>
{`akron db status`}
            </PreCodeBlock>
            <OutputBlock>
{`📊 Akron Status
==================================================
Schema file: akron.json
Database: sqlite
URL: sqlite:///app.db
Tables: 2

✅ Schema is up to date

Applied migrations: 1
Pending migrations: 0`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schema Format Reference</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Configuration</h3>
            <PreCodeBlock>
{`{
  "database": {
    "provider": "sqlite|mysql|postgresql|mongodb",
    "url": "connection_string"
  }
}`}
            </PreCodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Data Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Basic Types</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><code>int</code> - Integer numbers</li>
                  <li><code>str</code> - String/VARCHAR</li>
                  <li><code>text</code> - Long text content</li>
                  <li><code>bool</code> - Boolean values</li>
                  <li><code>float</code> - Floating point numbers</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Date & Special Types</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><code>datetime</code> - Date and time</li>
                  <li><code>date</code> - Date only</li>
                  <li><code>time</code> - Time only</li>
                  <li><code>json</code> - JSON data</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Column Constraints</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Constraint</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-blue-600">primary_key</td>
                    <td className="px-4 py-2 text-sm text-gray-600">boolean</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Mark column as primary key</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-blue-600">auto_increment</td>
                    <td className="px-4 py-2 text-sm text-gray-600">boolean</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Auto-increment values (integers only)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-blue-600">unique</td>
                    <td className="px-4 py-2 text-sm text-gray-600">boolean</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Enforce unique constraint</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-blue-600">nullable</td>
                    <td className="px-4 py-2 text-sm text-gray-600">boolean</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Allow NULL values</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-blue-600">default</td>
                    <td className="px-4 py-2 text-sm text-gray-600">any</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Default value for column</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-mono text-blue-600">max_length</td>
                    <td className="px-4 py-2 text-sm text-gray-600">integer</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Maximum length (strings)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Foreign Key Relationships</h3>
            <PreCodeBlock>
{`"foreign_keys": {
  "author_id": {
    "references": "users",
    "column": "id",
    "on_delete": "CASCADE|SET_NULL|RESTRICT",
    "on_update": "CASCADE|SET_NULL|RESTRICT"
  }
}`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">CLI Commands</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Link href="/docs/cli/db-init" className="text-blue-600 hover:text-blue-800">
                akron db init
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-3">Initialize a new Akron project with schema configuration.</p>
            <CodeBlock>akron db init --provider sqlite</CodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Link href="/docs/cli/db-makemigrations" className="text-blue-600 hover:text-blue-800">
                akron db makemigrations
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-3">Generate migration files from schema changes.</p>
            <CodeBlock>akron db makemigrations --name &quot;add_tables&quot;</CodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Link href="/docs/cli/db-migrate" className="text-blue-600 hover:text-blue-800">
                akron db migrate
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-3">Apply pending migrations to the database.</p>
            <CodeBlock>akron db migrate --dry-run</CodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Link href="/docs/cli/db-status" className="text-blue-600 hover:text-blue-800">
                akron db status
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-3">Show current schema and migration status.</p>
            <CodeBlock>akron db status</CodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Schema Design</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Use meaningful table and column names
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Define appropriate constraints (nullable, unique, max_length)
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Always define foreign key relationships
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 Migration Workflow</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Make small, incremental changes
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Use descriptive migration names
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Always test with --dry-run first
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔗 Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/cli" className="text-blue-600 hover:text-blue-800 text-sm">
              → CLI Commands Overview
            </Link>
            <Link href="/docs/getting-started" className="text-blue-600 hover:text-blue-800 text-sm">
              → Getting Started Guide
            </Link>
            <Link href="/docs/database-support" className="text-blue-600 hover:text-blue-800 text-sm">
              → Database Support
            </Link>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
