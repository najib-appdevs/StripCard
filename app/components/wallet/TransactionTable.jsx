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
    amount: "-$6,1400",
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
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-white">
            <th className="text-left px-6 py-4 text-sm font-semibold text-black">
              Description
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-black">
              Trx ID
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-black">
              Amount
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-black">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <TransactionRow key={tx.id} transaction={tx} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
