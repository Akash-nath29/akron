import { DocsLayout, PreCodeBlock, CodeBlock } from "../../../../components/DocsLayout";

export default function MongoDBPage() {
  return (
    <DocsLayout 
      title="MongoDB Support" 
      description="Complete guide to using MongoDB with Akron ORM - flexible document database perfect for modern applications and rapid development."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like 
          documents. It&apos;s designed for scalability, performance, and high availability, making it 
          ideal for modern applications that need to handle diverse data types and rapid development cycles.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">🍃 MongoDB Advantages</h3>
          <ul className="text-green-800 space-y-1">
            <li>• Flexible schema design with JSON-like documents</li>
            <li>• Horizontal scaling with automatic sharding</li>
            <li>• Rich query language with aggregation framework</li>
            <li>• High performance for read and write operations</li>
            <li>• Built-in replication and high availability</li>
            <li>• Native support for geospatial data</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
        <p className="text-gray-600 mb-4">
          Before using MongoDB with Akron, ensure you have the required dependency installed:
        </p>
        
        <PreCodeBlock title="Install MongoDB Driver">
{`# Install the MongoDB driver
pip install pymongo

# For additional features (optional)
pip install pymongo[srv]  # For DNS SRV record support

# Using conda
conda install pymongo`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Setup</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Connection</h3>
        <PreCodeBlock title="MongoDB Connection Examples">
{`from akron import Akron

# Local MongoDB instance
db = Akron("mongodb://localhost:27017/mydatabase")

# MongoDB with authentication
db = Akron("mongodb://username:password@localhost:27017/mydatabase")

# MongoDB Atlas (cloud)
db = Akron("mongodb+srv://username:password@cluster.mongodb.net/mydatabase")

# MongoDB with replica set
db = Akron("mongodb://user:pass@host1:27017,host2:27017,host3:27017/db?replicaSet=myReplicaSet")

# MongoDB with connection options
db = Akron("mongodb://localhost:27017/db?authSource=admin&ssl=true&retryWrites=true")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection URL Format</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          <CodeBlock>mongodb://[username:password@]host1[:port1][,host2[:port2],...]/database[?options]</CodeBlock>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600"><strong>username:password:</strong> Authentication credentials (optional)</p>
            <p className="text-gray-600"><strong>host:port:</strong> MongoDB server(s) (default port: 27017)</p>
            <p className="text-gray-600"><strong>database:</strong> Database name</p>
            <p className="text-gray-600"><strong>options:</strong> Connection parameters</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Connection Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Authentication</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li><code>authSource=admin</code> - Auth database</li>
              <li><code>authMechanism=SCRAM-SHA-256</code> - Auth method</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Connection</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li><code>ssl=true</code> - Enable SSL</li>
              <li><code>retryWrites=true</code> - Retry failed writes</li>
              <li><code>maxPoolSize=50</code> - Connection pool size</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Document Structure</h2>
        <p className="text-gray-600 mb-4">
          MongoDB stores data as BSON documents. Akron automatically converts between Python objects and BSON:
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">Python Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left">BSON Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>int</code></td>
                <td className="border border-gray-200 px-4 py-2">32-bit/64-bit Integer</td>
                <td className="border border-gray-200 px-4 py-2">42, 2147483648</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>str</code></td>
                <td className="border border-gray-200 px-4 py-2">String</td>
                <td className="border border-gray-200 px-4 py-2">&quot;Hello World&quot;</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>float</code></td>
                <td className="border border-gray-200 px-4 py-2">Double</td>
                <td className="border border-gray-200 px-4 py-2">3.14159</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>bool</code></td>
                <td className="border border-gray-200 px-4 py-2">Boolean</td>
                <td className="border border-gray-200 px-4 py-2">true, false</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>list</code></td>
                <td className="border border-gray-200 px-4 py-2">Array</td>
                <td className="border border-gray-200 px-4 py-2">[1, 2, 3]</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>dict</code></td>
                <td className="border border-gray-200 px-4 py-2">Document</td>
                <td className="border border-gray-200 px-4 py-2">{`{"key": "value"}`}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>datetime</code></td>
                <td className="border border-gray-200 px-4 py-2">Date</td>
                <td className="border border-gray-200 px-4 py-2">ISODate(&quot;2024-01-01&quot;)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2"><code>ObjectId</code></td>
                <td className="border border-gray-200 px-4 py-2">ObjectId</td>
                <td className="border border-gray-200 px-4 py-2">ObjectId(&quot;507f1f77...&quot;)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Example</h2>
        <PreCodeBlock title="MongoDB Full CRUD Example">
{`from akron import Akron
from pydantic import BaseModel
from akron.models import ModelMixin
from datetime import datetime
from typing import List, Dict, Optional
from bson import ObjectId

# Define your model for MongoDB documents
class BlogPost(BaseModel, ModelMixin):
    _id: Optional[str] = None  # MongoDB ObjectId
    title: str
    content: str
    author: Dict[str, str]
    tags: List[str]
    metadata: Dict[str, any]
    comments: List[Dict[str, any]] = []
    published: bool = False
    view_count: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None

# Connect to MongoDB
db = Akron("mongodb://localhost:27017/blog")

# Note: MongoDB doesn't require explicit table creation
# Collections are created automatically when first document is inserted

# Insert blog posts
post1 = BlogPost(
    title="Getting Started with MongoDB",
    content="MongoDB is a document database...",
    author={
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "bio": "Database enthusiast"
    },
    tags=["mongodb", "nosql", "database", "tutorial"],
    metadata={
        "category": "tutorial",
        "difficulty": "beginner",
        "estimated_read_time": 8,
        "featured": True
    },
    created_at=datetime.now()
)

post2 = BlogPost(
    title="Advanced MongoDB Aggregation",
    content="Learn complex aggregation pipelines...",
    author={
        "name": "Bob Smith",
        "email": "bob@example.com",
        "bio": "Senior Developer"
    },
    tags=["mongodb", "aggregation", "advanced"],
    metadata={
        "category": "advanced",
        "difficulty": "expert",
        "estimated_read_time": 20
    },
    comments=[
        {
            "author": "Jane Doe",
            "content": "Excellent tutorial!",
            "created_at": datetime.now()
        }
    ],
    published=True,
    view_count=342,
    created_at=datetime.now()
)

# Insert documents
BlogPost.insert(db, post1)
BlogPost.insert(db, post2)

# Query documents
all_posts = BlogPost.select(db)
print(f"Total blog posts: {len(all_posts)}")

# Find published posts
published_posts = BlogPost.select(db, where={"published": True})
print(f"Published posts: {len(published_posts)}")

# Complex queries with MongoDB operators
# Find posts by specific author
alice_posts = BlogPost.select(db, where={"author.name": "Alice Johnson"})

# Find posts with specific tags
tutorial_posts = BlogPost.select(db, where={"tags": {"$in": ["tutorial"]}})

# Find posts with high view count
popular_posts = BlogPost.select(db, where={"view_count": {"$gte": 100}})

# Text search (requires text index)
# db.execute_raw("db.blogposts.createIndex({title: 'text', content: 'text'})")
# search_results = BlogPost.select(db, where={"$text": {"$search": "mongodb tutorial"}})

# Update documents
BlogPost.update(
    db, 
    {"title": "Getting Started with MongoDB"}, 
    {
        "published": True, 
        "view_count": 45,
        "updated_at": datetime.now()
    }
)

# Add comment to a post
BlogPost.update(
    db,
    {"title": "Advanced MongoDB Aggregation"},
    {
        "$push": {
            "comments": {
                "author": "Charlie Brown",
                "content": "Very detailed explanation!",
                "created_at": datetime.now()
            }
        }
    }
)

# Increment view count
BlogPost.update(
    db,
    {"title": "Getting Started with MongoDB"},
    {"$inc": {"view_count": 1}}
)

print("MongoDB operations completed successfully!")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced MongoDB Features</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Aggregation Pipeline</h3>
        <PreCodeBlock>
{`# Complex aggregation queries
aggregation_pipeline = [
    # Match published posts
    {"$match": {"published": True}},
    
    # Group by author
    {"$group": {
        "_id": "$author.name",
        "post_count": {"$sum": 1},
        "total_views": {"$sum": "$view_count"},
        "avg_read_time": {"$avg": "$metadata.estimated_read_time"},
        "posts": {"$push": {
            "title": "$title",
            "views": "$view_count",
            "tags": "$tags"
        }}
    }},
    
    # Sort by total views
    {"$sort": {"total_views": -1}},
    
    # Add computed fields
    {"$addFields": {
        "engagement_score": {"$multiply": ["$post_count", "$total_views"]}
    }},
    
    # Limit results
    {"$limit": 10}
]

# Execute aggregation
result = db.execute_raw(f"db.blogposts.aggregate({aggregation_pipeline})")
for author_stats in result:
    print(f"Author: {author_stats['_id']}")
    print(f"Posts: {author_stats['post_count']}")
    print(f"Total Views: {author_stats['total_views']}")
    print(f"Engagement Score: {author_stats['engagement_score']}")
    print("---")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Indexing Strategy</h3>
        <PreCodeBlock>
{`# Create various types of indexes for better performance

# Single field indexes
db.execute_raw("db.blogposts.createIndex({'author.name': 1})")
db.execute_raw("db.blogposts.createIndex({'created_at': -1})")
db.execute_raw("db.blogposts.createIndex({'published': 1})")

# Compound indexes
db.execute_raw("db.blogposts.createIndex({'published': 1, 'created_at': -1})")
db.execute_raw("db.blogposts.createIndex({'author.name': 1, 'published': 1})")

# Text index for full-text search
db.execute_raw("db.blogposts.createIndex({'title': 'text', 'content': 'text'})")

# Multikey index for arrays
db.execute_raw("db.blogposts.createIndex({'tags': 1})")

# Sparse index (only indexes documents with the field)
db.execute_raw("db.blogposts.createIndex({'updated_at': 1}, {'sparse': true})")

# Partial index (only indexes documents matching condition)
db.execute_raw("db.blogposts.createIndex({'view_count': 1}, {'partialFilterExpression': {'view_count': {'$gt': 100}}})")

# Check index usage
index_stats = db.execute_raw("db.blogposts.getIndexes()")
for index in index_stats:
    print(f"Index: {index['name']} - {index['key']}")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Geospatial Queries</h3>
        <PreCodeBlock>
{`# Example with geospatial data
from pydantic import BaseModel
from akron.models import ModelMixin

class Location(BaseModel, ModelMixin):
    _id: Optional[str] = None
    name: str
    type: str  # restaurant, hotel, etc.
    location: Dict[str, any]  # GeoJSON format
    rating: float
    reviews: int

# Insert locations with geospatial data
cafe = Location(
    name="Central Cafe",
    type="restaurant",
    location={
        "type": "Point",
        "coordinates": [-73.9857, 40.7484]  # longitude, latitude (NYC)
    },
    rating=4.5,
    reviews=127
)

Location.insert(db, cafe)

# Create 2dsphere index for geospatial queries
db.execute_raw("db.locations.createIndex({'location': '2dsphere'})")

# Find locations near a point (within 1000 meters)
nearby_locations = db.execute_raw("""
db.locations.find({
    location: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [-73.9857, 40.7484]
            },
            $maxDistance: 1000
        }
    }
})
""")

# Find locations within a polygon
within_polygon = db.execute_raw("""
db.locations.find({
    location: {
        $geoWithin: {
            $geometry: {
                type: "Polygon",
                coordinates: [[
                    [-74.0, 40.7],
                    [-73.9, 40.7],
                    [-73.9, 40.8],
                    [-74.0, 40.8],
                    [-74.0, 40.7]
                ]]
            }
        }
    }
})
""")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Change Streams</h3>
        <PreCodeBlock>
{`# Monitor real-time changes (requires replica set)
def watch_blog_changes():
    # Watch for changes in the blogposts collection
    change_stream = db.execute_raw("db.blogposts.watch()")
    
    for change in change_stream:
        operation = change['operationType']
        if operation == 'insert':
            print(f"New post created: {change['fullDocument']['title']}")
        elif operation == 'update':
            print(f"Post updated: {change['documentKey']['_id']}")
        elif operation == 'delete':
            print(f"Post deleted: {change['documentKey']['_id']}")

# Watch specific operations
def watch_published_posts():
    pipeline = [
        {
            "$match": {
                "fullDocument.published": True,
                "operationType": {"$in": ["insert", "update"]}
            }
        }
    ]
    
    change_stream = db.execute_raw(f"db.blogposts.watch({pipeline})")
    
    for change in change_stream:
        print(f"Published post activity: {change['fullDocument']['title']}")

# Note: Change streams require MongoDB replica set or sharded cluster`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Optimization</h2>
        
        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 mb-2">Query Optimization</h4>
            <PreCodeBlock>
{`# Use explain() to analyze query performance
explain_result = db.execute_raw("""
db.blogposts.find({
    "published": true,
    "author.name": "Alice Johnson"
}).explain("executionStats")
""")

print(f"Documents examined: {explain_result['executionStats']['totalDocsExamined']}")
print(f"Documents returned: {explain_result['executionStats']['totalDocsReturned']}")
print(f"Index used: {explain_result['executionStats']['indexName'] if 'indexName' in explain_result['executionStats'] else 'None'}")

# Optimize with projection (only return needed fields)
optimized_query = db.execute_raw("""
db.blogposts.find(
    {"published": true},
    {"title": 1, "author.name": 1, "created_at": 1, "_id": 0}
)
""")

# Use limit and skip for pagination
paginated_results = db.execute_raw("""
db.blogposts.find({"published": true})
.sort({"created_at": -1})
.skip(0)
.limit(10)
""")`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 mb-2">Connection Pooling</h4>
            <PreCodeBlock>
{`# Configure connection pool for production
db = Akron("mongodb://localhost:27017/blog?maxPoolSize=50&minPoolSize=5&maxIdleTimeMS=30000")

# Monitor connection pool statistics
pool_stats = db.execute_raw("db.serverStatus().connections")
print(f"Current connections: {pool_stats}")

# Use read preferences for read scaling
# Primary (default) - read from primary
# Secondary - read from secondary (eventual consistency)
# Nearest - read from nearest replica set member

db = Akron("mongodb://localhost:27017/blog?readPreference=secondary")`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CLI Commands</h2>
        <p className="text-gray-600 mb-4">
          Use Akron CLI for MongoDB database management:
        </p>
        
        <PreCodeBlock title="MongoDB CLI Examples">
{`# Note: MongoDB collections are created automatically, but you can still use create-table
akron create-table blogposts --db "mongodb://localhost:27017/blog" \\
  --schema '{
    "title": "str",
    "content": "str", 
    "author": "dict",
    "tags": "list",
    "published": "bool",
    "created_at": "datetime"
  }'

# Inspect database collections and documents
akron inspect-schema --db "mongodb://localhost:27017/blog"

# Seed with complex document data
akron seed blogposts --db "mongodb://localhost:27017/blog" \\
  --data '[{
    "title": "Sample Post",
    "content": "This is a sample blog post...",
    "author": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tags": ["sample", "tutorial"],
    "published": true,
    "created_at": "2024-01-01T00:00:00"
  }]'

# Execute MongoDB queries
akron raw-sql --db "mongodb://localhost:27017/blog" \\
  --query "db.blogposts.find({published: true}).limit(5)"

# Advanced aggregation query
akron raw-sql --db "mongodb://localhost:27017/blog" \\
  --query "db.blogposts.aggregate([
    {\$match: {published: true}},
    {\$group: {_id: '\$author.name', count: {\$sum: 1}}},
    {\$sort: {count: -1}}
  ])"

# Create indexes
akron raw-sql --db "mongodb://localhost:27017/blog" \\
  --query "db.blogposts.createIndex({'author.name': 1, 'published': 1})"

# Check collection stats
akron raw-sql --db "mongodb://localhost:27017/blog" \\
  --query "db.blogposts.stats()"

# Note: Migrations work differently in MongoDB due to its schemaless nature
# Migrations typically involve data transformations rather than schema changes`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">✅ Do</h3>
            <ul className="text-green-800 space-y-1">
              <li>• Design documents to minimize the need for joins</li>
              <li>• Use embedded documents for one-to-few relationships</li>
              <li>• Create appropriate indexes for your query patterns</li>
              <li>• Use aggregation pipelines for complex analytics</li>
              <li>• Implement proper error handling and retry logic</li>
              <li>• Use projection to limit returned data</li>
              <li>• Monitor performance with MongoDB profiler</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">❌ Don&apos;t</h3>
            <ul className="text-red-800 space-y-1">
              <li>• Create documents larger than 16MB</li>
              <li>• Use MongoDB for complex transactions across multiple documents</li>
              <li>• Ignore index usage and query performance</li>
              <li>• Store large binary files directly in documents</li>
              <li>• Create too many indexes (impacts write performance)</li>
              <li>• Use inefficient query patterns like regex without anchors</li>
              <li>• Forget to handle ObjectId conversion properly</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Issues & Solutions</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Connection timeout</h3>
            <p className="text-gray-600 mb-2">
              MongoDB server is not reachable or connection parameters are incorrect.
            </p>
            <PreCodeBlock>
{`# Check MongoDB service status
sudo systemctl status mongod

# Start MongoDB service
sudo systemctl start mongod

# Verify MongoDB is listening
sudo netstat -tlnp | grep :27017

# Test connection with MongoDB client
mongo --host localhost --port 27017`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Authentication failed</h3>
            <p className="text-gray-600 mb-2">
              Incorrect credentials or authentication is not properly configured.
            </p>
            <PreCodeBlock>
{`# Enable authentication in MongoDB config
# Edit /etc/mongod.conf:
# security:
#   authorization: enabled

# Create admin user
mongo admin
db.createUser({
  user: "admin",
  pwd: "secure_password",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})

# Create database-specific user
use blog
db.createUser({
  user: "blog_user",
  pwd: "blog_password", 
  roles: ["readWrite"]
})`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Slow queries</h3>
            <p className="text-gray-600 mb-2">
              Queries taking too long due to missing indexes or inefficient query patterns.
            </p>
            <PreCodeBlock>
{`# Enable profiler to capture slow queries
db.setProfilingLevel(2, { slowms: 100 })  # Log queries > 100ms

# Check slow queries
db.system.profile.find().sort({ts: -1}).limit(5)

# Analyze query with explain
db.collection.find({field: value}).explain("executionStats")

# Common optimizations:
# 1. Add indexes for frequently queried fields
db.collection.createIndex({field: 1})

# 2. Use compound indexes for multi-field queries  
db.collection.createIndex({field1: 1, field2: 1})

# 3. Use projection to limit data transfer
db.collection.find({query}, {field1: 1, field2: 1})`}
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
          
          <a href="/docs/database-support/sqlite" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">SQLite Support</h3>
            <p className="text-gray-600 text-sm">Compare with relational database features</p>
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
