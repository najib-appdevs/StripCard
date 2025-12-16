export default function TransactionRow({ transaction }) {
  const {
    txId,
    fees,
    cardAmount,
    cardMasked,
    currentBalance,
    dateTime,
    virtualCard,
    status,
    type,
  } = transaction;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
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
            <p className="font-medium text-black">{txId}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-black">{fees}</td>
      <td className="px-6 py-4">
        <span
          className={`font-semibold ${
            type === "in" ? "text-green-500" : "text-red-500"
          }`}
        >
          {cardAmount}
        </span>
      </td>
      <td className="px-6 py-4 text-black font-mono">{cardMasked}</td>
      <td className="px-6 py-4">
        <span className="font-semibold text-black">{currentBalance}</span>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600">{dateTime}</p>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {virtualCard}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "Success"
              ? "bg-green-100 text-green-700"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
