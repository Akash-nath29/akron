import { DocsLayout, PreCodeBlock, CodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function DropTablePage() {
  return (
    <DocsLayout 
      title="drop-table Command" 
      description="Remove existing database tables using the Akron CLI across SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>drop-table</code> command removes existing tables from your database. This is a destructive 
          operation that permanently deletes the table and all its data. Use with caution.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Basic Syntax</h3>
          <CodeBlock>{`akron drop-table <table_name> --db <database_url>`}</CodeBlock>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">⚠️ Warning</h3>
          <p className="text-red-800">
            This command permanently deletes the table and all its data. Make sure to backup your data before running this command.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">table_name</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Name of the table to drop. Must exist in the target database.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--db</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Database connection URL. Supports sqlite://, mysql://, postgres://, and mongodb:// schemes.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--force</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> flag (optional)</p>
            <p className="text-gray-600">Skip confirmation prompt and force table deletion.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">SQLite</h3>
            <PreCodeBlock>
{`# Drop table with confirmation
akron drop-table users --db "sqlite:///./myapp.db"

# Force drop without confirmation
akron drop-table sessions --db "sqlite:///./myapp.db" --force`}
            </PreCodeBlock>
            <OutputBlock>
{`Are you sure you want to drop table 'users'? (y/N): y
✓ Table 'users' dropped successfully from SQLite database`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MySQL</h3>
            <PreCodeBlock>
{`# Drop table from MySQL database
akron drop-table products --db "mysql://user:password@localhost:3306/store"

# Drop with force flag
akron drop-table temp_data --db "mysql://user:pass@host:3306/app" --force`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Table 'products' dropped successfully from MySQL database
✓ All data has been permanently deleted`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">PostgreSQL</h3>
            <PreCodeBlock>
{`# Drop table from PostgreSQL
akron drop-table orders --db "postgres://user:password@localhost:5432/ecommerce"

# Drop with SSL connection
akron drop-table logs --db "postgres://user:pass@host:5432/app?sslmode=require" --force`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Table 'orders' dropped successfully from PostgreSQL database
✓ All associated indexes and constraints removed`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MongoDB</h3>
            <PreCodeBlock>
{`# Drop collection from MongoDB
akron drop-table users --db "mongodb://localhost:27017/myapp"

# Drop with authentication
akron drop-table events --db "mongodb://user:password@localhost:27017/analytics" --force`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Collection 'users' dropped successfully from MongoDB database
✓ All documents and indexes removed`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Features</h2>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Confirmation Prompt</h3>
            <p className="text-green-800 mb-2">
              By default, the command asks for confirmation before dropping tables:
            </p>
            <PreCodeBlock>
{`akron drop-table important_data --db "sqlite:///app.db"
Are you sure you want to drop table 'important_data'? (y/N):`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Backup Recommendation</h3>
            <p className="text-blue-800">
              Always backup your data before dropping tables:
            </p>
            <PreCodeBlock>
{`# Backup before dropping (example for SQLite)
cp myapp.db myapp_backup.db

# Then safely drop table
akron drop-table old_table --db "sqlite:///myapp.db"`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Common Errors</h3>
            <ul className="text-red-800 space-y-2">
              <li><strong>Table does not exist:</strong> Verify table name with inspect-schema</li>
              <li><strong>Permission denied:</strong> Ensure database user has DROP privileges</li>
              <li><strong>Foreign key constraints:</strong> Drop dependent tables first</li>
              <li><strong>Connection failed:</strong> Verify database URL and credentials</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Troubleshooting</h3>
            <PreCodeBlock>
{`# Check if table exists
akron inspect-schema --db "sqlite:///myapp.db"

# List all tables
akron inspect-schema --db "mysql://user:pass@host:3306/db" --tables-only

# Check for foreign key constraints (PostgreSQL/MySQL)
# Drop dependent tables first, then the main table`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schema Management</h3>
            <a href="/docs/cli/create-table" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → create-table command
            </a>
            <a href="/docs/cli/inspect-schema" className="text-blue-600 hover:text-blue-800 text-sm block">
              → inspect-schema command
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Operations</h3>
            <a href="/docs/api/delete" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → delete() API method
            </a>
            <a href="/docs/cli/raw-sql" className="text-blue-600 hover:text-blue-800 text-sm block">
              → raw-sql command
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Migrations</h3>
            <a href="/docs/cli/makemigrations" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → makemigrations command
            </a>
            <a href="/docs/cli/migrate" className="text-blue-600 hover:text-blue-800 text-sm block">
              → migrate command
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
