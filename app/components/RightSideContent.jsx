// import PromoCarousel from "./PromoCarousel";

// export default function RightSideContent() {
//   return (
//     <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-full flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 sm:mb-8">
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//           My Virtual Card
//         </h2>
//       </div>

//       {/* Promotional Card Carousel - Client Component */}
//       <PromoCarousel />

//       {/* Card Carousel Area - Responsive */}
//       <div className="relative flex justify-center items-center mb-6 sm:mb-10 min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
//         {/* Left Card - Hidden on mobile, visible on tablet+ */}
//         <div className="hidden md:block absolute left-0 lg:left-4 z-10">
//           <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-2xl w-64 lg:w-96 opacity-85">
//             <div className="flex justify-between items-start mb-4 lg:mb-8">
//               <div className="text-sm lg:text-xl font-bold tracking-wider">
//                 TOMSON MARTON
//               </div>
//               <div className="text-xl lg:text-3xl font-bold">VISA</div>
//             </div>

//             <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
//               <div className="w-8 lg:w-10 h-6 lg:h-8 bg-gray-300/40 rounded opacity-70"></div>
//               <svg
//                 className="w-5 lg:w-6 h-5 lg:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   d="M3.5 8.5c1.7-3.5 5.3-5.5 9-5.5 5.5 0 10 4.5 10 10s-4.5 10-10 10c-3.7 0-7.3-2-9-5.5"
//                   strokeWidth="1.5"
//                 />
//                 <path
//                   d="M7.5 12.5c1.2-2.5 3.8-4 6.5-4 3.8 0 7 3.1 7 7s-3.1 7-7 7c-2.7 0-5.3-1.5-6.5-4"
//                   strokeWidth="1.5"
//                 />
//                 <path
//                   d="M10.5 16.5c.8-1.7 2.5-2.7 4.5-2.7 2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5c-2 0-3.7-1-4.5-2.7"
//                   strokeWidth="1.5"
//                 />
//               </svg>
//             </div>

//             <div className="text-lg lg:text-2xl tracking-widest font-mono mb-3 lg:mb-4">
//               1247 **** 0000 8471
//             </div>

//             <div className="text-xs lg:text-sm">
//               <span className="text-gray-300">Valid Thru</span>
//               <span className="ml-2 font-semibold">12/36</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Card - Always visible, centered on mobile */}
//         <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm lg:w-96 z-20">
//           <div className="flex justify-between items-start mb-4 sm:mb-6 lg:mb-8">
//             <div>
//               <div className="text-base sm:text-lg lg:text-xl font-bold tracking-wider">
//                 TOMSON MARTON
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <div className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 bg-gray-200 border-2 border-dashed rounded opacity-50"></div>
//               <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
//                 VISA
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 lg:gap-3 mb-4 sm:mb-5 lg:mb-6">
//             <div className="bg-gray-200 border-2 border-dashed rounded w-8 sm:w-9 lg:w-10 h-6 sm:h-7 lg:h-8 opacity-50"></div>
//             <svg
//               className="w-5 sm:w-5 lg:w-6 h-5 sm:h-5 lg:h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 d="M3.5 8.5c1.7-3.5 5.3-5.5 9-5.5 5.5 0 10 4.5 10 10s-4.5 10-10 10c-3.7 0-7.3-2-9-5.5"
//                 strokeWidth="1.5"
//               />
//               <path
//                 d="M7.5 12.5c1.2-2.5 3.8-4 6.5-4 3.8 0 7 3.1 7 7s-3.1 7-7 7c-2.7 0-5.3-1.5-6.5-4"
//                 strokeWidth="1.5"
//               />
//               <path
//                 d="M10.5 16.5c.8-1.7 2.5-2.7 4.5-2.7 2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5c-2 0-3.7-1-4.5-2.7"
//                 strokeWidth="1.5"
//               />
//             </svg>
//           </div>

//           <div className="text-lg sm:text-xl lg:text-2xl tracking-widest font-mono mb-3 lg:mb-4">
//             1247 **** 0000 8471
//           </div>

//           <div className="flex justify-between text-xs sm:text-sm">
//             <div>
//               <div className="text-gray-300">Valid Thru</div>
//               <div className="font-semibold">12/36</div>
//             </div>
//           </div>
//         </div>

//         {/* Right Card - Hidden on mobile, visible on tablet+ */}
//         <div className="hidden md:block absolute right-0 lg:right-4 z-10">
//           <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 text-white p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-2xl w-64 lg:w-96 opacity-90">
//             <div className="flex justify-between items-start mb-4 lg:mb-8">
//               <div className="text-sm lg:text-xl font-bold tracking-wider">
//                 TOMSON MARTON
//               </div>
//               <div className="text-xl lg:text-3xl font-bold">VISA</div>
//             </div>

//             <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
//               <div className="w-8 lg:w-10 h-6 lg:h-8 bg-gray-300/40 rounded opacity-70"></div>
//               <svg
//                 className="w-5 lg:w-6 h-5 lg:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   d="M3.5 8.5c1.7-3.5 5.3-5.5 9-5.5 5.5 0 10 4.5 10 10s-4.5 10-10 10c-3.7 0-7.3-2-9-5.5"
//                   strokeWidth="1.5"
//                 />
//                 <path
//                   d="M7.5 12.5c1.2-2.5 3.8-4 6.5-4 3.8 0 7 3.1 7 7s-3.1 7-7 7c-2.7 0-5.3-1.5-6.5-4"
//                   strokeWidth="1.5"
//                 />
//                 <path
//                   d="M10.5 16.5c.8-1.7 2.5-2.7 4.5-2.7 2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5c-2 0-3.7-1-4.5-2.7"
//                   strokeWidth="1.5"
//                 />
//               </svg>
//             </div>

//             <div className="text-lg lg:text-2xl tracking-widest font-mono mb-3 lg:mb-4">
//               1247 **** 0000 8471
//             </div>

//             <div className="text-xs lg:text-sm">
//               <span className="text-gray-300">Valid Thru</span>
//               <span className="ml-2 font-semibold">12/36</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dots Indicator */}
//       <div className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
//         <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//         <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//         <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//       </div>

//       {/* Balance & Top Up */}
//       <div className="space-y-4 sm:space-y-6">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="text-center sm:text-left">
//             <p className="text-gray-500 text-xs sm:text-sm">Total Balance</p>
//             <p className="text-3xl sm:text-4xl font-bold text-gray-900">
//               $259.75
//             </p>
//           </div>
//           <button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
//             Card Top Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import CardCarousel from "./CardCarousel";
import PromoCarousel from "./PromoCarousel";

export default function RightSideContent() {
  return (
    <div className="p-4 sm:p-6  h-full flex flex-col">
      {/* Promotional Card Carousel */}
      <PromoCarousel />

      {/* Card + Balance Wrapper */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            My Virtual Card
          </h2>
        </div>

        {/* Card Carousel */}
        <CardCarousel />

        {/* Balance & Top Up */}
        <div className="space-y-4 sm:space-y-6 mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-500 text-xs sm:text-sm">Total Balance</p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                $259.75
              </p>
            </div>

            <button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              Card Top Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
