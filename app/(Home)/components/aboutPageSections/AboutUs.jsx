/* eslint-disable @next/next/no-img-element */
"use client";

import { Shield, Sparkles, Target, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 md:space-y-8 order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg shadow-blue-500/10 border border-blue-100">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm uppercase tracking-widest bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                About Us
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-slate-900">Empowering the Future of </span>
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Online Transactions
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We are at the forefront of revolutionizing the way people navigate
              the digital financial landscape. Our mission is clear: to provide
              users and entrepreneurs with a secure, efficient, and
              user-friendly platform for conducting online transactions through
              virtual credit cards.
            </p>

            {/* Highlight Cards - Simple Single Line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Our Vision */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-3 md:px-4 md:py-3.5 rounded-lg border border-blue-100/50 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-slate-900">
                  Our Vision
                </h3>
              </div>

              {/* The StripCard Difference */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-3 md:px-4 md:py-3.5 rounded-lg border border-indigo-100/50 hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-slate-900">
                  The StripCard Difference
                </h3>
              </div>

              {/* Our Commitment */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-3 md:px-4 md:py-3.5 rounded-lg border border-green-100/50 hover:shadow-lg hover:border-green-200 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-slate-900">
                  Our Commitment
                </h3>
              </div>

              {/* Join Us */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-3 md:px-4 md:py-3.5 rounded-lg border border-purple-100/50 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
                <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-slate-900">
                  Join Us on this Journey
                </h3>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-none shadow-blue-500/20 group">
              {/* Main Image */}
              <div className="aspect-4/3 md:aspect-5/4 lg:aspect-auto">
                <img
                  src="https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/9ee82526-b67e-47cc-b694-30697ff3c19b.webp"
                  alt="StripCard platform - secure virtual credit cards"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 via-transparent to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl rotate-12 opacity-20 blur-sm hidden lg:block" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl -rotate-12 opacity-20 blur-sm hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
