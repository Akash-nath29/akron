import { DocsLayout, PreCodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function DbMakemigrationsPage() {
  return (
    <DocsLayout 
      title="akron db makemigrations" 
      description="Generate migration files automatically from schema changes in your akron.json configuration."
    >
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-3">
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium mr-3">
              NEW COMMAND
            </div>
            <h1 className="text-3xl font-bold text-gray-900">akron db makemigrations</h1>
          </div>
          <p className="text-lg text-gray-600">
            Automatically generate migration files by comparing your current schema with the last snapshot.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Syntax</h2>
        <PreCodeBlock>
{`akron db makemigrations [OPTIONS]`}
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
                <td className="px-4 py-3 text-sm font-mono text-blue-600">--name</td>
                <td className="px-4 py-3 text-sm text-gray-600">Custom name for the migration file</td>
                <td className="px-4 py-3 text-sm text-gray-600">Auto-generated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Schema Change Detection</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Reads your current <code>akron.json</code> schema definition</li>
              <li>Compares it with the last saved schema snapshot</li>
              <li>Identifies changes (new tables, modified columns, etc.)</li>
              <li>Generates migration steps to transform the database</li>
              <li>Creates a migration file in <code>.akron/</code> directory</li>
              <li>Updates the schema snapshot for future comparisons</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Auto-generated Migration Name</h3>
            <p className="text-gray-600 mb-4">Generate migration with automatic naming:</p>
            <PreCodeBlock>
{`akron db makemigrations`}
            </PreCodeBlock>
            <OutputBlock>
{`✅ Generated migration: migration_0001
   File: .akron/migration_0001.json
   Steps: 3

📋 Migration preview:
   1. Create table 'users'
   2. Create table 'posts'
   3. Create table 'comments'`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Custom Migration Name</h3>
            <p className="text-gray-600 mb-4">Generate migration with descriptive name:</p>
            <PreCodeBlock>
{`akron db makemigrations --name "add_user_authentication"`}
            </PreCodeBlock>
            <OutputBlock>
{`✅ Generated migration: add_user_authentication
   File: .akron/add_user_authentication.json
   Steps: 2

📋 Migration preview:
   1. Add column 'password_hash' to 'users'
   2. Add column 'last_login' to 'users'`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">No Changes Detected</h3>
            <p className="text-gray-600 mb-4">When schema hasn&apos;t changed:</p>
            <PreCodeBlock>
{`akron db makemigrations`}
            </PreCodeBlock>
            <OutputBlock>
{`✅ No changes detected in schema.`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Migration File Structure</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated Migration File</h3>
            <p className="text-gray-600 mb-4">Example migration file structure:</p>
            <PreCodeBlock>
{`{
  "name": "add_user_posts",
  "timestamp": "2023-12-01T10:30:00.000000",
  "steps": [
    {
      "action": "create_table",
      "table": "users",
      "schema": {
        "id": "int",
        "email": "str",
        "username": "str",
        "created_at": "datetime"
      }
    },
    {
      "action": "create_table",
      "table": "posts",
      "schema": {
        "id": "int",
        "title": "str",
        "content": "text",
        "author_id": "int"
      }
    }
  ],
  "checksum": "sha256_hash_of_current_schema"
}`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Migration Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Table Operations</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <code>create_table</code> - Create new tables
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <code>drop_table</code> - Remove existing tables
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Column Operations</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <code>add_column</code> - Add new columns
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <code>drop_column</code> - Remove columns
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <code>modify_column</code> - Change column types
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Do</h3>
            <ul className="space-y-2 text-green-800">
              <li>• Use descriptive migration names for complex changes</li>
              <li>• Generate migrations frequently for small, incremental changes</li>
              <li>• Review the migration preview before applying</li>
              <li>• Keep your akron.json file in version control</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Don&apos;t</h3>
            <ul className="space-y-2 text-red-800">
              <li>• Make manual changes to migration files</li>
              <li>• Delete migration files after they&apos;ve been applied</li>
              <li>• Skip generating migrations for schema changes</li>
              <li>• Make breaking changes without considering data migration</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">After generating migrations:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Review the generated migration file for accuracy</li>
            <li>Run <code>akron db migrate --dry-run</code> to preview changes</li>
            <li>Apply migrations with <code>akron db migrate</code></li>
            <li>Check status with <code>akron db status</code></li>
          </ol>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/docs/cli/db-migrate" className="text-blue-600 hover:text-blue-800 text-sm">
              → Apply Migrations
            </a>
            <a href="/docs/cli/db-status" className="text-blue-600 hover:text-blue-800 text-sm">
              → Check Status
            </a>
            <a href="/docs/schema-management" className="text-blue-600 hover:text-blue-800 text-sm">
              → Schema Management Guide
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
