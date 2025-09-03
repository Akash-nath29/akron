import { DocsLayout, PreCodeBlock, CodeBlock, OutputBlock } from "../../../../components/DocsLayout";

export default function MigratePage() {
  return (
    <DocsLayout 
      title="migrate Command" 
      description="Apply database migrations using the Akron CLI to synchronize schema changes across SQLite, MySQL, PostgreSQL, and MongoDB."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>migrate</code> command applies pending database migrations to bring your database 
          schema up to date. It tracks which migrations have been applied and only runs new ones.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Basic Syntax</h3>
          <CodeBlock>{`akron migrate --db <database_url> [options]`}</CodeBlock>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--db</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (required)</p>
            <p className="text-gray-600">Database connection URL to apply migrations to.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--migrations-dir</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Directory containing migration files. Default: ./migrations/</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--target</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> str (optional)</p>
            <p className="text-gray-600">Migrate to specific migration by name. Default: latest</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--rollback</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> flag (optional)</p>
            <p className="text-gray-600">Rollback the last applied migration.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">--dry-run</h3>
            <p className="text-gray-600 mb-2"><strong>Type:</strong> flag (optional)</p>
            <p className="text-gray-600">Show which migrations would be applied without executing them.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Apply All Pending Migrations</h3>
            <PreCodeBlock>
{`# Apply all pending migrations
akron migrate --db "sqlite:///myapp.db"`}
            </PreCodeBlock>
            <OutputBlock>
{`Migration Status Check:
======================
✓ 001_initial_schema.py - APPLIED
✓ 002_add_user_profiles.py - APPLIED
• 003_add_products_table.py - PENDING
• 004_update_user_schema.py - PENDING

Applying migrations:
====================
→ Applying 003_add_products_table.py... ✓
→ Applying 004_update_user_schema.py... ✓

✓ Applied 2 migrations successfully
✓ Database is now up to date`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Migrate to Specific Version</h3>
            <PreCodeBlock>
{`# Migrate up to a specific migration
akron migrate --db "mysql://user:pass@host:3306/store" --target "003_add_products_table"`}
            </PreCodeBlock>
            <OutputBlock>
{`Migration Target: 003_add_products_table.py
==========================================
→ Applying 003_add_products_table.py... ✓

✓ Migrated to target: 003_add_products_table
✓ 1 migration applied`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Rollback Last Migration</h3>
            <PreCodeBlock>
{`# Rollback the most recent migration
akron migrate --db "postgres://user:pass@host:5432/app" --rollback`}
            </PreCodeBlock>
            <OutputBlock>
{`Rollback Confirmation:
=====================
Last applied migration: 004_update_user_schema.py
This will execute the downgrade() function.

Are you sure you want to rollback? (y/N): y

→ Rolling back 004_update_user_schema.py... ✓
✓ Migration rolled back successfully`}
            </OutputBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dry Run Preview</h3>
            <PreCodeBlock>
{`# Preview what migrations would be applied
akron migrate --db "mongodb://localhost:27017/social" --dry-run`}
            </PreCodeBlock>
            <OutputBlock>
{`Migration Preview (DRY RUN):
============================
✓ 001_initial_collections.py - APPLIED
✓ 002_add_user_preferences.py - APPLIED
• 003_update_post_schema.py - PENDING (would apply)
• 004_add_indexes.py - PENDING (would apply)

Would apply 2 migrations.
Run without --dry-run to execute.`}
            </OutputBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Migration Tracking</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Migration History Table</h3>
            <p className="text-gray-600 mb-4">
              Akron automatically creates a migration tracking table to record applied migrations:
            </p>
            <PreCodeBlock>
{`# Migration tracking table structure
CREATE TABLE akron_migrations (
    id SERIAL PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    checksum VARCHAR(64) NOT NULL
);`}
            </PreCodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Check Migration Status</h3>
            <PreCodeBlock>
{`# View applied migrations
akron migrate --db "sqlite:///app.db" --dry-run`}
            </PreCodeBlock>
            <p className="text-gray-600">This shows which migrations have been applied and which are pending.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Migration Safety</h2>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Transaction Safety</h3>
            <p className="text-green-800 mb-2">
              Each migration runs in a transaction and rolls back on failure:
            </p>
            <PreCodeBlock>
{`Migration Process:
1. BEGIN TRANSACTION
2. Execute migration upgrade()
3. Record migration in tracking table
4. COMMIT TRANSACTION (or ROLLBACK on error)`}
            </PreCodeBlock>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Checksum Validation</h3>
            <p className="text-blue-800">
              Migration files are checksummed to detect changes after application, preventing 
              inconsistencies in team environments.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Backup Recommendation</h3>
            <p className="text-yellow-800">
              Always backup production databases before running migrations, especially those 
              involving data transformations or structural changes.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Production Deployment</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Deployment Script Example</h3>
            <PreCodeBlock>
{`#!/bin/bash
# deploy.sh - Production deployment script

echo "Starting deployment..."

# 1. Backup database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Apply migrations
akron migrate --db "$DATABASE_URL"

if [ $? -eq 0 ]; then
    echo "✓ Migrations applied successfully"
    
    # 3. Deploy application code
    ./deploy_app.sh
    
    echo "✓ Deployment complete"
else
    echo "✗ Migration failed - deployment aborted"
    exit 1
fi`}
            </PreCodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Zero-Downtime Migrations</h3>
            <PreCodeBlock>
{`# For zero-downtime deployments:
# 1. Apply backward-compatible migrations first
akron migrate --db "$DATABASE_URL" --target "005_add_new_columns"

# 2. Deploy new application version
./deploy_new_version.sh

# 3. Apply remaining migrations
akron migrate --db "$DATABASE_URL"`}
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
              <li><strong>Migration file not found:</strong> Check migrations directory path</li>
              <li><strong>SQL syntax error:</strong> Review migration file syntax</li>
              <li><strong>Permission denied:</strong> Ensure database user has DDL privileges</li>
              <li><strong>Foreign key constraint:</strong> Check table dependency order</li>
              <li><strong>Migration checksum mismatch:</strong> Migration file was modified after application</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Recovery Strategies</h3>
            <PreCodeBlock>
{`# If migration fails:
# 1. Check error details
akron migrate --db "sqlite:///app.db" --dry-run

# 2. Fix the migration file
vim migrations/005_problematic_migration.py

# 3. If migration was partially applied, manually clean up:
akron raw-sql --db "sqlite:///app.db" --query "DROP TABLE IF EXISTS partial_table"

# 4. Mark migration as not applied (if needed)
akron raw-sql --db "sqlite:///app.db" --query "DELETE FROM akron_migrations WHERE migration_name = '005_problematic_migration.py'"

# 5. Re-run migration
akron migrate --db "sqlite:///app.db"`}
            </PreCodeBlock>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Migration Management</h3>
            <a href="/docs/cli/makemigrations" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → makemigrations command
            </a>
            <a href="/docs/cli/inspect-schema" className="text-blue-600 hover:text-blue-800 text-sm block">
              → inspect-schema command
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schema Operations</h3>
            <a href="/docs/cli/create-table" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → create-table command
            </a>
            <a href="/docs/cli/raw-sql" className="text-blue-600 hover:text-blue-800 text-sm block">
              → raw-sql command
            </a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Development</h3>
            <a href="/docs/cli/seed" className="text-blue-600 hover:text-blue-800 text-sm block mb-1">
              → seed command
            </a>
            <a href="/docs/getting-started" className="text-blue-600 hover:text-blue-800 text-sm block">
              → Getting Started guide
            </a>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
