/* eslint-disable @next/next/no-img-element */
"use client";

import { Download, Shield, Smartphone, Zap } from "lucide-react";
import {
  AppStoreIcon,
  GooglePlayIcon,
} from "../../../components/StoreButtonsIcon";

export default function DownloadApp() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left – Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-none shadow-blue-500/20 group">
              {/* Main Image */}
              <img
                src="https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/a590766c-61d7-40ae-a6fd-d1f1d56f5a8a.webp"
                alt="StripCard Mobile App"
                className="w-full h-auto object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 via-transparent to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl rotate-12 opacity-20 blur-sm hidden lg:block" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl -rotate-12 opacity-20 blur-sm hidden lg:block" />

            {/* Floating badge */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-3 border border-blue-100 hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Available Now
                  </p>
                  <p className="text-[10px] text-slate-600">iOS & Android</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right – Text content + Official badges */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            {/* Small caption with badge style */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg shadow-blue-500/10 border border-blue-100">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span className="text-sm uppercase tracking-widest bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                Download App
              </span>
            </div>

            {/* Main title with gradient accent */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-slate-900">Here Is </span>
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Realtime Apk.
              </span>
            </h2>

            {/* First paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Work with the pro, talented people at the most affordable price to
              get the most out of your time and cost using mobile apps.
            </p>

            {/* Second paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              The internet is saturated with applications from developers and
              creators worldwide. Sometimes it can be hard to tell which are the
              best downloaded apps on the market. Our list features an
              assortment of social media, antivirus, VPN, game, and emulator
              apps, to name a few. Don&apos;t miss out on the latest Chrome,
              Bluetooth, Office, Youtube, and Web-cam file versions available
              today.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100/50">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Fast</p>
                  <p className="text-[10px] text-slate-600">Lightning speed</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100/50">
                <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Secure</p>
                  <p className="text-[10px] text-slate-600">Protected data</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100/50">
                <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Free</p>
                  <p className="text-[10px] text-slate-600">No hidden fees</p>
                </div>
              </div>
            </div>

            {/* Official Download Buttons */}
            <div className="pt-6">
              <p className="text-sm font-semibold text-slate-700 mb-4">
                Download now on your favorite platform
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {/* Google Play */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-all duration-300 hover:scale-105 hover:brightness-95 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <GooglePlayIcon />
                </a>

                {/* App Store */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-all duration-300 hover:scale-105 hover:brightness-95 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <AppStoreIcon />
                </a>
              </div>

              {/* Download stats */}
              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-400 to-violet-600 border-2 border-white" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    <span className="text-slate-900 font-bold">50K+</span>{" "}
                    downloads
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-slate-600 font-medium">
                    4.8/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
