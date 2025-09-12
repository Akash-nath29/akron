#!/usr/bin/env python3
"""
Test script to validate all the examples from the updated README.md
"""

from akron import Akron

def test_readme_examples():
    print('Testing Updated README Examples...')

    # Initialize database
    db = Akron('sqlite:///:memory:')

    # Create tables as shown in README
    db.create_table('users', {
        'id': 'int',
        'name': 'str', 
        'email': 'str',
        'age': 'int',
        'active': 'bool'
    })

    db.create_table('posts', {
        'id': 'int',
        'title': 'str',
        'content': 'str',
        'user_id': 'int->users.id',
        'published': 'bool'
    })

    # Test basic operations from README
    user_id = db.insert('users', {
        'name': 'Alice Johnson',
        'email': 'alice@example.com', 
        'age': 28,
        'active': True
    })

    # Test bulk insert from README
    post_ids = db.bulk_insert('posts', [
        {'title': 'Hello World', 'content': 'My first post', 'user_id': user_id, 'published': True},
        {'title': 'Python Tips', 'content': 'Some useful tips', 'user_id': user_id, 'published': False}
    ])

    print(f'✅ Created user {user_id} and posts {post_ids}')

    # Test QueryBuilder from README  
    published_posts = db.query('posts').where(published=True, user_id=user_id).all()
    print(f'✅ Found {len(published_posts)} published posts')

    # Test operators from README
    young_users = db.query('users').where(age__lt=30, active=True).all()
    print(f'✅ Found {len(young_users)} young active users')

    # Test aggregations from README
    post_stats = db.aggregate('posts', {
        'post_count': 'count',
    }, group_by=['user_id'])
    print(f'✅ Aggregation returned {len(post_stats)} results')

    # Test convenience methods from README
    total_users = db.count('users')
    has_alice = db.exists('users', {'email': 'alice@example.com'})
    print(f'✅ Total users: {total_users}, Alice exists: {has_alice}')

    # Test transaction from README
    with db.transaction():
        new_user_id = db.insert('users', {'name': 'Bob', 'email': 'bob@example.com', 'age': 25, 'active': True})
        db.insert('posts', {'title': "Bob's First Post", 'user_id': new_user_id, 'published': True})

    print(f'✅ Transaction created user {new_user_id}')

    # Test indexing from README  
    db.create_index('users', ['email'])
    print('✅ Created index on users.email')

    # Test raw SQL from README
    user_post_stats = db.raw('''
        SELECT u.name, COUNT(p.id) as post_count
        FROM users u LEFT JOIN posts p ON u.id = p.user_id
        GROUP BY u.id, u.name
        ORDER BY post_count DESC
    ''')
    print(f'✅ Raw SQL returned {len(user_post_stats)} user stats')

    # Test additional quick reference examples
    print('\nTesting Quick Reference Examples...')
    
    # Test paginate
    page_1 = db.query('posts').paginate(page=1, per_page=1).all()
    print(f'✅ Pagination returned {len(page_1)} posts for page 1')
    
    # Test more operators
    all_users = db.query('users').where(age__gte=25).order_by('-age').limit(10).all()
    print(f'✅ Advanced query returned {len(all_users)} users')

    db.close()
    print('🎉 All README examples work perfectly!')

if __name__ == '__main__':
    test_readme_examples()
