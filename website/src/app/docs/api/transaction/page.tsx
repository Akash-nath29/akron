import { DocsLayout, PreCodeBlock } from "../../../../components/DocsLayout";

export default function TransactionPage() {
  return (
    <DocsLayout 
      title="transaction()" 
      description="Atomic database operations: group multiple changes into a single, all-or-nothing transaction for data integrity and reliability."
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 mb-4">
          The <code>transaction()</code> context manager lets you group multiple database operations into a single atomic unit. Either <strong>all</strong> changes succeed together, or <strong>none</strong> are applied if something fails. This is essential for keeping your data safe and consistent.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Transactions?</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
          <li><strong>Data Integrity:</strong> Prevents partial updates and keeps your database consistent.</li>
          <li><strong>Automatic Rollback:</strong> If any operation fails, all changes are undone automatically.</li>
          <li><strong>Business Logic:</strong> Ensures complex operations (like money transfers, order processing) are atomic.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Usage</h2>
        <PreCodeBlock title="Transaction Example" showCopy={true}>{`with db.transaction():
        user_id = db.insert("users", {"name": "Alice"})
        db.insert("profiles", {"user_id": user_id})
    # If any step fails, all changes are rolled back!
`}</PreCodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Scenarios</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
          <li><strong>Money Transfer:</strong> Deduct from one account, add to another, log the transaction. If any step fails, no money is lost.</li>
          <li><strong>Order Processing:</strong> Charge customer, reduce inventory, create order record. If payment fails, inventory isn&apos;t reduced.</li>
          <li><strong>User Registration:</strong> Create account, profile, send email. If any step fails, no partial user is created.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-1 mb-4">
          <li>Akron starts a transaction when you enter the <code>with db.transaction()</code> block.</li>
          <li>If all operations succeed, changes are committed.</li>
          <li>If any operation fails, Akron automatically rolls back all changes.</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
          <li>Use transactions for any set of operations that must succeed together.</li>
          <li>Don&apos;t use transactions for simple, single-step reads or writes.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More</h2>
        <p className="text-gray-600 mb-4">See the <a href="/docs/getting-started/basic-usage">Basic Usage</a> and <a href="/docs/api/insert">Insert API</a> for more examples.</p>
      </section>
    </DocsLayout>
  );
}
