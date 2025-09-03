import { DocsLayout, PreCodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function InstallationPage() {
  return (
    <DocsLayout 
      title="Installation" 
      description="Complete installation guide for Akron ORM with support for SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          Akron ORM can be installed via pip and supports multiple database backends. This guide covers 
          installation for all supported databases and common setup scenarios.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 Requirements</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Python 3.7 or higher</li>
            <li>• pip package manager</li>
            <li>• Database server (for MySQL, PostgreSQL, MongoDB)</li>
            <li>• Virtual environment (recommended)</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic Installation</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Install Akron ORM</h3>
        <p className="text-gray-600 mb-4">
          Install Akron using pip. This includes SQLite support by default:
        </p>

        <PreCodeBlock title="Basic Installation">
{`# Install Akron ORM
pip install akron

# Verify installation
python -c "import akron; print(f'Akron {akron.__version__} installed successfully')"

# Check CLI availability
akron --version`}
        </PreCodeBlock>

        <OutputBlock>
{`Collecting akron
Installing collected packages: akron
Successfully installed akron-1.0.0

Akron 1.0.0 installed successfully
akron 1.0.0`}
        </OutputBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <h4 className="text-lg font-semibold text-green-900 mb-2">✅ What&apos;s Included</h4>
          <ul className="text-green-800 space-y-1">
            <li>• Akron ORM core library</li>
            <li>• SQLite driver (built into Python)</li>
            <li>• Pydantic integration for type safety</li>
            <li>• Command-line interface (CLI)</li>
            <li>• Migration system</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Database-Specific Installation</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">MySQL Support</h3>
        <p className="text-gray-600 mb-4">
          Install MySQL connector for MySQL database support:
        </p>

        <PreCodeBlock title="MySQL Installation">
{`# Install with MySQL support
pip install akron mysql-connector-python

# Alternative MySQL driver (if needed)
pip install akron PyMySQL

# Verify MySQL connection capability
python -c "import mysql.connector; print('MySQL connector ready')"

# Test connection (replace with your credentials)
python -c "
from akron import Akron
try:
    db = Akron('mysql://user:password@localhost:3306/test')
    print('MySQL connection successful')
except Exception as e:
    print(f'MySQL connection failed: {e}')
"`}
        </PreCodeBlock>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-semibold text-yellow-900 mb-1">Prerequisites for MySQL</h4>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• Running MySQL server (8.0+ recommended)</li>
            <li>• Database user with appropriate privileges</li>
            <li>• Network access to MySQL server</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">PostgreSQL Support</h3>
        <p className="text-gray-600 mb-4">
          Install PostgreSQL adapter for PostgreSQL database support:
        </p>

        <PreCodeBlock title="PostgreSQL Installation">
{`# Install with PostgreSQL support
pip install akron psycopg2-binary

# For production (compile from source)
pip install akron psycopg2

# Using conda (alternative)
conda install akron psycopg2

# Verify PostgreSQL connection capability
python -c "import psycopg2; print('PostgreSQL adapter ready')"

# Test connection (replace with your credentials)
python -c "
from akron import Akron
try:
    db = Akron('postgres://user:password@localhost:5432/test')
    print('PostgreSQL connection successful')
except Exception as e:
    print(f'PostgreSQL connection failed: {e}')
"`}
        </PreCodeBlock>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-semibold text-yellow-900 mb-1">Prerequisites for PostgreSQL</h4>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• Running PostgreSQL server (12+ recommended)</li>
            <li>• Database user with appropriate privileges</li>
            <li>• libpq-dev package (for psycopg2 compilation)</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">MongoDB Support</h3>
        <p className="text-gray-600 mb-4">
          Install MongoDB driver for MongoDB database support:
        </p>

        <PreCodeBlock title="MongoDB Installation">
{`# Install with MongoDB support
pip install akron pymongo

# With additional features (DNS SRV support for Atlas)
pip install akron "pymongo[srv]"

# Verify MongoDB connection capability
python -c "import pymongo; print('MongoDB driver ready')"

# Test connection (replace with your credentials)
python -c "
from akron import Akron
try:
    db = Akron('mongodb://localhost:27017/test')
    print('MongoDB connection successful')
except Exception as e:
    print(f'MongoDB connection failed: {e}')
"`}
        </PreCodeBlock>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-semibold text-yellow-900 mb-1">Prerequisites for MongoDB</h4>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• Running MongoDB server (4.4+ recommended)</li>
            <li>• Authentication configured (if required)</li>
            <li>• Network access to MongoDB server</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Installation</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">All Databases at Once</h3>
        <p className="text-gray-600 mb-4">
          Install Akron with support for all databases in one command:
        </p>

        <PreCodeBlock title="Full Installation">
{`# Install with all database drivers
pip install akron mysql-connector-python psycopg2-binary pymongo

# Or using a requirements.txt file
echo "akron
mysql-connector-python
psycopg2-binary
pymongo" > requirements.txt

pip install -r requirements.txt

# Verify all drivers
python -c "
import akron
import sqlite3
import mysql.connector
import psycopg2
import pymongo

print('✓ Akron ORM installed')
print('✓ SQLite support (built-in)')
print('✓ MySQL support available') 
print('✓ PostgreSQL support available')
print('✓ MongoDB support available')
print('\\nAll database drivers ready!')
"`}
        </PreCodeBlock>

        <OutputBlock>
{`✓ Akron ORM installed
✓ SQLite support (built-in)
✓ MySQL support available
✓ PostgreSQL support available
✓ MongoDB support available

All database drivers ready!`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Virtual Environment Setup</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Recommended: Using Virtual Environments</h3>
        <p className="text-gray-600 mb-4">
          It&apos;s recommended to install Akron in a virtual environment to avoid conflicts:
        </p>

        <PreCodeBlock title="Virtual Environment Setup">
{`# Create virtual environment
python -m venv akron_env

# Activate virtual environment (Windows)
akron_env\\Scripts\\activate

# Activate virtual environment (macOS/Linux)
source akron_env/bin/activate

# Install Akron in virtual environment
pip install akron mysql-connector-python psycopg2-binary pymongo

# Verify installation
which python  # Should show path in akron_env
pip list | grep akron

# Deactivate when done
deactivate`}
        </PreCodeBlock>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Using conda</h3>
        <p className="text-gray-600 mb-4">
          Alternative installation using conda package manager:
        </p>

        <PreCodeBlock title="Conda Installation">
{`# Create conda environment
conda create -n akron_env python=3.9

# Activate environment
conda activate akron_env

# Install Akron and dependencies
pip install akron  # Akron not yet in conda-forge
conda install mysql-connector-python psycopg2 pymongo

# Verify installation
conda list | grep -E "(akron|mysql|psycopg2|pymongo)"

# Deactivate when done
conda deactivate`}
        </PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Verification</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Verification Script</h3>
        <p className="text-gray-600 mb-4">
          Run this script to verify your installation and test all database connections:
        </p>

        <PreCodeBlock title="Verification Script (save as test_installation.py)">
{`#!/usr/bin/env python3
"""
Akron ORM Installation Verification Script
Run this to test your installation and database connectivity.
"""

import sys
from datetime import datetime

def test_akron_import():
    """Test basic Akron import and version"""
    try:
        import akron
        print(f"✓ Akron ORM {akron.__version__} imported successfully")
        return True
    except ImportError as e:
        print(f"✗ Failed to import Akron: {e}")
        return False

def test_cli_availability():
    """Test CLI availability"""
    import subprocess
    try:
        result = subprocess.run(['akron', '--version'], 
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            print(f"✓ CLI available: {result.stdout.strip()}")
            return True
        else:
            print(f"✗ CLI failed: {result.stderr}")
            return False
    except (subprocess.TimeoutExpired, FileNotFoundError) as e:
        print(f"✗ CLI not available: {e}")
        return False

def test_database_drivers():
    """Test database driver availability"""
    drivers = {
        'SQLite': 'sqlite3',
        'MySQL': 'mysql.connector', 
        'PostgreSQL': 'psycopg2',
        'MongoDB': 'pymongo'
    }
    
    results = {}
    for db_name, module_name in drivers.items():
        try:
            __import__(module_name)
            print(f"✓ {db_name} driver available")
            results[db_name] = True
        except ImportError:
            print(f"✗ {db_name} driver not available")
            results[db_name] = False
    
    return results

def test_basic_functionality():
    """Test basic Akron functionality"""
    try:
        from akron import Akron
        from pydantic import BaseModel
        from akron.models import ModelMixin
        
        # Test in-memory SQLite
        db = Akron("sqlite:///:memory:")
        
        # Test table creation
        db.create_table("test_table", {"id": "int", "name": "str"})
        
        # Test data insertion
        test_id = db.insert("test_table", {"id": 1, "name": "test"})
        
        # Test data retrieval
        result = db.find("test_table", {"id": 1})
        
        if result and result[0]["name"] == "test":
            print("✓ Basic CRUD operations working")
            return True
        else:
            print("✗ Basic CRUD operations failed")
            return False
            
    except Exception as e:
        print(f"✗ Basic functionality test failed: {e}")
        return False

def main():
    """Run all verification tests"""
    print("Akron ORM Installation Verification")
    print("=" * 40)
    print(f"Python version: {sys.version}")
    print(f"Test time: {datetime.now()}")
    print("-" * 40)
    
    # Run tests
    tests = [
        ("Akron Import", test_akron_import),
        ("CLI Availability", test_cli_availability), 
        ("Database Drivers", test_database_drivers),
        ("Basic Functionality", test_basic_functionality)
    ]
    
    results = {}
    for test_name, test_func in tests:
        print(f"\\n{test_name}:")
        results[test_name] = test_func()
    
    # Summary
    print("\\n" + "=" * 40)
    print("VERIFICATION SUMMARY")
    print("=" * 40)
    
    all_passed = True
    for test_name, passed in results.items():
        status = "PASS" if passed else "FAIL"
        print(f"{test_name}: {status}")
        if not passed:
            all_passed = False
    
    if all_passed:
        print("\\n✓ All tests passed! Akron is ready to use.")
        return 0
    else:
        print("\\n✗ Some tests failed. Check installation.")
        return 1

if __name__ == "__main__":
    sys.exit(main())`}
        </PreCodeBlock>

        <p className="text-gray-600 mb-4 mt-4">
          Run the verification script:
        </p>

        <PreCodeBlock>
{`python test_installation.py`}
        </PreCodeBlock>

        <OutputBlock>
{`Akron ORM Installation Verification
========================================
Python version: 3.9.7 (default, Sep 16 2021, 08:50:36)
Test time: 2024-01-15 10:30:45.123456
----------------------------------------

Akron Import:
✓ Akron ORM 1.0.0 imported successfully

CLI Availability:
✓ CLI available: akron 1.0.0

Database Drivers:
✓ SQLite driver available
✓ MySQL driver available
✓ PostgreSQL driver available
✓ MongoDB driver available

Basic Functionality:
✓ Basic CRUD operations working

========================================
VERIFICATION SUMMARY
========================================
Akron Import: PASS
CLI Availability: PASS
Database Drivers: PASS
Basic Functionality: PASS

✓ All tests passed! Akron is ready to use.`}
        </OutputBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">pip install fails</h3>
            <p className="text-gray-600 mb-2">
              If pip installation fails, try these solutions:
            </p>
            <PreCodeBlock>
{`# Update pip first
python -m pip install --upgrade pip

# Install with verbose output to see errors
pip install -v akron

# Install from specific index if needed
pip install -i https://pypi.org/simple akron

# Clear pip cache if corrupted
pip cache purge
pip install akron`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">psycopg2 compilation errors</h3>
            <p className="text-gray-600 mb-2">
              PostgreSQL driver compilation issues on some systems:
            </p>
            <PreCodeBlock>
{`# Use binary version (recommended)
pip install psycopg2-binary

# On Ubuntu/Debian, install system dependencies
sudo apt-get install libpq-dev python3-dev

# On CentOS/RHEL
sudo yum install postgresql-devel python3-devel

# On macOS with Homebrew
brew install postgresql`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">MySQL connector issues</h3>
            <p className="text-gray-600 mb-2">
              MySQL connector installation or connection problems:
            </p>
            <PreCodeBlock>
{`# Try alternative MySQL driver
pip uninstall mysql-connector-python
pip install PyMySQL

# Update connection string for PyMySQL
# From: mysql://user:pass@host/db
# To:   mysql+pymysql://user:pass@host/db

# Or install MySQL official connector
pip install mysql-connector-python==8.0.33`}
            </PreCodeBlock>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Permission errors</h3>
            <p className="text-gray-600 mb-2">
              Permission denied during installation:
            </p>
            <PreCodeBlock>
{`# Install for current user only
pip install --user akron

# Or use virtual environment (recommended)
python -m venv myenv
source myenv/bin/activate  # Linux/macOS
myenv\\Scripts\\activate    # Windows
pip install akron`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-4">
          Now that Akron is installed, you&apos;re ready to start building applications:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/docs/getting-started/quick-start" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Quick Start Guide</h3>
            <p className="text-gray-600 text-sm">Get up and running with your first Akron application in minutes</p>
          </a>
          
          <a href="/docs/getting-started/basic-usage" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Basic Usage</h3>
            <p className="text-gray-600 text-sm">Learn the fundamental concepts and operations</p>
          </a>
          
          <a href="/docs/api/constructor" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">API Reference</h3>
            <p className="text-gray-600 text-sm">Detailed documentation for all Akron methods</p>
          </a>
          
          <a href="/docs/database-support" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Database Guides</h3>
            <p className="text-gray-600 text-sm">Database-specific features and configurations</p>
          </a>
        </div>
      </section>
    </DocsLayout>
  );
}
