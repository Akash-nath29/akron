import { DocsLayout, PreCodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function DbStatusPage() {
  return (
    <DocsLayout 
      title="akron db status" 
      description="Display current schema and migration status information for your Akron project."
    >
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-3">
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium mr-3">
              NEW COMMAND
            </div>
            <h1 className="text-3xl font-bold text-gray-900">akron db status</h1>
          </div>
          <p className="text-lg text-gray-600">
            Display comprehensive information about your schema configuration, database state, and migration status.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Syntax</h2>
        <PreCodeBlock>
{`akron db status`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What It Shows</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Status Information</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Current schema file location and validity</li>
              <li>• Database provider and connection details</li>
              <li>• Number of tables defined in schema</li>
              <li>• Schema change detection (uncommitted changes)</li>
              <li>• Applied migration count and list</li>
              <li>• Pending migration count and preview</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Outputs</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Clean State (Up to Date)</h3>
            <p className="text-gray-600 mb-4">When schema and database are synchronized:</p>
            <PreCodeBlock>
{`akron db status`}
            </PreCodeBlock>
            <OutputBlock>
{`📊 Akron Status
==================================================
Schema file: akron.json
Database: sqlite
URL: sqlite:///app.db
Tables: 3

✅ Schema is up to date

Applied migrations: 2
Pending migrations: 0`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Uncommitted Schema Changes</h3>
            <p className="text-gray-600 mb-4">When akron.json has been modified but migrations haven&apos;t been generated:</p>
            <PreCodeBlock>
{`akron db status`}
            </PreCodeBlock>
            <OutputBlock>
{`📊 Akron Status
==================================================
Schema file: akron.json
Database: postgresql
URL: postgres://user:***@localhost:5432/myapp
Tables: 5

⚠️  Schema has uncommitted changes
   Run 'akron db makemigrations' to generate migration

Applied migrations: 3
Pending migrations: 0`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Pending Migrations</h3>
            <p className="text-gray-600 mb-4">When migrations have been generated but not applied:</p>
            <PreCodeBlock>
{`akron db status`}
            </PreCodeBlock>
            <OutputBlock>
{`📊 Akron Status
==================================================
Schema file: akron.json
Database: mysql
URL: mysql://user:***@localhost:3306/ecommerce
Tables: 8

✅ Schema is up to date

Applied migrations: 5
Pending migrations: 2

📋 Pending migrations:
   • add_user_preferences.json
   • create_audit_log.json`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Error States</h3>
            <p className="text-gray-600 mb-4">When there are configuration or connection issues:</p>
            <PreCodeBlock>
{`akron db status`}
            </PreCodeBlock>
            <OutputBlock>
{`❌ No akron.json found. Run 'akron db init' first.`}
            </OutputBlock>
            
            <p className="text-gray-600 mb-4 mt-4">Or when database connection fails:</p>
            <OutputBlock>
{`📊 Akron Status
==================================================
Schema file: akron.json
Database: postgresql
URL: postgres://user:***@localhost:5432/myapp
Tables: 3

❌ Error checking migration status: connection to server at "localhost" (127.0.0.1), port 5432 failed`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Status Indicators</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Schema Status</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="text-green-500 mr-3 mt-1">✅</div>
                <div>
                  <p className="font-medium text-gray-900">Schema is up to date</p>
                  <p className="text-gray-600 text-sm">No uncommitted changes detected</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-yellow-500 mr-3 mt-1">⚠️</div>
                <div>
                  <p className="font-medium text-gray-900">Schema has uncommitted changes</p>
                  <p className="text-gray-600 text-sm">Run makemigrations to generate migration</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Migration Status</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="text-blue-500 mr-3 mt-1">📋</div>
                <div>
                  <p className="font-medium text-gray-900">Pending migrations</p>
                  <p className="text-gray-600 text-sm">Shows list of unapplied migration files</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-red-500 mr-3 mt-1">❌</div>
                <div>
                  <p className="font-medium text-gray-900">Error states</p>
                  <p className="text-gray-600 text-sm">Configuration or connection issues</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Information Details</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Information</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Field</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-blue-600">Schema file</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Path to akron.json configuration</td>
                    <td className="px-4 py-3 text-sm text-gray-600">akron.json</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-blue-600">Database</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Database provider type</td>
                    <td className="px-4 py-3 text-sm text-gray-600">sqlite, mysql, postgresql, mongodb</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-blue-600">URL</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Connection string (credentials masked)</td>
                    <td className="px-4 py-3 text-sm text-gray-600">mysql://user:***@localhost:3306/db</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-blue-600">Tables</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Number of tables in schema</td>
                    <td className="px-4 py-3 text-sm text-gray-600">5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Migration Counts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Applied migrations</h4>
                <p className="text-gray-600 text-sm">Number of migrations successfully applied to the database, tracked in the <code>_akron_migrations</code> table.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Pending migrations</h4>
                <p className="text-gray-600 text-sm">Migration files in <code>.akron/</code> directory that haven&apos;t been applied yet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Use Cases</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Development Workflow</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Check if schema changes need migrations</li>
              <li>• Verify migrations before applying</li>
              <li>• Monitor development database state</li>
              <li>• Debug migration issues</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Production Monitoring</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Verify deployment migration status</li>
              <li>• Check database synchronization</li>
              <li>• Monitor schema consistency</li>
              <li>• Troubleshoot connection issues</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Considerations</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">🔒 Credential Protection</h3>
          <p className="text-yellow-800 mb-3">
            The status command automatically masks sensitive information in database URLs to prevent credential exposure in logs or console output.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">Original URL:</h4>
              <p className="font-mono text-yellow-800">mysql://admin:secret123@db.example.com:3306/prod</p>
            </div>
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">Displayed URL:</h4>
              <p className="font-mono text-yellow-800">mysql://admin:***@db.example.com:3306/prod</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting with Status</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Common Scenarios</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-900">Schema changes not reflected</h4>
                <p className="text-blue-800 text-sm">Status shows &quot;uncommitted changes&quot; → Run <code>akron db makemigrations</code></p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Database out of sync</h4>
                <p className="text-blue-800 text-sm">Status shows pending migrations → Run <code>akron db migrate</code></p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Connection issues</h4>
                <p className="text-blue-800 text-sm">Error messages help identify database connectivity problems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Commands</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Commands</h3>
          <p className="text-gray-600 mb-4">
            Use these commands based on the status output:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/docs/cli/db-makemigrations" className="text-blue-600 hover:text-blue-800 text-sm">
              → Generate Migrations<br />
              <span className="text-gray-500">When uncommitted changes detected</span>
            </a>
            <a href="/docs/cli/db-migrate" className="text-blue-600 hover:text-blue-800 text-sm">
              → Apply Migrations<br />
              <span className="text-gray-500">When pending migrations exist</span>
            </a>
            <a href="/docs/schema-management" className="text-blue-600 hover:text-blue-800 text-sm">
              → Schema Management<br />
              <span className="text-gray-500">Complete workflow guide</span>
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
