const GiftCardTableSkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      {/* Header Skeleton */}
      <div className="bg-gray-900 dark:bg-gray-950 px-6 py-4">
        <div className="h-4 w-32 bg-gray-700 dark:bg-gray-600 rounded animate-pulse" />
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden md:block">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-6 py-4 border-b border-gray-200 dark:border-gray-700 animate-pulse"
          >
            <div className="w-16 h-10 bg-gray-200 dark:bg-gray-700 rounded" />

            <div className="flex-1 space-y-2">
              <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
        ))}
      </div>

      {/* Mobile Skeleton */}
      <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="px-6 py-4 space-y-4 animate-pulse">
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="space-y-2">
                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCardTableSkeleton;