import { DocsLayout, PreCodeBlock, CodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function RawSqlPage() {
  return (
    <DocsLayout 
      title="raw-sql Command" 
      description="Execute custom SQL queries using the Akron CLI across SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>raw-sql</code> command allows you to execute custom SQL queries directly against 
          your database. Perfect for data analysis, debugging, and one-off database operations.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Basic Syntax</h3>
          <CodeBlock>{`akron raw-sql --db <database_url> --query <sql_query>`}</CodeBlock>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">⚠️ Safety Warning</h3>
          <p className="text-yellow-800">
            This command executes SQL directly against your database. Be extremely careful with 
            UPDATE, DELETE, and DROP statements, especially on production databases.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--db</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Database connection URL to execute query against.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--query</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">SQL query to execute. Use quotes for multi-word queries.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--file</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Path to SQL file to execute (alternative to --query).</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--format</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Output format: &quot;table&quot;, &quot;json&quot;, or &quot;csv&quot;. Default: &quot;table&quot;</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--output</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Save results to file instead of displaying in terminal.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic SELECT Queries</h3>
            <PreCodeBlock>
{`# Simple SELECT query
akron raw-sql --db "sqlite:///myapp.db" --query "SELECT * FROM users LIMIT 5"

# Query with WHERE clause
akron raw-sql --db "mysql://user:pass@host:3306/store" --query "SELECT name, price FROM products WHERE price > 50"`}
            </PreCodeBlock>
            <OutputBlock>
{`Query Results:
==============
+----+----------+-------------------+
| id | username | email             |
+----+----------+-------------------+
| 1  | admin    | admin@example.com |
| 2  | john_doe | john@example.com  |
| 3  | jane_s   | jane@example.com  |
+----+----------+-------------------+

3 rows returned in 0.002 seconds`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Analysis Queries</h3>
            <PreCodeBlock>
{`# Count records by category
akron raw-sql --db "postgres://user:pass@host:5432/ecommerce" --query "
  SELECT category, COUNT(*) as product_count, AVG(price) as avg_price 
  FROM products 
  GROUP BY category 
  ORDER BY product_count DESC
"`}
            </PreCodeBlock>
            <OutputBlock>
{`Query Results:
==============
+-------------+---------------+-----------+
| category    | product_count | avg_price |
+-------------+---------------+-----------+
| Electronics | 150           | 249.99    |
| Clothing    | 89            | 45.50     |
| Books       | 45            | 19.99     |
+-------------+---------------+-----------+

3 rows returned in 0.045 seconds`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Execute from File</h3>
            <PreCodeBlock>
{`# Create SQL file
echo "
SELECT 
  u.username,
  COUNT(p.id) as post_count,
  MAX(p.created_at) as last_post
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.username
ORDER BY post_count DESC;
" > user_stats.sql

# Execute file
akron raw-sql --db "sqlite:///blog.db" --file user_stats.sql`}
            </PreCodeBlock>
            <OutputBlock>
{`Query Results from user_stats.sql:
===================================
+----------+------------+---------------------+
| username | post_count | last_post           |
+----------+------------+---------------------+
| alice    | 25         | 2024-01-15 14:30:00 |
| bob      | 18         | 2024-01-14 09:15:00 |
| charlie  | 12         | 2024-01-13 16:45:00 |
+----------+------------+---------------------+

3 rows returned in 0.012 seconds`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Different Output Formats</h3>
            <PreCodeBlock>
{`# JSON output
akron raw-sql --db "mongodb://localhost:27017/social" --query "
  db.users.find({}, {username: 1, email: 1})
" --format json

# CSV output for spreadsheet import
akron raw-sql --db "mysql://user:pass@host:3306/sales" --query "
  SELECT date, product_name, quantity, revenue FROM sales_report
" --format csv --output sales_data.csv`}
            </PreCodeBlock>
            <OutputBlock>
{`JSON Output:
============
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "alice",
    "email": "alice@example.com"
  },
  {
    "_id": "507f1f77bcf86cd799439012", 
    "username": "bob",
    "email": "bob@example.com"
  }
]

CSV saved to: sales_data.csv`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database-Specific Queries</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">SQLite System Queries</h3>
            <PreCodeBlock>
{`# List all tables
akron raw-sql --db "sqlite:///app.db" --query "SELECT name FROM sqlite_master WHERE type='table'"

# Check database size
akron raw-sql --db "sqlite:///app.db" --query "SELECT page_count * page_size as size_bytes FROM pragma_page_count(), pragma_page_size()"

# Analyze table statistics
akron raw-sql --db "sqlite:///app.db" --query "SELECT * FROM sqlite_stat1"`}
            </PreCodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">PostgreSQL System Queries</h3>
            <PreCodeBlock>
{`# Table sizes
akron raw-sql --db "postgres://user:pass@host:5432/db" --query "
  SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(tablename::regclass)) AS size
  FROM pg_tables 
  WHERE schemaname = 'public'
"

# Active connections
akron raw-sql --db "postgres://user:pass@host:5432/db" --query "
  SELECT datname, usename, client_addr, state 
  FROM pg_stat_activity 
  WHERE state = 'active'
"`}
            </PreCodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">MongoDB Queries</h3>
            <PreCodeBlock>
{`# Collection statistics
akron raw-sql --db "mongodb://localhost:27017/app" --query "
  db.stats()
"

# Find documents with aggregation
akron raw-sql --db "mongodb://localhost:27017/social" --query "
  db.posts.aggregate([
    {$group: {_id: '$user_id', post_count: {$sum: 1}}},
    {$sort: {post_count: -1}},
    {$limit: 10}
  ])
"`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Useful Query Patterns</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Verification</h3>
            <PreCodeBlock>
{`# Check for duplicate emails
akron raw-sql --db "sqlite:///app.db" --query "
  SELECT email, COUNT(*) as count 
  FROM users 
  GROUP BY email 
  HAVING COUNT(*) > 1
"

# Find orphaned records
akron raw-sql --db "mysql://user:pass@host:3306/db" --query "
  SELECT p.* 
  FROM posts p 
  LEFT JOIN users u ON p.user_id = u.id 
  WHERE u.id IS NULL
"`}
            </PreCodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Analysis</h3>
            <PreCodeBlock>
{`# Slow query analysis (PostgreSQL)
akron raw-sql --db "postgres://user:pass@host:5432/db" --query "
  SELECT query, mean_time, calls, total_time
  FROM pg_stat_statements 
  ORDER BY mean_time DESC 
  LIMIT 10
"

# Index usage (MySQL)
akron raw-sql --db "mysql://user:pass@host:3306/db" --query "
  SELECT 
    table_name,
    index_name,
    seq_in_index,
    column_name
  FROM information_schema.statistics 
  WHERE table_schema = 'your_database'
"`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety and Best Practices</h2>
        
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Dangerous Operations</h3>
            <ul className="text-red-800 space-y-2">
              <li><strong>Always backup before:</strong> DELETE, UPDATE, DROP, ALTER operations</li>
              <li><strong>Use transactions:</strong> Wrap multiple statements in BEGIN/COMMIT</li>
              <li><strong>Test on development:</strong> Never run untested queries on production</li>
              <li><strong>Use WHERE clauses:</strong> Avoid accidental full-table operations</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Safe Practices</h3>
            <PreCodeBlock>
{`# Count before deleting
akron raw-sql --db "sqlite:///app.db" --query "SELECT COUNT(*) FROM old_records WHERE created_at < '2023-01-01'"

# Use LIMIT for testing
akron raw-sql --db "sqlite:///app.db" --query "UPDATE users SET status = 'inactive' WHERE last_login < '2023-01-01' LIMIT 1"

# Check affected rows
akron raw-sql --db "mysql://user:pass@host:3306/db" --query "SELECT ROW_COUNT() as affected_rows"`}
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
              <li><strong>Syntax error:</strong> Check SQL syntax for target database</li>
              <li><strong>Table/column not found:</strong> Verify names with inspect-schema</li>
              <li><strong>Permission denied:</strong> Ensure user has required privileges</li>
              <li><strong>Connection timeout:</strong> Check database availability and network</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Troubleshooting</h3>
            <PreCodeBlock>
{`# Test connection first
akron raw-sql --db "sqlite:///app.db" --query "SELECT 1"

# Check table existence
akron inspect-schema --db "sqlite:///app.db" --tables-only

# Validate SQL syntax on smaller dataset
akron raw-sql --db "sqlite:///app.db" --query "SELECT * FROM users LIMIT 1"`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schema Inspection</h3>
            <a href="/docs/cli/inspect-schema" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → inspect-schema command
            </a>
            <a href="/docs/api/find" className="text-blue-600 hover:text-blue-800 text-sm block">
              → find() API method
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
            <a href="/docs/cli/migrate" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → migrate command
            </a>
            <a href="/docs/cli/makemigrations" className="text-blue-600 hover:text-blue-800 text-sm block">
              → makemigrations command
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
