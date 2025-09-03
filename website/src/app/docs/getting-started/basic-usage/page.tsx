import { DocsLayout, PreCodeBlock } from "../../../../components/DocsLayout";

export default function BasicUsagePage() {
  return (
    <DocsLayout 
      title="Basic Usage" 
      description="Master the fundamentals of Akron ORM with comprehensive examples covering all core concepts and operations."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Concepts</h2>
        <p className="text-gray-600 mb-4">
          This guide covers the fundamental concepts you need to master Akron ORM. 
          You&apos;ll learn about connections, models, schemas, and all CRUD operations with practical examples.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📚 What You&apos;ll Master</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Database connections and configuration</li>
            <li>• Model definition with Pydantic integration</li>
            <li>• Schema design and table relationships</li>
            <li>• Complete CRUD operations</li>
            <li>• Query patterns and filtering</li>
            <li>• Error handling and best practices</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Connections</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection Basics</h3>
        <p className="text-gray-600 mb-4">
          Akron uses connection URLs to determine which database driver to use. The URL scheme automatically selects the appropriate backend:
        </p>

        <PreCodeBlock title="Connection Examples">
{`from akron import Akron

# SQLite - File-based database
db = Akron("sqlite:///my_app.db")

# SQLite - In-memory database (testing)
db = Akron("sqlite:///:memory:")

# MySQL - Relational database server
db = Akron("mysql://username:password@localhost:3306/database")

# PostgreSQL - Advanced relational database
db = Akron("postgres://username:password@localhost:5432/database")

# MongoDB - Document database
db = Akron("mongodb://localhost:27017/database")

# Close connection when done
db.close()`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Connection Management</h3>
        <p className="text-gray-600 mb-4">
          Use context managers for automatic connection cleanup:
        </p>

        <PreCodeBlock title="Context Manager Usage">
{`from akron import Akron

# Recommended: Automatic connection management
with Akron("sqlite:///app.db") as db:
    # Your database operations here
    result = db.find("users", {"active": True})
    # Connection automatically closed when exiting the block

# Environment-based configuration
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///default.db")
with Akron(DATABASE_URL) as db:
    # Production-ready connection handling
    pass`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Connection Parameters</h3>
        <p className="text-gray-600 mb-4">
          Add connection parameters for production configurations:
        </p>

        <PreCodeBlock title="Advanced Connection Options">
{`# MySQL with connection options
db = Akron("mysql://user:pass@host:3306/db?charset=utf8mb4&autocommit=true")

# PostgreSQL with SSL
db = Akron("postgres://user:pass@host:5432/db?sslmode=require")

# MongoDB with authentication and options
db = Akron("mongodb://user:pass@host:27017/db?authSource=admin&ssl=true")

# Connection pooling (for supported databases)
db = Akron("mysql://user:pass@host:3306/db?pool_size=10&max_overflow=20")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Model Definition</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Models</h3>
        <p className="text-gray-600 mb-4">
          Define your data models using Pydantic for automatic validation and type safety:
        </p>

        <PreCodeBlock title="Simple Model Definition">
{`from pydantic import BaseModel, EmailStr, validator
from akron.models import ModelMixin
from datetime import datetime
from typing import Optional

# Basic user model
class User(BaseModel, ModelMixin):
    id: int
    username: str
    email: EmailStr  # Automatic email validation
    age: Optional[int] = None
    is_active: bool = True
    created_at: datetime
    
    # Custom validation
    @validator('age')
    def validate_age(cls, v):
        if v is not None and (v < 0 or v > 150):
            raise ValueError('Age must be between 0 and 150')
        return v
    
    @validator('username')
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters')
        return v

# Product model with more complex fields
class Product(BaseModel, ModelMixin):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    category: str
    in_stock: bool = True
    tags: list = []  # Will be stored as JSON string
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    @validator('price')
    def validate_price(cls, v):
        if v < 0:
            raise ValueError('Price cannot be negative')
        return v`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Advanced Model Features</h3>
        <p className="text-gray-600 mb-4">
          Use advanced Pydantic features for robust data handling:
        </p>

        <PreCodeBlock title="Advanced Model Examples">
{`from pydantic import BaseModel, Field, root_validator
from enum import Enum
from typing import List, Dict, Union

class OrderStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class Address(BaseModel):
    street: str
    city: str
    state: str
    zip_code: str = Field(..., regex=r'\\d{5}(-\\d{4})?')
    country: str = "USA"

class Order(BaseModel, ModelMixin):
    id: int
    customer_id: int
    status: OrderStatus = OrderStatus.PENDING
    items: List[Dict[str, Union[str, int, float]]]
    total_amount: float = Field(..., gt=0, description="Order total in USD")
    shipping_address: Address
    billing_address: Optional[Address] = None
    notes: Optional[str] = Field(None, max_length=500)
    created_at: datetime
    
    @root_validator
    def validate_addresses(cls, values):
        # Use shipping address as billing if not provided
        if not values.get('billing_address'):
            values['billing_address'] = values.get('shipping_address')
        return values
    
    @validator('items')
    def validate_items(cls, v):
        if not v:
            raise ValueError('Order must have at least one item')
        return v

# Usage example
address = Address(
    street="123 Main St",
    city="Anytown",
    state="CA",
    zip_code="12345"
)

order = Order(
    id=1,
    customer_id=101,
    items=[
        {"product": "Laptop", "quantity": 1, "price": 999.99},
        {"product": "Mouse", "quantity": 2, "price": 29.99}
    ],
    total_amount=1059.97,
    shipping_address=address,
    created_at=datetime.now()
)`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Schema Management</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Schema Definition</h3>
        <p className="text-gray-600 mb-4">
          Define table schemas using simple type mappings or let Akron infer them from your models:
        </p>

        <PreCodeBlock title="Schema Definition Methods">
{`from akron import Akron

db = Akron("sqlite:///app.db")

# Method 1: Explicit schema definition
user_schema = {
    "id": "int",
    "username": "str",
    "email": "str", 
    "age": "int",
    "is_active": "bool",
    "created_at": "str"  # ISO datetime string
}

db.create_table("users", user_schema)

# Method 2: Schema with constraints
product_schema = {
    "id": "int",
    "name": "str",
    "price": "float",
    "category_id": "int->categories.id",  # Foreign key
    "created_at": "str"
}

db.create_table("products", product_schema)

# Method 3: Let model create its own table (recommended)
User.create_table(db)
Product.create_table(db)

# Method 4: Conditional table creation
if not db.table_exists("users"):
    User.create_table(db)`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Type Mapping</h3>
        <p className="text-gray-600 mb-4">
          Understand how Python types map to database types:
        </p>

        <PreCodeBlock title="Type System">
{`# Basic type mappings across databases
type_examples = {
    # Numeric types
    "id": "int",           # INTEGER/INT/NumberLong
    "price": "float",      # REAL/DOUBLE/Double
    
    # Text types  
    "name": "str",         # TEXT/VARCHAR/String
    "description": "str",  # TEXT/TEXT/String
    
    # Boolean
    "active": "bool",      # INTEGER(0,1)/BOOLEAN/Boolean
    
    # Date/Time
    "created_at": "str",   # TEXT(ISO)/DATETIME/ISODate
    
    # JSON/Complex (MongoDB native, others as JSON strings)
    "metadata": "dict",    # TEXT(JSON)/JSON/Object
    "tags": "list",        # TEXT(JSON)/JSON/Array
}

# Database-specific optimizations
mysql_schema = {
    "id": "int",
    "username": "str",     # Becomes VARCHAR(255)
    "bio": "text",         # Becomes TEXT for long content
    "created_at": "datetime"  # Becomes DATETIME
}

postgres_schema = {
    "id": "int",
    "data": "jsonb",       # PostgreSQL native JSONB
    "tags": "text[]",      # PostgreSQL array type
    "coords": "point"      # PostgreSQL geometric type
}

mongo_schema = {
    # MongoDB is schemaless, but Akron provides structure
    "id": "int",
    "nested": "dict",      # Native object support
    "array": "list",       # Native array support
    "geo": "geojson"       # GeoJSON support
}`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CRUD Operations</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Operations</h3>
        <p className="text-gray-600 mb-4">
          Insert data using both raw dictionaries and model instances:
        </p>

        <PreCodeBlock title="Create/Insert Examples">
{`from akron import Akron
from datetime import datetime

db = Akron("sqlite:///app.db")

# Method 1: Insert raw dictionary
user_data = {
    "id": 1,
    "username": "alice",
    "email": "alice@example.com",
    "age": 28,
    "is_active": True,
    "created_at": datetime.now().isoformat()
}

user_id = db.insert("users", user_data)
print(f"Created user with ID: {user_id}")

# Method 2: Insert using model (recommended)
user = User(
    id=2,
    username="bob",
    email="bob@example.com",
    age=32,
    created_at=datetime.now()
)

# Validate and insert
try:
    user_id = User.insert(db, user)
    print(f"User {user.username} created successfully!")
except ValidationError as e:
    print(f"Validation failed: {e}")

# Method 3: Bulk insert
users = [
    User(id=3, username="charlie", email="charlie@example.com", age=25, created_at=datetime.now()),
    User(id=4, username="diana", email="diana@example.com", age=30, created_at=datetime.now()),
    User(id=5, username="eve", email="eve@example.com", age=27, created_at=datetime.now())
]

for user in users:
    User.insert(db, user)

print(f"Bulk inserted {len(users)} users")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Read Operations</h3>
        <p className="text-gray-600 mb-4">
          Query data with various filtering and sorting options:
        </p>

        <PreCodeBlock title="Read/Query Examples">
{`# Method 1: Get all records
all_users = User.select(db)
print(f"Total users: {len(all_users)}")

# Method 2: Get single record
alice = User.find(db, {"username": "alice"})
if alice:
    print(f"Found: {alice.username} ({alice.email})")

# Method 3: Filter with conditions
active_users = User.select(db, where={"is_active": True})
print(f"Active users: {len(active_users)}")

# Method 4: Complex filtering (MongoDB-style operators)
young_users = User.select(db, where={"age": {"$lt": 30}})
senior_users = User.select(db, where={"age": {"$gte": 30}})

# Method 5: Multiple conditions
young_active = User.select(db, where={
    "age": {"$lt": 30},
    "is_active": True
})

# Method 6: Raw SQL/Query for complex operations
if db.driver_type == "sqlite":
    result = db.execute_raw("SELECT * FROM users WHERE age BETWEEN 25 AND 35")
elif db.driver_type == "mongodb":
    result = db.execute_raw("db.users.find({age: {$gte: 25, $lte: 35}})")

# Method 7: Pagination
page_1 = User.select(db, limit=10, offset=0)
page_2 = User.select(db, limit=10, offset=10)

# Method 8: Ordering (database-specific)
if db.driver_type in ["sqlite", "mysql", "postgres"]:
    ordered_users = db.execute_raw("SELECT * FROM users ORDER BY created_at DESC")
elif db.driver_type == "mongodb":
    ordered_users = db.execute_raw("db.users.find().sort({created_at: -1})")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Update Operations</h3>
        <p className="text-gray-600 mb-4">
          Modify existing records with precise control:
        </p>

        <PreCodeBlock title="Update Examples">
{`# Method 1: Update single field
result = User.update(db, {"id": 1}, {"age": 29})
if result:
    print("User age updated successfully")

# Method 2: Update multiple fields
update_data = {
    "email": "alice.johnson@example.com",
    "age": 29,
    "updated_at": datetime.now().isoformat()
}
User.update(db, {"username": "alice"}, update_data)

# Method 3: Conditional updates
# Deactivate users older than 65
User.update(
    db, 
    {"age": {"$gt": 65}}, 
    {"is_active": False}
)

# Method 4: Increment/decrement (MongoDB-style)
if db.driver_type == "mongodb":
    # Increment age by 1
    db.execute_raw("db.users.updateOne({username: 'alice'}, {$inc: {age: 1}})")

# Method 5: Update with validation
try:
    user = User.find(db, {"id": 1})
    if user:
        user.age = 30
        user.email = "newemail@example.com"
        # Validate updated model
        updated_user = User(**user.dict())
        User.update(db, {"id": 1}, updated_user.dict())
except ValidationError as e:
    print(f"Update validation failed: {e}")

# Method 6: Bulk updates
# Activate all inactive users
inactive_count = User.update(
    db,
    {"is_active": False},
    {"is_active": True, "updated_at": datetime.now().isoformat()}
)
print(f"Activated {inactive_count} users")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Delete Operations</h3>
        <p className="text-gray-600 mb-4">
          Remove records with safety checks and confirmation:
        </p>

        <PreCodeBlock title="Delete Examples">
{`# Method 1: Delete by ID
result = User.delete(db, {"id": 5})
if result:
    print("User deleted successfully")

# Method 2: Delete by condition
deleted_count = User.delete(db, {"is_active": False})
print(f"Deleted {deleted_count} inactive users")

# Method 3: Safe delete with confirmation
def safe_delete_user(db, user_id):
    # Check if user exists
    user = User.find(db, {"id": user_id})
    if not user:
        print(f"User {user_id} not found")
        return False
    
    # Show user details for confirmation
    print(f"About to delete: {user.username} ({user.email})")
    confirm = input("Are you sure? (yes/no): ").lower()
    
    if confirm == 'yes':
        result = User.delete(db, {"id": user_id})
        if result:
            print(f"User {user.username} deleted successfully")
            return True
    
    print("Delete cancelled")
    return False

# Method 4: Soft delete (mark as deleted instead of removing)
class SoftDeleteMixin:
    def soft_delete(self, db, conditions):
        return self.update(db, conditions, {
            "is_deleted": True,
            "deleted_at": datetime.now().isoformat()
        })
    
    def get_active(self, db, conditions=None):
        conditions = conditions or {}
        conditions["is_deleted"] = {"$ne": True}
        return self.select(db, where=conditions)

# Add soft delete to your model
class User(BaseModel, ModelMixin, SoftDeleteMixin):
    # ... existing fields ...
    is_deleted: bool = False
    deleted_at: Optional[str] = None

# Usage
User.soft_delete(db, {"id": 3})  # Soft delete
active_users = User.get_active(db)  # Get non-deleted users

# Method 5: Delete with cascade (handle relationships)
def delete_user_cascade(db, user_id):
    # Delete user's posts first
    Post.delete(db, {"author_id": user_id})
    
    # Then delete the user
    User.delete(db, {"id": user_id})
    
    print(f"User {user_id} and all related data deleted")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Relationships and Joins</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Modeling Relationships</h3>
        <p className="text-gray-600 mb-4">
          Handle relationships between tables using foreign keys and helper methods:
        </p>

        <PreCodeBlock title="Relationship Examples">
{`# Define related models
class Author(BaseModel, ModelMixin):
    id: int
    name: str
    email: str
    bio: Optional[str] = None

class Category(BaseModel, ModelMixin):
    id: int
    name: str
    description: Optional[str] = None

class Article(BaseModel, ModelMixin):
    id: int
    title: str
    content: str
    author_id: int      # Foreign key to Author
    category_id: int    # Foreign key to Category
    published: bool = False
    created_at: datetime
    
    # Helper methods for relationships
    def get_author(self, db):
        return Author.find(db, {"id": self.author_id})
    
    def get_category(self, db):
        return Category.find(db, {"id": self.category_id})
    
    @classmethod
    def get_by_author(cls, db, author_id):
        return cls.select(db, where={"author_id": author_id})
    
    @classmethod
    def get_published_in_category(cls, db, category_id):
        return cls.select(db, where={
            "category_id": category_id,
            "published": True
        })

# Usage examples
db = Akron("sqlite:///blog.db")

# Create tables
Author.create_table(db)
Category.create_table(db)
Article.create_table(db)

# Create related data
tech_category = Category(id=1, name="Technology", description="Tech articles")
Category.insert(db, tech_category)

author = Author(id=1, name="John Doe", email="john@example.com")
Author.insert(db, author)

article = Article(
    id=1,
    title="Introduction to Akron ORM",
    content="Akron is a powerful ORM...",
    author_id=1,
    category_id=1,
    published=True,
    created_at=datetime.now()
)
Article.insert(db, article)

# Query relationships
article = Article.find(db, {"id": 1})
author = article.get_author(db)
category = article.get_category(db)

print(f"Article: {article.title}")
print(f"Author: {author.name}")
print(f"Category: {category.name}")

# Get all articles by author
john_articles = Article.get_by_author(db, 1)
print(f"John has written {len(john_articles)} articles")`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Manual Joins</h3>
        <p className="text-gray-600 mb-4">
          Perform join operations using raw SQL for complex queries:
        </p>

        <PreCodeBlock title="Join Operations">
{`# SQL-based joins (for SQL databases)
def get_articles_with_authors(db):
    if db.driver_type in ["sqlite", "mysql", "postgres"]:
        query = """
        SELECT 
            a.id, a.title, a.content, a.published, a.created_at,
            au.name as author_name, au.email as author_email,
            c.name as category_name
        FROM articles a
        JOIN authors au ON a.author_id = au.id  
        JOIN categories c ON a.category_id = c.id
        WHERE a.published = 1
        ORDER BY a.created_at DESC
        """
        return db.execute_raw(query)
    
    elif db.driver_type == "mongodb":
        # MongoDB aggregation pipeline
        pipeline = [
            {"$match": {"published": True}},
            {"$lookup": {
                "from": "authors",
                "localField": "author_id", 
                "foreignField": "id",
                "as": "author"
            }},
            {"$lookup": {
                "from": "categories",
                "localField": "category_id",
                "foreignField": "id", 
                "as": "category"
            }},
            {"$sort": {"created_at": -1}}
        ]
        return db.execute_raw(f"db.articles.aggregate({pipeline})")

# Application-level joins (database agnostic)
def get_article_details(db, article_id):
    article = Article.find(db, {"id": article_id})
    if not article:
        return None
    
    author = Author.find(db, {"id": article.author_id})
    category = Category.find(db, {"id": article.category_id})
    
    return {
        "article": article.dict(),
        "author": author.dict() if author else None,
        "category": category.dict() if category else None
    }

# Batch loading for performance
def get_articles_with_details(db, limit=10):
    articles = Article.select(db, limit=limit)
    
    # Get unique author and category IDs
    author_ids = list(set(a.author_id for a in articles))
    category_ids = list(set(a.category_id for a in articles))
    
    # Batch load authors and categories
    authors = {a.id: a for a in Author.select(db, where={"id": {"$in": author_ids}})}
    categories = {c.id: c for c in Category.select(db, where={"id": {"$in": category_ids}})}
    
    # Combine data
    result = []
    for article in articles:
        result.append({
            "article": article.dict(),
            "author": authors.get(article.author_id, {}).dict() if article.author_id in authors else None,
            "category": categories.get(article.category_id, {}).dict() if article.category_id in categories else None
        })
    
    return result`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Error Patterns</h3>
        <p className="text-gray-600 mb-4">
          Handle database errors gracefully with proper exception handling:
        </p>

        <PreCodeBlock title="Error Handling Examples">
{`from akron.exceptions import AkronError
from pydantic import ValidationError
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def safe_database_operation(db, operation_func, *args, **kwargs):
    """Wrapper for safe database operations"""
    try:
        return operation_func(*args, **kwargs)
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return {"error": "Invalid data", "details": str(e)}
    except AkronError as e:
        logger.error(f"Database error: {e}")
        return {"error": "Database operation failed", "details": str(e)}
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return {"error": "Operation failed", "details": str(e)}

# Connection error handling
def get_database_safely(db_url):
    """Get database connection with error handling"""
    try:
        db = Akron(db_url)
        # Test connection
        if db.driver_type == "sqlite":
            db.execute_raw("SELECT 1")
        elif db.driver_type in ["mysql", "postgres"]:
            db.execute_raw("SELECT 1") 
        elif db.driver_type == "mongodb":
            db.execute_raw("db.runCommand({ping: 1})")
        
        logger.info(f"Connected to {db.driver_type} database")
        return db
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        return None

# CRUD with error handling
def create_user_safely(db, user_data):
    """Create user with comprehensive error handling"""
    try:
        # Validate data first
        user = User(**user_data)
        
        # Check if user already exists
        existing = User.find(db, {"email": user.email})
        if existing:
            return {"error": "User with this email already exists"}
        
        # Insert user
        user_id = User.insert(db, user)
        logger.info(f"User created successfully: {user.username}")
        
        return {"success": True, "user_id": user_id, "user": user.dict()}
        
    except ValidationError as e:
        logger.error(f"User validation failed: {e}")
        return {"error": "Invalid user data", "details": e.errors()}
    except Exception as e:
        logger.error(f"Failed to create user: {e}")
        return {"error": "User creation failed", "details": str(e)}

def update_user_safely(db, user_id, update_data):
    """Update user with safety checks"""
    try:
        # Check if user exists
        user = User.find(db, {"id": user_id})
        if not user:
            return {"error": f"User {user_id} not found"}
        
        # Validate update data
        current_data = user.dict()
        current_data.update(update_data)
        validated_user = User(**current_data)
        
        # Perform update
        result = User.update(db, {"id": user_id}, update_data)
        
        if result:
            logger.info(f"User {user_id} updated successfully")
            return {"success": True, "user": validated_user.dict()}
        else:
            return {"error": "Update operation failed"}
            
    except ValidationError as e:
        return {"error": "Invalid update data", "details": e.errors()}
    except Exception as e:
        logger.error(f"Failed to update user {user_id}: {e}")
        return {"error": "Update failed", "details": str(e)}

# Transaction-like operations for multiple changes
def transfer_article_ownership(db, article_id, new_author_id):
    """Transfer article ownership with rollback capability"""
    try:
        # Verify article exists
        article = Article.find(db, {"id": article_id})
        if not article:
            return {"error": "Article not found"}
        
        # Verify new author exists
        new_author = Author.find(db, {"id": new_author_id})
        if not new_author:
            return {"error": "New author not found"}
        
        old_author_id = article.author_id
        
        # Update article ownership
        result = Article.update(
            db, 
            {"id": article_id}, 
            {"author_id": new_author_id, "updated_at": datetime.now().isoformat()}
        )
        
        if result:
            logger.info(f"Article {article_id} transferred from author {old_author_id} to {new_author_id}")
            return {"success": True, "old_author": old_author_id, "new_author": new_author_id}
        else:
            return {"error": "Transfer failed"}
            
    except Exception as e:
        logger.error(f"Article transfer failed: {e}")
        return {"error": "Transfer operation failed", "details": str(e)}

# Usage examples
db_url = "sqlite:///blog.db"
db = get_database_safely(db_url)

if db:
    # Safe user creation
    result = create_user_safely(db, {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "age": 25,
        "created_at": datetime.now()
    })
    print(result)
    
    # Safe user update
    result = update_user_safely(db, 1, {"age": 26})
    print(result)
else:
    print("Failed to connect to database")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🔐 Security</h3>
            <PreCodeBlock>
{`# Use environment variables for sensitive data
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is required")

# Never hardcode credentials
# ❌ Bad
db = Akron("mysql://admin:password123@localhost/db")

# ✅ Good  
db = Akron(DATABASE_URL)

# Validate input data
def create_user_endpoint(user_data):
    try:
        user = User(**user_data)  # Pydantic validation
        with Akron(DATABASE_URL) as db:
            return User.insert(db, user)
    except ValidationError as e:
        return {"error": "Invalid data", "details": e.errors()}`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">⚡ Performance</h3>
            <PreCodeBlock>
{`# Use connection pooling for production
class DatabaseManager:
    def __init__(self, db_url):
        self.db_url = db_url
        self._connection = None
    
    def get_connection(self):
        if not self._connection:
            self._connection = Akron(self.db_url)
        return self._connection
    
    def close(self):
        if self._connection:
            self._connection.close()

# Batch operations for better performance
def create_multiple_users(db, users_data):
    users = [User(**data) for data in users_data]
    
    # Validate all users first
    for user in users:
        user.dict()  # Triggers validation
    
    # Insert in batch
    for user in users:
        User.insert(db, user)

# Use indexes for frequently queried fields (database-specific)
def create_performance_indexes(db):
    if db.driver_type in ["mysql", "postgres"]:
        db.execute_raw("CREATE INDEX idx_users_email ON users(email)")
        db.execute_raw("CREATE INDEX idx_articles_author ON articles(author_id)")
        db.execute_raw("CREATE INDEX idx_articles_published ON articles(published, created_at)")`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🧪 Testing</h3>
            <PreCodeBlock>
{`import pytest
from akron import Akron

@pytest.fixture
def test_db():
    """Create test database"""
    db = Akron("sqlite:///:memory:")
    User.create_table(db)
    yield db
    db.close()

@pytest.fixture
def sample_user():
    """Create sample user for testing"""
    return User(
        id=1,
        username="testuser",
        email="test@example.com",
        age=25,
        created_at=datetime.now()
    )

def test_user_creation(test_db, sample_user):
    """Test user creation"""
    user_id = User.insert(test_db, sample_user)
    assert user_id is not None
    
    retrieved_user = User.find(test_db, {"id": user_id})
    assert retrieved_user.username == sample_user.username

def test_user_validation():
    """Test user validation"""
    with pytest.raises(ValidationError):
        User(
            id=1,
            username="ab",  # Too short
            email="invalid-email",  # Invalid email
            age=-5  # Invalid age
        )`}
            </PreCodeBlock>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Monitoring</h3>
            <PreCodeBlock>
{`import time
from functools import wraps

def monitor_database_operations(func):
    """Decorator to monitor database operations"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            duration = time.time() - start_time
            logger.info(f"{func.__name__} completed in {duration:.3f}s")
            return result
        except Exception as e:
            duration = time.time() - start_time
            logger.error(f"{func.__name__} failed after {duration:.3f}s: {e}")
            raise
    return wrapper

@monitor_database_operations
def get_user_articles(db, user_id):
    return Article.select(db, where={"author_id": user_id})

# Database health check
def check_database_health(db):
    """Check if database is healthy"""
    try:
        start_time = time.time()
        
        if db.driver_type == "sqlite":
            db.execute_raw("SELECT 1")
        elif db.driver_type in ["mysql", "postgres"]:
            db.execute_raw("SELECT 1")
        elif db.driver_type == "mongodb":
            db.execute_raw("db.runCommand({ping: 1})")
        
        response_time = time.time() - start_time
        
        return {
            "healthy": True,
            "response_time": response_time,
            "database_type": db.driver_type
        }
    except Exception as e:
        return {
            "healthy": False,
            "error": str(e),
            "database_type": db.driver_type
        }`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          You&apos;ve mastered the basics of Akron ORM! Here&apos;s what to explore next:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/docs/api/constructor" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">API Reference</h3>
            <p className="text-gray-600 text-sm">Complete documentation for all Akron methods and classes</p>
          </a>
          
          <a href="/docs/cli/create-table" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">CLI Commands</h3>
            <p className="text-gray-600 text-sm">Master the command-line interface for database management</p>
          </a>
          
          <a href="/docs/database-support" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Database-Specific Features</h3>
            <p className="text-gray-600 text-sm">Learn about unique features for each database type</p>
          </a>
          
          <a href="/docs/api/models" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Advanced Models</h3>
            <p className="text-gray-600 text-sm">Deep dive into model definitions and validation</p>
          </a>
        </div>
      </section>
    </DocsLayout>
  );
}
