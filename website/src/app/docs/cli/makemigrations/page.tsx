import { DocsLayout, PreCodeBlock, CodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function MakeMigrationsPage() {
  return (
    <DocsLayout 
      title="makemigrations Command" 
      description="Generate database migration files using the Akron CLI for schema changes across SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>makemigrations</code> command generates migration files that describe changes to your 
          database schema. These files can be version controlled and applied across different environments 
          to keep database schemas in sync.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Basic Syntax</h3>
          <CodeBlock>{`akron makemigrations --db <database_url> [options]`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--db</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Database connection URL to generate migrations for.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--name</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Custom name for the migration file. Auto-generated if not provided.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--output-dir</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Directory to save migration files. Default: ./migrations/</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--dry-run</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> flag (optional)</p>
            <p className="text-gray-600">Show what migrations would be generated without creating files.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Generate Initial Migration</h3>
            <PreCodeBlock>
{`# Create initial migration from current schema
akron makemigrations --db "sqlite:///myapp.db" --name "initial_schema"`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Generated migration: migrations/001_initial_schema.py
✓ Migration includes 3 tables: users, posts, comments
✓ File saved to: ./migrations/001_initial_schema.py`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Auto-Generated Migration</h3>
            <PreCodeBlock>
{`# Let Akron auto-name the migration
akron makemigrations --db "mysql://user:pass@host:3306/store"`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Detected schema changes since last migration
✓ Generated migration: migrations/002_add_products_table.py
✓ Changes: CREATE TABLE products, ADD COLUMN category_id to users`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Custom Output Directory</h3>
            <PreCodeBlock>
{`# Save migrations to custom directory
akron makemigrations --db "postgres://user:pass@host:5432/app" --output-dir "./db/migrations"`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Created directory: ./db/migrations/
✓ Generated migration: db/migrations/003_update_user_schema.py
✓ Changes: ALTER TABLE users ADD COLUMN last_login`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dry Run Preview</h3>
            <PreCodeBlock>
{`# Preview migration without creating files
akron makemigrations --db "mongodb://localhost:27017/social" --dry-run`}
            </PreCodeBlock>
            <OutputBlock>
{`Migration Preview:
==================
File: migrations/004_add_user_preferences.py

Operations:
- ADD COLLECTION: user_preferences
- UPDATE SCHEMA: users (add field: preferences)
- CREATE INDEX: users.email (unique)

Run without --dry-run to generate files.`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Migration File Structure</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">SQLite Migration Example</h3>
            <PreCodeBlock>
{`# migrations/001_initial_schema.py
"""
Initial database schema
Generated: 2024-01-15 10:30:00
Database: SQLite
"""

def upgrade(db):
    """Apply migration changes"""
    db.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    db.execute("""
        CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    """)

def downgrade(db):
    """Rollback migration changes"""
    db.execute("DROP TABLE IF EXISTS posts")
    db.execute("DROP TABLE IF EXISTS users")`}
            </PreCodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">PostgreSQL Migration Example</h3>
            <PreCodeBlock>
{`# migrations/002_add_user_profiles.py
"""
Add user profiles table
Generated: 2024-01-16 14:20:00
Database: PostgreSQL
"""

def upgrade(db):
    """Apply migration changes"""
    db.execute("""
        CREATE TABLE user_profiles (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            bio TEXT,
            avatar_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    db.execute("""
        CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id)
    """)

def downgrade(db):
    """Rollback migration changes"""
    db.execute("DROP INDEX IF EXISTS idx_user_profiles_user_id")
    db.execute("DROP TABLE IF EXISTS user_profiles")`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Migration Workflow</h2>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Development Workflow</h3>
            <PreCodeBlock>
{`# 1. Make schema changes to your database
akron create-table new_feature --db "sqlite:///dev.db" --schema '{"id": "int", "name": "str"}'

# 2. Generate migration for the changes
akron makemigrations --db "sqlite:///dev.db" --name "add_new_feature"

# 3. Review the generated migration file
cat migrations/003_add_new_feature.py

# 4. Apply migration to other environments
akron migrate --db "sqlite:///test.db"
akron migrate --db "postgres://prod"`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Team Collaboration</h3>
            <ul className="text-blue-800 space-y-2">
              <li>• Migration files are version controlled with your code</li>
              <li>• Each developer can apply the same migrations</li>
              <li>• Conflicts are resolved through file merging</li>
              <li>• Production deployments include migration application</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Features</h2>
        
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Schema Comparison</h3>
            <p className="text-yellow-800">
              Akron compares current database schema with the last migration to detect changes automatically.
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Data Migrations</h3>
            <p className="text-purple-800">
              Include data transformation logic in migration files for complex schema changes.
            </p>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">Rollback Support</h3>
            <p className="text-indigo-800">
              Every migration includes upgrade and downgrade functions for safe rollbacks.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Common Errors</h3>
            <ul className="text-red-800 space-y-2">
              <li><strong>No changes detected:</strong> Database schema matches last migration</li>
              <li><strong>Migration directory not found:</strong> Create migrations/ directory first</li>
              <li><strong>Invalid schema:</strong> Check database connection and permissions</li>
              <li><strong>Conflicting migrations:</strong> Resolve merge conflicts in migration files</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Best Practices</h3>
            <ul className="text-yellow-800 space-y-2">
              <li>• Review generated migrations before committing</li>
              <li>• Use descriptive migration names</li>
              <li>• Test migrations on development data first</li>
              <li>• Keep migrations small and focused</li>
              <li>• Never edit applied migrations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Migration Management</h3>
            <a href="/docs/cli/migrate" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → migrate command
            </a>
            <a href="/docs/cli/inspect-schema" className="text-blue-600 hover:text-blue-800 text-sm block">
              → inspect-schema command
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schema Operations</h3>
            <a href="/docs/cli/create-table" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → create-table command
            </a>
            <a href="/docs/cli/drop-table" className="text-blue-600 hover:text-blue-800 text-sm block">
              → drop-table command
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Development</h3>
            <a href="/docs/cli/seed" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → seed command
            </a>
            <a href="/docs/cli/raw-sql" className="text-blue-600 hover:text-blue-800 text-sm block">
              → raw-sql command
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
