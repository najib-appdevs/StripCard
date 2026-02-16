/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";

export default function ProjectOverview() {
  const [counters, setCounters] = useState({
    users: 0,
    happy: 0,
    services: 0,
    transactions: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const targets = {
      users: 100,
      happy: 1000,
      services: 12000,
      transactions: 10,
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        users: Math.floor(targets.users * progress),
        happy: Math.floor(targets.happy * progress),
        services: Math.floor(targets.services * progress),
        transactions: Math.floor(targets.transactions * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepDuration);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-bl from-blue-400/10 to-transparent dark:from-blue-600/8 dark:to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-indigo-400/10 to-transparent dark:from-indigo-600/8 dark:to-transparent rounded-full blur-3xl animate-pulse-slow [animation-delay:2s]" />

        {/* Additional decorative circles */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-400/5 to-transparent dark:from-purple-600/5 dark:to-transparent rounded-full blur-2xl animate-pulse-slow [animation-delay:1s]" />
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-tl from-cyan-400/5 to-transparent dark:from-cyan-600/5 dark:to-transparent rounded-full blur-2xl animate-pulse-slow [animation-delay:3s]" />
      </div>

      {/* Enhanced Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, #4F46E5 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 max-w-3xl mx-auto">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white/90 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-700/50 shadow-2xl shadow-blue-500/25 dark:shadow-indigo-500/15 border border-white/60 dark:border-slate-700/60 mb-5 sm:mb-7 hover:shadow-blue-500/30 dark:hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 rounded-full animate-pulse-slow" />
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white dark:bg-slate-900 rounded-full relative z-10" />
            </div>
            <span className="text-sm font-bold tracking-wide bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent uppercase">
              Project Overview
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-5 sm:mb-7 px-4">
            Project Highlights{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              at a Glance
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 px-4 max-w-2xl mx-auto">
            Explore key milestones and achievements of our project, brought to
            life with real-time counters showcasing our growth, success, and
            impact. See how we&apos;re delivering results and making a
            difference through our innovative solutions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-14 md:mb-16">
          {/* Stat 1 */}
          <div className="group relative bg-white/90 backdrop-blur-sm dark:bg-slate-900/70 rounded-3xl shadow-xl hover:shadow-2xl border border-white/60 dark:border-slate-700/50 transition-all duration-500 overflow-hidden hover:-translate-y-3 animate-fade-in-up">
            {/* Gradient Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-[0.08] dark:group-hover:opacity-[0.15] transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-[0.12] blur-xl dark:group-hover:opacity-[0.20] transition-opacity duration-500" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-slate-200/10" />

            <div className="relative p-6 sm:p-7 md:p-9 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-3xl mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {counters.users}+
                </span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 md:mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Total Users
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Active community members
              </p>
            </div>
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* Stat 2 */}
          <div
            className="group relative bg-white/90 backdrop-blur-sm dark:bg-slate-900/70 rounded-3xl shadow-xl hover:shadow-2xl border border-white/60 dark:border-slate-700/50 transition-all duration-500 overflow-hidden hover:-translate-y-3 animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            {/* Gradient Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-[0.08] dark:group-hover:opacity-[0.15] transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-[0.12] blur-xl dark:group-hover:opacity-[0.20] transition-opacity duration-500" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-slate-200/10" />

            <div className="relative p-6 sm:p-7 md:p-9 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-3xl mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {counters.happy >= 1000 ? "1K" : counters.happy}+
                </span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 md:mb-3 group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Happy Users
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Satisfied customers
              </p>
            </div>
            <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* Stat 3 */}
          <div
            className="group relative bg-white/90 backdrop-blur-sm dark:bg-slate-900/70 rounded-3xl shadow-xl hover:shadow-2xl border border-white/60 dark:border-slate-700/50 transition-all duration-500 overflow-hidden hover:-translate-y-3 animate-fade-in-up sm:col-span-2 lg:col-span-1"
            style={{ animationDelay: "300ms" }}
          >
            {/* Gradient Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-[0.08] dark:group-hover:opacity-[0.15] transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-[0.12] blur-xl dark:group-hover:opacity-[0.20] transition-opacity duration-500" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-slate-200/10" />

            <div className="relative p-6 sm:p-7 md:p-9 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/50 dark:to-fuchsia-950/50 rounded-3xl mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {counters.services >= 1000
                    ? (counters.services / 1000).toFixed(0) + "K"
                    : counters.services}
                  +
                </span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 md:mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-fuchsia-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Services
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Delivered successfully
              </p>
            </div>
            <div className="h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        </div>

        {/* Image Section with Caption Bar */}
        <div
          className="relative max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "450ms" }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1470&q=80"
              alt="Financial Dashboard"
              className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/15 via-transparent to-indigo-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 bg-gradient-to-tr from-blue-500/25 to-transparent dark:from-blue-600/20 dark:to-transparent rounded-tr-[4rem]" />
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-bl from-indigo-500/20 to-transparent dark:from-indigo-600/15 dark:to-transparent rounded-bl-[3rem]" />
          </div>

          {/* Caption Bar */}
          <div className="mt-5 sm:mt-7 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-[2px] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden hover:shadow-blue-500/25 dark:hover:shadow-indigo-500/20 transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-md dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8">
                {/* Content Section */}
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600/80 dark:text-blue-400/80">
                      Financial Milestone
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Transactions Processed
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    Over{" "}
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      $10M
                    </span>{" "}
                    in transactions processed securely, ensuring smooth
                    financial operations for our users.
                  </p>
                </div>

                {/* Counter Badge */}
                <div className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 border-2 border-blue-100 dark:border-blue-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-center space-y-2">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent leading-none">
                      ${counters.transactions}M+
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wide">
                        Processed
                      </div>
                      <div className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse [animation-delay:0.5s]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
