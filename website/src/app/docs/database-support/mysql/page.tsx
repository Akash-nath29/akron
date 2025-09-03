import { DocsLayout, PreCodeBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function MySQLPage() {
  return (
    <DocsLayout 
      title="MySQL Support" 
      description="Complete guide to using MySQL with Akron ORM - powerful relational database for web applications and enterprise systems."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          MySQL is one of the world&apos;s most popular relational databases, known for its reliability, 
          performance, and ease of use. It&apos;s perfect for web applications, e-commerce sites, and 
          data warehousing applications.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🐬 MySQL Advantages</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• High performance and scalability</li>
            <li>• ACID compliance with InnoDB</li>
            <li>• Rich SQL feature set</li>
            <li>• Excellent replication support</li>
            <li>• Strong community and enterprise support</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
        <p className="text-gray-600 mb-4">
          Before using MySQL with Akron, ensure you have the required dependency installed:
        </p>
        
        <PreCodeBlock title="Install MySQL Connector">
{`# Install the MySQL connector
pip install mysql-connector-python

# Or using conda
conda install mysql-connector-python`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Setup</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Connection</h3>
        <PreCodeBlock title="MySQL Connection Examples">
{`from akron import Akron

# Basic connection
db = Akron("mysql://user:password@localhost:3306/database")

# Connection with specific options
db = Akron("mysql://user:password@localhost:3306/database?charset=utf8mb4&autocommit=true")

# Remote MySQL server
db = Akron("mysql://admin:secret@mysql.example.com:3306/production_db")

# Connection with SSL
db = Akron("mysql://user:pass@localhost:3306/db?ssl_disabled=false&ssl_verify_cert=true")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection URL Format</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          <CodeBlock>mysql://[user]:[password]@[host]:[port]/[database]?[options]</CodeBlock>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600"><strong>user:</strong> MySQL username</p>
            <p className="text-gray-600"><strong>password:</strong> MySQL password</p>
            <p className="text-gray-600"><strong>host:</strong> Server hostname or IP (default: localhost)</p>
            <p className="text-gray-600"><strong>port:</strong> MySQL port (default: 3306)</p>
            <p className="text-gray-600"><strong>database:</strong> Database name</p>
            <p className="text-gray-600"><strong>options:</strong> Additional connection parameters</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Types</h2>
        <p className="text-gray-600 mb-4">
          MySQL offers a rich set of data types. Akron automatically maps Python types to appropriate MySQL types:
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">Python Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left">MySQL Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Range/Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>int</code></td>
                <td className="border border-gray-200 px-4 py-2">INT</td>
                <td className="border border-gray-200 px-4 py-2">-2,147,483,648 to 2,147,483,647</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>str</code></td>
                <td className="border border-gray-200 px-4 py-2">VARCHAR(255)</td>
                <td className="border border-gray-200 px-4 py-2">UTF-8 strings up to 255 chars</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>float</code></td>
                <td className="border border-gray-200 px-4 py-2">DOUBLE</td>
                <td className="border border-gray-200 px-4 py-2">Double precision floating point</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>bool</code></td>
                <td className="border border-gray-200 px-4 py-2">BOOLEAN</td>
                <td className="border border-gray-200 px-4 py-2">TRUE/FALSE (stored as TINYINT)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>datetime</code></td>
                <td className="border border-gray-200 px-4 py-2">DATETIME</td>
                <td className="border border-gray-200 px-4 py-2">YYYY-MM-DD HH:MM:SS</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>date</code></td>
                <td className="border border-gray-200 px-4 py-2">DATE</td>
                <td className="border border-gray-200 px-4 py-2">YYYY-MM-DD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Example</h2>
        <PreCodeBlock title="MySQL Full CRUD Example">
{`from akron import Akron
from pydantic import BaseModel
from akron.models import ModelMixin
from datetime import datetime

# Define your model
class Product(BaseModel, ModelMixin):
    id: int
    name: str
    description: str
    price: float
    in_stock: bool = True
    created_at: datetime

# Connect to MySQL database
db = Akron("mysql://user:password@localhost:3306/ecommerce")

# Create table
Product.create_table(db)

# Insert products
product1 = Product(
    id=1, 
    name="Laptop Pro", 
    description="High-performance laptop", 
    price=1299.99,
    created_at=datetime.now()
)

product2 = Product(
    id=2, 
    name="Wireless Mouse", 
    description="Ergonomic wireless mouse", 
    price=29.99,
    created_at=datetime.now()
)

Product.insert(db, product1)
Product.insert(db, product2)

# Query products
all_products = Product.select(db)
print(f"Total products: {len(all_products)}")

# Find expensive products
expensive_products = Product.select(db, where={"price": {"$gt": 100}})
print(f"Expensive products: {len(expensive_products)}")

# Update product price
Product.update(db, {"id": 1}, {"price": 1199.99})

# Mark product as out of stock
Product.update(db, {"id": 2}, {"in_stock": False})

# Delete discontinued products
Product.delete(db, {"in_stock": False})

# Get final inventory
inventory = Product.select(db, where={"in_stock": True})
print(f"Products in stock: {len(inventory)}")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Optimization</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">MySQL-Specific Optimizations</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Indexing Strategy</h4>
            <p className="text-green-800 mb-2">Create indexes on frequently queried columns:</p>
            <PreCodeBlock>
{`# Create indexes for better query performance
db.execute_raw("CREATE INDEX idx_product_name ON products(name);")
db.execute_raw("CREATE INDEX idx_product_price ON products(price);")
db.execute_raw("CREATE INDEX idx_product_created ON products(created_at);")

# Composite index for complex queries
db.execute_raw("CREATE INDEX idx_product_stock_price ON products(in_stock, price);")`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Query Optimization</h4>
            <p className="text-green-800 mb-2">Use EXPLAIN to analyze query performance:</p>
            <PreCodeBlock>
{`# Analyze query execution plan
result = db.execute_raw("EXPLAIN SELECT * FROM products WHERE price > 100 AND in_stock = true;")
for row in result:
    print(row)`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Connection Pooling</h4>
            <p className="text-green-800 mb-2">MySQL connector automatically manages connection pooling:</p>
            <PreCodeBlock>
{`# Connection with pool settings
db = Akron("mysql://user:pass@localhost:3306/db?pool_name=akron_pool&pool_size=10")`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CLI Commands</h2>
        <p className="text-gray-600 mb-4">
          Use Akron CLI for MySQL database management:
        </p>
        
        <PreCodeBlock title="MySQL CLI Examples">
{`# Create a table
akron create-table products --db "mysql://user:pass@localhost:3306/store" \\
  --schema '{"id": "int", "name": "str", "price": "float", "in_stock": "bool"}'

# Inspect database schema
akron inspect-schema --db "mysql://user:pass@localhost:3306/store"

# Seed with sample data
akron seed products --db "mysql://user:pass@localhost:3306/store" \\
  --data '[{"id": 1, "name": "Laptop", "price": 999.99, "in_stock": true}]'

# Execute custom SQL
akron raw-sql --db "mysql://user:pass@localhost:3306/store" \\
  --query "SHOW TABLES;"

# Create migration
akron makemigrations add_products_table \\
  --db "mysql://user:pass@localhost:3306/store" \\
  --schema '{"id": "int", "name": "str", "price": "float", "category": "str"}'

# Run migrations
akron migrate --db "mysql://user:pass@localhost:3306/store"`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Features</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Transactions</h3>
        <PreCodeBlock>
{`# Manual transaction control
try:
    db.execute_raw("START TRANSACTION;")
    
    # Multiple operations
    Product.insert(db, product1)
    Product.insert(db, product2)
    Product.update(db, {"id": 1}, {"price": 1099.99})
    
    db.execute_raw("COMMIT;")
    print("Transaction completed successfully")
except Exception as e:
    db.execute_raw("ROLLBACK;")
    print(f"Transaction failed: {e}")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Stored Procedures</h3>
        <PreCodeBlock>
{`# Create a stored procedure
procedure_sql = """
CREATE PROCEDURE GetProductsByPrice(IN min_price DECIMAL(10,2))
BEGIN
    SELECT * FROM products WHERE price >= min_price ORDER BY price;
END
"""
db.execute_raw(procedure_sql)

# Call the stored procedure
result = db.execute_raw("CALL GetProductsByPrice(100.00);")
for row in result:
    print(row)`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Full-Text Search</h3>
        <PreCodeBlock>
{`# Create full-text index
db.execute_raw("ALTER TABLE products ADD FULLTEXT(name, description);")

# Perform full-text search
search_results = db.execute_raw(
    "SELECT * FROM products WHERE MATCH(name, description) AGAINST('laptop wireless' IN NATURAL LANGUAGE MODE);"
)
for product in search_results:
    print(f"Found: {product['name']}")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">✅ Do</h3>
            <ul className="text-green-800 space-y-1">
              <li>• Use InnoDB storage engine for ACID compliance</li>
              <li>• Create appropriate indexes for query optimization</li>
              <li>• Use prepared statements (Akron does this automatically)</li>
              <li>• Monitor slow query log for performance issues</li>
              <li>• Use connection pooling for high-traffic applications</li>
              <li>• Regularly backup your databases</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">❌ Don&apos;t</h3>
            <ul className="text-red-800 space-y-1">
              <li>• Store large binary data directly in MySQL</li>
              <li>• Use SELECT * in production queries</li>
              <li>• Ignore MySQL error logs</li>
              <li>• Create too many indexes (affects write performance)</li>
              <li>• Use MyISAM for applications requiring transactions</li>
              <li>• Store sensitive data without encryption</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Issues & Solutions</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Access denied for user</h3>
            <p className="text-gray-600 mb-2">
              Authentication failed. Check username, password, and user privileges.
            </p>
            <PreCodeBlock>
{`# Grant necessary privileges in MySQL
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Connection timeout</h3>
            <p className="text-gray-600 mb-2">
              Network issues or server overload. Configure timeout settings.
            </p>
            <PreCodeBlock>
{`# Connection with timeout settings
db = Akron("mysql://user:pass@host:3306/db?connect_timeout=10&read_timeout=30")`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Table doesn&apos;t exist</h3>
            <p className="text-gray-600 mb-2">
              Ensure the table exists or create it using Akron.
            </p>
            <PreCodeBlock>
{`# Check if table exists and create if needed
try:
    Product.select(db, limit=1)
except Exception:
    print("Table doesn't exist, creating...")
    Product.create_table(db)`}
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
          
          <a href="/docs/database-support/postgresql" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">PostgreSQL Support</h3>
            <p className="text-gray-600 text-sm">Compare with PostgreSQL features</p>
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
