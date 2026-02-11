// /* eslint-disable @next/next/no-img-element */
// function ProjectOverview() {
//   return (
//     <section className="w-full py-16 md:py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           {/* Small caption */}
//           <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-4">
//             Project Overview
//           </p>

//           {/* Main title */}
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
//             Project Highlights at a Glance
//           </h2>

//           {/* Description */}
//           <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
//             Explore key milestones and achievements of our project, brought to
//             life with real-time counters showcasing our growth, success, and
//             impact. See how we&apos;re delivering results and making a difference
//             through our innovative solutions.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left side – Stats */}
//           <div className="space-y-10 md:space-y-12 lg:space-y-16">
//             <div className="flex items-center gap-6">
//               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
//                 <span className="text-3xl md:text-4xl font-bold text-blue-600">
//                   100
//                 </span>
//               </div>
//               <div>
//                 <h3 className="text-xl md:text-2xl font-bold text-slate-900">
//                   Total Users
//                 </h3>
//                 <p className="text-slate-600 mt-1">Active community members</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-50 flex items-center justify-center shrink-0">
//                 <span className="text-3xl md:text-4xl font-bold text-green-600">
//                   1,000
//                 </span>
//               </div>
//               <div>
//                 <h3 className="text-xl md:text-2xl font-bold text-slate-900">
//                   Happy Users
//                 </h3>
//                 <p className="text-slate-600 mt-1">Satisfied customers</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
//                 <span className="text-3xl md:text-4xl font-bold text-purple-600">
//                   12,000
//                 </span>
//               </div>
//               <div>
//                 <h3 className="text-xl md:text-2xl font-bold text-slate-900">
//                   Services
//                 </h3>
//                 <p className="text-slate-600 mt-1">Delivered successfully</p>
//               </div>
//             </div>
//           </div>

//           <div className="relative rounded-2xl shadow-xl overflow-visible">
//             {/* Image */}
//             <img
//               src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
//               alt="Financial dashboard overview"
//               className="w-full h-auto object-cover aspect-4/3 lg:aspect-5/4 rounded-2xl"
//             />

//             {/* Overlay card – exact corner spill */}
//             <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-5 max-w-[280px] border border-gray-100">
//               <p className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-2">
//                 Transactions Processed
//               </p>
//               <h4 className="text-xl font-bold text-slate-900 mb-1">
//                 Over $10M
//               </h4>
//               <p className="text-sm text-slate-600">
//                 in transactions processed securely, ensuring smooth financial
//                 operations for our users.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProjectOverview;

/* eslint-disable @next/next/no-img-element */
"use client";

export default function ProjectOverview() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">

      {/* Background Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur shadow border border-blue-100 mb-4">
            <span className="text-sm uppercase tracking-widest font-semibold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Project Overview
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            Project Highlights{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              at a Glance
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
            Explore key milestones and achievements with real-time insights
            showcasing our growth and impact worldwide.
          </p>

        </div>


        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">


          {/* Image Section */}
          <div className="relative order-1 lg:order-2">

            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">

              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1470&q=80"
                alt="Dashboard"
                className="w-full aspect-4/3 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition" />

            </div>


            {/* Floating Card */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-xl shadow-lg p-4 max-w-[220px] border border-blue-100">

              <div className="flex items-center gap-2 mb-2">

                <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">$</span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  Transactions
                </p>

              </div>

              <h4 className="text-xl font-bold text-indigo-600 mb-1">
                Over $10M
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                Processed securely for global users.
              </p>

            </div>

          </div>


          {/* Stats Section */}
          <div className="order-2 lg:order-1 space-y-8 max-w-lg mx-auto lg:mx-0">


            {/* Stat 1 */}
            <div className="flex items-center gap-5">

              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">
                  100+
                </span>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">
                  Total Users
                </h3>

                <p className="text-slate-600 text-sm">
                  Active community members
                </p>
              </div>

            </div>


            {/* Stat 2 */}
            <div className="flex items-center gap-5">

              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <span className="text-2xl md:text-3xl font-bold text-green-600">
                  1K+
                </span>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">
                  Happy Users
                </h3>

                <p className="text-slate-600 text-sm">
                  Satisfied customers
                </p>
              </div>

            </div>


            {/* Stat 3 */}
            <div className="flex items-center gap-5">

              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <span className="text-2xl md:text-3xl font-bold text-purple-600">
                  12K+
                </span>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">
                  Services
                </h3>

                <p className="text-slate-600 text-sm">
                  Delivered successfully
                </p>
              </div>

            </div>


          </div>

        </div>

      </div>

    </section>
  );
}
