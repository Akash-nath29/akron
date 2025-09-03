import { DocsLayout, PreCodeBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function PostgreSQLPage() {
  return (
    <DocsLayout 
      title="PostgreSQL Support" 
      description="Complete guide to using PostgreSQL with Akron ORM - advanced open-source database with powerful features and standards compliance."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          PostgreSQL is a powerful, open-source object-relational database system known for its 
          reliability, feature robustness, and performance. It&apos;s an excellent choice for 
          applications requiring advanced SQL features, data integrity, and scalability.
        </p>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">🐘 PostgreSQL Advantages</h3>
          <ul className="text-purple-800 space-y-1">
            <li>• Full ACID compliance and strong consistency</li>
            <li>• Advanced data types (JSON, Arrays, Custom types)</li>
            <li>• Powerful query optimizer and execution engine</li>
            <li>• Extensibility with custom functions and operators</li>
            <li>• Strong standards compliance (SQL:2016)</li>
            <li>• Excellent concurrency control</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
        <p className="text-gray-600 mb-4">
          Before using PostgreSQL with Akron, ensure you have the required dependency installed:
        </p>
        
        <PreCodeBlock title="Install PostgreSQL Adapter">
{`# Install the PostgreSQL adapter
pip install psycopg2-binary

# Or for production (compile from source)
pip install psycopg2

# Using conda
conda install psycopg2`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Setup</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Connection</h3>
        <PreCodeBlock title="PostgreSQL Connection Examples">
{`from akron import Akron

# Basic connection
db = Akron("postgres://user:password@localhost:5432/database")

# Alternative scheme
db = Akron("postgresql://user:password@localhost:5432/database")

# Connection with SSL
db = Akron("postgres://user:password@localhost:5432/db?sslmode=require")

# Remote PostgreSQL server
db = Akron("postgres://admin:secret@pg.example.com:5432/production_db")

# Connection with custom application name
db = Akron("postgres://user:pass@localhost:5432/db?application_name=akron_app")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection URL Format</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          <CodeBlock>postgres://[user]:[password]@[host]:[port]/[database]?[options]</CodeBlock>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600"><strong>user:</strong> PostgreSQL username</p>
            <p className="text-gray-600"><strong>password:</strong> PostgreSQL password</p>
            <p className="text-gray-600"><strong>host:</strong> Server hostname or IP (default: localhost)</p>
            <p className="text-gray-600"><strong>port:</strong> PostgreSQL port (default: 5432)</p>
            <p className="text-gray-600"><strong>database:</strong> Database name</p>
            <p className="text-gray-600"><strong>options:</strong> Additional connection parameters</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Connection Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">SSL Options</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li><code>sslmode=require</code> - Force SSL</li>
              <li><code>sslmode=prefer</code> - Use SSL if available</li>
              <li><code>sslmode=disable</code> - No SSL</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Performance Options</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li><code>connect_timeout=10</code> - Connection timeout</li>
              <li><code>application_name=myapp</code> - App identifier</li>
              <li><code>options=-c statement_timeout=30s</code> - Query timeout</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Types</h2>
        <p className="text-gray-600 mb-4">
          PostgreSQL offers an extensive range of data types. Akron maps Python types to appropriate PostgreSQL types:
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">Python Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left">PostgreSQL Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Range/Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>int</code></td>
                <td className="border border-gray-200 px-4 py-2">INTEGER</td>
                <td className="border border-gray-200 px-4 py-2">-2,147,483,648 to 2,147,483,647</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>str</code></td>
                <td className="border border-gray-200 px-4 py-2">VARCHAR</td>
                <td className="border border-gray-200 px-4 py-2">Variable length text</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>float</code></td>
                <td className="border border-gray-200 px-4 py-2">DOUBLE PRECISION</td>
                <td className="border border-gray-200 px-4 py-2">64-bit floating point</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>bool</code></td>
                <td className="border border-gray-200 px-4 py-2">BOOLEAN</td>
                <td className="border border-gray-200 px-4 py-2">TRUE/FALSE</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>datetime</code></td>
                <td className="border border-gray-200 px-4 py-2">TIMESTAMP</td>
                <td className="border border-gray-200 px-4 py-2">With/without timezone</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>date</code></td>
                <td className="border border-gray-200 px-4 py-2">DATE</td>
                <td className="border border-gray-200 px-4 py-2">Date only</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>list</code></td>
                <td className="border border-gray-200 px-4 py-2">ARRAY</td>
                <td className="border border-gray-200 px-4 py-2">Multi-dimensional arrays</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>dict</code></td>
                <td className="border border-gray-200 px-4 py-2">JSONB</td>
                <td className="border border-gray-200 px-4 py-2">Binary JSON with indexing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Example</h2>
        <PreCodeBlock title="PostgreSQL Full CRUD Example">
{`from akron import Akron
from pydantic import BaseModel
from akron.models import ModelMixin
from datetime import datetime
from typing import List, Dict, Optional

# Define your model with advanced types
class Article(BaseModel, ModelMixin):
    id: int
    title: str
    content: str
    author: str
    tags: List[str]  # PostgreSQL Array
    metadata: Dict[str, any]  # PostgreSQL JSONB
    published: bool = False
    created_at: datetime
    view_count: int = 0

# Connect to PostgreSQL database
db = Akron("postgres://user:password@localhost:5432/blog")

# Create table
Article.create_table(db)

# Insert articles with complex data
article1 = Article(
    id=1,
    title="Getting Started with PostgreSQL",
    content="PostgreSQL is a powerful database...",
    author="Jane Doe",
    tags=["database", "postgresql", "tutorial"],
    metadata={
        "category": "technology",
        "difficulty": "beginner",
        "estimated_read_time": 5
    },
    created_at=datetime.now()
)

article2 = Article(
    id=2,
    title="Advanced SQL Queries",
    content="Learn advanced querying techniques...",
    author="John Smith",
    tags=["sql", "advanced", "queries"],
    metadata={
        "category": "database",
        "difficulty": "advanced",
        "estimated_read_time": 15
    },
    created_at=datetime.now(),
    published=True,
    view_count=150
)

Article.insert(db, article1)
Article.insert(db, article2)

# Query articles
all_articles = Article.select(db)
print(f"Total articles: {len(all_articles)}")

# Find published articles
published_articles = Article.select(db, where={"published": True})
print(f"Published articles: {len(published_articles)}")

# Search by tags (PostgreSQL array operations)
tech_articles = db.execute_raw(
    "SELECT * FROM articles WHERE 'technology' = ANY(tags);"
)

# JSON queries on metadata
beginner_articles = db.execute_raw(
    "SELECT * FROM articles WHERE metadata->>'difficulty' = 'beginner';"
)

# Update article
Article.update(db, {"id": 1}, {"published": True, "view_count": 50})

# Complex update with JSON
Article.update(db, {"id": 1}, {
    "metadata": {
        "category": "technology",
        "difficulty": "beginner",
        "estimated_read_time": 5,
        "updated": True
    }
})

print("PostgreSQL operations completed successfully!")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced PostgreSQL Features</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">JSON Operations</h3>
        <PreCodeBlock>
{`# Query JSON data
json_queries = [
    # Extract JSON field
    "SELECT title, metadata->>'category' as category FROM articles;",
    
    # Filter by JSON field
    "SELECT * FROM articles WHERE metadata->>'difficulty' = 'advanced';",
    
    # Check if JSON key exists
    "SELECT * FROM articles WHERE metadata ? 'estimated_read_time';",
    
    # Update JSON field
    "UPDATE articles SET metadata = metadata || '{\"featured\": true}' WHERE id = 1;"
]

for query in json_queries:
    result = db.execute_raw(query)
    print(f"Query result: {list(result)}")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Array Operations</h3>
        <PreCodeBlock>
{`# Array operations
array_queries = [
    # Find articles with specific tag
    "SELECT * FROM articles WHERE 'postgresql' = ANY(tags);",
    
    # Find articles with multiple tags
    "SELECT * FROM articles WHERE tags @> ARRAY['database', 'tutorial'];",
    
    # Count array elements
    "SELECT title, array_length(tags, 1) as tag_count FROM articles;",
    
    # Expand array to rows
    "SELECT title, unnest(tags) as tag FROM articles;"
]

for query in array_queries:
    result = db.execute_raw(query)
    print(f"Array query result: {list(result)}")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Full-Text Search</h3>
        <PreCodeBlock>
{`# Create full-text search index
db.execute_raw("""
    ALTER TABLE articles ADD COLUMN search_vector tsvector;
    UPDATE articles SET search_vector = to_tsvector('english', title || ' ' || content);
    CREATE INDEX idx_articles_search ON articles USING gin(search_vector);
""")

# Perform full-text search
search_results = db.execute_raw("""
    SELECT title, author, ts_rank(search_vector, query) as rank
    FROM articles, plainto_tsquery('postgresql database') query
    WHERE search_vector @@ query
    ORDER BY rank DESC;
""")

for article in search_results:
    print(f"Found: {article['title']} (rank: {article['rank']})")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Window Functions</h3>
        <PreCodeBlock>
{`# Advanced analytics with window functions
analytics_queries = [
    # Ranking articles by view count
    """SELECT title, view_count, 
       RANK() OVER (ORDER BY view_count DESC) as rank
       FROM articles;""",
    
    # Running total of articles by author
    """SELECT author, title, created_at,
       COUNT(*) OVER (PARTITION BY author ORDER BY created_at) as article_number
       FROM articles ORDER BY author, created_at;""",
    
    # Moving average of view counts
    """SELECT title, view_count,
       AVG(view_count) OVER (ORDER BY created_at ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg
       FROM articles ORDER BY created_at;"""
]

for query in analytics_queries:
    result = db.execute_raw(query)
    print(f"Analytics result: {list(result)}")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Optimization</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Indexing Strategy</h4>
            <PreCodeBlock>
{`# B-tree indexes for equality and range queries
db.execute_raw("CREATE INDEX idx_articles_author ON articles(author);")
db.execute_raw("CREATE INDEX idx_articles_created ON articles(created_at);")

# GIN indexes for JSON and array operations
db.execute_raw("CREATE INDEX idx_articles_tags ON articles USING gin(tags);")
db.execute_raw("CREATE INDEX idx_articles_metadata ON articles USING gin(metadata);")

# Partial indexes for specific conditions
db.execute_raw("CREATE INDEX idx_published_articles ON articles(created_at) WHERE published = true;")

# Composite indexes for multi-column queries
db.execute_raw("CREATE INDEX idx_author_published ON articles(author, published);")  `}
            </PreCodeBlock>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Query Analysis</h4>
            <PreCodeBlock>
{`# Analyze query performance
result = db.execute_raw("""
    EXPLAIN (ANALYZE, BUFFERS) 
    SELECT * FROM articles 
    WHERE author = 'Jane Doe' AND published = true
    ORDER BY created_at DESC;
""")

for row in result:
    print(row)

# Check index usage
stats = db.execute_raw("""
    SELECT schemaname, tablename, indexname, idx_tup_read, idx_tup_fetch
    FROM pg_stat_user_indexes 
    WHERE tablename = 'articles';
""")

for stat in stats:
    print(f"Index {stat['indexname']}: {stat['idx_tup_read']} reads")`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CLI Commands</h2>
        <p className="text-gray-600 mb-4">
          Use Akron CLI for PostgreSQL database management:
        </p>
        
        <PreCodeBlock title="PostgreSQL CLI Examples">
{`# Create a table with complex schema
akron create-table articles --db "postgres://user:pass@localhost:5432/blog" \\
  --schema '{
    "id": "int", 
    "title": "str", 
    "content": "str", 
    "tags": "list", 
    "metadata": "dict",
    "published": "bool",
    "created_at": "datetime"
  }'

# Inspect database schema
akron inspect-schema --db "postgres://user:pass@localhost:5432/blog"

# Seed with complex data
akron seed articles --db "postgres://user:pass@localhost:5432/blog" \\
  --data '[{
    "id": 1, 
    "title": "Sample Article", 
    "content": "This is a sample...",
    "tags": ["sample", "test"],
    "metadata": {"category": "example"},
    "published": true,
    "created_at": "2024-01-01T00:00:00"
  }]'

# Execute PostgreSQL-specific queries
akron raw-sql --db "postgres://user:pass@localhost:5432/blog" \\
  --query "SELECT tablename FROM pg_tables WHERE schemaname = 'public';"

# Create migration with advanced features
akron makemigrations add_search_features \\
  --db "postgres://user:pass@localhost:5432/blog" \\
  --schema '{
    "id": "int",
    "title": "str",
    "content": "str", 
    "search_vector": "tsvector",
    "tags": "text[]",
    "metadata": "jsonb"
  }'`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">✅ Do</h3>
            <ul className="text-green-800 space-y-1">
              <li>• Use JSONB instead of JSON for better performance</li>
              <li>• Create appropriate indexes (B-tree, GIN, GiST)</li>
              <li>• Use prepared statements (Akron handles this)</li>
              <li>• Leverage PostgreSQL&apos;s advanced data types</li>
              <li>• Monitor query performance with EXPLAIN ANALYZE</li>
              <li>• Use connection pooling for production applications</li>
              <li>• Take advantage of PostgreSQL&apos;s concurrency features</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">❌ Don&apos;t</h3>
            <ul className="text-red-800 space-y-1">
              <li>• Use TEXT for large documents (consider external storage)</li>
              <li>• Create unnecessary indexes (they slow down writes)</li>
              <li>• Ignore PostgreSQL-specific features and optimizations</li>
              <li>• Use LIKE queries without proper indexing</li>
              <li>• Store binary data directly in the database</li>
              <li>• Forget to vacuum and analyze tables regularly</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Issues & Solutions</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Connection refused</h3>
            <p className="text-gray-600 mb-2">
              PostgreSQL server is not running or not accepting connections.
            </p>
            <PreCodeBlock>
{`# Check PostgreSQL service status
sudo systemctl status postgresql

# Start PostgreSQL service
sudo systemctl start postgresql

# Check if PostgreSQL is listening on the correct port
sudo netstat -tlnp | grep :5432`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Authentication failed</h3>
            <p className="text-gray-600 mb-2">
              Incorrect credentials or authentication method configuration.
            </p>
            <PreCodeBlock>
{`# Check pg_hba.conf for authentication settings
# Common entry for local development:
# local   all   all   trust
# host    all   all   127.0.0.1/32   md5

# Create user and grant privileges
CREATE USER akron_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE blog TO akron_user;`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Slow queries</h3>
            <p className="text-gray-600 mb-2">
              Queries taking too long due to missing indexes or poor query design.
            </p>
            <PreCodeBlock>
{`# Enable slow query logging
ALTER SYSTEM SET log_min_duration_statement = 1000;  -- Log queries > 1 second
SELECT pg_reload_conf();

# Find slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/docs/api/constructor" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Akron Constructor</h3>
            <p className="text-gray-600 text-sm">Learn about connection setup and configuration</p>
          </a>
          
          <a href="/docs/cli/create-table" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">CLI Commands</h3>
            <p className="text-gray-600 text-sm">Command-line tools for database management</p>
          </a>
          
          <a href="/docs/database-support/mongodb" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">MongoDB Support</h3>
            <p className="text-gray-600 text-sm">Compare with MongoDB document features</p>
          </a>
          
          <a href="/docs/api/models" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Model Definitions</h3>
            <p className="text-gray-600 text-sm">Learn about Pydantic model integration</p>
          </a>
        </div>
      </section>
    </DocsLayout>
  );
}
