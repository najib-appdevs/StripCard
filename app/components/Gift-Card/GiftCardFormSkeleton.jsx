const GiftCardFormSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-neutral-200 dark:border-gray-700 shimmer">
      <div className="grid md:grid-cols-5 gap-0 animate-pulse">
        {/* Left Card Preview */}
        <div className="md:col-span-2 bg-gray-100 dark:bg-gray-800 p-8 flex flex-col items-center">
          <div className="w-full max-w-xs">
            <div className="w-full aspect-square bg-gray-300 dark:bg-gray-700 rounded-xl mb-6" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-6" />

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-neutral-200 dark:border-gray-700">
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-2" />
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
            </div>
          </div>
        </div>

        {/* Right Form Fields */}
        <div className="md:col-span-3 p-8 space-y-5">
          <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4" />

          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-2" />
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full" />
            </div>
          ))}

          <div className="h-14 bg-gray-400 dark:bg-gray-600 rounded-lg w-full mt-6" />
        </div>
      </div>
    </div>
  );
};

export default GiftCardFormSkeleton;
