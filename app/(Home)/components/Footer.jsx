/* eslint-disable @next/next/no-img-element */
"use client";

import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [captchaToken, setCaptchaToken] = useState(null);

  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const onCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  return (
    <footer className="relative w-full bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-400 to-transparent opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* LEFT – Logo & Description */}
          <div className="lg:col-span-5 space-y-6">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/logo-dark.png"
                alt="StripCard Logo"
                className="h-10 w-auto"
              />
            </div>

            {/* Thank you text */}
            <p className="leading-relaxed max-w-xl text-slate-700 text-base">
              Thank you for choosing StripCard as your trusted partner for
              secure online transactions. We are committed to providing you with
              a seamless and secure experience.
            </p>

            {/* Follow Us */}
            <div className="space-y-4">
              <p className="text-slate-900 font-semibold text-lg">Follow Us</p>
              <div className="flex items-center gap-4">
                {/* Facebook */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group w-11 h-11 bg-white backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-200 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110 shadow-md"
                >
                  <Facebook className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group w-11 h-11 bg-white backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-200 hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-600 hover:border-pink-600 transition-all duration-300 hover:scale-110 shadow-md"
                >
                  <Instagram className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                </a>

                {/* Twitter/X */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="group w-11 h-11 bg-white backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-200 hover:bg-sky-600 hover:border-sky-600 transition-all duration-300 hover:scale-110 shadow-md"
                >
                  <Twitter className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* MIDDLE – Useful Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Useful Links</h3>

            <nav className="flex flex-col gap-3">
              <Link
                href="/privacy-policy"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors hover:translate-x-1 duration-300 inline-block"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* RIGHT – Subscribe */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Subscribe</h3>

            <p className="text-slate-700 leading-relaxed">
              Stay Connected! Subscribe to Our Latest Feeds – Just Fill Out the
              Form Below.
            </p>

            {/* Email Form */}
            <form className="space-y-4">
              {/* reCAPTCHA */}
              <div className="flex justify-start">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onCaptchaChange}
                  onExpired={onCaptchaExpired}
                  theme="light"
                  size="normal"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-none focus:ring-blue-500/50 transition-all shadow-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-800">
          © {currentYear} All Rights Reserved.{" "}
          <span className="font-semibold text-blue-600">StripCard</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
