import { DocsLayout, PreCodeBlock, OutputBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function InsertPage() {
  return (
    <DocsLayout 
      title="insert()" 
      description="Insert new records into database tables with automatic ID generation, type validation, and constraint handling."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>insert()</code> method adds new records to database tables. It automatically handles 
          auto-increment primary keys, validates foreign key constraints, and prevents duplicate entries 
          on unique fields across all supported databases.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Signature</h3>
          <CodeBlock>{`insert(table_name: str, data: Dict[str, Any]) -> int`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">table_name</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str</p>
            <p className="text-gray-600">
              Name of the table to insert data into. The table must exist before insertion.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">data</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> Dict[str, Any]</p>
            <p className="text-gray-600">
              Dictionary mapping column names to their values. Must be a non-empty dictionary with 
              valid column names and appropriate data types.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 mb-2"><strong>Type:</strong> int</p>
          <p className="text-gray-600">
            The ID of the inserted record (from the database&apos;s <code>lastrowid</code> or equivalent). 
            For auto-increment primary keys, this will be the generated ID value.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Data Insertion</h3>
        
        <PreCodeBlock title="Simple User Insertion">
{`from akron import Akron

db = Akron("sqlite:///example.db")

# First, create the table
db.create_table("users", {
    "id": "int",
    "username": "str",
    "email": "str",
    "age": "int",
    "active": "bool"
})

# Insert a new user
user_id = db.insert("users", {
    "username": "alice_smith",
    "email": "alice@example.com",
    "age": 28,
    "active": True
})

print(f"Inserted user with ID: {user_id}")

# Insert another user (id will auto-increment)
user_id_2 = db.insert("users", {
    "username": "bob_jones", 
    "email": "bob@example.com",
    "age": 32,
    "active": False
})

print(f"Inserted second user with ID: {user_id_2}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Inserted user with ID: 1
Inserted second user with ID: 2`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Inserting with Explicit IDs</h3>
        <p className="text-gray-600 mb-4">
          You can specify explicit ID values when needed:
        </p>

        <PreCodeBlock title="Explicit ID Insertion">
{`from akron import Akron

db = Akron("sqlite:///products.db")

db.create_table("categories", {
    "id": "int",
    "name": "str",
    "description": "str"
})

# Insert categories with specific IDs
electronics_id = db.insert("categories", {
    "id": 100,
    "name": "Electronics",
    "description": "Electronic devices and accessories"
})

books_id = db.insert("categories", {
    "id": 200,  
    "name": "Books",
    "description": "Physical and digital books"
})

print(f"Electronics category ID: {electronics_id}")
print(f"Books category ID: {books_id}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Electronics category ID: 100
Books category ID: 200`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Foreign Key Relationships</h3>
        <p className="text-gray-600 mb-4">
          Insert data with foreign key references:
        </p>

        <PreCodeBlock title="Related Data Insertion">
{`from akron import Akron

db = Akron("mysql://user:password@localhost/blog")

# Create tables with relationships
db.create_table("authors", {
    "id": "int",
    "name": "str",
    "email": "str"
})

db.create_table("posts", {
    "id": "int",
    "title": "str",
    "content": "str",
    "author_id": "int->authors.id",
    "published": "bool",
    "created_at": "str"
})

# Insert an author first
author_id = db.insert("authors", {
    "name": "Jane Doe",
    "email": "jane@blog.com"
})

print(f"Created author with ID: {author_id}")

# Insert posts referencing the author
post_id_1 = db.insert("posts", {
    "title": "Getting Started with Akron ORM",
    "content": "Akron ORM makes database operations simple...",
    "author_id": author_id,  # Foreign key reference
    "published": True,
    "created_at": "2024-01-15"
})

post_id_2 = db.insert("posts", {
    "title": "Advanced Database Relationships",
    "content": "Learn how to work with complex schemas...",
    "author_id": author_id,  # Same author
    "published": False,
    "created_at": "2024-01-16"
})

print(f"Created posts with IDs: {post_id_1}, {post_id_2}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Created author with ID: 1
Created posts with IDs: 2, 3`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Batch Insertions</h3>
        <p className="text-gray-600 mb-4">
          Insert multiple records efficiently:
        </p>

        <PreCodeBlock title="Multiple Record Insertion">
{`from akron import Akron

db = Akron("postgres://user:password@localhost/inventory")

db.create_table("products", {
    "id": "int",
    "name": "str", 
    "price": "float",
    "stock": "int",
    "category": "str"
})

# Product data to insert
products = [
    {"name": "Laptop", "price": 999.99, "stock": 15, "category": "Electronics"},
    {"name": "Mouse", "price": 29.99, "stock": 50, "category": "Electronics"},
    {"name": "Desk Chair", "price": 199.99, "stock": 8, "category": "Furniture"},
    {"name": "Monitor", "price": 299.99, "stock": 12, "category": "Electronics"}
]

# Insert each product
inserted_ids = []
for product in products:
    product_id = db.insert("products", product)
    inserted_ids.append(product_id)
    print(f"Inserted {product['name']} with ID: {product_id}")

print(f"\\nAll product IDs: {inserted_ids}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Inserted Laptop with ID: 1
Inserted Mouse with ID: 2
Inserted Desk Chair with ID: 3
Inserted Monitor with ID: 4

All product IDs: [1, 2, 3, 4]`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database-Specific Behavior</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🗄️ SQLite</h3>
            <p className="text-gray-600 mb-2">
              Returns <code>cursor.lastrowid</code> for the inserted record:
            </p>
            <PreCodeBlock>
{`# SQLite behavior
user_id = db.insert("users", {"name": "Alice", "age": 25})
# Returns the SQLite rowid (usually equals id column)`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐬 MySQL</h3>
            <p className="text-gray-600 mb-2">
              Returns <code>cursor.lastrowid</code> from MySQL&apos;s AUTO_INCREMENT:
            </p>
            <PreCodeBlock>
{`# MySQL behavior  
user_id = db.insert("users", {"name": "Bob", "age": 30})
# Returns the AUTO_INCREMENT value`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐘 PostgreSQL</h3>
            <p className="text-gray-600 mb-2">
              Returns the SERIAL primary key value:
            </p>
            <PreCodeBlock>
{`# PostgreSQL behavior
user_id = db.insert("users", {"name": "Charlie", "age": 35})
# Returns the SERIAL sequence value`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🍃 MongoDB</h3>
            <p className="text-gray-600 mb-2">
              Returns the ObjectId as an integer representation:
            </p>
            <PreCodeBlock>
{`# MongoDB behavior
user_id = db.insert("users", {"name": "Diana", "age": 27})
# Returns a unique identifier for the document`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        
        <PreCodeBlock title="Handling Insertion Errors">
{`from akron import Akron
from akron.exceptions import AkronError

db = Akron("sqlite:///example.db")

# Create table with unique constraint
db.create_table("users", {
    "id": "int",
    "username": "str",  # This should be unique in real apps
    "email": "str"
})

try:
    # First insertion - this works
    user1_id = db.insert("users", {
        "username": "john_doe",
        "email": "john@example.com"
    })
    print(f"First user created with ID: {user1_id}")
    
    # This might fail if username/email uniqueness is enforced
    user2_id = db.insert("users", {
        "username": "john_doe",  # Duplicate username
        "email": "john2@example.com"
    })
    
except AkronError as e:
    print(f"Insertion failed: {e}")
    if "UNIQUE constraint failed" in str(e):
        print("This username already exists!")
        
        # Insert with different username
        user2_id = db.insert("users", {
            "username": "john_doe_2",
            "email": "john2@example.com"
        })
        print(f"Second user created with ID: {user2_id}")

# Foreign key constraint error
try:
    # This will fail - author_id 999 doesn't exist
    db.insert("posts", {
        "title": "Test Post",
        "content": "Test content",
        "author_id": 999  # Non-existent author
    })
except AkronError as e:
    print(f"Foreign key error: {e}")
    if "Foreign key constraint failed" in str(e):
        print("Referenced author does not exist!")`}
        </PreCodeBlock>

        <OutputBlock>
{`First user created with ID: 1
Insertion failed: Duplicate entry on unique field: UNIQUE constraint failed: users.username
This username already exists!
Second user created with ID: 2
Foreign key error: Foreign key constraint failed: FOREIGN KEY constraint failed
Referenced author does not exist!`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CLI Usage</h2>
        <p className="text-gray-600 mb-4">
          Insert data using the Akron CLI with the <code>seed</code> command:
        </p>
        
        <PreCodeBlock title="CLI Data Insertion">
{`# Insert a single record
akron seed users --db sqlite:///example.db --data '{"username": "alice", "email": "alice@example.com", "age": 28}'

# Insert with foreign key reference
akron seed posts --db sqlite:///blog.db --data '{"title": "My First Post", "content": "Hello world!", "author_id": 1}'

# Insert product data
akron seed products --db mysql://user:pass@localhost/shop --data '{"name": "Laptop", "price": 999.99, "stock": 10}'`}
        </PreCodeBlock>

        <OutputBlock>
{`Seeded data into users.
Seeded data into posts.
Seeded data into products.`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔒 Data Validation</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Validate data before insertion to prevent constraint violations</li>
              <li>Use appropriate data types (int, str, float, bool)</li>
              <li>Handle potential duplicate key errors gracefully</li>
              <li>Verify foreign key references exist before insertion</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">⚡ Performance</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>For bulk insertions, consider using transactions</li>
              <li>Insert referenced tables (parent) before dependent tables (child)</li>
              <li>Use batch processing for large datasets</li>
              <li>Consider using specific IDs for lookup tables</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🛡️ Error Handling</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Always wrap insertions in try-catch blocks</li>
              <li>Check for specific error types (unique, foreign key, etc.)</li>
              <li>Provide meaningful error messages to users</li>
              <li>Consider rollback strategies for failed batch insertions</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📝 Data Consistency</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use consistent naming conventions for columns</li>
              <li>Include timestamps (created_at, updated_at) when relevant</li>
              <li>Validate foreign key values before insertion</li>
              <li>Consider using UUIDs for distributed systems</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          After inserting data, you can retrieve and manipulate it:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Query Data</h3>
            <p className="text-gray-600 text-sm mb-2">Find and retrieve your inserted records</p>
            <a href="/docs/api/find" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about find()
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Update Records</h3>
            <p className="text-gray-600 text-sm mb-2">Modify existing data</p>
            <a href="/docs/api/update" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about update()
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
