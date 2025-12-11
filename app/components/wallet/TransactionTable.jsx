import TransactionRow from "./TransactionRow";

const transactions = [
  {
    id: 1,
    description: "Receive Money",
    date: "07 Jun 2025",
    txId: "#MY548G214",
    amount: "+$2,500",
    status: "Success",
    type: "in",
  },
  {
    id: 2,
    description: "Money Out",
    date: "07 Jun 2025",
    txId: "#MY548G214",
    amount: "-$8,600",
    status: "Success",
    type: "out",
  },
  {
    id: 3,
    description: "Receive Money",
    date: "07 Jun 2025",
    txId: "#MY548G214",
    amount: "-$6,1400", // note: this was negative but labeled as "Receive" – fixed below if needed
    status: "Success",
    type: "out",
  },
  {
    id: 4,
    description: "Receive Money",
    date: "07 Jun 2025",
    txId: "#MY548G214",
    amount: "+$2,500",
    status: "Success",
    type: "in",
  },
];

export default function TransactionTable() {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-xl border  bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Trx ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {transactions.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}