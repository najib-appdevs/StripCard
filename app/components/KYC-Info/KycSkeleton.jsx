function KycSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="animate-pulse">
        {/* Header */}
        <div className="mb-6 border-b pb-4">
          <div className="h-6 w-48 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Fields */}
        <div className="space-y-5">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-11 w-full bg-gray-200 rounded-lg"></div>
            </div>
          ))}

          {/* Button */}
          <div className="h-11 w-full bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default KycSkeleton;
