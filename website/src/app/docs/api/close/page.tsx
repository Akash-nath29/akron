import { DocsLayout, PreCodeBlock, OutputBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function ClosePage() {
  return (
    <DocsLayout 
      title="close()" 
      description="Properly close database connections and free resources across all supported database backends."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>close()</code> method properly closes database connections and releases associated 
          resources. This is essential for preventing connection leaks, especially in long-running 
          applications or when working with connection-limited databases.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Signature</h3>
          <CodeBlock>{`close() -> None`}</CodeBlock>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">📝 Important Notes</h3>
          <ul className="text-yellow-800 space-y-1">
            <li>• Calling close() makes the Akron instance unusable for further database operations</li>
            <li>• Always close connections when done, especially in production applications</li>
            <li>• Use context managers (with statements) for automatic connection management</li>
            <li>• Close operations are idempotent - calling close() multiple times is safe</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600">
            The <code>close()</code> method takes no parameters.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 mb-2"><strong>Type:</strong> None</p>
          <p className="text-gray-600">
            The method does not return a value. It performs cleanup operations and closes 
            the database connection silently.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Connection Management</h3>
        
        <PreCodeBlock title="Manual Connection Closing">
{`from akron import Akron

# Create database connection
db = Akron("sqlite:///example.db")

# Perform database operations
db.create_table("users", {
    "id": "int",
    "username": "str",
    "email": "str"
})

user_id = db.insert("users", {"username": "alice", "email": "alice@example.com"})
print(f"Created user with ID: {user_id}")

# Query the data
users = db.find("users")
print(f"Found {len(users)} user(s)")

# Always close the connection when done
db.close()
print("Database connection closed")`}
        </PreCodeBlock>

        <OutputBlock>
{`Created user with ID: 1
Found 1 user(s)
Database connection closed`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Context Manager (Recommended)</h3>
        <p className="text-gray-600 mb-4">
          Use the <code>with</code> statement for automatic connection management:
        </p>

        <PreCodeBlock title="Automatic Connection Management">
{`from akron import Akron

# Context manager automatically handles opening and closing
with Akron("sqlite:///example.db") as db:
    # Create and populate table
    db.create_table("products", {
        "id": "int",
        "name": "str",
        "price": "float",
        "category": "str"
    })
    
    # Insert some products
    products = [
        {"name": "Laptop", "price": 999.99, "category": "Electronics"},
        {"name": "Book", "price": 19.99, "category": "Books"},
        {"name": "Coffee Mug", "price": 12.99, "category": "Kitchen"}
    ]
    
    for product in products:
        product_id = db.insert("products", product)
        print(f"Added {product['name']} with ID: {product_id}")
    
    # Query results
    all_products = db.find("products")
    print(f"\\nTotal products in database: {len(all_products)}")
    
    # Connection automatically closed when exiting the with block
    
print("\\nConnection closed automatically via context manager")`}
        </PreCodeBlock>

        <OutputBlock>
{`Added Laptop with ID: 1
Added Book with ID: 2
Added Coffee Mug with ID: 3

Total products in database: 3

Connection closed automatically via context manager`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Multiple Database Connections</h3>
        <p className="text-gray-600 mb-4">
          Manage multiple database connections properly:
        </p>

        <PreCodeBlock title="Managing Multiple Connections">
{`from akron import Akron

def sync_data_between_databases():
    # Open connections to both databases
    source_db = Akron("sqlite:///source.db")
    target_db = Akron("sqlite:///target.db")
    
    try:
        # Setup source database
        source_db.create_table("users", {
            "id": "int",
            "username": "str",
            "email": "str",
            "created_date": "str"
        })
        
        # Add sample data
        source_db.insert("users", {"username": "john", "email": "john@example.com", "created_date": "2024-01-01"})
        source_db.insert("users", {"username": "jane", "email": "jane@example.com", "created_date": "2024-01-02"})
        
        # Setup target database with same structure
        target_db.create_table("users", {
            "id": "int",
            "username": "str",
            "email": "str",
            "created_date": "str",
            "synced_date": "str"
        })
        
        # Sync data from source to target
        users = source_db.find("users")
        synced_count = 0
        
        for user in users:
            # Add sync timestamp
            user["synced_date"] = "2024-01-15"
            target_db.insert("users", user)
            synced_count += 1
        
        print(f"Synced {synced_count} users from source to target database")
        
        # Verify sync
        target_users = target_db.find("users")
        print(f"Target database now has {len(target_users)} users")
        
    finally:
        # Always close both connections
        source_db.close()
        target_db.close()
        print("\\nBoth database connections closed")

# Run the sync operation
sync_data_between_databases()`}
        </PreCodeBlock>

        <OutputBlock>
{`Synced 2 users from source to target database
Target database now has 2 users

Both database connections closed`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Error Handling with Proper Cleanup</h3>
        <p className="text-gray-600 mb-4">
          Ensure connections are closed even when errors occur:
        </p>

        <PreCodeBlock title="Error-Safe Connection Management">
{`from akron import Akron
from akron.exceptions import AkronError

def safe_database_operation():
    db = None
    try:
        db = Akron("sqlite:///example.db")
        
        # Potentially risky operations
        db.create_table("orders", {
            "id": "int",
            "customer_id": "int",
            "total": "float",
            "status": "str"
        })
        
        # This might fail due to constraints or validation
        db.insert("orders", {"customer_id": 1, "total": 150.00, "status": "pending"})
        
        # Simulate an error condition
        result = db.find("orders", {"customer_id": 1})
        if len(result) > 0:
            print(f"Order created successfully: ID {result[0]['id']}")
        
        return True
        
    except AkronError as e:
        print(f"Database operation failed: {e}")
        return False
        
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False
        
    finally:
        # Always close the connection, even if an error occurred
        if db is not None:
            db.close()
            print("Database connection closed in finally block")

# Alternative: Using context manager for automatic cleanup
def safe_database_operation_with_context():
    try:
        with Akron("sqlite:///example.db") as db:
            db.create_table("customers", {
                "id": "int",
                "name": "str",
                "email": "str"
            })
            
            customer_id = db.insert("customers", {"name": "Alice Smith", "email": "alice@example.com"})
            print(f"Customer created with ID: {customer_id}")
            
            # Even if an error occurs here, connection will be closed
            customers = db.find("customers")
            print(f"Found {len(customers)} customer(s)")
            
    except AkronError as e:
        print(f"Database error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    
    print("Connection automatically closed by context manager")

# Run both examples
print("=== Manual cleanup example ===")
safe_database_operation()

print("\\n=== Context manager example ===")
safe_database_operation_with_context()`}
        </PreCodeBlock>

        <OutputBlock>
{`=== Manual cleanup example ===
Order created successfully: ID 1
Database connection closed in finally block

=== Context manager example ===
Customer created with ID: 1
Found 1 customer(s)
Connection automatically closed by context manager`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database-Specific Behavior</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🗄️ SQLite</h3>
            <p className="text-gray-600 mb-2">
              Closes the SQLite connection and commits any pending transactions:
            </p>
            <PreCodeBlock>
{`# SQLite close operation
try:
    self.connection.close()
except sqlite3.Error:
    pass  # Ignore errors during close`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐬 MySQL</h3>
            <p className="text-gray-600 mb-2">
              Closes MySQL connection and releases server resources:
            </p>
            <PreCodeBlock>
{`# MySQL close operation
try:
    if self.connection.is_connected():
        self.connection.close()
except mysql.connector.Error:
    pass  # Ignore errors during close`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐘 PostgreSQL</h3>
            <p className="text-gray-600 mb-2">
              Closes PostgreSQL connection and returns it to the connection pool:
            </p>
            <PreCodeBlock>
{`# PostgreSQL close operation
try:
    self.connection.close()
except psycopg2.Error:
    pass  # Ignore errors during close`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🍃 MongoDB</h3>
            <p className="text-gray-600 mb-2">
              Closes MongoDB client connection:
            </p>
            <PreCodeBlock>
{`# MongoDB close operation
try:
    self.client.close()
except pymongo.errors.PyMongoError:
    pass  # Ignore errors during close`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔄 Automatic Management</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Prefer context managers (with statements) for automatic connection cleanup</li>
              <li>Use try/finally blocks when manual management is necessary</li>
              <li>Close connections as soon as you&apos;re done with database operations</li>
              <li>Never leave connections open indefinitely in long-running applications</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🛡️ Error Handling</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Always close connections in finally blocks or exception handlers</li>
              <li>Don&apos;t let exceptions prevent proper connection cleanup</li>
              <li>Handle close() errors gracefully (connection might already be closed)</li>
              <li>Log connection management events for debugging</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Resource Management</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Monitor connection counts in production applications</li>
              <li>Implement connection pooling for high-traffic applications</li>
              <li>Set appropriate connection timeouts</li>
              <li>Consider using connection pools for better resource utilization</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🧪 Testing</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Test connection cleanup in unit tests</li>
              <li>Verify that connections are properly closed after operations</li>
              <li>Test error scenarios to ensure cleanup still occurs</li>
              <li>Monitor for connection leaks in integration tests</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Patterns</h2>
        
        <PreCodeBlock title="Connection Management Patterns">
{`# Pattern 1: Simple operation with context manager (recommended)
with Akron("sqlite:///app.db") as db:
    result = db.find("users", {"active": True})
    return result
# Connection automatically closed

# Pattern 2: Manual management with proper cleanup
def process_data(db_config):
    db = None
    try:
        db = Akron(db_config)
        # ... database operations ...
        return results
    finally:
        if db:
            db.close()

# Pattern 3: Reusable database service class
class DatabaseService:
    def __init__(self, db_config):
        self.db_config = db_config
        self.db = None
    
    def connect(self):
        if self.db is None:
            self.db = Akron(self.db_config)
    
    def disconnect(self):
        if self.db:
            self.db.close()
            self.db = None
    
    def __enter__(self):
        self.connect()
        return self.db
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.disconnect()

# Usage:
with DatabaseService("sqlite:///app.db") as db:
    users = db.find("users")

# Pattern 4: Multiple operations with single connection
def batch_operations():
    with Akron("sqlite:///batch.db") as db:
        # Multiple operations using same connection
        db.create_table("logs", {"id": "int", "message": "str", "timestamp": "str"})
        
        for i in range(100):
            db.insert("logs", {
                "message": f"Batch operation {i}",
                "timestamp": "2024-01-15"
            })
        
        # All operations complete before connection closes
        return db.find("logs")

# Pattern 5: Connection state checking
def safe_operation(db):
    try:
        # Check if connection is still valid
        db.find("users", limit=1)  # Quick test query
        
        # Proceed with actual operation
        return db.find("users", {"active": True})
        
    except AkronError:
        # Connection might be closed or invalid
        print("Database connection is not available")
        return []`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Integration Examples</h2>
        
        <PreCodeBlock title="Web Application Pattern">
{`# Flask application with proper connection management
from flask import Flask, request, jsonify
from akron import Akron

app = Flask(__name__)
DATABASE_URL = "sqlite:///app.db"

@app.route("/users", methods=["GET"])
def get_users():
    with Akron(DATABASE_URL) as db:
        users = db.find("users", {"active": True})
        return jsonify(users)

@app.route("/users", methods=["POST"])
def create_user():
    user_data = request.json
    
    with Akron(DATABASE_URL) as db:
        user_id = db.insert("users", user_data)
        created_user = db.find("users", {"id": user_id})[0]
        return jsonify(created_user), 201

# Background task with connection management
import threading

def background_cleanup():
    with Akron(DATABASE_URL) as db:
        # Clean up old data
        deleted = db.delete("logs", {"status": "processed"})
        print(f"Cleaned up {deleted} processed log entries")

# Schedule cleanup to run periodically
cleanup_thread = threading.Thread(target=background_cleanup)
cleanup_thread.daemon = True
cleanup_thread.start()`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          Now that you understand connection management, explore:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started Guide</h3>
            <p className="text-gray-600 text-sm mb-2">Learn the basics of setting up and using Akron ORM</p>
            <a href="/docs/getting-started" className="text-blue-600 hover:text-blue-800 text-sm">
              → view getting started guide
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Database Support</h3>
            <p className="text-gray-600 text-sm mb-2">Learn about database-specific features and configurations</p>
            <a href="/docs/database-support" className="text-blue-600 hover:text-blue-800 text-sm">
              → view database support
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
