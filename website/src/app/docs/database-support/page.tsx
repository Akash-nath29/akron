import { DocsLayout, PreCodeBlock } from "../../../components/DocsLayout";

export default function DatabaseSupportPage() {
  return (
    <DocsLayout 
      title="Database Support" 
      description="Comprehensive guide to database-specific features, configurations, and best practices for SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          Akron ORM provides unified access to multiple database systems while respecting their unique 
          characteristics. This guide covers database-specific features, configuration options, and 
          optimization strategies for each supported backend.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">🗄️</div>
            <h3 className="font-semibold">SQLite</h3>
            <p className="text-sm text-gray-600">File-based</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">🐬</div>
            <h3 className="font-semibold">MySQL</h3>
            <p className="text-sm text-gray-600">Relational</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">🐘</div>
            <h3 className="font-semibold">PostgreSQL</h3>
            <p className="text-sm text-gray-600">Advanced SQL</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">🍃</div>
            <h3 className="font-semibold">MongoDB</h3>
            <p className="text-sm text-gray-600">Document</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🗄️ SQLite</h2>
        <p className="text-gray-600 mb-4">
          SQLite is perfect for development, testing, and small to medium applications. It requires no 
          separate server process and stores data in a single file.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection Options</h3>
        <PreCodeBlock title="SQLite Connection Examples">
{`from akron import Akron

# File-based database (recommended for production)
db = Akron("sqlite:///./myapp.db")        # Relative path
db = Akron("sqlite:////tmp/app.db")       # Absolute path
db = Akron("sqlite:///C:/data/app.db")    # Windows path

# In-memory database (perfect for testing)
db = Akron("sqlite:///:memory:")

# Context manager for automatic cleanup
with Akron("sqlite:///app.db") as db:
    # Database operations here
    pass  # Connection closed automatically`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Features & Limitations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">✅ Strengths</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• Zero configuration required</li>
              <li>• Single file storage</li>
              <li>• ACID transactions</li>
              <li>• Cross-platform compatibility</li>
              <li>• Excellent for development/testing</li>
              <li>• Built into Python standard library</li>
            </ul>
          </div>
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Considerations</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Limited concurrent write access</li>
              <li>• No user management/authentication</li>
              <li>• File locking can be an issue</li>
              <li>• Less suitable for high-traffic applications</li>
              <li>• No network access (local only)</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">SQLite-Specific Examples</h3>
        <PreCodeBlock title="SQLite Best Practices">
{`# Enable WAL mode for better concurrency (optional)
import sqlite3

# Manual SQLite optimizations (if needed)
def optimize_sqlite_connection(db_path):
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL") 
    conn.execute("PRAGMA cache_size=1000")
    conn.execute("PRAGMA temp_store=MEMORY")
    conn.close()

# Akron usage remains the same
db = Akron("sqlite:///optimized.db")

# Create indexes for better performance
db.raw_sql("CREATE INDEX IF NOT EXISTS idx_user_email ON users(email)")
db.raw_sql("CREATE INDEX IF NOT EXISTS idx_post_user_id ON posts(user_id)")

# Batch inserts are efficient in SQLite
users_data = [
    {"username": f"user{i}", "email": f"user{i}@example.com"}
    for i in range(1000)
]

for user_data in users_data:
    db.insert("users", user_data)`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🐬 MySQL</h2>
        <p className="text-gray-600 mb-4">
          MySQL is a popular relational database perfect for web applications and medium to large-scale 
          projects requiring robust data integrity and concurrent access.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection & Setup</h3>
        <PreCodeBlock title="MySQL Configuration">
{`# Install MySQL connector
# pip install mysql-connector-python

from akron import Akron

# Basic connection
db = Akron("mysql://username:password@localhost:3306/database_name")

# Connection with options
db = Akron("mysql://user:pass@host:3306/db?charset=utf8mb4&autocommit=true")

# SSL connection (production recommended)
db = Akron("mysql://user:pass@host:3306/db?ssl_disabled=false")

# Create database first (using MySQL CLI or admin tool):
# CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Example connection with error handling
try:
    db = Akron("mysql://user:password@localhost:3306/myapp")
    print("Connected to MySQL successfully")
    
    # Test connection
    db.raw_sql("SELECT VERSION() as version")
    
except Exception as e:
    print(f"MySQL connection failed: {e}")
    # Handle connection errors`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">MySQL-Specific Features</h3>
        <PreCodeBlock title="MySQL Optimizations">
{`# Use AUTO_INCREMENT for primary keys
db.create_table("users", {
    "id": "int",  # Will become AUTO_INCREMENT PRIMARY KEY
    "username": "str",
    "email": "str",
    "created_at": "str"
})

# MySQL supports larger VARCHAR sizes
db.create_table("articles", {
    "id": "int",
    "title": "str",     # VARCHAR(255) by default
    "content": "str",   # Can store large text
    "author_id": "int->users.id"
})

# Leverage MySQL's JSON support (MySQL 5.7+)
db.create_table("user_preferences", {
    "id": "int",
    "user_id": "int->users.id", 
    "preferences": "str"  # Store JSON as string
})

# Insert JSON data
db.insert("user_preferences", {
    "user_id": 1,
    "preferences": '{"theme": "dark", "language": "en", "notifications": true}'
})

# MySQL-specific indexing
db.raw_sql("CREATE INDEX idx_email ON users(email)")
db.raw_sql("CREATE INDEX idx_username ON users(username)")
db.raw_sql("CREATE INDEX idx_created_at ON users(created_at)")

# Use EXPLAIN to optimize queries
results = db.raw_sql("EXPLAIN SELECT * FROM users WHERE email = 'test@example.com'")
print("Query execution plan:", results)`}
        </PreCodeBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">✅ MySQL Strengths</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• Excellent performance for read-heavy workloads</li>
              <li>• Strong community and ecosystem</li>
              <li>• Good replication and clustering options</li>
              <li>• ACID compliance</li>
              <li>• JSON support (5.7+)</li>
              <li>• Mature and stable</li>
            </ul>
          </div>
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Considerations</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Requires separate server setup</li>
              <li>• Case sensitivity can vary by platform</li>
              <li>• Some advanced SQL features missing</li>
              <li>• License considerations for commercial use</li>
              <li>• Memory usage can be high</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🐘 PostgreSQL</h2>
        <p className="text-gray-600 mb-4">
          PostgreSQL is an advanced relational database with extensive SQL compliance, custom data types, 
          and powerful features for complex applications.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection & Setup</h3>
        <PreCodeBlock title="PostgreSQL Configuration">
{`# Install PostgreSQL adapter
# pip install psycopg2-binary

from akron import Akron

# Standard connection
db = Akron("postgres://username:password@localhost:5432/database_name")

# Connection with schema specification
db = Akron("postgres://user:pass@host:5432/db?sslmode=require")

# Create database first (using psql or admin tool):
# CREATE DATABASE myapp WITH ENCODING 'UTF8';

# Advanced connection example
import os

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": os.getenv("DB_PORT", "5432"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME", "myapp")
}

connection_url = f"postgres://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}"

try:
    db = Akron(connection_url)
    print("Connected to PostgreSQL successfully")
except Exception as e:
    print(f"PostgreSQL connection failed: {e}")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">PostgreSQL Advanced Features</h3>
        <PreCodeBlock title="PostgreSQL Capabilities">
{`# PostgreSQL supports advanced data types and features
db.create_table("users", {
    "id": "int",        # SERIAL PRIMARY KEY in PostgreSQL
    "username": "str",  # VARCHAR
    "email": "str",
    "metadata": "str",  # Can store JSON
    "created_at": "str" # TIMESTAMP
})

# Leverage PostgreSQL's JSON/JSONB support
db.create_table("user_profiles", {
    "id": "int",
    "user_id": "int->users.id",
    "profile_data": "str"  # Store as JSON string
})

# Insert complex JSON data
profile_data = {
    "personal": {
        "firstName": "John",
        "lastName": "Doe",
        "age": 30
    },
    "preferences": {
        "theme": "dark",
        "language": "en",
        "notifications": {
            "email": True,
            "push": False
        }
    }
}

db.insert("user_profiles", {
    "user_id": 1,
    "profile_data": json.dumps(profile_data)
})

# PostgreSQL indexing strategies
db.raw_sql("CREATE INDEX idx_users_email ON users(email)")
db.raw_sql("CREATE INDEX idx_users_username ON users(username)")

# Use PostgreSQL's full-text search capabilities
db.raw_sql("CREATE INDEX idx_posts_content_fts ON posts USING gin(to_tsvector('english', content))")

# Advanced PostgreSQL queries
search_results = db.raw_sql("""
    SELECT id, title, content 
    FROM posts 
    WHERE to_tsvector('english', content) @@ plainto_tsquery('database optimization')
""")

# Use PostgreSQL's EXPLAIN ANALYZE for performance tuning
execution_plan = db.raw_sql("EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com'")`}
        </PreCodeBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">✅ PostgreSQL Strengths</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• Advanced SQL compliance</li>
              <li>• Excellent JSON/JSONB support</li>
              <li>• Custom data types and functions</li>
              <li>• Full-text search capabilities</li>
              <li>• Strong consistency and ACID compliance</li>
              <li>• Extensible with plugins</li>
              <li>• Open source with active development</li>
            </ul>
          </div>
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Considerations</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• More complex setup than SQLite</li>
              <li>• Higher memory usage</li>
              <li>• Slower for simple read operations vs MySQL</li>
              <li>• More configuration options to optimize</li>
              <li>• Case-sensitive by default</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🍃 MongoDB</h2>
        <p className="text-gray-600 mb-4">
          MongoDB is a document-based NoSQL database perfect for applications requiring flexible schemas, 
          horizontal scaling, and rapid development cycles.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection & Setup</h3>
        <PreCodeBlock title="MongoDB Configuration">
{`# Install MongoDB driver
# pip install pymongo

from akron import Akron
import json

# Basic MongoDB connection
db = Akron("mongodb://localhost:27017/myapp")

# MongoDB with authentication
db = Akron("mongodb://username:password@localhost:27017/myapp")

# MongoDB Atlas (cloud) connection
db = Akron("mongodb+srv://user:pass@cluster.mongodb.net/myapp")

# Connection with options
db = Akron("mongodb://localhost:27017/myapp?authSource=admin&ssl=true")

# MongoDB connection with error handling
try:
    db = Akron("mongodb://localhost:27017/myapp")
    
    # Test connection
    db.raw_query("users", {})  # Simple find operation
    print("Connected to MongoDB successfully")
    
except Exception as e:
    print(f"MongoDB connection failed: {e}")
    print("Make sure MongoDB is running on localhost:27017")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">MongoDB Document Operations</h3>
        <PreCodeBlock title="Working with Documents">
{`# MongoDB is schemaless, but Akron provides structure
db.create_table("users", {
    "id": "int",
    "username": "str",
    "email": "str",
    "profile": "str"  # JSON document as string
})

# Insert document with nested structure
user_document = {
    "username": "alice",
    "email": "alice@example.com",
    "profile": json.dumps({
        "personal": {
            "firstName": "Alice",
            "lastName": "Smith",
            "age": 28,
            "location": {
                "city": "San Francisco",
                "country": "USA"
            }
        },
        "preferences": {
            "theme": "dark",
            "notifications": True,
            "tags": ["python", "database", "web"]
        },
        "social": {
            "twitter": "@alice_dev",
            "github": "alice-smith"
        }
    })
}

user_id = db.insert("users", user_document)

# MongoDB excels at flexible document structures
db.create_table("posts", {
    "id": "int",
    "author_id": "int",
    "title": "str",
    "content": "str",
    "metadata": "str"  # Store rich metadata as JSON
})

# Insert post with rich metadata
post_data = {
    "author_id": user_id,
    "title": "Getting Started with MongoDB",
    "content": "MongoDB is a powerful document database...",
    "metadata": json.dumps({
        "tags": ["mongodb", "database", "nosql"],
        "readTime": 5,
        "difficulty": "beginner",
        "lastModified": "2024-01-15T10:30:00Z",
        "views": 0,
        "likes": 0,
        "comments": []
    })
}

db.insert("posts", post_data)

# Query documents (Akron translates to MongoDB queries)
python_posts = db.find("posts")  # Gets all posts
users_from_sf = db.find("users", {"username": "alice"})

# MongoDB aggregation through raw queries
aggregation_pipeline = [
    {"$match": {"author_id": user_id}},
    {"$group": {"_id": "$author_id", "post_count": {"$sum": 1}}}
]

author_stats = db.raw_aggregation("posts", aggregation_pipeline)`}
        </PreCodeBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">✅ MongoDB Strengths</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• Flexible, schema-less documents</li>
              <li>• Excellent horizontal scaling</li>
              <li>• Rich query language and aggregation</li>
              <li>• Built-in sharding and replication</li>
              <li>• Great for rapid prototyping</li>
              <li>• JSON-native storage</li>
              <li>• High performance for read/write operations</li>
            </ul>
          </div>
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Considerations</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• No ACID transactions across documents (pre 4.0)</li>
              <li>• Eventual consistency model</li>
              <li>• No foreign key constraints</li>
              <li>• Can lead to data duplication</li>
              <li>• Memory usage can be high</li>
              <li>• Complex joins are challenging</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Feature</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">SQLite</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">MySQL</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">PostgreSQL</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">MongoDB</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b">
                <td className="px-4 py-3 text-sm text-gray-900">Setup Complexity</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">Very Low</td>
                <td className="px-4 py-3 text-center text-sm text-yellow-600">Medium</td>
                <td className="px-4 py-3 text-center text-sm text-yellow-600">Medium</td>
                <td className="px-4 py-3 text-center text-sm text-yellow-600">Medium</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm text-gray-900">Read Performance</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">High</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">Very High</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">High</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">Very High</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm text-gray-900">Write Performance</td>
                <td className="px-4 py-3 text-center text-sm text-yellow-600">Medium</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">High</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">High</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">Very High</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm text-gray-900">Concurrent Users</td>
                <td className="px-4 py-3 text-center text-sm text-red-600">Low</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">High</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">High</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">Very High</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm text-gray-900">ACID Compliance</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">Yes</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">Yes</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">Yes</td>
                <td className="px-4 py-3 text-center text-sm text-yellow-600">Limited</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm text-gray-900">Horizontal Scaling</td>
                <td className="px-4 py-3 text-center text-sm text-red-600">No</td>
                <td className="px-4 py-3 text-center text-sm text-yellow-600">Limited</td>
                <td className="px-4 py-3 text-center text-sm text-yellow-600">Limited</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">Excellent</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Schema Flexibility</td>
                <td className="px-4 py-3 text-center text-sm text-red-600">Low</td>
                <td className="px-4 py-3 text-center text-sm text-red-600">Low</td>
                <td className="px-4 py-3 text-center text-sm text-yellow-600">Medium</td>
                <td className="px-4 py-3 text-center text-sm text-green-600">High</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choosing the Right Database</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🗄️ Choose SQLite When:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Building prototypes or small applications</li>
              <li>Need zero-configuration database</li>
              <li>Single-user or low-concurrency scenarios</li>
              <li>Desktop applications or mobile apps</li>
              <li>Development and testing environments</li>
              <li>Read-heavy applications with infrequent writes</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐬 Choose MySQL When:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Building web applications with high read loads</li>
              <li>Need proven reliability and performance</li>
              <li>Working with existing MySQL infrastructure</li>
              <li>Require good replication and backup tools</li>
              <li>Team has MySQL expertise</li>
              <li>Budget-conscious projects (open source)</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐘 Choose PostgreSQL When:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Need advanced SQL features and compliance</li>
              <li>Working with complex data relationships</li>
              <li>Require custom data types or functions</li>
              <li>Building data-intensive applications</li>
              <li>Need full-text search capabilities</li>
              <li>Prioritize data integrity and consistency</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🍃 Choose MongoDB When:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Schema requirements change frequently</li>
              <li>Need to scale horizontally across servers</li>
              <li>Working with JSON/document-based data</li>
              <li>Building real-time applications</li>
              <li>Rapid prototyping and development</li>
              <li>Content management or catalog systems</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Migration Between Databases</h2>
        <p className="text-gray-600 mb-4">
          Akron&apos;s unified API makes it easier to migrate between different database systems:
        </p>

        <PreCodeBlock title="Database Migration Example">
{`# Original SQLite database
source_db = Akron("sqlite:///source.db")

# Target PostgreSQL database  
target_db = Akron("postgres://user:pass@localhost:5432/target_db")

def migrate_data(table_name, schema):
    # Create table in target database
    target_db.create_table(table_name, schema)
    
    # Extract all data from source
    data = source_db.find(table_name)
    
    # Insert into target database
    for record in data:
        target_db.insert(table_name, record)
    
    print(f"Migrated {len(data)} records from {table_name}")

# Define schemas for migration
schemas = {
    "users": {"id": "int", "username": "str", "email": "str"},
    "posts": {"id": "int", "user_id": "int->users.id", "title": "str", "content": "str"}
}

# Migrate each table
for table_name, schema in schemas.items():
    migrate_data(table_name, schema)

# Close connections
source_db.close()
target_db.close()

print("Migration completed successfully!")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          Now that you understand database-specific features:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">API Reference</h3>
            <p className="text-gray-600 text-sm mb-2">Learn all available methods and their usage</p>
            <a href="/docs/api/constructor" className="text-blue-600 hover:text-blue-800 text-sm">
              → explore API methods
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CLI Tools</h3>
            <p className="text-gray-600 text-sm mb-2">Use command-line tools for database management</p>
            <a href="/docs/cli" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn CLI commands
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
            <p className="text-gray-600 text-sm mb-2">Quick start guide with practical examples</p>
            <a href="/docs/getting-started" className="text-blue-600 hover:text-blue-800 text-sm">
              → view quick start guide
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
