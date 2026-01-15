export default function WalletBalanceSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-6 animate-pulse">
        <div>
          <div className="h-4 w-40 bg-gray-200 rounded mb-3" />
          <div className="h-10 w-60 bg-gray-300 rounded" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="h-12 w-full sm:w-36 bg-gray-300 rounded-lg" />
          <div className="h-12 w-full sm:w-36 bg-gray-300 rounded-lg" />
        </div>
      </div>

      {/* Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-lg" />
              <div className="w-7 h-7 bg-gray-200 rounded-full" />
            </div>

            <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-24 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </>
  );
}
