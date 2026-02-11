"use client";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 bg-violet-400/5 rounded-full blur-3xl" />
      </div>
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-360 mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg shadow-blue-500/10 border border-blue-100 animate-slide-in-left">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome To StripCard !
              </span>
            </div>
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight animate-slide-in-left delay-100">
              <span className="block text-slate-900 mb-1">
                Unveiling the Virtual Card
              </span>

              <span className="block bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl animate-slide-in-left delay-200">
              The payment needs of major online giants such as AliExpress,
              Netflix, Facebook-Google Advertising, Amazon, and various other
              shopping platforms.
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 animate-slide-in-left delay-300">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
              >
                Apply Virtual Card
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-8 animate-slide-in-left delay-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-400 to-violet-600 border-2 border-white" />
                </div>
                <p className="text-sm text-slate-600 font-medium">
                  <span className="text-slate-900 font-bold">10,000+</span>{" "}
                  active users
                </p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-slate-600 font-medium">
                  4.9/5 rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Image (unchanged, but ready for real image) */}
          <div className="relative lg:h-[600px] animate-fade-in-up delay-200">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 via-transparent to-indigo-600/20 z-10 pointer-events-none" />

              {/* Floating card decoration */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl z-20 rotate-12 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl z-20 -rotate-12 animate-float delay-500" />
              {/* Main Image - Replace with your actual Image component */}
              <div className="relative w-full h-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                {/* Placeholder - Replace with actual Image component */}
                <div className="text-center space-y-4 p-8">
                  <div className="w-64 h-40 mx-auto bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <div className="p-6 text-white">
                      <div className="flex justify-between items-start mb-8">
                        <div className="space-y-1">
                          <div className="w-12 h-8 bg-white/20 rounded" />
                          <p className="text-xs font-medium">Virtual Card</p>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div className="flex-1 h-2 bg-white/30 rounded" />
                          <div className="flex-1 h-2 bg-white/30 rounded" />
                          <div className="flex-1 h-2 bg-white/30 rounded" />
                          <div className="flex-1 h-2 bg-white/30 rounded" />
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="space-y-1">
                            <div className="w-16 h-2 bg-white/30 rounded" />
                            <div className="w-20 h-2 bg-white/50 rounded" />
                          </div>
                          <div className="text-xs font-bold">VISA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uncomment and use this when you have your image:
                <Image
                  src="/hero-image.png"
                  alt="Virtual Card Hero"
                  fill
                  className="object-cover"
                  priority
                />
                */}
              </div>
            </div>
            {/* Floating stats cards */}
            <div className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-xl p-4 animate-float-slow hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    100% Secure
                  </p>
                  <p className="text-xs text-slate-500">Protected</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 bottom-1/4 bg-white rounded-xl shadow-xl p-4 animate-float-slow delay-700 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Instant</p>
                  <p className="text-xs text-slate-500">Activation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
