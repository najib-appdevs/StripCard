"use client";

import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950">
      {/* Very subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-12 w-64 h-64 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-12 w-80 h-80 bg-indigo-400/5 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-5 sm:px-6 lg:px-8 max-w-4xl">
        {/* Main content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-slate-200/70 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex justify-center pt-5 mb-4">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-blue-100 dark:border-blue-800/50 shadow-sm">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-10 text-left md:text-justify">
            <div className="space-y-8 md:space-y-10 prose prose-slate dark:prose-invert prose-sm sm:prose-base max-w-none">
              <div>
                <h2 className="text-left text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  What information do we collect?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We gather data from you when you register on our site, submit
                  a request, buy any services, react to an overview, or round
                  out a structure. At the point when requesting any assistance
                  or enrolling on our site, as suitable, you might be approached
                  to enter your: name, email address, or telephone number. You
                  may, nonetheless, visit our site anonymously.
                </p>
              </div>

              <div>
                <h2 className="text-left text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  How do we protect your information?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  All provided delicate/credit data is sent through Stripe.
                </p>
                <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                  After an exchange, your private data (credit cards, social
                  security numbers, financials, and so on) won be put away on
                  our workers.
                </p>
              </div>

              <div>
                <h2 className="text-left text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  Do we disclose any information to outside parties?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We don sell, exchange, or in any case move to outside
                  gatherings by and by recognizable data. This does exclude
                  confided in outsiders who help us in working our site, leading
                  our business, or adjusting you, since those gatherings consent
                  to keep this data private. We may likewise deliver your data
                  when we accept discharge is suitable to follow the law,
                  implement our site strategies, or ensure our own or others
                  rights, property, or wellbeing.
                </p>
              </div>

              <div>
                <h2 className="text-left text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  Children&apos;s Online Privacy Protection Act Compliance
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We are consistent with the prerequisites of COPPA (Childrens
                  Online Privacy Protection Act), we don gather any data from
                  anybody under 13 years old. Our site, items, and
                  administrations are completely coordinated to individuals who
                  are in any event 13 years of age or more established.
                </p>
              </div>

              <div>
                <h2 className="text-left text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  Changes to our Privacy Policy
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  If we decide to change our privacy policy, we will post those
                  changes on this page.
                </p>
              </div>

              <div>
                <h2 className="text-left text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  How long we retain your information?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  At the point when you register for our site, we cycle and keep
                  your information we have about you however long you don not
                  erase the record or withdraw yourself (subject to laws and
                  regulations).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
