import { DocsLayout, PreCodeBlock, OutputBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function UpdatePage() {
  return (
    <DocsLayout 
      title="update()" 
      description="Modify existing database records with flexible filtering and type-safe updates across all supported databases."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>update()</code> method modifies existing records in database tables. It uses filtering 
          conditions to identify which records to update and applies new values to specified columns. 
          The method returns the number of affected records.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Signature</h3>
          <CodeBlock>{`update(table_name: str, filters: Dict[str, Any], new_values: Dict[str, Any]) -> int`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">table_name</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str</p>
            <p className="text-gray-600">
              Name of the table containing records to update. The table must exist.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">filters</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> Dict[str, Any]</p>
            <p className="text-gray-600 mb-4">
              Dictionary mapping column names to values for identifying which records to update. 
              Must be non-empty to prevent accidental mass updates.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-yellow-800 text-sm">
                <strong>⚠️ Important:</strong> All conditions are combined with AND logic. 
                Empty filters are not allowed for safety.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">new_values</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> Dict[str, Any]</p>
            <p className="text-gray-600">
              Dictionary mapping column names to their new values. Only specified columns 
              will be updated; other columns remain unchanged.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 mb-2"><strong>Type:</strong> int</p>
          <p className="text-gray-600">
            Number of records that were actually updated. Returns 0 if no records matched 
            the filter conditions.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Updates</h3>
        
        <PreCodeBlock title="Single Record Update">
{`from akron import Akron

db = Akron("sqlite:///example.db")

# Setup: Create table and insert sample data
db.create_table("users", {
    "id": "int",
    "username": "str",
    "email": "str",
    "age": "int", 
    "active": "bool",
    "last_login": "str"
})

# Insert test data
db.insert("users", {"username": "alice", "email": "alice@example.com", "age": 28, "active": True, "last_login": "2024-01-01"})
db.insert("users", {"username": "bob", "email": "bob@example.com", "age": 32, "active": False, "last_login": "2023-12-15"})

# Update a single user by ID
updated_count = db.update("users", 
    {"id": 1},  # Find user with ID 1
    {"age": 29, "last_login": "2024-01-15"}  # Update age and last_login
)

print(f"Updated {updated_count} user(s)")

# Verify the update
user = db.find("users", {"id": 1})
print(f"Updated user: {user[0]}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Updated 1 user(s)
Updated user: {'id': 1, 'username': 'alice', 'email': 'alice@example.com', 'age': 29, 'active': True, 'last_login': '2024-01-15'}`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Multiple Record Updates</h3>
        <p className="text-gray-600 mb-4">
          Update multiple records that match the same criteria:
        </p>

        <PreCodeBlock title="Bulk Status Update">
{`# Insert more test data
db.insert("users", {"username": "charlie", "email": "charlie@example.com", "age": 25, "active": False, "last_login": "2023-11-20"})
db.insert("users", {"username": "diana", "email": "diana@example.com", "age": 30, "active": False, "last_login": "2023-10-05"})

# Activate all inactive users
activated_count = db.update("users",
    {"active": False},  # Find all inactive users
    {"active": True, "last_login": "2024-01-16"}  # Activate them and update login
)

print(f"Activated {activated_count} user(s)")

# Check all users now
all_users = db.find("users")
for user in all_users:
    status = "Active" if user["active"] else "Inactive"
    print(f"  {user['username']}: {status} (last login: {user['last_login']})")`}
        </PreCodeBlock>

        <OutputBlock>
{`Activated 3 user(s)
  alice: Active (last login: 2024-01-15)
  bob: Active (last login: 2024-01-16)
  charlie: Active (last login: 2024-01-16)
  diana: Active (last login: 2024-01-16)`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Conditional Updates</h3>
        <p className="text-gray-600 mb-4">
          Use multiple filter conditions for precise updates:
        </p>

        <PreCodeBlock title="Age-Based Discount Update">
{`# Create products table
db.create_table("products", {
    "id": "int",
    "name": "str",
    "price": "float",
    "category": "str",
    "discount": "float"
})

# Insert sample products
db.insert("products", {"name": "Laptop", "price": 999.99, "category": "Electronics", "discount": 0.0})
db.insert("products", {"name": "Book", "price": 29.99, "category": "Books", "discount": 0.0})
db.insert("products", {"name": "Phone", "price": 699.99, "category": "Electronics", "discount": 0.0})
db.insert("products", {"name": "Desk", "price": 199.99, "category": "Furniture", "discount": 0.0})

# Apply 10% discount to electronics over $500
electronics_discount = db.update("products",
    {"category": "Electronics", "price": 699.99},  # Electronics at exactly $699.99
    {"discount": 0.10}  # 10% discount
)

print(f"Applied discount to {electronics_discount} electronics product(s)")

# Apply different discount to books
books_discount = db.update("products",
    {"category": "Books"},
    {"discount": 0.15}  # 15% discount on books
)

print(f"Applied discount to {books_discount} book(s)")

# Check updated products
discounted_products = db.find("products", {"discount": 0.10})
print(f"Products with 10% discount: {len(discounted_products)}")
for product in discounted_products:
    final_price = product["price"] * (1 - product["discount"])
    print(f"  {product['name']}: $" + str(product['price']) + " -> $" + f"{final_price:.2f}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Applied discount to 1 electronics product(s)
Applied discount to 1 book(s)

Products with 10% discount: 1
  Phone: $699.99 -> $629.99`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Updates with Foreign Keys</h3>
        <p className="text-gray-600 mb-4">
          Update records that reference other tables:
        </p>

        <PreCodeBlock title="Order Status Updates">
{`# Create order management tables
db.create_table("customers", {
    "id": "int",
    "name": "str",
    "email": "str"
})

db.create_table("orders", {
    "id": "int",
    "customer_id": "int->customers.id",
    "total": "float",
    "status": "str",
    "created_date": "str"
})

# Insert customers and orders
customer_id = db.insert("customers", {"name": "John Smith", "email": "john@example.com"})

order1_id = db.insert("orders", {"customer_id": customer_id, "total": 149.99, "status": "pending", "created_date": "2024-01-10"})
order2_id = db.insert("orders", {"customer_id": customer_id, "total": 299.99, "status": "pending", "created_date": "2024-01-12"})

# Ship one specific order
shipped_count = db.update("orders",
    {"id": order1_id},
    {"status": "shipped"}
)

print(f"Shipped {shipped_count} order(s)")

# Process all pending orders for this customer
processed_count = db.update("orders",
    {"customer_id": customer_id, "status": "pending"},
    {"status": "processing"}
)

print(f"Moved {processed_count} order(s) to processing")

# Check final order statuses
customer_orders = db.find("orders", {"customer_id": customer_id})
for order in customer_orders:
    print(f"  Order " + str(order['id']) + ": $" + str(order['total']) + " - " + order['status'])`}
        </PreCodeBlock>

        <OutputBlock>
{`Shipped 1 order(s)
Moved 1 order(s) to processing

  Order 1: $149.99 - shipped
  Order 2: $299.99 - processing`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database-Specific Behavior</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🗄️ SQLite</h3>
            <p className="text-gray-600 mb-2">
              Uses standard SQL UPDATE statements with WHERE clauses:
            </p>
            <PreCodeBlock>
{`# Generated SQL for SQLite
UPDATE users SET age = ?, last_login = ? WHERE id = ?
# Parameters: [29, '2024-01-15', 1]
# Returns: cursor.rowcount`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐬 MySQL</h3>
            <p className="text-gray-600 mb-2">
              Uses MySQL UPDATE syntax with parameter binding:
            </p>
            <PreCodeBlock>
{`# Generated SQL for MySQL
UPDATE users SET age = %s, last_login = %s WHERE id = %s
# Parameters: [29, '2024-01-15', 1]
# Returns: cursor.rowcount`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐘 PostgreSQL</h3>
            <p className="text-gray-600 mb-2">
              Uses PostgreSQL UPDATE syntax:
            </p>
            <PreCodeBlock>
{`# Generated SQL for PostgreSQL  
UPDATE users SET age = %s, last_login = %s WHERE id = %s
# Parameters: [29, '2024-01-15', 1]
# Returns: cursor.rowcount`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🍃 MongoDB</h3>
            <p className="text-gray-600 mb-2">
              Translates to MongoDB updateMany operation:
            </p>
            <PreCodeBlock>
{`# MongoDB equivalent
db.users.updateMany(
    {"id": 1},  # filter
    {"$set": {"age": 29, "last_login": "2024-01-15"}}  # update
)
# Returns: result.modified_count`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        
        <PreCodeBlock title="Handling Update Errors">
{`from akron import Akron
from akron.exceptions import AkronError, TableNotFoundError

db = Akron("sqlite:///example.db")

try:
    # This will fail if table doesn't exist
    result = db.update("nonexistent_table", {"id": 1}, {"name": "test"})
    
except TableNotFoundError as e:
    print(f"Table not found: {e}")
    
except AkronError as e:
    print(f"Update error: {e}")

# Safe updating with validation
def safe_update(table_name, filters, new_values):
    try:
        # Validate that we have filters (prevent mass updates)
        if not filters:
            print("Error: Filters required for update")
            return 0
            
        # Validate that we have new values
        if not new_values:
            print("Error: No values to update")
            return 0
            
        # Perform the update
        count = db.update(table_name, filters, new_values)
        print(f"Successfully updated {count} record(s)")
        return count
        
    except TableNotFoundError:
        print(f"Table '{table_name}' does not exist")
        return 0
    except AkronError as e:
        print(f"Update failed: {e}")
        return 0

# Safe usage examples
safe_update("users", {"id": 1}, {"age": 30})  # Works
safe_update("users", {}, {"age": 30})  # Prevents mass update
safe_update("missing_table", {"id": 1}, {"name": "test"})  # Handles missing table`}
        </PreCodeBlock>

        <OutputBlock>
{`Table not found: no such table: nonexistent_table
Successfully updated 1 record(s)
Error: Filters required for update
Table 'missing_table' does not exist`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Targeted Updates</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Always use specific filters to avoid accidental mass updates</li>
              <li>Update by primary key (id) for single record modifications</li>
              <li>Use meaningful filter combinations for bulk operations</li>
              <li>Check the returned count to verify expected number of updates</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔒 Data Integrity</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Validate new values before updating to maintain data quality</li>
              <li>Be careful when updating foreign key references</li>
              <li>Consider constraints and validation rules</li>
              <li>Use transactions for multi-table updates when possible</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">⚡ Performance</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Update only the columns that actually need changing</li>
              <li>Use efficient filter conditions (indexed columns when possible)</li>
              <li>Batch similar updates together when practical</li>
              <li>Consider the impact of updating large numbers of records</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🧪 Testing</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Always test update queries with small datasets first</li>
              <li>Verify updates by querying the data afterward</li>
              <li>Have a backup strategy for important data modifications</li>
              <li>Use development databases for testing complex updates</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Patterns</h2>
        
        <PreCodeBlock title="Update Patterns and Examples">
{`# Pattern 1: Update single record by ID
updated = db.update("users", {"id": user_id}, {"last_login": "2024-01-16"})

# Pattern 2: Bulk status updates
count = db.update("orders", {"status": "pending"}, {"status": "processing"})

# Pattern 3: Conditional field updates
db.update("products", 
    {"category": "Electronics", "price": 999.99},
    {"discount": 0.10, "promotion": "Winter Sale"}
)

# Pattern 4: Calculate and update derived fields
users = db.find("users")
for user in users:
    # Calculate new value based on existing data
    new_score = user["points"] * 1.1
    db.update("users", {"id": user["id"]}, {"score": new_score})

# Pattern 5: Update with timestamp
from datetime import datetime
now = datetime.now().isoformat()
db.update("posts", {"id": post_id}, {
    "content": new_content,
    "updated_at": now
})

# Pattern 6: Safe increment (read-modify-write)
product = db.find("products", {"id": product_id})[0]
new_stock = product["stock"] + quantity_sold
db.update("products", {"id": product_id}, {"stock": new_stock})`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          After updating records, you might want to:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Query Updated Data</h3>
            <p className="text-gray-600 text-sm mb-2">Verify your updates by retrieving the modified records</p>
            <a href="/docs/api/find" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about find()
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Records</h3>
            <p className="text-gray-600 text-sm mb-2">Remove unwanted data from your tables</p>
            <a href="/docs/api/delete" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about delete()
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
