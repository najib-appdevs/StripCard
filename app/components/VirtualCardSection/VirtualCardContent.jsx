import CardCarousel from "./CardCarousel";

export default function RightSideContent() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 ">
      <CardCarousel />

      <div className="space-y-4 mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="text-gray-500 text-xs sm:text-sm">Total Balance</p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">
              $259.75
            </p>
          </div>

          <button
            className="flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-transform duration-200 hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
            }}
          >
            Card Top Up
          </button>
        </div>
      </div>
    </div>
  );
}
