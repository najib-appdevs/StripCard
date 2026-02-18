"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserTransactions } from "../../utils/api";
import TransactionLogSkeleton from "./TransactionLogSkeleton";
import toast from "react-hot-toast";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AllTransactionLog = () => {
  // --------------------------------------------------------------------------
  // State Management
  // --------------------------------------------------------------------------
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [paginatedTx, setPaginatedTx] = useState([]); // current page slice
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);

  const pageSize = 12;

  // --------------------------------------------------------------------------
  // Fetch Transactions (large batch once – client handles pagination & search)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch many at once (adjust number if backend has strict limit)
        const data = await getUserTransactions(1, 500);

        if (!data?.data?.transactions) {
          toast.error("Invalid response format");
        }

        const categories = data.data.transactions || {};
        const allTx = [];

        // Flatten and normalize Add Money
        (categories.add_money || []).forEach((tx) => {
          allTx.push({
            ...tx,
            normalizedType: "ADD-MONEY",
            displayVia: tx.gateway_name || "Unknown",
            displayType: "Add Money",
            displayAmount: tx.request_amount || "—",
            displayFees: tx.total_charge || "—",
            displayBalance: tx.current_balance || "—",
          });
        });

        // Flatten and normalize Transfer Money
        (categories.send_money || []).forEach((tx) => {
          allTx.push({
            ...tx,
            normalizedType: "TRANSFER-MONEY",
            displayVia: tx.transaction_heading || "Transfer",
            displayType: "Transfer Money",
            displayAmount: tx.request_amount || "—",
            displayFees: tx.total_charge || "—",
            displayBalance: tx.current_balance || "—",
          });
        });

        // Flatten and normalize Virtual Card
        (categories.virtual_card || []).forEach((tx) => {
          allTx.push({
            ...tx,
            normalizedType: "VIRTUAL-CARD",
            displayVia: tx.transaction_type || "Virtual Card",
            displayType: "Virtual Card",
            displayAmount:
              tx.request_amount || tx.card_amount || tx.payable || "—",
            displayFees: tx.total_charge || "—",
            displayBalance: tx.current_balance || "—",
          });
        });

        // Flatten and normalize Withdraw Money
        (categories.withdraw_money || []).forEach((tx) => {
          allTx.push({
            ...tx,
            normalizedType: "WITHDRAW-MONEY",
            displayVia: tx.gateway_name || "Manual",
            displayType: "Withdraw Money",
            displayAmount: tx.request_amount || "—",
            displayFees: tx.total_charge || "—",
            displayBalance: tx.current_balance || "—",
          });
        });

        // Flatten and normalize Gift Card
        (categories.gift_cards || []).forEach((tx) => {
          allTx.push({
            ...tx,
            normalizedType: "GIFT-CARD",
            displayVia: tx.card_name || "Gift Card",
            displayType: "Gift Card",
            displayAmount: tx.request_amount || "—",
            displayFees: tx.total_charge || "—",
            displayBalance: tx.current_balance || "—",
          });
        });

        // Sort newest first
        allTx.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

        setAllTransactions(allTx);
        setFilteredTransactions(allTx);
      } catch (err) {
        // console.error("Fetch error:", err);
        setError(err.message || "Could not load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); // only once

  // --------------------------------------------------------------------------
  // Client-side search (supports TRX ID, type, gateway, heading, card name, etc.)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      setFilteredTransactions(allTransactions);
      setCurrentPage(1);
      return;
    }

    const filtered = allTransactions.filter((tx) => {
      const searchableText = [
        tx.trx?.toLowerCase() || "", // Transaction ID
        tx.displayType?.toLowerCase() || "", // e.g. "Add Money", "Transfer Money"
        tx.displayVia?.toLowerCase() || "", // gateway name, heading, card name
        tx.transaction_type?.toLowerCase() || "",
        tx.gateway_name?.toLowerCase() || "",
        tx.transaction_heading?.toLowerCase() || "",
        tx.card_name?.toLowerCase() || "",
      ].join(" ");

      return searchableText.includes(term);
    });

    setFilteredTransactions(filtered);
    setCurrentPage(1); // reset to page 1 on search
  }, [search, allTransactions]);

  // --------------------------------------------------------------------------
  // Pagination – 12 items per page
  // --------------------------------------------------------------------------
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    setPaginatedTx(filteredTransactions.slice(start, start + pageSize));

    const pages = Math.ceil(filteredTransactions.length / pageSize);
    setTotalPages(pages || 1);
  }, [currentPage, filteredTransactions]);

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------
  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderModalContent = () => {
    if (!selectedTx) return null;

    const type = selectedTx.normalizedType;

    const commonFields = (
      <>
        <DetailRow label="Status" value={selectedTx.status} isStatus />
        <DetailRow label="Transaction ID" value={selectedTx.trx} isMono />
        <DetailRow
          label="Fees & Charges"
          value={selectedTx.total_charge || "—"}
        />
        <DetailRow
          label="Current Balance"
          value={selectedTx.current_balance || "—"}
        />
        <DetailRow
          label="Time & Date"
          value={formatDate(selectedTx.date_time)}
        />
      </>
    );

    if (type === "VIRTUAL-CARD") {
      return (
        <>
          <DetailRow
            label="Transaction Type"
            value={selectedTx.transaction_type}
          />
          {commonFields}
          <DetailRow
            label="Card Amount"
            value={selectedTx.card_amount || selectedTx.request_amount || "—"}
          />
          <DetailRow
            label="Card Masked"
            value={selectedTx.card_number || "—"}
            isMono
          />
        </>
      );
    }

    if (type === "TRANSFER-MONEY") {
      return (
        <>
          <DetailRow
            label="Transaction Heading"
            value={selectedTx.transaction_heading || "—"}
          />
          {commonFields}
          <DetailRow
            label="Recipient Received"
            value={selectedTx.recipient_received || "—"}
          />
        </>
      );
    }

    if (type === "ADD-MONEY") {
      return (
        <>
          <DetailRow
            label="Add Balance via"
            value={selectedTx.gateway_name || "—"}
          />
          {commonFields}
          <DetailRow
            label="Exchange Rate"
            value={selectedTx.exchange_rate || "—"}
          />
        </>
      );
    }

    if (type === "WITHDRAW-MONEY") {
      return (
        <>
          <DetailRow
            label="Withdraw Money"
            value={selectedTx.gateway_name || "—"}
          />
          {commonFields}
          <DetailRow
            label="Exchange Rate"
            value={selectedTx.exchange_rate || "—"}
          />
          <DetailRow label="Will Get" value={selectedTx.will_get || "—"} />
        </>
      );
    }

    if (type === "GIFT-CARD") {
      return (
        <>
          <DetailRow
            label="Transaction Type"
            value={selectedTx.transaction_type || "Gift Card"}
          />
          {commonFields}
          <DetailRow
            label="Exchange Rate"
            value={selectedTx.exchange_rate || "—"}
          />
          <DetailRow label="Card Name" value={selectedTx.card_name || "—"} />
          <DetailRow
            label="Receiver Email"
            value={selectedTx.receiver_email || "—"}
          />
          <DetailRow
            label="Receiver Phone"
            value={selectedTx.receiver_phone || "—"}
          />
          <DetailRow
            label="Card Unit Price"
            value={selectedTx.card_unit_price || "—"}
          />
          <DetailRow
            label="Card Quantity"
            value={selectedTx.card_quantity || "—"}
          />
          <DetailRow
            label="Card Total Price"
            value={selectedTx.card_total_price || "—"}
          />
        </>
      );
    }

    // Fallback
    return (
      <>
        <DetailRow
          label="Transaction Type"
          value={selectedTx.transaction_type || "Unknown"}
        />
        {commonFields}
      </>
    );
  };

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  if (loading) return <TransactionLogSkeleton />;
  if (error)
    return (
      <div className="py-12 text-center text-red-600 dark:text-red-400">
        {error}
      </div>
    );

  return (
    <>
      {/* Header + Search */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Transaction Log
        </h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ex: TRX ID, Add Money"
          className="w-64 rounded-lg bg-white dark:bg-gray-800 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 dark:focus:ring-emerald-500"
        />
      </div>

      {/* Search result count */}
      {search.trim() && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Found {filteredTransactions.length} transaction
          {filteredTransactions.length !== 1 ? "s" : ""} matching &quot;{search}
          &quot;
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4">
          <h2 className="text-base font-semibold text-white">
            All Transactions
          </h2>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1100px]">
            <div className="hidden md:grid grid-cols-7 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-900 text-sm font-semibold text-gray-600 dark:text-gray-300">
              <span>Transaction</span>
              <span>Status</span>
              <span>Transaction ID</span>
              <span>Amount</span>
              <span>Fees & Charges</span>
              <span>Current Balance</span>
              <span>Time & Date</span>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedTx.length === 0 ? (
                <div className="py-12 text-center text-gray-500 dark:text-gray-300 col-span-7">
                  {search.trim()
                    ? "No matching transactions found"
                    : "No transactions found"}
                </div>
              ) : (
                paginatedTx.map((log) => (
                  <div
                    key={log.trx || log.id}
                    onClick={() => setSelectedTx(log)}
                    className="grid grid-cols-1 md:grid-cols-7 gap-3 px-6 py-4 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {log.displayVia}
                      <div className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">
                        {log.displayType}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs font-medium">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          log.status === "Success"
                            ? "bg-green-500"
                            : log.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span
                        className={
                          log.status === "Success"
                            ? "text-green-700 dark:text-green-400"
                            : log.status === "Pending"
                              ? "text-yellow-700 dark:text-yellow-400"
                              : "text-red-700 dark:text-red-400"
                        }
                      >
                        {log.status}
                      </span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-mono">
                      {log.trx}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {log.displayAmount}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {log.displayFees}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {log.displayBalance}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {formatDate(log.date_time)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              Math.abs(page - currentPage) > 2 &&
              page !== 1 &&
              page !== totalPages
            )
              return null;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg border text-sm font-medium cursor-pointer ${
                  currentPage === page
                    ? "bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-700 dark:border-emerald-700 dark:hover:bg-emerald-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-none p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Transaction Details
              </h2>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full cursor-pointer"
              >
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {renderModalContent()}
            </div>

            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 text-right">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-6 py-2.5 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================================================
// HELPER COMPONENT
// ============================================================================

const DetailRow = ({ label, value, isStatus = false, isMono = false }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
      {label}
    </dt>
    <dd
      className={`text-base ${isMono ? "font-mono" : ""} ${
        isStatus
          ? value === "Success"
            ? "text-green-700 dark:text-green-400 font-medium"
            : value === "Pending"
              ? "text-yellow-700 dark:text-yellow-400 font-medium"
              : value === "Rejected" || value === "rejected"
                ? "text-red-700 dark:text-red-400 font-medium"
                : "text-gray-900 dark:text-gray-100"
          : "text-gray-900 dark:text-gray-100"
      }`}
    >
      {value || "—"}
    </dd>
  </div>
);

export default AllTransactionLog;
