import { DocsLayout, PreCodeBlock, OutputBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function FindPage() {
  return (
    <DocsLayout 
      title="find()" 
      description="Query and retrieve records from database tables with flexible filtering, type-safe results, and cross-database compatibility."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>find()</code> method retrieves records from database tables. It supports flexible 
          filtering conditions, returns type-safe results as dictionaries, and works consistently 
          across all supported databases including MongoDB.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Signature</h3>
          <CodeBlock>{`find(table_name: str, filters: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">table_name</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str</p>
            <p className="text-gray-600">
              Name of the table to query. The table must exist before querying.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">filters (optional)</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> Optional[Dict[str, Any]]</p>
            <p className="text-gray-600 mb-2"><strong>Default:</strong> None</p>
            <p className="text-gray-600 mb-4">
              Dictionary mapping column names to values for filtering results. If None or empty, 
              returns all records in the table. Supports exact value matching.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><code>None</code> - Returns all records</li>
              <li><code>{}</code> - Returns all records</li> 
              <li><code>{`{"column": value}`}</code> - Returns records where column equals value</li>
              <li><code>{`{"col1": val1, "col2": val2}`}</code> - Returns records matching all conditions (AND)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 mb-2"><strong>Type:</strong> List[Dict[str, Any]]</p>
          <p className="text-gray-600">
            List of dictionaries, where each dictionary represents a record with column names as keys 
            and their corresponding values. Returns an empty list if no records match the filters.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Queries</h3>
        
        <PreCodeBlock title="Retrieve All Records">
{`from akron import Akron

db = Akron("sqlite:///example.db")

# Setup: Create table and insert sample data
db.create_table("users", {
    "id": "int",
    "username": "str",
    "email": "str", 
    "age": "int",
    "active": "bool"
})

# Insert some test data
db.insert("users", {"username": "alice", "email": "alice@example.com", "age": 28, "active": True})
db.insert("users", {"username": "bob", "email": "bob@example.com", "age": 32, "active": False})
db.insert("users", {"username": "charlie", "email": "charlie@example.com", "age": 25, "active": True})

# Find all users
all_users = db.find("users")
print("All users:")
for user in all_users:
    print(f"  {user}")

# Count total users  
print(f"\\nTotal users: {len(all_users)}")`}
        </PreCodeBlock>

        <OutputBlock>
{`All users:
  {'id': 1, 'username': 'alice', 'email': 'alice@example.com', 'age': 28, 'active': True}
  {'id': 2, 'username': 'bob', 'email': 'bob@example.com', 'age': 32, 'active': False}
  {'id': 3, 'username': 'charlie', 'email': 'charlie@example.com', 'age': 25, 'active': True}

Total users: 3`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Filtered Queries</h3>
        <p className="text-gray-600 mb-4">
          Use filters to find specific records:
        </p>

        <PreCodeBlock title="Single Condition Filtering">
{`# Find only active users
active_users = db.find("users", {"active": True})
print("Active users:")
for user in active_users:
    print(f"  {user['username']} (age {user['age']})")

# Find user by ID
user_by_id = db.find("users", {"id": 2})
print(f"\\nUser with ID 2: {user_by_id}")

# Find user by username
user_by_name = db.find("users", {"username": "alice"})
print(f"\\nUser 'alice': {user_by_name}")

# Find users by age
young_users = db.find("users", {"age": 25})
print(f"\\nUsers age 25: {young_users}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Active users:
  alice (age 28)
  charlie (age 25)

User with ID 2: [{'id': 2, 'username': 'bob', 'email': 'bob@example.com', 'age': 32, 'active': False}]

User 'alice': [{'id': 1, 'username': 'alice', 'email': 'alice@example.com', 'age': 28, 'active': True}]

Users age 25: [{'id': 3, 'username': 'charlie', 'email': 'charlie@example.com', 'age': 25, 'active': True}]`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Multiple Conditions (AND)</h3>
        <p className="text-gray-600 mb-4">
          Use multiple filter conditions to narrow down results:
        </p>

        <PreCodeBlock title="Multiple Filter Conditions">
{`# Find active users who are 28 years old
specific_users = db.find("users", {
    "active": True,
    "age": 28
})
print(f"Active users age 28: {specific_users}")

# Find inactive users named bob
inactive_bob = db.find("users", {
    "active": False,
    "username": "bob"
})
print(f"\\nInactive user named bob: {inactive_bob}")

# Multiple conditions that return no results
no_results = db.find("users", {
    "active": True,
    "age": 50  # No users this age
})
print(f"\\nUsers active and age 50: {no_results}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Active users age 28: [{'id': 1, 'username': 'alice', 'email': 'alice@example.com', 'age': 28, 'active': True}]

Inactive user named bob: [{'id': 2, 'username': 'bob', 'email': 'bob@example.com', 'age': 32, 'active': False}]

Users active and age 50: []`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Working with Related Data</h3>
        <p className="text-gray-600 mb-4">
          Query tables with foreign key relationships:
        </p>

        <PreCodeBlock title="Querying Related Tables">
{`# Setup blog schema
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
    "views": "int"
})

# Insert sample data
author1_id = db.insert("authors", {"name": "Jane Doe", "email": "jane@blog.com"})
author2_id = db.insert("authors", {"name": "John Smith", "email": "john@blog.com"})

db.insert("posts", {"title": "Python Tips", "content": "Great tips...", "author_id": author1_id, "published": True, "views": 150})
db.insert("posts", {"title": "Database Design", "content": "Schema best practices...", "author_id": author1_id, "published": False, "views": 45})
db.insert("posts", {"title": "Web Development", "content": "Modern frameworks...", "author_id": author2_id, "published": True, "views": 200})

# Find all posts by a specific author
jane_posts = db.find("posts", {"author_id": author1_id})
print(f"Posts by Jane Doe ({author1_id}):")
for post in jane_posts:
    print(f"  '{post['title']}' - Published: {post['published']}, Views: {post['views']}")

# Find only published posts
published_posts = db.find("posts", {"published": True})
print(f"\\nPublished posts: {len(published_posts)}")

# Find high-traffic published posts
popular_posts = db.find("posts", {"published": True, "views": 200})
print(f"Popular published posts: {popular_posts}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Posts by Jane Doe (1):
  'Python Tips' - Published: True, Views: 150
  'Database Design' - Published: False, Views: 45

Published posts: 2
Popular published posts: [{'id': 3, 'title': 'Web Development', 'content': 'Modern frameworks...', 'author_id': 2, 'published': True, 'views': 200}]`}
        </OutputBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Processing Query Results</h3>
        <p className="text-gray-600 mb-4">
          Work with the returned data efficiently:
        </p>

        <PreCodeBlock title="Result Processing Patterns">
{`# Get all users and process them
users = db.find("users")

# Extract specific fields
usernames = [user["username"] for user in users]
print(f"Usernames: {usernames}")

# Filter results in Python (after database query)
adult_users = [user for user in users if user["age"] >= 30]
print(f"\\nAdult users: {len(adult_users)}")

# Calculate statistics
total_age = sum(user["age"] for user in users)
average_age = total_age / len(users) if users else 0
print(f"Average age: {average_age:.1f}")

# Find specific user safely
def find_user_by_username(username):
    results = db.find("users", {"username": username})
    return results[0] if results else None

alice = find_user_by_username("alice")
if alice:
    print(f"\\nFound Alice: {alice['email']}")
else:
    print("\\nAlice not found")

# Check if any records exist
has_inactive_users = bool(db.find("users", {"active": False}))
print(f"Has inactive users: {has_inactive_users}")`}
        </PreCodeBlock>

        <OutputBlock>
{`Usernames: ['alice', 'bob', 'charlie']

Adult users: 1

Average age: 28.3

Found Alice: alice@example.com
Has inactive users: True`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database-Specific Behavior</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🗄️ SQLite</h3>
            <p className="text-gray-600 mb-2">
              Uses standard SQL SELECT statements with WHERE clauses:
            </p>
            <PreCodeBlock>
{`# Generated SQL for SQLite
SELECT * FROM users WHERE active = ? AND age = ?
# Parameters: [True, 28]`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐬 MySQL</h3>
            <p className="text-gray-600 mb-2">
              Uses MySQL-compatible SQL with proper parameter binding:
            </p>
            <PreCodeBlock>
{`# Generated SQL for MySQL
SELECT * FROM users WHERE active = %s AND age = %s
# Parameters: [True, 28]`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🐘 PostgreSQL</h3>
            <p className="text-gray-600 mb-2">
              Uses PostgreSQL syntax with proper type handling:
            </p>
            <PreCodeBlock>
{`# Generated SQL for PostgreSQL
SELECT * FROM users WHERE active = %s AND age = %s
# Parameters: [True, 28]`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🍃 MongoDB</h3>
            <p className="text-gray-600 mb-2">
              Translates filters to MongoDB query documents:
            </p>
            <PreCodeBlock>
{`# MongoDB query equivalent
db.users.find({"active": True, "age": 28})
# Returns cursor converted to list of dictionaries`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        
        <PreCodeBlock title="Handling Query Errors">
{`from akron import Akron
from akron.exceptions import AkronError, TableNotFoundError

db = Akron("sqlite:///example.db")

try:
    # This will fail if table doesn't exist
    results = db.find("nonexistent_table")
    
except TableNotFoundError as e:
    print(f"Table not found: {e}")
    
except AkronError as e:
    print(f"Query error: {e}")

# Safe querying with existence check
def safe_find(table_name, filters=None):
    try:
        return db.find(table_name, filters)
    except TableNotFoundError:
        print(f"Table '{table_name}' does not exist")
        return []
    except AkronError as e:
        print(f"Query failed: {e}")
        return []

# Use safe querying
users = safe_find("users", {"active": True})
missing_table_data = safe_find("missing_table")`}
        </PreCodeBlock>

        <OutputBlock>
{`Table not found: no such table: nonexistent_table
Table 'missing_table' does not exist`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CLI Usage</h2>
        <p className="text-gray-600 mb-4">
          Query data using raw SQL with the Akron CLI:
        </p>
        
        <PreCodeBlock title="CLI Querying">
{`# Query all records
akron raw-sql --db sqlite:///example.db --sql "SELECT * FROM users"

# Query with conditions
akron raw-sql --db sqlite:///example.db --sql "SELECT username, age FROM users WHERE active = 1"

# Query with joins (if supported)
akron raw-sql --db mysql://user:pass@localhost/blog --sql "SELECT posts.title, authors.name FROM posts JOIN authors ON posts.author_id = authors.id"

# Count records
akron raw-sql --db postgres://user:pass@localhost/db --sql "SELECT COUNT(*) FROM users WHERE age >= 30"`}
        </PreCodeBlock>

        <OutputBlock>
{`(1, 'alice', 'alice@example.com', 28, 1)
(2, 'bob', 'bob@example.com', 32, 0)
(3, 'charlie', 'charlie@example.com', 25, 1)
SQL executed.`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Query Optimization</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use specific filters to limit result sets rather than fetching all data</li>
              <li>Filter at the database level rather than in Python when possible</li>
              <li>Consider creating indexes on frequently queried columns</li>
              <li>Avoid querying large tables without filters in production</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔍 Result Processing</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Check if results list is empty before accessing elements</li>
              <li>Use list comprehensions for efficient data transformation</li>
              <li>Consider pagination for large result sets</li>
              <li>Cache frequently accessed query results when appropriate</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🛡️ Safety</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Always handle the case where no results are found</li>
              <li>Validate filter values before querying</li>
              <li>Use try-catch blocks for database-related operations</li>
              <li>Be careful with user-provided filter values</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Data Access Patterns</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Query by primary key (id) for single record lookup</li>
              <li>Use boolean flags for status-based filtering</li>
              <li>Query related data separately, then combine in Python</li>
              <li>Consider denormalizing data for frequently accessed combinations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          After retrieving data, you can modify or remove it:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Update Records</h3>
            <p className="text-gray-600 text-sm mb-2">Modify existing data based on your queries</p>
            <a href="/docs/api/update" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about update()
            </a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Records</h3>
            <p className="text-gray-600 text-sm mb-2">Remove unwanted data</p>
            <a href="/docs/api/delete" className="text-blue-600 hover:text-blue-800 text-sm">
              → learn about delete()
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
