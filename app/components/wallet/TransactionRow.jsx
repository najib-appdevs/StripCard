export default function TransactionRow({ transaction }) {
  const { description, date, txId, amount, status, type } = transaction;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              type === "in" ? "bg-green-50" : "bg-red-50"
            }`}
          >
            {type === "in" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 19V5M12 5L5 12M12 5L19 12"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="rotate(180 12 12)"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M12 19L5 12M12 19L19 12"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div>
            <p className="font-medium text-black">{description}</p>
            <p className="text-sm text-gray-600">{date}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 text-black">{txId}</td>
      <td className="px-6 py-5">
        <span
          className={`font-semibold ${
            type === "in" ? "text-green-500" : "text-red-500"
          }`}
        >
          {amount}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          {status}
        </span>
      </td>
    </tr>
  );
}
