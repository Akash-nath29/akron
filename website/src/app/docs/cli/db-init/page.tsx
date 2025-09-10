import { DocsLayout, PreCodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function DbInitPage() {
  return (
    <DocsLayout 
      title="akron db init" 
      description="Initialize a new Akron project with schema configuration and migration setup."
    >
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-3">
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium mr-3">
              NEW COMMAND
            </div>
            <h1 className="text-3xl font-bold text-gray-900">akron db init</h1>
          </div>
          <p className="text-lg text-gray-600">
            Initialize a new Akron project with schema configuration file and migration directory structure.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Syntax</h2>
        <PreCodeBlock>
{`akron db init [OPTIONS]`}
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
                <td className="px-4 py-3 text-sm font-mono text-blue-600">--provider</td>
                <td className="px-4 py-3 text-sm text-gray-600">Database provider (sqlite, mysql, postgresql, mongodb)</td>
                <td className="px-4 py-3 text-sm text-gray-600">sqlite</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-blue-600">--url</td>
                <td className="px-4 py-3 text-sm text-gray-600">Custom database connection URL</td>
                <td className="px-4 py-3 text-sm text-gray-600">Provider default</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-blue-600">--force</td>
                <td className="px-4 py-3 text-sm text-gray-600">Overwrite existing akron.json file</td>
                <td className="px-4 py-3 text-sm text-gray-600">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic SQLite Project</h3>
            <p className="text-gray-600 mb-4">Initialize a new project with SQLite database (default):</p>
            <PreCodeBlock>
{`akron db init`}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-3">PostgreSQL Project</h3>
            <p className="text-gray-600 mb-4">Initialize with PostgreSQL and custom connection URL:</p>
            <PreCodeBlock>
{`akron db init --provider postgresql --url "postgres://user:password@localhost:5432/myapp"`}
            </PreCodeBlock>
            <OutputBlock>
{`✅ Initialized Akron project
   Provider: postgresql
   Database: postgres://user:password@localhost:5432/myapp
   Schema file: akron.json

📝 Next steps:
   1. Edit akron.json to define your schema
   2. Run 'akron db makemigrations' to generate migrations
   3. Run 'akron db migrate' to apply migrations`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Force Overwrite</h3>
            <p className="text-gray-600 mb-4">Overwrite existing configuration:</p>
            <PreCodeBlock>
{`akron db init --provider mysql --force`}
            </PreCodeBlock>
            <OutputBlock>
{`✅ Initialized Akron project
   Provider: mysql
   Database: mysql://user:password@localhost:3306/database
   Schema file: akron.json

📝 Next steps:
   1. Edit akron.json to define your schema
   2. Run 'akron db makemigrations' to generate migrations
   3. Run 'akron db migrate' to apply migrations`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Files</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">akron.json</h3>
            <p className="text-gray-600 mb-4">The main schema configuration file:</p>
            <PreCodeBlock>
{`{
  "database": {
    "provider": "sqlite",
    "url": "sqlite:///app.db"
  },
  "tables": {
    "User": {
      "columns": {
        "id": {
          "type": "int",
          "primaryKey": true,
          "autoIncrement": true
        },
        "email": {
          "type": "string",
          "unique": true,
          "nullable": false
        },
        "name": {
          "type": "string",
          "nullable": true
        },
        "createdAt": {
          "type": "datetime",
          "default": "now"
        }
      }
    }
  }
}`}
            </PreCodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">.akron/ Directory</h3>
            <p className="text-gray-600 mb-4">Migration tracking directory structure:</p>
            <PreCodeBlock>
{`.akron/
├── schema_snapshots.json   # Schema change tracking
└── (migration files)       # Generated migration files`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Default Database URLs</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Provider</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Default URL</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-blue-600">sqlite</td>
                <td className="px-4 py-3 text-sm font-mono text-gray-600">sqlite:///app.db</td>
                <td className="px-4 py-3 text-sm text-gray-600">Creates local file database</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-blue-600">mysql</td>
                <td className="px-4 py-3 text-sm font-mono text-gray-600">mysql://user:password@localhost:3306/database</td>
                <td className="px-4 py-3 text-sm text-gray-600">Update credentials before use</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-blue-600">postgresql</td>
                <td className="px-4 py-3 text-sm font-mono text-gray-600">postgres://user:password@localhost:5432/database</td>
                <td className="px-4 py-3 text-sm text-gray-600">Update credentials before use</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-blue-600">mongodb</td>
                <td className="px-4 py-3 text-sm font-mono text-gray-600">mongodb://localhost:27017/database</td>
                <td className="px-4 py-3 text-sm text-gray-600">Default local MongoDB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">After initialization:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Edit <code>akron.json</code> to define your database schema</li>
            <li>Run <code>akron db makemigrations</code> to generate initial migrations</li>
            <li>Run <code>akron db migrate</code> to create your database tables</li>
            <li>Start building your application with Akron ORM</li>
          </ol>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/docs/schema-management" className="text-blue-600 hover:text-blue-800 text-sm">
              → Schema Management Guide
            </a>
            <a href="/docs/cli/db-makemigrations" className="text-blue-600 hover:text-blue-800 text-sm">
              → Generate Migrations
            </a>
            <a href="/docs/cli/db-migrate" className="text-blue-600 hover:text-blue-800 text-sm">
              → Apply Migrations
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
