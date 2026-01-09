function TwoFactorSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col">
      {/* Title */}
      <div className="h-5 w-56 bg-gray-200 rounded mx-auto mb-6 shimmer" />

      {/* Status badge */}
      <div className="flex justify-center mb-6">
        <div className="h-7 w-28 bg-gray-200 rounded-full shimmer" />
      </div>

      {/* Secret input */}
      <div className="mb-8">
        <div className="h-12 w-full bg-gray-200 rounded-lg shimmer" />
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-8">
        <div className="w-48 h-48 bg-gray-200 rounded-lg shimmer" />
      </div>

      {/* Alert text */}
      <div className="h-12 w-full bg-gray-200 rounded-lg mb-6 shimmer" />

      {/* Button */}
      <div className="mt-auto">
        <div className="h-12 w-full bg-gray-300 rounded-lg shimmer" />
      </div>
    </div>
  );
}

export default TwoFactorSkeleton;
