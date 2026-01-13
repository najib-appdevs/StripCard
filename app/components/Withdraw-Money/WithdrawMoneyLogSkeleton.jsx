const WithdrawMoneyLogSkeleton = () => {
  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header skeleton */}
        <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
          <div className="h-5 w-40 rounded bg-gray-700 animate-pulse" />
        </div>

        {/* Table header skeleton */}
        <div className="hidden md:grid min-w-[1000px] grid-cols-8 gap-4 px-6 py-3 bg-gray-50">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-full rounded bg-gray-200 animate-pulse"
            />
          ))}
        </div>

        {/* Rows skeleton */}
        <div className="divide-y min-w-[1000px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-8 gap-3 px-6 py-4 animate-pulse"
            >
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="h-4 w-full rounded bg-gray-200" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoneyLogSkeleton;
