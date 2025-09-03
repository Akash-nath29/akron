import { DocsLayout, PreCodeBlock, CodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function SeedPage() {
  return (
    <DocsLayout 
      title="seed Command" 
      description="Populate database tables with test data using the Akron CLI across SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>seed</code> command populates your database tables with test or initial data. 
          Perfect for development, testing, and setting up demo environments with realistic data.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Basic Syntax</h3>
          <CodeBlock>{`akron seed <table_name> --db <database_url> --data <data_json>`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">table_name</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Name of the table to populate with data.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--db</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Database connection URL.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--data</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> JSON array (required)</p>
            <p className="text-gray-600">Array of objects to insert into the table.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--file</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Path to JSON file containing seed data (alternative to --data).</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Seeding</h3>
            <PreCodeBlock>
{`# Seed users table with inline data
akron seed users --db "sqlite:///app.db" --data '[
  {"name": "John Doe", "email": "john@example.com"},
  {"name": "Jane Smith", "email": "jane@example.com"}
]'`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Seeded 2 records into 'users' table
✓ Data inserted successfully`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Seeding from File</h3>
            <PreCodeBlock>
{`# Create seed data file
echo '[
  {"name": "Product 1", "price": 29.99, "category": "Electronics"},
  {"name": "Product 2", "price": 49.99, "category": "Books"},
  {"name": "Product 3", "price": 19.99, "category": "Clothing"}
]' > products_seed.json

# Seed from file
akron seed products --db "mysql://user:pass@host:3306/store" --file products_seed.json`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Loaded seed data from products_seed.json
✓ Seeded 3 records into 'products' table`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Complex Data Types</h3>
            <PreCodeBlock>
{`# Seed with various data types
akron seed orders --db "postgres://user:pass@host:5432/shop" --data '[
  {
    "id": 1,
    "customer_id": 101,
    "total": 99.99,
    "status": "completed",
    "items": ["item1", "item2"],
    "created_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "customer_id": 102,
    "total": 149.50,
    "status": "pending",
    "items": ["item3"],
    "created_at": "2024-01-16T14:20:00Z"
  }
]'`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Seeded 2 records into 'orders' table
✓ Complex data types handled automatically`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MongoDB Documents</h3>
            <PreCodeBlock>
{`# Seed MongoDB collection
akron seed user_profiles --db "mongodb://localhost:27017/social" --data '[
  {
    "username": "alice",
    "profile": {
      "firstName": "Alice",
      "lastName": "Johnson",
      "age": 28
    },
    "tags": ["developer", "react", "nodejs"],
    "preferences": {
      "theme": "dark",
      "notifications": true
    }
  }
]'`}
            </PreCodeBlock>
            <OutputBlock>
{`✓ Seeded 1 document into 'user_profiles' collection
✓ Nested objects and arrays preserved`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seed Data Patterns</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">User Data Pattern</h3>
            <PreCodeBlock>
{`# users_seed.json
[
  {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "password_hash": "hashed_password_here",
    "role": "admin",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "username": "testuser",
    "email": "test@example.com",
    "password_hash": "another_hash",
    "role": "user",
    "is_active": true,
    "created_at": "2024-01-02T00:00:00Z"
  }
]`}
            </PreCodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">E-commerce Products</h3>
            <PreCodeBlock>
{`# products_seed.json
[
  {
    "sku": "LAPTOP001",
    "name": "Gaming Laptop",
    "description": "High-performance gaming laptop",
    "price": 1299.99,
    "cost": 800.00,
    "category": "Electronics",
    "in_stock": true,
    "stock_quantity": 50,
    "tags": ["gaming", "laptop", "electronics"]
  },
  {
    "sku": "BOOK001", 
    "name": "Python Programming",
    "description": "Learn Python programming",
    "price": 39.99,
    "cost": 15.00,
    "category": "Books",
    "in_stock": true,
    "stock_quantity": 100,
    "tags": ["programming", "python", "education"]
  }
]`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Features</h2>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Batch Processing</h3>
            <p className="text-green-800 mb-2">
              Large datasets are automatically processed in batches for optimal performance:
            </p>
            <PreCodeBlock>
{`# Seed large dataset (automatically batched)
akron seed large_table --db "postgres://user:pass@host:5432/db" --file large_dataset.json`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Data Validation</h3>
            <p className="text-blue-800">
              Seed data is validated against table schema before insertion, preventing type errors.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Duplicate Handling</h3>
            <p className="text-yellow-800">
              Use unique constraints or primary keys to handle duplicate data appropriately.
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
              <li><strong>Table does not exist:</strong> Create table first with create-table</li>
              <li><strong>Invalid JSON format:</strong> Validate JSON syntax in data or file</li>
              <li><strong>Schema mismatch:</strong> Ensure data matches table column types</li>
              <li><strong>Constraint violations:</strong> Check for duplicate keys or foreign key constraints</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Troubleshooting</h3>
            <PreCodeBlock>
{`# Validate table schema first
akron inspect-schema --db "sqlite:///app.db"

# Test with small dataset first
akron seed users --db "sqlite:///app.db" --data '[{"name": "Test User"}]'

# Check for existing data
akron raw-sql --db "sqlite:///app.db" --query "SELECT COUNT(*) FROM users"`}
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
            <a href="/docs/api/insert" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → insert() API method
            </a>
            <a href="/docs/cli/raw-sql" className="text-blue-600 hover:text-blue-800 text-sm block">
              → raw-sql command
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Development</h3>
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
