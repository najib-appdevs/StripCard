function AddMoneyLogSkeleton() {
  return (
    <div className="mt-6 animate-pulse">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header Skeleton */}
        <div className="rounded-t-2xl bg-gray-900 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="h-4 w-32 rounded bg-gray-700" />

          <div className="flex items-center gap-3">
            <div className="h-8 w-44 rounded bg-gray-700" />
            <div className="h-4 w-20 rounded bg-gray-700" />
          </div>
        </div>

        {/* Table Header Skeleton */}
        <div className="hidden md:grid min-w-[900px] grid-cols-7 gap-4 px-6 py-3 bg-gray-50">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-3 rounded bg-gray-200" />
          ))}
        </div>

        {/* Rows Skeleton */}
        <div className="divide-y min-w-[900px]">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 md:grid-cols-7 gap-3 px-6 py-4"
            >
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-4 w-36 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Mobile Button Skeleton */}
        <div className="md:hidden px-6 py-4">
          <div className="h-10 w-full rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default AddMoneyLogSkeleton;
