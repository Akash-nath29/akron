import { DocsLayout, PreCodeBlock, CodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function InspectSchemaPage() {
  return (
    <DocsLayout 
      title="inspect-schema Command" 
      description="View and analyze database schema structure using the Akron CLI across SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>inspect-schema</code> command provides detailed information about your database structure, 
          including tables, columns, data types, constraints, and indexes. Essential for understanding 
          existing databases and planning migrations.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Basic Syntax</h3>
          <CodeBlock>{`akron inspect-schema --db <database_url> [options]`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--db</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Database connection URL to inspect.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--table</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Inspect specific table only instead of entire database.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--tables-only</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> flag (optional)</p>
            <p className="text-gray-600">Show only table names without column details.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--format</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Output format: &quot;table&quot;, &quot;json&quot;, or &quot;yaml&quot;. Default: &quot;table&quot;</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Full Database Inspection</h3>
            <PreCodeBlock>
{`# Inspect entire SQLite database
akron inspect-schema --db "sqlite:///myapp.db"`}
            </PreCodeBlock>
            <OutputBlock>
{`Database Schema: myapp.db
================================

Table: users
+------------+----------+---------+------------+
| Column     | Type     | Null    | Default    |
+------------+----------+---------+------------+
| id         | INTEGER  | NO      | NULL       |
| username   | TEXT     | NO      | NULL       |
| email      | TEXT     | YES     | NULL       |
| created_at | DATETIME | YES     | CURRENT_TS |
+------------+----------+---------+------------+

Table: posts
+------------+----------+---------+------------+
| Column     | Type     | Null    | Default    |
+------------+----------+---------+------------+
| id         | INTEGER  | NO      | NULL       |
| user_id    | INTEGER  | NO      | NULL       |
| title      | TEXT     | NO      | NULL       |
| content    | TEXT     | YES     | NULL       |
+------------+----------+---------+------------+

Total Tables: 2`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specific Table Inspection</h3>
            <PreCodeBlock>
{`# Inspect specific table
akron inspect-schema --db "mysql://user:pass@host:3306/store" --table products`}
            </PreCodeBlock>
            <OutputBlock>
{`Table: products
+---------------+---------------+---------+-------------+
| Column        | Type          | Null    | Default     |
+---------------+---------------+---------+-------------+
| id            | INT           | NO      | AUTO_INC    |
| sku           | VARCHAR(50)   | NO      | NULL        |
| name          | VARCHAR(255)  | NO      | NULL        |
| description   | TEXT          | YES     | NULL        |
| price         | DECIMAL(10,2) | NO      | 0.00        |
| category_id   | INT           | YES     | NULL        |
| in_stock      | BOOLEAN       | NO      | TRUE        |
| created_at    | TIMESTAMP     | NO      | CURRENT_TS  |
+---------------+---------------+---------+-------------+

Indexes:
- PRIMARY KEY (id)
- UNIQUE KEY sku_unique (sku)
- KEY category_idx (category_id)

Foreign Keys:
- category_id → categories(id)`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tables Only View</h3>
            <PreCodeBlock>
{`# List table names only
akron inspect-schema --db "postgres://user:pass@host:5432/app" --tables-only`}
            </PreCodeBlock>
            <OutputBlock>
{`Tables in database 'app':
- users
- posts  
- comments
- categories
- tags
- post_tags

Total: 6 tables`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">JSON Output Format</h3>
            <PreCodeBlock>
{`# Export schema as JSON
akron inspect-schema --db "mongodb://localhost:27017/social" --format json`}
            </PreCodeBlock>
            <OutputBlock>
{`{
  "database": "social",
  "collections": [
    {
      "name": "users",
      "schema": {
        "_id": "ObjectId",
        "username": "String",
        "email": "String", 
        "profile": "Object",
        "created_at": "Date"
      },
      "indexes": ["_id_", "username_1", "email_1"]
    },
    {
      "name": "posts",
      "schema": {
        "_id": "ObjectId",
        "user_id": "ObjectId",
        "content": "String",
        "likes": "Array",
        "created_at": "Date"
      },
      "indexes": ["_id_", "user_id_1"]
    }
  ]
}`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database-Specific Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">SQLite Details</h3>
            <PreCodeBlock>
{`# SQLite shows detailed table info
akron inspect-schema --db "sqlite:///app.db" --table users`}
            </PreCodeBlock>
            <p className="text-gray-600 mb-2">Shows: column types, constraints, default values, primary keys</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MySQL/PostgreSQL Details</h3>
            <PreCodeBlock>
{`# Shows comprehensive schema info
akron inspect-schema --db "mysql://user:pass@host:3306/db" --table orders`}
            </PreCodeBlock>
            <p className="text-gray-600 mb-2">Shows: indexes, foreign keys, constraints, auto-increment settings</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MongoDB Collections</h3>
            <PreCodeBlock>
{`# MongoDB shows document structure analysis
akron inspect-schema --db "mongodb://localhost:27017/app" --table users`}
            </PreCodeBlock>
            <p className="text-gray-600 mb-2">Shows: inferred schema from documents, data types, nested structures</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h2>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Development Workflow</h3>
            <PreCodeBlock>
{`# Check current schema before making changes
akron inspect-schema --db "sqlite:///dev.db"

# Create new table based on existing structure
akron create-table new_users --db "sqlite:///dev.db" --schema '{"id": "int", "name": "str"}'

# Verify the new table
akron inspect-schema --db "sqlite:///dev.db" --table new_users`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Database Migration Planning</h3>
            <PreCodeBlock>
{`# Document current production schema
akron inspect-schema --db "postgres://prod" --format json > current_schema.json

# Compare with development schema
akron inspect-schema --db "postgres://dev" --format json > dev_schema.json

# Plan migrations based on differences`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Data Analysis</h3>
            <PreCodeBlock>
{`# Quick overview of available data
akron inspect-schema --db "mysql://analytics" --tables-only

# Detailed structure for specific analysis
akron inspect-schema --db "mysql://analytics" --table user_events`}
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
              <li><strong>Connection failed:</strong> Verify database URL and credentials</li>
              <li><strong>Database not found:</strong> Ensure database exists</li>
              <li><strong>Table not found:</strong> Check table name spelling</li>
              <li><strong>Permission denied:</strong> Ensure user has read access</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Troubleshooting</h3>
            <PreCodeBlock>
{`# Test connection first
akron inspect-schema --db "sqlite:///test.db" --tables-only

# Check if specific table exists
akron inspect-schema --db "mysql://user:pass@host:3306/db" --tables-only | grep "table_name"`}
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
            <a href="/docs/cli/drop-table" className="text-blue-600 hover:text-blue-800 text-sm block">
              → drop-table command
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Operations</h3>
            <a href="/docs/cli/raw-sql" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → raw-sql command
            </a>
            <a href="/docs/cli/seed" className="text-blue-600 hover:text-blue-800 text-sm block">
              → seed command
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
