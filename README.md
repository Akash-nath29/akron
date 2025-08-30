# Mosaic ORM

A simple, universal Python ORM for SQL databases (SQLite, MySQL, PostgreSQL) with beginner-friendly syntax and multi-table support.

## Features
- Simple dict-based schema and CRUD API
- Multi-database support: SQLite, MySQL, PostgreSQL
- Multi-table creation and foreign key relationships
- Unified API for all backends
- Automatic connection management
- Custom exceptions for errors

## Quickstart

### Install dependencies
```bash
pip install mysql-connector-python psycopg2
```

### Example usage
```python
from mosaic import Mosaic

# SQLite
sqlite_db = Mosaic("sqlite:///test.db")

# MySQL
mysql_db = Mosaic("mysql://root:@localhost:3306/mosaic_test")

# PostgreSQL
pg_db = Mosaic("postgres://user:password@localhost:5432/mosaic_test")

# Create tables
sqlite_db.create_table("users", {"id": "int", "name": "str"})
sqlite_db.create_table("orders", {"id": "int", "user_id": "int->users.id", "amount": "float"})

# Insert data
alice_id = sqlite_db.insert("users", {"name": "Alice"})
sqlite_db.insert("orders", {"user_id": alice_id, "amount": 100.0})

# Query data
print(sqlite_db.find("users"))
print(sqlite_db.find("orders"))

sqlite_db.close()
```

## Foreign Key Syntax
Declare foreign keys in your schema using:
```python
"user_id": "int->users.id"
```
This creates a foreign key from `orders.user_id` to `users.id`.

## Examples
- See `examples/sqlite_multi_table.py` for SQLite multi-table usage
- See `examples/postgres_multi_table.py` for PostgreSQL multi-table usage
- See `tests/test_multi_table.py` for MySQL multi-table and FK enforcement

## Extending Mosaic
- Add new drivers by subclassing `BaseDriver` in `mosaic/core/base.py`
- Add selection logic in `mosaic/orm.py`

## Roadmap
- Joins and advanced queries
- Typesafe models
- NoSQL support
- Built-in migrations

## License
MIT
