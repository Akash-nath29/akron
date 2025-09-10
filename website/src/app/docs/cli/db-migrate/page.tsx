import { DocsLayout, PreCodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function DbMigratePage() {
  return (
    <DocsLayout 
      title="akron db migrate" 
      description="Apply pending migrations to update your database schema according to your akron.json configuration."
    >
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-3">
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium mr-3">
              NEW COMMAND
            </div>
            <h1 className="text-3xl font-bold text-gray-900">akron db migrate</h1>
          </div>
          <p className="text-lg text-gray-600">
            Apply pending migration files to update your database schema and synchronize it with your akron.json configuration.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Syntax</h2>
        <PreCodeBlock>
{`akron db migrate [OPTIONS]`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Options</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Option</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-blue-600">--dry-run</td>
                <td className="px-4 py-3 text-sm text-gray-600">Show what would be migrated without applying changes</td>
                <td className="px-4 py-3 text-sm text-gray-600">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Migration Process</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Connects to the database using the URL from <code>akron.json</code></li>
              <li>Checks for existing migration history in <code>_akron_migrations</code> table</li>
              <li>Identifies pending migrations by comparing applied vs. available migrations</li>
              <li>Applies each migration step in chronological order</li>
              <li>Records successful migrations in the database</li>
              <li>Reports completion status and any errors</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dry Run (Preview Mode)</h3>
            <p className="text-gray-600 mb-4">Preview what changes will be applied without modifying the database:</p>
            <PreCodeBlock>
{`akron db migrate --dry-run`}
            </PreCodeBlock>
            <OutputBlock>
{`🔍 Dry run - showing pending migrations:
   • initial.json
   • add_user_authentication.json
   • create_posts_table.json`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Apply All Pending Migrations</h3>
            <p className="text-gray-600 mb-4">Apply all pending migrations to the database:</p>
            <PreCodeBlock>
{`akron db migrate`}
            </PreCodeBlock>
            <OutputBlock>
{`📦 Applying 3 migration(s)...
   Applying initial.json...
   ✅ Applied initial.json
   Applying add_user_authentication.json...
   ✅ Applied add_user_authentication.json
   Applying create_posts_table.json...
   ✅ Applied create_posts_table.json
✅ All migrations applied successfully!`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">No Pending Migrations</h3>
            <p className="text-gray-600 mb-4">When all migrations are already applied:</p>
            <PreCodeBlock>
{`akron db migrate`}
            </PreCodeBlock>
            <OutputBlock>
{`✅ No pending migrations.`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Migration Error Handling</h3>
            <p className="text-gray-600 mb-4">When a migration fails:</p>
            <PreCodeBlock>
{`akron db migrate`}
            </PreCodeBlock>
            <OutputBlock>
{`📦 Applying 2 migration(s)...
   Applying initial.json...
   ✅ Applied initial.json
   Applying invalid_migration.json...
   ❌ Migration failed: column 'email' already exists

Error: Migration stopped due to failure. Please fix the issue and try again.`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Migration Steps</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Table Operations</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <code>create_table</code> - Create new tables with schema</li>
                  <li>• <code>drop_table</code> - Remove existing tables</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Column Operations</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <code>add_column</code> - Add new columns to tables</li>
                  <li>• <code>drop_column</code> - Remove columns (limited support)</li>
                  <li>• <code>modify_column</code> - Change column definitions (limited support)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Migration Tracking</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">_akron_migrations Table</h3>
            <p className="text-gray-600 mb-4">Akron tracks applied migrations in a special table:</p>
            <PreCodeBlock>
{`CREATE TABLE _akron_migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    migration_name TEXT UNIQUE NOT NULL,
    checksum TEXT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
            </PreCodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Migration Record Example</h3>
            <PreCodeBlock>
{`| id | migration_name           | checksum                                                   | applied_at          |
|----|-------------------------|------------------------------------------------------------|---------------------|
| 1  | initial.json            | 495bf72e9cefcc7fd020cddeadfcb4d535cab46d6076b7d0b6befdc76e9006d3 | 2023-12-01 10:30:15 |
| 2  | add_user_auth.json      | a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0 | 2023-12-01 11:45:22 |`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Database-Specific Behavior</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">SQL Databases</h3>
            <p className="text-gray-600 text-sm mb-3">SQLite, MySQL, PostgreSQL:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Full migration support</li>
              <li>• Transaction-based application</li>
              <li>• Migration history tracking</li>
              <li>• Foreign key constraints supported</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MongoDB</h3>
            <p className="text-gray-600 text-sm mb-3">Document database:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Collection creation/deletion</li>
              <li>• Schema-less by nature</li>
              <li>• Limited migration tracking</li>
              <li>• Index operations (future)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
        
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">⚠️ Common Issues</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-yellow-900">Database Connection Failed</h4>
                <p className="text-yellow-800 text-sm">Check your database URL in akron.json and ensure the database server is running.</p>
              </div>
              <div>
                <h4 className="font-medium text-yellow-900">Migration Already Applied</h4>
                <p className="text-yellow-800 text-sm">This migration was already applied. Check akron db status for current state.</p>
              </div>
              <div>
                <h4 className="font-medium text-yellow-900">Column Already Exists</h4>
                <p className="text-yellow-800 text-sm">The migration tries to create a column that already exists. Review your schema changes.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Recovery Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Check current status with <code>akron db status</code></li>
              <li>Review failed migration file for issues</li>
              <li>Fix schema definition in akron.json if needed</li>
              <li>Generate new migration if necessary</li>
              <li>Try migration again</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Recommended Practices</h3>
            <ul className="space-y-2 text-green-800">
              <li>• Always run <code>--dry-run</code> first to preview changes</li>
              <li>• Backup your database before applying migrations in production</li>
              <li>• Apply migrations in staging environment first</li>
              <li>• Monitor migration logs for any warnings or errors</li>
              <li>• Keep migration files in version control</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Avoid These Mistakes</h3>
            <ul className="space-y-2 text-red-800">
              <li>• Don&apos;t manually edit migration files after generation</li>
              <li>• Don&apos;t skip migrations or apply them out of order</li>
              <li>• Don&apos;t run migrations directly on production without testing</li>
              <li>• Don&apos;t delete migration files that have been applied</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">After applying migrations:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Verify changes with <code>akron db status</code></li>
            <li>Test your application with the updated schema</li>
            <li>Commit migration files to version control</li>
            <li>Deploy to staging/production environments</li>
          </ol>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/docs/cli/db-status" className="text-blue-600 hover:text-blue-800 text-sm">
              → Check Migration Status
            </a>
            <a href="/docs/schema-management" className="text-blue-600 hover:text-blue-800 text-sm">
              → Schema Management Guide
            </a>
            <a href="/docs/getting-started" className="text-blue-600 hover:text-blue-800 text-sm">
              → Getting Started
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
