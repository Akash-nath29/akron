import { DocsLayout, PreCodeBlock, OutputBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function CreateTablePage() {
  return (
    <DocsLayout 
      title="create_table()" 
      description="Create database tables with schema definitions, foreign key relationships, and cross-database compatibility."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>create_table()</code> method creates database tables with type-safe schema definitions. 
          It uses <code>CREATE TABLE IF NOT EXISTS</code> to prevent errors on duplicate creation and supports 
          foreign key relationships across all supported databases.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Signature</h3>
          <CodeBlock>{`create_table(table_name: str, schema: Dict[str, str]) -> None`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">table_name</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str</p>
            <p className="text-gray-600">
              Name of the table to create. Must be a valid identifier for the target database.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">schema</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> Dict[str, str]</p>
            <p className="text-gray-600 mb-4">
              Dictionary mapping column names to their types. Supported types:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><code>&quot;int&quot;</code> - Integer (becomes PRIMARY KEY AUTOINCREMENT for id columns)</li>
              <li><code>&quot;str&quot;</code> - String/VARCHAR</li>
              <li><code>&quot;float&quot;</code> - Floating point number</li>
              <li><code>&quot;bool&quot;</code> - Boolean</li>
              <li><code>&quot;int-&gt;table.column&quot;</code> - Foreign key reference</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600">
            <strong>None</strong> - The method performs the table creation and returns nothing.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Table Creation</h3>
        
        <PreCodeBlock title="Simple User Table">
{`from akron import Akron

db = Akron("sqlite:///example.db")

# Create a basic users table
db.create_table("users", {
    "id": "int",        # Becomes PRIMARY KEY AUTOINCREMENT
    "username": "str",  # VARCHAR
    "email": "str",
    "age": "int",
    "active": "bool"
})

print("Users table created successfully!")`}
        </PreCodeBlock>

        <OutputBlock>
{`Users table created successfully!`}
        </OutputBlock>

        <p className="text-gray-600 mb-4 mt-4">
          <strong>Generated SQL (SQLite):</strong>
        </p>
        <PreCodeBlock title="Generated SQL">
{`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    age INTEGER,
    active BOOLEAN
)`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Foreign Key Relationships</h3>
        <p className="text-gray-600 mb-4">
          Use the syntax <code>&quot;int-&gt;table.column&quot;</code> to create foreign key relationships:
        </p>

        <PreCodeBlock title="Tables with Foreign Keys">
{`from akron import Akron

db = Akron("sqlite:///blog.db")

# Create categories table first
db.create_table("categories", {
    "id": "int",
    "name": "str",
    "description": "str"
})

# Create posts table with foreign key to categories
db.create_table("posts", {
    "id": "int",
    "title": "str",
    "content": "str",
    "category_id": "int->categories.id",  # Foreign key
    "published": "bool",
    "created_at": "str"
})

# Create comments table with foreign keys to both posts and users
db.create_table("comments", {
    "id": "int",
    "post_id": "int->posts.id",     # Foreign key to posts
    "user_id": "int->users.id",     # Foreign key to users  
    "content": "str",
    "created_at": "str"
})

print("Blog schema created with foreign key relationships!")`}
        </PreCodeBlock>

        <OutputBlock>
{`Blog schema created with foreign key relationships!`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">E-commerce Example</h3>
        <p className="text-gray-600 mb-4">
          Complex schema with multiple relationships:
        </p>

        <PreCodeBlock title="E-commerce Database Schema">
{`from akron import Akron

db = Akron("mysql://user:password@localhost/ecommerce")

# Create base tables
db.create_table("customers", {
    "id": "int",
    "first_name": "str",
    "last_name": "str",
    "email": "str",
    "phone": "str",
    "created_at": "str"
})

db.create_table("products", {
    "id": "int",
    "name": "str",
    "description": "str",
    "price": "float",
    "stock_quantity": "int",
    "category": "str"
})

# Orders with customer reference
db.create_table("orders", {
    "id": "int",
    "customer_id": "int->customers.id",
    "total_amount": "float",
    "status": "str",
    "order_date": "str"
})

# Order items linking orders and products
db.create_table("order_items", {
    "id": "int",
    "order_id": "int->orders.id",
    "product_id": "int->products.id",
    "quantity": "int",
    "unit_price": "float"
})

print("E-commerce database schema created!")`}
        </PreCodeBlock>

        <OutputBlock>
{`E-commerce database schema created!`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database-Specific Behavior</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🗄️ SQLite</h3>
            <p className="text-gray-600 mb-2">
              Types are mapped to SQLite&apos;s flexible type system:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><code>int</code> → INTEGER (PRIMARY KEY AUTOINCREMENT for id columns)</li>
              <li><code>str</code> → TEXT</li>
              <li><code>float</code> → REAL</li>
              <li><code>bool</code> → BOOLEAN</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐬 MySQL</h3>
            <p className="text-gray-600 mb-2">
              Types are mapped to MySQL&apos;s strict type system:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><code>int</code> → INT AUTO_INCREMENT PRIMARY KEY</li>
              <li><code>str</code> → VARCHAR(255)</li>
              <li><code>float</code> → FLOAT</li>
              <li><code>bool</code> → BOOLEAN</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐘 PostgreSQL</h3>
            <p className="text-gray-600 mb-2">
              Types use PostgreSQL&apos;s robust type system:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><code>int</code> → SERIAL PRIMARY KEY</li>
              <li><code>str</code> → VARCHAR(255)</li>
              <li><code>float</code> → REAL</li>
              <li><code>bool</code> → BOOLEAN</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🍃 MongoDB</h3>
            <p className="text-gray-600 mb-2">
              MongoDB collections are created implicitly. Schema definitions are stored for reference but not enforced:
            </p>
            <PreCodeBlock>
{`# MongoDB - collection created when first document inserted
db.create_table("users", {
    "id": "int",
    "name": "str", 
    "email": "str"
})
# Collection 'users' will be created on first insert`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        
        <PreCodeBlock title="Handling Table Creation Errors">
{`from akron import Akron
from akron.exceptions import AkronError, TableNotFoundError

db = Akron("sqlite:///example.db")

try:
    # This will work fine
    db.create_table("products", {
        "id": "int",
        "name": "str",
        "price": "float"
    })
    
    # This might cause issues if categories table doesn't exist
    db.create_table("product_reviews", {
        "id": "int",
        "product_id": "int->products.id",  # Valid reference
        "category_id": "int->categories.id",  # Table doesn't exist yet!
        "rating": "int"
    })
    
except AkronError as e:
    print(f"Table creation failed: {e}")
    
    # Create the missing table first
    db.create_table("categories", {
        "id": "int",
        "name": "str"
    })
    
    # Now try again
    db.create_table("product_reviews", {
        "id": "int",
        "product_id": "int->products.id",
        "category_id": "int->categories.id",
        "rating": "int"
    })`}
        </PreCodeBlock>

        <OutputBlock>
{`Table creation failed: Foreign key constraint failed: categories
Table product_reviews created successfully!`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CLI Usage</h2>
        <p className="text-gray-600 mb-4">
          You can also create tables using the Akron CLI:
        </p>
        
        <PreCodeBlock title="CLI Table Creation">
{`# Create a simple table
akron create-table users --db sqlite:///example.db --schema '{"id": "int", "name": "str", "email": "str"}'

# Create table with foreign keys
akron create-table posts --db sqlite:///blog.db --schema '{"id": "int", "title": "str", "user_id": "int->users.id"}'

# Different database types
akron create-table products --db mysql://user:pass@localhost/shop --schema '{"id": "int", "name": "str", "price": "float"}'`}
        </PreCodeBlock>

        <OutputBlock>
{`Table users created.
Table posts created.
Table products created.`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📋 Schema Design</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Always include an &quot;id&quot; column as the primary key</li>
              <li>Use descriptive column names (snake_case recommended)</li>
              <li>Create referenced tables before tables with foreign keys</li>
              <li>Consider adding created_at/updated_at timestamps</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔗 Foreign Keys</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Foreign key format: <code>&quot;int-&gt;table_name.column_name&quot;</code></li>
              <li>Usually references the id column: <code>&quot;int-&gt;users.id&quot;</code></li>
              <li>Ensure referenced table exists before creating</li>
              <li>Foreign keys are not supported in MongoDB</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🧪 Development Workflow</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use migrations for production schema changes</li>
              <li>Test schema with SQLite first, then migrate to production DB</li>
              <li>Use <code>IF NOT EXISTS</code> behavior for safe re-runs</li>
              <li>Document your schema relationships</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          After creating tables, you can start working with data:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Insert Data</h3>
            <p className="text-gray-600 text-sm mb-2">Add records to your tables</p>
            <a href="/docs/api/insert" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about insert()
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Query Data</h3>
            <p className="text-gray-600 text-sm mb-2">Find and retrieve records</p>
            <a href="/docs/api/find" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about find()
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
