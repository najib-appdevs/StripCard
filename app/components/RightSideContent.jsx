export default function RightSideContent() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Virtual Card</h2>
      </div>

      {/* Promotional Card */}
      <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white p-6 rounded-xl mb-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1">Get 10% Cash Back</h3>
          <p className="text-sm opacity-90">on Your next transaction</p>
        </div>
        <button className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg border border-white/30">
          Transfer Money
        </button>
        <div className="flex gap-2 mt-4">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span className="w-2 h-2 bg-white/40 rounded-full"></span>
          <span className="w-2 h-2 bg-white/40 rounded-full"></span>
        </div>
      </div>

      {/* Card Carousel Area - Exactly like your picture */}
      <div className="relative flex justify-center items-center mb-10">
        {/* Left Card - Full size, peeking left */}
        <div className="absolute left-4 z-10">
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-2xl w-96 opacity-85">
            <div className="flex justify-between items-start mb-8">
              <div className="text-xl font-bold tracking-wider">
                TOMSON MARTON
              </div>
              <div className="text-3xl font-bold">VISA</div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-8 bg-gray-300/40 rounded opacity-70"></div>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3.5 8.5c1.7-3.5 5.3-5.5 9-5.5 5.5 0 10 4.5 10 10s-4.5 10-10 10c-3.7 0-7.3-2-9-5.5"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.5 12.5c1.2-2.5 3.8-4 6.5-4 3.8 0 7 3.1 7 7s-3.1 7-7 7c-2.7 0-5.3-1.5-6.5-4"
                  strokeWidth="1.5"
                />
                <path
                  d="M10.5 16.5c.8-1.7 2.5-2.7 4.5-2.7 2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5c-2 0-3.7-1-4.5-2.7"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="text-2xl tracking-widest font-mono mb-4">
              1247 **** 0000 8471
            </div>

            <div className="text-sm">
              <span className="text-gray-300">Valid Thru</span>
              <span className="ml-2 font-semibold">12/36</span>
            </div>
          </div>
        </div>

        {/* Main Card - Exact copy of your picture */}
        <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-2xl shadow-2xl w-96 z-20">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-xl font-bold tracking-wider">
                TOMSON MARTON
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-200 border-2 border-dashed rounded opacity-50"></div>
              <div className="text-3xl font-bold">VISA</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-200 border-2 border-dashed rounded w-10 h-8 opacity-50"></div>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3.5 8.5c1.7-3.5 5.3-5.5 9-5.5 5.5 0 10 4.5 10 10s-4.5 10-10 10c-3.7 0-7.3-2-9-5.5"
                strokeWidth="1.5"
              />
              <path
                d="M7.5 12.5c1.2-2.5 3.8-4 6.5-4 3.8 0 7 3.1 7 7s-3.1 7-7 7c-2.7 0-5.3-1.5-6.5-4"
                strokeWidth="1.5"
              />
              <path
                d="M10.5 16.5c.8-1.7 2.5-2.7 4.5-2.7 2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5c-2 0-3.7-1-4.5-2.7"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="text-2xl tracking-widest font-mono mb-4">
            1247 **** 0000 8471
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <div className="text-gray-300">Valid Thru</div>
              <div className="font-semibold">12/36</div>
            </div>
          </div>
        </div>

        {/* Right Card - Full size, peeking right (purple) */}
        <div className="absolute right-4 z-10">
          <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 rounded-2xl shadow-2xl w-96 opacity-90">
            <div className="flex justify-between items-start mb-8">
              <div className="text-xl font-bold tracking-wider">
                TOMSON MARTON
              </div>
              <div className="text-3xl font-bold">VISA</div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-8 bg-gray-300/40 rounded opacity-70"></div>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3.5 8.5c1.7-3.5 5.3-5.5 9-5.5 5.5 0 10 4.5 10 10s-4.5 10-10 10c-3.7 0-7.3-2-9-5.5"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.5 12.5c1.2-2.5 3.8-4 6.5-4 3.8 0 7 3.1 7 7s-3.1 7-7 7c-2.7 0-5.3-1.5-6.5-4"
                  strokeWidth="1.5"
                />
                <path
                  d="M10.5 16.5c.8-1.7 2.5-2.7 4.5-2.7 2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5c-2 0-3.7-1-4.5-2.7"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="text-2xl tracking-widest font-mono mb-4">
              1247 **** 0000 8471
            </div>

            <div className="text-sm">
              <span className="text-gray-300">Valid Thru</span>
              <span className="ml-2 font-semibold">12/36</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-4 mb-6">
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
      </div>

      {/* Balance & Top Up */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Balance</p>
            <p className="text-4xl font-bold text-gray-900">$259.75</p>
          </div>
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            Card Top Up
          </button>
        </div>
      </div>
    </div>
  );
}