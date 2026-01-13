function AddMoneyFormSkeleton() {
  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse">
      {/* Header */}
      <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
        <div className="mx-auto h-4 w-32 rounded bg-gray-700" />
      </div>

      {/* Body */}
      <div className="flex flex-col space-y-7 p-6">
        {/* Payment Gateway */}
        <div>
          <div className="mb-2 h-4 w-40 rounded bg-gray-200" />
          <div className="h-11 w-full rounded-xl bg-gray-200" />
        </div>

        {/* Amount & Currency */}
        <div>
          <div className="mb-2 h-4 w-32 rounded bg-gray-200" />
          <div className="flex h-11 w-full rounded-xl bg-gray-200" />
        </div>

        {/* Info Box */}
        <div className="space-y-3 rounded-xl bg-gray-100 px-4 py-4">
          <div className="flex justify-between">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-4 w-28 rounded bg-gray-200" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-36 rounded bg-gray-200" />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Button */}
        <div className="h-14 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

export default AddMoneyFormSkeleton;
