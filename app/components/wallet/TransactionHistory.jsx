import { Filter, Search } from "lucide-react";
import TransactionTable from "./TransactionTable";

export default function TransactionHistory() {
  return (
    <div className="bg-white rounded-xl border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Title */}
          <h2 className="text-xl font-bold text-black">Transaction History</h2>

          {/* Search + Filter */}
          <div className="flex flex-col gap-3 sm:flex-row md:gap-3">
            {/* Search Bar */}
            <div className="relative w-full sm:w-auto">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-full sm:w-48 md:w-60 bg-white border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors w-full sm:w-auto">
              <Filter className="text-gray-600" size={18} />
              <span className="font-medium">Filter</span>
            </button>
          </div>
        </div>
      </div>

      <TransactionTable />
    </div>
  );
}
