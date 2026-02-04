const TransferLogSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Table Header Skeleton (Desktop) */}
      <div className="hidden md:grid min-w-[900px] grid-cols-7 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-900">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700 min-w-[900px]">
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-1 md:grid-cols-7 gap-3 px-6 py-4"
          >
            {Array.from({ length: 7 }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-4 rounded bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TransferLogSkeleton;
