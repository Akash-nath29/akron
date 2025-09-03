import { DocsLayout, PreCodeBlock, CodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function CreateTablePage() {
  return (
    <DocsLayout 
      title="create-table Command" 
      description="Create new database tables using the Akron CLI with customizable schemas across SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>create-table</code> command allows you to create new database tables with custom schemas 
          directly from the command line. It supports all Akron-compatible databases and provides a unified 
          interface for table creation across different database systems.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Basic Syntax</h3>
          <CodeBlock>{`akron create-table <table_name> --db <database_url> --schema <schema_json>`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">table_name</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Name of the table to create. Must be a valid identifier for the target database.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--db</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Database connection URL. Supports sqlite://, mysql://, postgres://, and mongodb:// schemes.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--schema</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> JSON string (required)</p>
            <p className="text-gray-600">Table schema definition as JSON. Keys are column names, values are data types.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">SQLite</h3>
            <PreCodeBlock>
{`# Create users table in SQLite file
akron create-table users --db "sqlite:///./myapp.db" --schema '{"id": "int", "name": "str", "email": "str"}'

# Create in-memory SQLite table
akron create-table sessions --db "sqlite:///:memory:" --schema '{"session_id": "str", "user_id": "int", "expires": "datetime"}'`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Table 'users' created successfully in SQLite database
✓ Columns: id (int), name (str), email (str)`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MySQL</h3>
            <PreCodeBlock>
{`# Create products table in MySQL
akron create-table products --db "mysql://user:password@localhost:3306/store" --schema '{"id": "int", "name": "str", "price": "float", "in_stock": "bool"}'

# Create with custom charset
akron create-table articles --db "mysql://user:pass@host:3306/blog?charset=utf8mb4" --schema '{"id": "int", "title": "str", "content": "text"}'`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Table 'products' created successfully in MySQL database
✓ Columns: id (int), name (varchar), price (float), in_stock (boolean)`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">PostgreSQL</h3>
            <PreCodeBlock>
{`# Create orders table in PostgreSQL
akron create-table orders --db "postgres://user:password@localhost:5432/ecommerce" --schema '{"id": "int", "customer_id": "int", "total": "decimal", "created_at": "timestamp"}'

# Create with SSL connection
akron create-table logs --db "postgres://user:pass@host:5432/app?sslmode=require" --schema '{"id": "int", "level": "str", "message": "text", "timestamp": "timestamp"}'`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Table 'orders' created successfully in PostgreSQL database
✓ Columns: id (integer), customer_id (integer), total (decimal), created_at (timestamp)`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MongoDB</h3>
            <PreCodeBlock>
{`# Create collection in MongoDB (document schema)
akron create-table users --db "mongodb://localhost:27017/myapp" --schema '{"_id": "objectid", "username": "str", "profile": "object", "tags": "array"}'

# Create with authentication
akron create-table events --db "mongodb://user:password@localhost:27017/analytics" --schema '{"event_type": "str", "data": "object", "timestamp": "datetime"}'`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Collection 'users' created successfully in MongoDB database
✓ Schema validation enabled for: _id (objectid), username (str), profile (object), tags (array)`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Supported Data Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Types</h3>
            <ul className="space-y-2 text-gray-600">
              <li><code>&quot;int&quot;</code> - Integer numbers</li>
              <li><code>&quot;str&quot;</code> - String/text data</li>
              <li><code>&quot;bool&quot;</code> - Boolean true/false</li>
              <li><code>&quot;float&quot;</code> - Floating point numbers</li>
              <li><code>&quot;datetime&quot;</code> - Date and time</li>
              <li><code>&quot;date&quot;</code> - Date only</li>
              <li><code>&quot;time&quot;</code> - Time only</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced Types</h3>
            <ul className="space-y-2 text-gray-600">
              <li><code>&quot;text&quot;</code> - Large text fields</li>
              <li><code>&quot;decimal&quot;</code> - Precise decimal numbers</li>
              <li><code>&quot;json&quot;</code> - JSON data (where supported)</li>
              <li><code>&quot;blob&quot;</code> - Binary data</li>
              <li><code>&quot;array&quot;</code> - Array data (MongoDB)</li>
              <li><code>&quot;object&quot;</code> - Nested objects (MongoDB)</li>
              <li><code>&quot;objectid&quot;</code> - MongoDB ObjectId</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complex Schema Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">E-commerce Product Table</h3>
            <PreCodeBlock>
{`akron create-table products --db "sqlite:///store.db" --schema '{
  "id": "int",
  "sku": "str", 
  "name": "str",
  "description": "text",
  "price": "decimal",
  "cost": "decimal",
  "category_id": "int",
  "in_stock": "bool",
  "stock_quantity": "int",
  "created_at": "datetime",
  "updated_at": "datetime"
}'`}
            </PreCodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">User Profile with MongoDB</h3>
            <PreCodeBlock>
{`akron create-table user_profiles --db "mongodb://localhost:27017/social" --schema '{
  "_id": "objectid",
  "username": "str",
  "email": "str", 
  "profile": "object",
  "preferences": "object",
  "friends": "array",
  "posts": "array",
  "created_at": "datetime",
  "last_login": "datetime"
}'`}
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
              <li><strong>Table already exists:</strong> Use drop-table first or choose a different name</li>
              <li><strong>Invalid schema format:</strong> Ensure JSON is properly formatted</li>
              <li><strong>Unsupported data type:</strong> Check database-specific type support</li>
              <li><strong>Connection failed:</strong> Verify database URL and credentials</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Troubleshooting</h3>
            <PreCodeBlock>
{`# Check if table exists first
akron inspect-schema --db "sqlite:///myapp.db"

# Drop existing table if needed
akron drop-table users --db "sqlite:///myapp.db"

# Then create new table
akron create-table users --db "sqlite:///myapp.db" --schema '{"id": "int", "name": "str"}'`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schema Management</h3>
            <a href="/docs/cli/drop-table" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → drop-table command
            </a>
            <a href="/docs/cli/inspect-schema" className="text-blue-600 hover:text-blue-800 text-sm block">
              → inspect-schema command
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Operations</h3>
            <a href="/docs/cli/seed" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → seed command
            </a>
            <a href="/docs/api/insert" className="text-blue-600 hover:text-blue-800 text-sm block">
              → insert() API method
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
