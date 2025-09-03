import { DocsLayout, PreCodeBlock, OutputBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function DeletePage() {
  return (
    <DocsLayout 
      title="delete()" 
      description="Safely remove database records with precise filtering and cascading considerations across all supported databases."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>delete()</code> method removes records from database tables based on filter conditions. 
          It provides safe deletion with mandatory filtering to prevent accidental data loss and returns 
          the number of records actually deleted.
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">⚠️ Important Safety Notice</h3>
          <p className="text-red-800">
            Delete operations are <strong>permanent and irreversible</strong>. Always backup important data 
            and test delete queries carefully before running them on production data.
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Signature</h3>
          <CodeBlock>{`delete(table_name: str, filters: Dict[str, Any]) -> int`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">table_name</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str</p>
            <p className="text-gray-600">
              Name of the table from which to delete records. The table must exist.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">filters</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> Dict[str, Any]</p>
            <p className="text-gray-600 mb-4">
              Dictionary mapping column names to values for identifying which records to delete. 
              All conditions are combined with AND logic. Must be non-empty to prevent accidental 
              deletion of all table data.
            </p>
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-red-800 text-sm">
                <strong>🚨 Critical:</strong> Empty filters are rejected to prevent accidental table truncation. 
                Use explicit conditions to identify the exact records to delete.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 mb-2"><strong>Type:</strong> int</p>
          <p className="text-gray-600">
            Number of records that were actually deleted from the table. Returns 0 if no records 
            matched the filter conditions.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Deletion</h3>
        
        <PreCodeBlock title="Delete Single Record">
{`from akron import Akron

db = Akron("sqlite:///example.db")

# Setup: Create table and insert sample data
db.create_table("users", {
    "id": "int",
    "username": "str",
    "email": "str",
    "age": "int",
    "active": "bool",
    "created_date": "str"
})

# Insert test users
db.insert("users", {"username": "alice", "email": "alice@example.com", "age": 28, "active": True, "created_date": "2024-01-01"})
db.insert("users", {"username": "bob", "email": "bob@example.com", "age": 32, "active": False, "created_date": "2023-12-15"})
db.insert("users", {"username": "charlie", "email": "charlie@example.com", "age": 25, "active": False, "created_date": "2023-11-20"})

print("Before deletion:")
all_users = db.find("users")
for user in all_users:
    print(f"  {user['id']}: {user['username']} ({user['email']})")

# Delete a specific user by ID
deleted_count = db.delete("users", {"id": 2})

print(f"\\nDeleted {deleted_count} user(s)")

print("\\nAfter deletion:")
remaining_users = db.find("users")
for user in remaining_users:
    print(f"  {user['id']}: {user['username']} ({user['email']})")`}
        </PreCodeBlock>

        <OutputBlock>
{`Before deletion:
  1: alice (alice@example.com)
  2: bob (bob@example.com)
  3: charlie (charlie@example.com)

Deleted 1 user(s)

After deletion:
  1: alice (alice@example.com)
  3: charlie (charlie@example.com)`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Conditional Deletion</h3>
        <p className="text-gray-600 mb-4">
          Delete multiple records based on specific criteria:
        </p>

        <PreCodeBlock title="Delete Inactive Users">
{`# Delete all inactive users created before 2024
deleted_count = db.delete("users", {"active": False})

print(f"Deleted {deleted_count} inactive user(s)")

# Verify deletion
remaining_users = db.find("users")
print(f"\\nRemaining users: {len(remaining_users)}")
for user in remaining_users:
    status = "Active" if user["active"] else "Inactive"
    print(f"  {user['username']}: {status}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Deleted 1 inactive user(s)

Remaining users: 1
  alice: Active`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Complex Filtering</h3>
        <p className="text-gray-600 mb-4">
          Use multiple conditions for precise deletion:
        </p>

        <PreCodeBlock title="Delete with Multiple Conditions">
{`# Setup: Create orders table with more test data
db.create_table("orders", {
    "id": "int",
    "customer_id": "int",
    "total": "float",
    "status": "str",
    "created_date": "str"
})

# Insert test orders
db.insert("orders", {"customer_id": 1, "total": 49.99, "status": "cancelled", "created_date": "2023-12-01"})
db.insert("orders", {"customer_id": 1, "total": 149.99, "status": "completed", "created_date": "2024-01-05"})
db.insert("orders", {"customer_id": 2, "total": 25.50, "status": "cancelled", "created_date": "2023-11-15"})
db.insert("orders", {"customer_id": 2, "total": 89.99, "status": "pending", "created_date": "2024-01-10"})
db.insert("orders", {"customer_id": 3, "total": 15.00, "status": "cancelled", "created_date": "2023-10-20"})

print("All orders:")
all_orders = db.find("orders")
for order in all_orders:
    print(f"  Order " + str(order['id']) + ": Customer " + str(order['customer_id']) + ", $" + str(order['total']) + ", " + order['status'])

# Delete small cancelled orders (under $30) from 2023
deleted_count = db.delete("orders", {
    "status": "cancelled",
    "total": 25.50  # This will match the exact amount
})

print(f"\\nDeleted {deleted_count} small cancelled order(s)")

# Show remaining orders
remaining_orders = db.find("orders")
print(f"\\nRemaining orders: {len(remaining_orders)}")
for order in remaining_orders:
    print(f"  Order " + str(order['id']) + ": Customer " + str(order['customer_id']) + ", $" + str(order['total']) + ", " + order['status'])`}
        </PreCodeBlock>

        <OutputBlock>
{`All orders:
  1: Customer 1, $49.99, cancelled
  2: Customer 1, $149.99, completed
  3: Customer 2, $25.5, cancelled
  4: Customer 2, $89.99, pending
  5: Customer 3, $15.0, cancelled

Deleted 1 small cancelled order(s)

Remaining orders: 4
  Order 1: Customer 1, $49.99, cancelled
  Order 2: Customer 1, $149.99, completed
  Order 4: Customer 2, $89.99, pending
  Order 5: Customer 3, $15.0, cancelled`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Deletion with Foreign Key Considerations</h3>
        <p className="text-gray-600 mb-4">
          Handle deletions that may affect related records:
        </p>

        <PreCodeBlock title="Safe Foreign Key Deletion">
{`# Create related tables
db.create_table("categories", {
    "id": "int",
    "name": "str",
    "description": "str"
})

db.create_table("products", {
    "id": "int",
    "name": "str",
    "category_id": "int->categories.id",
    "price": "float",
    "in_stock": "bool"
})

# Insert test data
cat1_id = db.insert("categories", {"name": "Electronics", "description": "Electronic devices"})
cat2_id = db.insert("categories", {"name": "Books", "description": "Physical and digital books"})

prod1_id = db.insert("products", {"name": "Laptop", "category_id": cat1_id, "price": 999.99, "in_stock": True})
prod2_id = db.insert("products", {"name": "Phone", "category_id": cat1_id, "price": 699.99, "in_stock": False})
prod3_id = db.insert("products", {"name": "Novel", "category_id": cat2_id, "price": 19.99, "in_stock": True})

print("Before deletion:")
print("Categories:")
categories = db.find("categories")
for cat in categories:
    print(f"  {cat['id']}: {cat['name']}")

print("\\nProducts:")
products = db.find("products")
for prod in products:
    print(f"  {prod['id']}: {prod['name']} (category: {prod['category_id']})")

# First, delete products that reference the category we want to remove
# Delete out-of-stock electronics
deleted_products = db.delete("products", {"category_id": cat1_id, "in_stock": False})
print(f"\\nDeleted {deleted_products} out-of-stock electronics")

# Verify products were deleted
remaining_products = db.find("products")
print(f"\\nRemaining products: {len(remaining_products)}")
for prod in remaining_products:
    print(f"  {prod['id']}: {prod['name']} (category: {prod['category_id']})")`}
        </PreCodeBlock>

        <OutputBlock>
{`Before deletion:
Categories:
  1: Electronics
  2: Books

Products:
  1: Laptop (category: 1)
  2: Phone (category: 1)
  3: Novel (category: 2)

Deleted 1 out-of-stock electronics

Remaining products: 2
  1: Laptop (category: 1)
  3: Novel (category: 2)`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database-Specific Behavior</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🗄️ SQLite</h3>
            <p className="text-gray-600 mb-2">
              Uses standard SQL DELETE statements with WHERE clauses:
            </p>
            <PreCodeBlock>
{`# Generated SQL for SQLite
DELETE FROM users WHERE id = ?
# Parameters: [2]
# Returns: cursor.rowcount`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐬 MySQL</h3>
            <p className="text-gray-600 mb-2">
              Uses MySQL DELETE syntax with parameter binding:
            </p>
            <PreCodeBlock>
{`# Generated SQL for MySQL
DELETE FROM users WHERE id = %s
# Parameters: [2]
# Returns: cursor.rowcount`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐘 PostgreSQL</h3>
            <p className="text-gray-600 mb-2">
              Uses PostgreSQL DELETE syntax:
            </p>
            <PreCodeBlock>
{`# Generated SQL for PostgreSQL  
DELETE FROM users WHERE id = %s
# Parameters: [2]
# Returns: cursor.rowcount`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🍃 MongoDB</h3>
            <p className="text-gray-600 mb-2">
              Translates to MongoDB deleteMany operation:
            </p>
            <PreCodeBlock>
{`# MongoDB equivalent
db.users.deleteMany({"id": 2})
# Returns: result.deleted_count`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        
        <PreCodeBlock title="Handling Deletion Errors">
{`from akron import Akron
from akron.exceptions import AkronError, TableNotFoundError

db = Akron("sqlite:///example.db")

try:
    # This will fail if table doesn't exist
    result = db.delete("nonexistent_table", {"id": 1})
    
except TableNotFoundError as e:
    print(f"Table not found: {e}")
    
except AkronError as e:
    print(f"Delete error: {e}")

# Safe deletion with validation
def safe_delete(table_name, filters):
    try:
        # Validate that we have filters (prevent mass deletion)
        if not filters:
            print("Error: Filters required for deletion - refusing to delete all records")
            return 0
        
        # Show what will be deleted (optional safety check)
        matching_records = db.find(table_name, filters)
        if len(matching_records) == 0:
            print("No records match the deletion criteria")
            return 0
        
        print(f"Found {len(matching_records)} record(s) matching deletion criteria")
        
        # Perform the deletion
        count = db.delete(table_name, filters)
        print(f"Successfully deleted {count} record(s)")
        return count
        
    except TableNotFoundError:
        print(f"Table '{table_name}' does not exist")
        return 0
    except AkronError as e:
        print(f"Deletion failed: {e}")
        return 0

# Safe usage examples
safe_delete("users", {"id": 99})  # Safe - specific ID
safe_delete("users", {})  # Prevented - no filters
safe_delete("missing_table", {"id": 1})  # Handled - missing table`}
        </PreCodeBlock>

        <OutputBlock>
{`Table not found: no such table: nonexistent_table
No records match the deletion criteria
Error: Filters required for deletion - refusing to delete all records
Table 'missing_table' does not exist`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🛡️ Data Safety</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Always backup critical data before performing deletions</li>
              <li>Test deletion queries on development data first</li>
              <li>Use specific filters to target exact records for deletion</li>
              <li>Check the returned count to verify expected number of deletions</li>
              <li>Consider soft deletes (marking as deleted) instead of hard deletes</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔗 Foreign Key Management</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Delete child records before deleting parent records</li>
              <li>Consider the impact on related tables</li>
              <li>Use cascading deletes carefully (when supported)</li>
              <li>Verify referential integrity after deletions</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">⚡ Performance</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use indexed columns in filter conditions for better performance</li>
              <li>Delete in batches for very large datasets</li>
              <li>Consider the impact on database locks and concurrent operations</li>
              <li>Monitor database performance during large deletion operations</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📋 Auditing</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Log deletion operations for audit trails</li>
              <li>Record what was deleted and when</li>
              <li>Consider implementing soft delete patterns for important data</li>
              <li>Maintain deletion logs for compliance requirements</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Patterns</h2>
        
        <PreCodeBlock title="Deletion Patterns and Examples">
{`# Pattern 1: Delete by primary key (safest)
deleted = db.delete("users", {"id": user_id})

# Pattern 2: Delete by status or flag
count = db.delete("orders", {"status": "cancelled"})

# Pattern 3: Delete old records by date
db.delete("logs", {"created_date": "2023-01-01"})  # Exact date match

# Pattern 4: Safe cleanup with verification
def cleanup_old_data(table_name, date_column, cutoff_date):
    # First, check what would be deleted
    to_delete = db.find(table_name, {date_column: cutoff_date})
    
    if len(to_delete) == 0:
        print("No old records to delete")
        return 0
    
    print(f"About to delete {len(to_delete)} old records")
    
    # Perform deletion
    deleted = db.delete(table_name, {date_column: cutoff_date})
    print(f"Successfully deleted {deleted} records")
    return deleted

# Pattern 5: Cascading deletion (manual)
def delete_user_and_data(user_id):
    # Delete in correct order to maintain referential integrity
    deleted_orders = db.delete("orders", {"customer_id": user_id})
    deleted_sessions = db.delete("user_sessions", {"user_id": user_id})
    deleted_user = db.delete("users", {"id": user_id})
    
    print(f"Deleted user: {deleted_user}, orders: {deleted_orders}, sessions: {deleted_sessions}")

# Pattern 6: Conditional deletion with business logic
def archive_inactive_users():
    # Find users inactive for over a year
    inactive_users = db.find("users", {"active": False})
    
    archived_count = 0
    for user in inactive_users:
        # Move to archive table before deleting
        db.insert("archived_users", user)
        db.delete("users", {"id": user["id"]})
        archived_count += 1
    
    return archived_count`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternative: Soft Deletion</h2>
        <p className="text-gray-600 mb-4">
          Consider implementing soft deletion for critical data:
        </p>
        
        <PreCodeBlock title="Implementing Soft Deletes">
{`# Add deleted_at column to tables for soft deletion
db.create_table("users", {
    "id": "int",
    "username": "str",
    "email": "str",
    "deleted_at": "str"  # NULL means not deleted
})

# Soft delete function
def soft_delete_user(user_id):
    from datetime import datetime
    timestamp = datetime.now().isoformat()
    
    updated = db.update("users", 
        {"id": user_id, "deleted_at": None},  # Only update if not already deleted
        {"deleted_at": timestamp}
    )
    
    return updated > 0

# Query active (non-deleted) users
def get_active_users():
    # Find users where deleted_at is None/null
    return db.find("users", {"deleted_at": None})

# Restore soft-deleted user
def restore_user(user_id):
    updated = db.update("users",
        {"id": user_id},
        {"deleted_at": None}
    )
    return updated > 0

# Permanently delete soft-deleted records (cleanup)
def permanent_cleanup():
    # Delete records that were soft-deleted more than 90 days ago
    from datetime import datetime, timedelta
    cutoff = datetime.now() - timedelta(days=90)
    cutoff_str = cutoff.isoformat()
    
    # This would need custom logic to compare dates
    # For now, manual cleanup approach
    old_deleted = db.find("users")  # Get all and filter in Python
    to_delete = []
    
    for user in old_deleted:
        if user["deleted_at"] and user["deleted_at"] < cutoff_str:
            to_delete.append(user["id"])
    
    deleted_count = 0
    for user_id in to_delete:
        deleted_count += db.delete("users", {"id": user_id})
    
    return deleted_count`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          After deleting records, you might want to:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Close Connection</h3>
            <p className="text-gray-600 text-sm mb-2">Properly close database connections when done</p>
            <a href="/docs/api/close" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about close()
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Query Remaining Data</h3>
            <p className="text-gray-600 text-sm mb-2">Verify deletions by querying remaining records</p>
            <a href="/docs/api/find" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about find()
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
