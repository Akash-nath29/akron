import { DocsLayout, PreCodeBlock, OutputBlock } from "../../../components/DocsLayout";

export default function GettingStartedPage() {
  return (
    <DocsLayout 
      title="Getting Started" 
      description="Quick start guide to install and use Akron ORM in your Python projects with practical examples."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Akron ORM</h2>
        <p className="text-gray-600 mb-4">
          Akron is a universal Python ORM that provides a consistent API across SQLite, MySQL, 
          PostgreSQL, and MongoDB. Get started in minutes with this comprehensive guide.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">✨ What You&apos;ll Learn</h3>
          <ul className="text-green-800 space-y-1">
            <li>• Install Akron and its dependencies</li>
            <li>• Connect to your first database</li>
            <li>• Create tables and manage schemas</li>
            <li>• Perform CRUD operations</li>
            <li>• Use both Python API and CLI tools</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Installation</h3>
        <p className="text-gray-600 mb-4">
          Install Akron using pip. This includes support for SQLite by default:
        </p>

        <PreCodeBlock title="Install Akron ORM">
{`# Basic installation with SQLite support
pip install akron

# Verify installation
python -c "import akron; print(f'Akron {akron.__version__} installed successfully')"

# Check CLI availability
akron --version`}
        </PreCodeBlock>

        <OutputBlock>
{`Collecting akron
Installing collected packages: akron
Successfully installed akron-1.0.0

Akron 1.0.0 installed successfully
akron 1.0.0`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Database-Specific Dependencies</h3>
        <p className="text-gray-600 mb-4">
          Install additional packages for other databases:
        </p>

        <PreCodeBlock title="Database Dependencies">
{`# MySQL support
pip install akron mysql-connector-python

# PostgreSQL support  
pip install akron psycopg2-binary

# MongoDB support
pip install akron pymongo

# All databases at once
pip install akron mysql-connector-python psycopg2-binary pymongo`}
        </PreCodeBlock>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">📝 Installation Notes</h4>
          <ul className="text-yellow-800 space-y-1 text-sm">
            <li>• SQLite is included with Python, no additional setup needed</li>
            <li>• MySQL requires a running MySQL server</li>
            <li>• PostgreSQL requires a running PostgreSQL server</li>
            <li>• MongoDB requires a running MongoDB instance</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your First Database</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Start with SQLite</h3>
        <p className="text-gray-600 mb-4">
          Let&apos;s create a simple blog application to demonstrate Akron&apos;s capabilities:
        </p>

        <PreCodeBlock title="Basic Setup (save as blog_app.py)">
{`from akron import Akron
from pydantic import BaseModel
from akron.models import ModelMixin

# Define your data models using Pydantic + ModelMixin
class User(BaseModel, ModelMixin):
    id: int
    username: str
    email: str
    is_active: bool = True

class Post(BaseModel, ModelMixin):
    id: int
    user_id: int  # Foreign key to users table
    title: str
    content: str
    published: bool = False

# Connect to database (SQLite file will be created automatically)
db = Akron("sqlite:///blog.db")

# Create tables
User.create_table(db)
Post.create_table(db)

print("Database and tables created successfully!")

# Insert sample data
alice_id = User.insert(db, User(
    id=1,
    username="alice",
    email="alice@example.com"
))

bob_id = User.insert(db, User(
    id=2, 
    username="bob",
    email="bob@example.com"
))

# Create some posts
Post.insert(db, Post(
    id=1,
    user_id=alice_id,
    title="Welcome to Akron ORM",
    content="This is my first post using Akron!",
    published=True
))

Post.insert(db, Post(
    id=2,
    user_id=bob_id,
    title="Database Magic",
    content="Akron makes database operations so easy!",
    published=True
))

# Query data
all_users = User.find(db)
published_posts = Post.find(db, {"published": True})

print(f"\\nUsers in database: {len(all_users)}")
for user in all_users:
    print(f"  - {user.username} ({user.email})")

print(f"\\nPublished posts: {len(published_posts)}")
for post in published_posts:
    print(f"  - {post.title} by user {post.user_id}")

# Always close the connection
db.close()`}
        </PreCodeBlock>

        <OutputBlock>
{`Database and tables created successfully!

Users in database: 2
  - alice (alice@example.com)
  - bob (bob@example.com)

Published posts: 2
  - Welcome to Akron ORM by user 1
  - Database Magic by user 2`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Using the CLI</h3>
        <p className="text-gray-600 mb-4">
          Alternatively, use the CLI for quick database operations:
        </p>

        <PreCodeBlock title="CLI Quick Start">
{`# Create users table via CLI
akron create-table users --db "sqlite:///blog.db" --schema '{
  "id": "int",
  "username": "str", 
  "email": "str",
  "is_active": "bool"
}'

# Add sample data
akron seed users --db "sqlite:///blog.db" --data '[
  {"username": "alice", "email": "alice@example.com", "is_active": true},
  {"username": "bob", "email": "bob@example.com", "is_active": true}
]'

# Check the data
akron raw-sql --db "sqlite:///blog.db" --query "SELECT * FROM users"

# Inspect database structure  
akron inspect-schema --db "sqlite:///blog.db"`}
        </PreCodeBlock>

        <OutputBlock>
{`✓ Table 'users' created successfully
✓ Seeded 2 records into 'users' table

Query Results:
[
  {"id": 1, "username": "alice", "email": "alice@example.com", "is_active": true},
  {"id": 2, "username": "bob", "email": "bob@example.com", "is_active": true}
]

Database Schema:
├── users
│   ├── id (int)
│   ├── username (str)
│   ├── email (str)
│   └── is_active (bool)`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Concepts</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔌 Database Connections</h3>
            <p className="text-gray-600 mb-4">
              Akron uses connection URLs to specify database type and location:
            </p>
            <PreCodeBlock>
{`# SQLite (file-based)
db = Akron("sqlite:///myapp.db")

# SQLite (in-memory)
db = Akron("sqlite:///:memory:")

# MySQL
db = Akron("mysql://user:password@localhost:3306/mydb")

# PostgreSQL
db = Akron("postgres://user:password@localhost:5432/mydb")

# MongoDB
db = Akron("mongodb://localhost:27017/mydb")`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📋 Schema Definition</h3>
            <p className="text-gray-600 mb-4">
              Define table schemas using simple type mappings:
            </p>
            <PreCodeBlock>
{`# Basic schema
schema = {
    "id": "int",           # Integer primary key
    "name": "str",         # String/VARCHAR
    "price": "float",      # Floating point number
    "active": "bool"       # Boolean
}

# With foreign keys
schema = {
    "id": "int",
    "user_id": "int->users.id",  # Foreign key to users.id
    "category_id": "int->categories.id",
    "title": "str",
    "content": "str"
}`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔄 CRUD Operations</h3>
            <p className="text-gray-600 mb-4">
              Consistent API for Create, Read, Update, Delete across all databases:
            </p>
            <PreCodeBlock>
{`# Create table
db.create_table("products", {"id": "int", "name": "str", "price": "float"})

# Insert data
product_id = db.insert("products", {"name": "Laptop", "price": 999.99})

# Read data
all_products = db.find("products")
expensive_products = db.find("products", {"price": 999.99})

# Update data
db.update("products", {"id": product_id}, {"price": 899.99})

# Delete data
db.delete("products", {"id": product_id})`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🛡️ Type Safety with Pydantic</h3>
            <p className="text-gray-600 mb-4">
              Use Pydantic models for automatic validation and type safety:
            </p>
            <PreCodeBlock>
{`from pydantic import BaseModel, EmailStr
from akron.models import ModelMixin

class User(BaseModel, ModelMixin):
    id: int
    username: str
    email: EmailStr  # Automatic email validation
    age: int
    
    class Config:
        # Add custom validation
        @validator('age')
        def validate_age(cls, v):
            if v < 0 or v > 150:
                raise ValueError('Age must be between 0 and 150')
            return v

# Usage with automatic validation
try:
    user = User(
        id=1,
        username="alice",
        email="invalid-email",  # This will raise ValidationError
        age=25
    )
    User.insert(db, user)
except ValidationError as e:
    print(f"Validation failed: {e}")`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Working with Different Databases</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">MySQL Example</h3>
        <p className="text-gray-600 mb-4">
          Connect to MySQL with the same API:
        </p>

        <PreCodeBlock title="MySQL Setup">
{`# Make sure MySQL is running and create a database first:
# CREATE DATABASE myapp;

from akron import Akron

# Connect to MySQL
db = Akron("mysql://username:password@localhost:3306/myapp")

# Same API works across all databases
db.create_table("customers", {
    "id": "int",
    "name": "str", 
    "email": "str",
    "created_at": "str"
})

customer_id = db.insert("customers", {
    "name": "John Doe",
    "email": "john@example.com", 
    "created_at": "2024-01-15"
})

customers = db.find("customers", {"email": "john@example.com"})
print(f"Found customer: {customers[0]}")

db.close()`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">MongoDB Example</h3>
        <p className="text-gray-600 mb-4">
          MongoDB works seamlessly with the same API:
        </p>

        <PreCodeBlock title="MongoDB Setup">
{`# Make sure MongoDB is running

from akron import Akron

# Connect to MongoDB
db = Akron("mongodb://localhost:27017/myapp")

# MongoDB is schemaless, but Akron provides structure
db.create_table("orders", {
    "id": "int",
    "customer_id": "int",
    "items": "str",  # JSON string in MongoDB
    "total": "float",
    "status": "str"
})

order_id = db.insert("orders", {
    "customer_id": 1,
    "items": '["laptop", "mouse"]',
    "total": 1099.99,
    "status": "pending"
})

pending_orders = db.find("orders", {"status": "pending"})
print(f"Pending orders: {len(pending_orders)}")

db.close()`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔄 Connection Management</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use context managers for automatic connection cleanup</li>
              <li>Always close connections when done</li>
              <li>Consider connection pooling for production applications</li>
            </ul>
            <PreCodeBlock>
{`# Recommended: Use with statement
with Akron("sqlite:///app.db") as db:
    result = db.find("users", {"active": True})
    # Connection automatically closed`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🛡️ Data Validation</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use Pydantic models for type safety and validation</li>
              <li>Define clear schemas with appropriate types</li>
              <li>Handle validation errors gracefully</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 Performance</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use specific filters in queries to avoid scanning entire tables</li>
              <li>Create indexes on frequently queried columns (database-specific)</li>
              <li>Batch operations when inserting multiple records</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🧪 Development</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use SQLite for development and testing</li>
              <li>Keep database schemas in version control</li>
              <li>Use migrations for schema changes</li>
              <li>Test with sample data using the seed command</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          Now that you&apos;ve got the basics, explore advanced features:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">API Reference</h3>
            <p className="text-gray-600 text-sm mb-2">Detailed documentation for all methods</p>
            <a href="/docs/api/constructor" className="text-blue-600 hover:text-blue-800 text-sm">
              → explore API methods
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CLI Tools</h3>
            <p className="text-gray-600 text-sm mb-2">Command-line interface for database management</p>
            <a href="/docs/cli" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn CLI commands
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Database Support</h3>
            <p className="text-gray-600 text-sm mb-2">Database-specific features and configurations</p>
            <a href="/docs/database-support" className="text-blue-600 hover:text-blue-800 text-sm">
              → view database guides
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
