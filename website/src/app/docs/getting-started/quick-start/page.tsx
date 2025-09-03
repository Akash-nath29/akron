import { DocsLayout, PreCodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function QuickStartPage() {
  return (
    <DocsLayout 
      title="Quick Start" 
      description="Get up and running with Akron ORM in minutes. Build your first database application with this step-by-step guide."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your First Akron Application</h2>
        <p className="text-gray-600 mb-4">
          In this quick start guide, you&apos;ll build a simple blog application using Akron ORM. 
          We&apos;ll cover database setup, table creation, and basic CRUD operations.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">🎯 What You&apos;ll Build</h3>
          <ul className="text-green-800 space-y-1">
            <li>• A simple blog application with users and posts</li>
            <li>• Database tables with proper relationships</li>
            <li>• CRUD operations for managing data</li>
            <li>• Both Python API and CLI examples</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Project Setup</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Project Directory</h3>
        <p className="text-gray-600 mb-4">
          First, let&apos;s create a new directory for our blog application:
        </p>

        <PreCodeBlock title="Project Setup">
{`# Create project directory
mkdir blog_app
cd blog_app

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate

# Install Akron
pip install akron

# Create main application file
touch blog_app.py

# Verify installation
python -c "import akron; print('Akron ready!')"` }
        </PreCodeBlock>

        <OutputBlock>
{`Akron ready!`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Define Your Models</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Data Models</h3>
        <p className="text-gray-600 mb-4">
          Create <code>blog_app.py</code> and define your data models using Pydantic:
        </p>

        <PreCodeBlock title="blog_app.py - Data Models">
{`from akron import Akron
from pydantic import BaseModel, EmailStr
from akron.models import ModelMixin
from datetime import datetime
from typing import Optional

# Define User model
class User(BaseModel, ModelMixin):
    id: int
    username: str
    email: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime

# Define Post model
class Post(BaseModel, ModelMixin):
    id: int
    title: str
    content: str
    author_id: int  # Foreign key to User.id
    published: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None

# Initialize database connection
def create_database():
    """Create database and tables"""
    # Using SQLite for this example (no server required)
    db = Akron("sqlite:///blog.db")
    
    # Create tables
    print("Creating database tables...")
    User.create_table(db)
    Post.create_table(db)
    
    print("✓ Database tables created successfully!")
    return db

if __name__ == "__main__":
    db = create_database()
    print("Blog application initialized!")` }
        </PreCodeBlock>

        <p className="text-gray-600 mb-4 mt-4">
          Run the script to create your database:
        </p>

        <PreCodeBlock>
{`python blog_app.py`}
        </PreCodeBlock>

        <OutputBlock>
{`Creating database tables...
✓ Database tables created successfully!
Blog application initialized!`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Add Sample Data</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Insert Users and Posts</h3>
        <p className="text-gray-600 mb-4">
          Let&apos;s add some sample data to our blog application:
        </p>

        <PreCodeBlock title="Add to blog_app.py - Sample Data">
{`def seed_data(db):
    """Add sample users and posts"""
    print("Adding sample data...")
    
    # Create sample users
    alice = User(
        id=1,
        username="alice",
        email="alice@example.com",
        full_name="Alice Johnson",
        created_at=datetime.now()
    )
    
    bob = User(
        id=2,
        username="bob", 
        email="bob@example.com",
        full_name="Bob Smith",
        created_at=datetime.now()
    )
    
    # Insert users
    User.insert(db, alice)
    User.insert(db, bob)
    print("✓ Users created")
    
    # Create sample posts
    post1 = Post(
        id=1,
        title="Welcome to My Blog",
        content="This is my first post using Akron ORM! It's amazing how easy it is to work with databases.",
        author_id=1,  # Alice's post
        published=True,
        created_at=datetime.now()
    )
    
    post2 = Post(
        id=2,
        title="Database Magic with Akron",
        content="Akron ORM makes database operations so simple. No more complex SQL queries!",
        author_id=2,  # Bob's post
        published=True,
        created_at=datetime.now()
    )
    
    post3 = Post(
        id=3,
        title="Draft Post",
        content="This post is still being written...",
        author_id=1,  # Alice's draft
        published=False,
        created_at=datetime.now()
    )
    
    # Insert posts
    Post.insert(db, post1)
    Post.insert(db, post2)
    Post.insert(db, post3)
    print("✓ Posts created")
    
    print("Sample data added successfully!")

# Update the main section
if __name__ == "__main__":
    db = create_database()
    seed_data(db)
    print("\\nBlog application ready!")` }
        </PreCodeBlock>

        <p className="text-gray-600 mb-4 mt-4">
          Run the updated script:
        </p>

        <PreCodeBlock>
{`python blog_app.py`}
        </PreCodeBlock>

        <OutputBlock>
{`Creating database tables...
✓ Database tables created successfully!
Adding sample data...
✓ Users created
✓ Posts created
Sample data added successfully!

Blog application ready!`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Query and Display Data</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Read Operations</h3>
        <p className="text-gray-600 mb-4">
          Now let&apos;s add functions to query and display our blog data:
        </p>

        <PreCodeBlock title="Add to blog_app.py - Query Functions">
{`def display_blog_stats(db):
    """Display blog statistics"""
    print("\\n" + "="*50)
    print("BLOG STATISTICS")
    print("="*50)
    
    # Count total users
    all_users = User.select(db)
    print(f"Total Users: {len(all_users)}")
    
    # Count total posts
    all_posts = Post.select(db)
    print(f"Total Posts: {len(all_posts)}")
    
    # Count published posts
    published_posts = Post.select(db, where={"published": True})
    print(f"Published Posts: {len(published_posts)}")
    
    # Count draft posts
    draft_posts = Post.select(db, where={"published": False})
    print(f"Draft Posts: {len(draft_posts)}")

def display_users(db):
    """Display all users"""
    print("\\n" + "="*50)
    print("USERS")
    print("="*50)
    
    users = User.select(db)
    for user in users:
        status = "Active" if user.is_active else "Inactive"
        print(f"[{user.id}] {user.username} ({user.full_name})")
        print(f"    Email: {user.email}")
        print(f"    Status: {status}")
        print(f"    Joined: {user.created_at.strftime('%Y-%m-%d')}")
        print()

def display_posts(db, published_only=False):
    """Display posts"""
    title = "PUBLISHED POSTS" if published_only else "ALL POSTS"
    print("\\n" + "="*50)
    print(title)
    print("="*50)
    
    if published_only:
        posts = Post.select(db, where={"published": True})
    else:
        posts = Post.select(db)
    
    for post in posts:
        # Get author information
        author = User.find(db, {"id": post.author_id})
        author_name = author.username if author else "Unknown"
        
        status = "✓ Published" if post.published else "✏ Draft"
        print(f"[{post.id}] {post.title}")
        print(f"    Author: {author_name}")
        print(f"    Status: {status}")
        print(f"    Created: {post.created_at.strftime('%Y-%m-%d %H:%M')}")
        print(f"    Content: {post.content[:100]}{'...' if len(post.content) > 100 else ''}")
        print()

def search_posts(db, keyword):
    """Search posts by keyword in title or content"""
    print(f"\\n" + "="*50)
    print(f"SEARCH RESULTS FOR: '{keyword}'")
    print("="*50)
    
    all_posts = Post.select(db)
    matching_posts = [
        post for post in all_posts 
        if keyword.lower() in post.title.lower() or keyword.lower() in post.content.lower()
    ]
    
    if matching_posts:
        for post in matching_posts:
            author = User.find(db, {"id": post.author_id})
            author_name = author.username if author else "Unknown"
            print(f"[{post.id}] {post.title} by {author_name}")
            print(f"    {post.content[:150]}{'...' if len(post.content) > 150 else ''}")
            print()
    else:
        print("No posts found matching your search.")

# Update the main section
if __name__ == "__main__":
    db = create_database()
    seed_data(db)
    
    # Display blog data
    display_blog_stats(db)
    display_users(db)
    display_posts(db, published_only=True)
    search_posts(db, "Akron")
    
    print("\\nBlog application demo complete!")` }
        </PreCodeBlock>

        <p className="text-gray-600 mb-4 mt-4">
          Run the complete application:
        </p>

        <PreCodeBlock>
{`python blog_app.py`}
        </PreCodeBlock>

        <OutputBlock>
{`Creating database tables...
✓ Database tables created successfully!
Adding sample data...
✓ Users created
✓ Posts created
Sample data added successfully!

==================================================
BLOG STATISTICS
==================================================
Total Users: 2
Total Posts: 3
Published Posts: 2
Draft Posts: 1

==================================================
USERS
==================================================
[1] alice (Alice Johnson)
    Email: alice@example.com
    Status: Active
    Joined: 2024-01-15

[2] bob (Bob Smith)
    Email: bob@example.com
    Status: Active
    Joined: 2024-01-15

==================================================
PUBLISHED POSTS
==================================================
[1] Welcome to My Blog
    Author: alice
    Status: ✓ Published
    Created: 2024-01-15 10:30
    Content: This is my first post using Akron ORM! It's amazing how easy it is to work with databases.

[2] Database Magic with Akron
    Author: bob
    Status: ✓ Published
    Created: 2024-01-15 10:30
    Content: Akron ORM makes database operations so simple. No more complex SQL queries!

==================================================
SEARCH RESULTS FOR: 'Akron'
==================================================
[1] Welcome to My Blog by alice
    This is my first post using Akron ORM! It's amazing how easy it is to work with databases.

[2] Database Magic with Akron by bob
    Akron ORM makes database operations so simple. No more complex SQL queries!

Blog application demo complete!`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 5: Update and Delete Operations</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Modify Your Data</h3>
        <p className="text-gray-600 mb-4">
          Let&apos;s add functions to update and delete blog data:
        </p>

        <PreCodeBlock title="Add to blog_app.py - Update/Delete Functions">
{`def update_post(db, post_id, title=None, content=None, published=None):
    """Update a blog post"""
    print(f"\\nUpdating post {post_id}...")
    
    # Prepare update data
    update_data = {"updated_at": datetime.now()}
    if title:
        update_data["title"] = title
    if content:
        update_data["content"] = content
    if published is not None:
        update_data["published"] = published
    
    # Update the post
    result = Post.update(db, {"id": post_id}, update_data)
    
    if result:
        print(f"✓ Post {post_id} updated successfully!")
        
        # Show updated post
        updated_post = Post.find(db, {"id": post_id})
        if updated_post:
            print(f"  Title: {updated_post.title}")
            print(f"  Published: {updated_post.published}")
            print(f"  Updated: {updated_post.updated_at}")
    else:
        print(f"✗ Failed to update post {post_id}")

def publish_draft(db, post_id):
    """Publish a draft post"""
    print(f"\\nPublishing post {post_id}...")
    
    post = Post.find(db, {"id": post_id})
    if not post:
        print(f"✗ Post {post_id} not found")
        return
    
    if post.published:
        print(f"Post '{post.title}' is already published")
        return
    
    # Publish the post
    Post.update(db, {"id": post_id}, {
        "published": True,
        "updated_at": datetime.now()
    })
    
    print(f"✓ Post '{post.title}' published successfully!")

def delete_post(db, post_id):
    """Delete a blog post"""
    print(f"\\nDeleting post {post_id}...")
    
    # Get post details before deletion
    post = Post.find(db, {"id": post_id})
    if not post:
        print(f"✗ Post {post_id} not found")
        return
    
    # Delete the post
    result = Post.delete(db, {"id": post_id})
    
    if result:
        print(f"✓ Post '{post.title}' deleted successfully!")
    else:
        print(f"✗ Failed to delete post {post_id}")

def create_new_post(db, title, content, author_id, published=False):
    """Create a new blog post"""
    print(f"\\nCreating new post: '{title}'...")
    
    # Get next available ID
    all_posts = Post.select(db)
    next_id = max([post.id for post in all_posts], default=0) + 1
    
    # Create new post
    new_post = Post(
        id=next_id,
        title=title,
        content=content,
        author_id=author_id,
        published=published,
        created_at=datetime.now()
    )
    
    # Insert the post
    result = Post.insert(db, new_post)
    
    if result:
        print(f"✓ Post '{title}' created successfully!")
        return next_id
    else:
        print(f"✗ Failed to create post '{title}'")
        return None

# Interactive demo function
def run_interactive_demo(db):
    """Run an interactive demo of CRUD operations"""
    print("\\n" + "="*60)
    print("INTERACTIVE CRUD OPERATIONS DEMO")
    print("="*60)
    
    # 1. Create a new post
    new_post_id = create_new_post(
        db, 
        title="My Python Journey",
        content="Learning Python has been an incredible experience. From basic syntax to advanced frameworks like Akron ORM, every step has been exciting!",
        author_id=1,  # Alice
        published=False  # Start as draft
    )
    
    # 2. Update the post content
    if new_post_id:
        update_post(
            db,
            new_post_id,
            content="Learning Python has been an incredible experience. From basic syntax to advanced frameworks like Akron ORM, every step has been exciting! I particularly love how Akron makes database operations so intuitive.",
            published=False
        )
    
    # 3. Publish the draft
    if new_post_id:
        publish_draft(db, new_post_id)
    
    # 4. Show current stats
    display_blog_stats(db)
    
    # 5. Delete the demo post
    if new_post_id:
        delete_post(db, new_post_id)
    
    # 6. Final stats
    print("\\nFinal statistics after cleanup:")
    display_blog_stats(db)

# Update the main section
if __name__ == "__main__":
    db = create_database()
    seed_data(db)
    
    # Run basic demo
    display_blog_stats(db)
    display_posts(db, published_only=True)
    
    # Run interactive CRUD demo
    run_interactive_demo(db)
    
    print("\\n" + "="*60)
    print("✓ Quick Start Demo Complete!")
    print("="*60)
    print("Next steps:")
    print("• Try different database types (MySQL, PostgreSQL, MongoDB)")
    print("• Explore the CLI commands")
    print("• Check out the full API documentation")
    print("• Build your own application!")` }
        </PreCodeBlock>

        <p className="text-gray-600 mb-4 mt-4">
          Run the complete demo:
        </p>

        <PreCodeBlock>
{`python blog_app.py`}
        </PreCodeBlock>

        <OutputBlock>
{`Creating database tables...
✓ Database tables created successfully!
Adding sample data...
✓ Users created
✓ Posts created
Sample data added successfully!

==================================================
BLOG STATISTICS
==================================================
Total Users: 2
Total Posts: 3
Published Posts: 2
Draft Posts: 1

============================================================
INTERACTIVE CRUD OPERATIONS DEMO
============================================================

Creating new post: 'My Python Journey'...
✓ Post 'My Python Journey' created successfully!

Updating post 4...
✓ Post 4 updated successfully!
  Title: My Python Journey
  Published: False
  Updated: 2024-01-15 10:30:45.123456

Publishing post 4...
✓ Post 'My Python Journey' published successfully!

==================================================
BLOG STATISTICS
==================================================
Total Users: 2
Total Posts: 4
Published Posts: 3
Draft Posts: 1

Deleting post 4...
✓ Post 'My Python Journey' deleted successfully!

Final statistics after cleanup:
==================================================
BLOG STATISTICS
==================================================
Total Users: 2
Total Posts: 3
Published Posts: 2
Draft Posts: 1

============================================================
✓ Quick Start Demo Complete!
============================================================
Next steps:
• Try different database types (MySQL, PostgreSQL, MongoDB)
• Explore the CLI commands
• Check out the full API documentation
• Build your own application!`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 6: Using the CLI</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Command-Line Interface</h3>
        <p className="text-gray-600 mb-4">
          Akron also provides a powerful CLI for database operations. Let&apos;s explore some commands:
        </p>

        <PreCodeBlock title="CLI Examples">
{`# Inspect your database schema
akron inspect-schema --db "sqlite:///blog.db"

# Query data using raw SQL
akron raw-sql --db "sqlite:///blog.db" --query "SELECT * FROM users"

# Add more users via CLI
akron seed users --db "sqlite:///blog.db" --data '[
  {
    "id": 3,
    "username": "charlie", 
    "email": "charlie@example.com",
    "full_name": "Charlie Brown",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00"
  }
]'

# Create a new table via CLI
akron create-table comments --db "sqlite:///blog.db" --schema '{
  "id": "int",
  "post_id": "int", 
  "author_name": "str",
  "content": "str",
  "created_at": "str"
}'

# Verify the new table
akron inspect-schema --db "sqlite:///blog.db"`}
        </PreCodeBlock>

        <OutputBlock>
{`Database Schema (SQLite):
=====================================
├── users
│   ├── id (INTEGER)
│   ├── username (TEXT)
│   ├── email (TEXT)
│   ├── full_name (TEXT)
│   ├── is_active (INTEGER)
│   └── created_at (TEXT)
├── posts
│   ├── id (INTEGER)
│   ├── title (TEXT)
│   ├── content (TEXT)
│   ├── author_id (INTEGER)
│   ├── published (INTEGER)
│   ├── created_at (TEXT)
│   └── updated_at (TEXT)
└── comments
    ├── id (INTEGER)
    ├── post_id (INTEGER)
    ├── author_name (TEXT)
    ├── content (TEXT)
    └── created_at (TEXT)

✓ User added successfully
✓ Table 'comments' created successfully`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Different Databases</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Same Code, Different Databases</h3>
        <p className="text-gray-600 mb-4">
          The beauty of Akron is that you can use the same code with different databases. 
          Just change the connection string:
        </p>

        <PreCodeBlock title="Database Variations">
{`# Try with PostgreSQL (if you have it running)
# db = Akron("postgres://user:password@localhost:5432/blog")

# Try with MySQL (if you have it running)  
# db = Akron("mysql://user:password@localhost:3306/blog")

# Try with MongoDB (if you have it running)
# db = Akron("mongodb://localhost:27017/blog")

# For production, use environment variables
import os
db_url = os.getenv("DATABASE_URL", "sqlite:///blog.db")
db = Akron(db_url)`}
        </PreCodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">🔄 Database Portability</h4>
          <p className="text-blue-800 mb-2">
            Your models and operations work identically across all databases:
          </p>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Same Python code for all database types</li>
            <li>• Automatic type conversion and mapping</li>
            <li>• Consistent API across SQL and NoSQL databases</li>
            <li>• Easy migration between database systems</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Application Code</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Final blog_app.py</h3>
        <p className="text-gray-600 mb-4">
          Here&apos;s the complete code for your blog application:
        </p>

        <PreCodeBlock title="Complete blog_app.py">
{`"""
Simple Blog Application using Akron ORM
A complete example demonstrating CRUD operations and best practices.
"""

from akron import Akron
from pydantic import BaseModel
from akron.models import ModelMixin
from datetime import datetime
from typing import Optional
import os

# Data Models
class User(BaseModel, ModelMixin):
    id: int
    username: str
    email: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime

class Post(BaseModel, ModelMixin):
    id: int
    title: str
    content: str
    author_id: int
    published: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None

def get_database():
    """Get database connection"""
    db_url = os.getenv("DATABASE_URL", "sqlite:///blog.db")
    return Akron(db_url)

def setup_database():
    """Initialize database and tables"""
    db = get_database()
    User.create_table(db)
    Post.create_table(db)
    return db

def create_sample_data(db):
    """Create sample users and posts"""
    # Add users
    users = [
        User(id=1, username="alice", email="alice@example.com", 
             full_name="Alice Johnson", created_at=datetime.now()),
        User(id=2, username="bob", email="bob@example.com",
             full_name="Bob Smith", created_at=datetime.now())
    ]
    
    for user in users:
        User.insert(db, user)
    
    # Add posts
    posts = [
        Post(id=1, title="Welcome to Akron", 
             content="Getting started with Akron ORM is super easy!",
             author_id=1, published=True, created_at=datetime.now()),
        Post(id=2, title="Database Magic",
             content="Akron works with SQLite, MySQL, PostgreSQL, and MongoDB!",
             author_id=2, published=True, created_at=datetime.now()),
        Post(id=3, title="Work in Progress",
             content="This post is still being written...",
             author_id=1, published=False, created_at=datetime.now())
    ]
    
    for post in posts:
        Post.insert(db, post)

def show_blog_summary(db):
    """Display blog summary"""
    users = User.select(db)
    all_posts = Post.select(db)
    published_posts = Post.select(db, where={"published": True})
    
    print("\\n🏠 BLOG SUMMARY")
    print("=" * 40)
    print(f"Users: {len(users)}")
    print(f"Total Posts: {len(all_posts)}")
    print(f"Published: {len(published_posts)}")
    print(f"Drafts: {len(all_posts) - len(published_posts)}")
    
    print("\\n📝 RECENT POSTS")
    print("-" * 40)
    for post in published_posts:
        author = User.find(db, {"id": post.author_id})
        print(f"• {post.title} by {author.username if author else 'Unknown'}")

if __name__ == "__main__":
    print("🚀 Akron Blog Application")
    print("=" * 50)
    
    # Setup
    db = setup_database()
    create_sample_data(db)
    
    # Demo
    show_blog_summary(db)
    
    print("\\n✅ Application ready!")
    print("\\nNext steps:")
    print("• Modify the code to add your own features")
    print("• Try different database connections") 
    print("• Explore the Akron CLI commands")
    print("• Check out the full documentation")`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Congratulations!</h2>
        <p className="text-gray-600 mb-4">
          You&apos;ve successfully built your first Akron application! You now know how to:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">✅ What You&apos;ve Learned</h3>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• Install and configure Akron ORM</li>
              <li>• Define data models with Pydantic</li>
              <li>• Create database tables</li>
              <li>• Perform CRUD operations</li>
              <li>• Use both Python API and CLI</li>
              <li>• Handle relationships between tables</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🎯 Key Concepts</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Universal database connectivity</li>
              <li>• Type-safe model definitions</li>
              <li>• Consistent API across databases</li>
              <li>• Automatic schema management</li>
              <li>• Easy data validation</li>
              <li>• Simple migration handling</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/docs/getting-started/basic-usage" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-2">Basic Usage Guide</h4>
            <p className="text-gray-600 text-sm">Deep dive into Akron&apos;s features and best practices</p>
          </a>
          
          <a href="/docs/api/constructor" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-2">API Reference</h4>
            <p className="text-gray-600 text-sm">Complete documentation for all Akron methods</p>
          </a>
          
          <a href="/docs/cli/create-table" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-2">CLI Commands</h4>
            <p className="text-gray-600 text-sm">Learn all command-line tools and utilities</p>
          </a>
          
          <a href="/docs/database-support" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-2">Database Guides</h4>
            <p className="text-gray-600 text-sm">Database-specific features and optimizations</p>
          </a>
        </div>
      </section>
    </DocsLayout>
  );
}
