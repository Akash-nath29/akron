#!/usr/bin/env python3
"""
Demonstration of db.transaction() functionality with real-world scenarios
"""

from akron import Akron

def demonstrate_transactions():
    print("🔄 Demonstrating Database Transactions")
    
    # Initialize database
    db = Akron('sqlite:///:memory:')
    
    # Create tables for our example
    db.create_table('users', {
        'id': 'int',
        'name': 'str',
        'email': 'str',
        'balance': 'float'
    })
    
    db.create_table('transactions_log', {
        'id': 'int',
        'user_id': 'int->users.id',
        'action': 'str',
        'amount': 'float',
        'timestamp': 'str'
    })
    
    # Insert initial test users
    db.insert('users', {'name': 'Alice', 'email': 'alice@example.com', 'balance': 1000.0})
    db.insert('users', {'name': 'Bob', 'email': 'bob@example.com', 'balance': 500.0})
    
    print(f"Initial balances:")
    users = db.find('users')
    for user in users:
        print(f"  {user['name']}: ${user['balance']}")
    
    print("\n" + "="*50)
    
    # SCENARIO 1: Successful Transaction
    print("💰 SCENARIO 1: Money Transfer (Success)")
    try:
        with db.transaction():
            # Transfer $200 from Alice to Bob
            alice = db.find('users', {'name': 'Alice'})[0]
            bob = db.find('users', {'name': 'Bob'})[0]
            
            # Deduct from Alice
            new_alice_balance = alice['balance'] - 200
            db.update('users', {'id': alice['id']}, {'balance': new_alice_balance})
            
            # Add to Bob
            new_bob_balance = bob['balance'] + 200
            db.update('users', {'id': bob['id']}, {'balance': new_bob_balance})
            
            # Log the transaction
            db.insert('transactions_log', {
                'user_id': alice['id'],
                'action': 'transfer_out',
                'amount': -200.0,
                'timestamp': '2025-09-12 10:00:00'
            })
            
            db.insert('transactions_log', {
                'user_id': bob['id'],
                'action': 'transfer_in',
                'amount': 200.0,
                'timestamp': '2025-09-12 10:00:00'
            })
            
            print("✅ All operations completed successfully!")
            
    except Exception as e:
        print(f"❌ Transaction failed: {e}")
    
    # Check balances after successful transaction
    print(f"\nBalances after transfer:")
    users = db.find('users')
    for user in users:
        print(f"  {user['name']}: ${user['balance']}")
    
    print("\n" + "="*50)
    
    # SCENARIO 2: Failed Transaction (Rollback)
    print("💥 SCENARIO 2: Money Transfer with Error (Rollback)")
    try:
        with db.transaction():
            # Try to transfer $1500 from Alice (but she only has $800 now)
            alice = db.find('users', {'name': 'Alice'})[0]
            bob = db.find('users', {'name': 'Bob'})[0]
            
            print(f"Attempting to transfer $1500 from Alice (balance: ${alice['balance']})")
            
            # This should cause insufficient funds
            if alice['balance'] < 1500:
                raise ValueError("Insufficient funds!")
            
            # These operations would run if no error occurred
            new_alice_balance = alice['balance'] - 1500
            db.update('users', {'id': alice['id']}, {'balance': new_alice_balance})
            
            new_bob_balance = bob['balance'] + 1500
            db.update('users', {'id': bob['id']}, {'balance': new_bob_balance})
            
    except Exception as e:
        print(f"❌ Transaction failed and rolled back: {e}")
    
    # Check balances - should be unchanged due to rollback
    print(f"\nBalances after failed transaction (should be unchanged):")
    users = db.find('users')
    for user in users:
        print(f"  {user['name']}: ${user['balance']}")
    
    print("\n" + "="*50)
    
    # SCENARIO 3: Complex Business Logic
    print("🏪 SCENARIO 3: E-commerce Order Processing")
    
    # Create product inventory table
    db.create_table('inventory', {
        'id': 'int',
        'product_name': 'str',
        'stock': 'int',
        'price': 'float'
    })
    
    db.create_table('orders', {
        'id': 'int',
        'user_id': 'int->users.id',
        'product_id': 'int->inventory.id',
        'quantity': 'int',
        'total_amount': 'float',
        'status': 'str'
    })
    
    # Add some products
    db.insert('inventory', {'product_name': 'Laptop', 'stock': 5, 'price': 999.99})
    db.insert('inventory', {'product_name': 'Mouse', 'stock': 20, 'price': 29.99})
    
    try:
        with db.transaction():
            # Alice wants to buy 2 laptops
            alice = db.find('users', {'name': 'Alice'})[0]
            laptop = db.find('inventory', {'product_name': 'Laptop'})[0]
            
            quantity = 2
            total_cost = laptop['price'] * quantity
            
            print(f"Alice ordering {quantity} laptops at ${laptop['price']} each = ${total_cost}")
            print(f"Alice's balance: ${alice['balance']}, Stock available: {laptop['stock']}")
            
            # Check stock availability
            if laptop['stock'] < quantity:
                raise ValueError(f"Insufficient stock! Only {laptop['stock']} available")
            
            # Check user balance
            if alice['balance'] < total_cost:
                raise ValueError(f"Insufficient funds! Need ${total_cost}, have ${alice['balance']}")
            
            # All checks passed - process the order
            
            # 1. Deduct money from user
            new_balance = alice['balance'] - total_cost
            db.update('users', {'id': alice['id']}, {'balance': new_balance})
            
            # 2. Reduce inventory
            new_stock = laptop['stock'] - quantity
            db.update('inventory', {'id': laptop['id']}, {'stock': new_stock})
            
            # 3. Create order record
            order_id = db.insert('orders', {
                'user_id': alice['id'],
                'product_id': laptop['id'],
                'quantity': quantity,
                'total_amount': total_cost,
                'status': 'confirmed'
            })
            
            # 4. Log the transaction
            db.insert('transactions_log', {
                'user_id': alice['id'],
                'action': 'purchase',
                'amount': -total_cost,
                'timestamp': '2025-09-12 11:00:00'
            })
            
            print(f"✅ Order #{order_id} processed successfully!")
            
    except Exception as e:
        print(f"❌ Order failed: {e}")
    
    # Final state
    print(f"\nFinal Results:")
    print("User Balances:")
    users = db.find('users')
    for user in users:
        print(f"  {user['name']}: ${user['balance']}")
    
    print("\nInventory:")
    inventory = db.find('inventory')
    for item in inventory:
        print(f"  {item['product_name']}: {item['stock']} units at ${item['price']}")
    
    print("\nOrders:")
    orders = db.find('orders')
    for order in orders:
        user = db.find('users', {'id': order['user_id']})[0]
        product = db.find('inventory', {'id': order['product_id']})[0]
        print(f"  Order #{order['id']}: {user['name']} bought {order['quantity']} {product['product_name']}(s) - Status: {order['status']}")
    
    db.close()

if __name__ == '__main__':
    demonstrate_transactions()
