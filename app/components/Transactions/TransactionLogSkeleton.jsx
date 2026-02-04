"use client";

const shimmer =
  "relative overflow-hidden bg-gray-200 dark:bg-gray-700 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-gray-300/20 before:to-transparent";

const SkeletonBox = ({ className = "" }) => (
  <div className={`${shimmer} rounded-md ${className}`} />
);

const TransactionLogSkeleton = () => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <SkeletonBox className="h-8 w-56" />
        <SkeletonBox className="h-10 w-64" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        {/* Table Header */}
        <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4">
          <SkeletonBox className="h-5 w-40 bg-gray-700 dark:bg-gray-600" />
        </div>

        {/* Column titles */}
        <div className="hidden md:grid grid-cols-7 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-900">
          {[...Array(7)].map((_, i) => (
            <SkeletonBox key={i} className="h-4 w-full" />
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(10)].map((_, row) => (
            <div
              key={row}
              className="grid grid-cols-1 md:grid-cols-7 gap-4 px-6 py-4"
            >
              <div className="space-y-2">
                <SkeletonBox className="h-4 w-28" />
                <SkeletonBox className="h-3 w-20" />
              </div>

              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-4 w-36" />
              <SkeletonBox className="h-4 w-20" />
              <SkeletonBox className="h-4 w-20" />
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(5)].map((_, i) => (
          <SkeletonBox key={i} className="h-9 w-9 rounded-lg" />
        ))}
      </div>
    </>
  );
};

export default TransactionLogSkeleton;