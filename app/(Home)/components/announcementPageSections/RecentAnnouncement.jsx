// components/about/RecentAnnouncement.jsx
"use client";

import { ArrowLeft, Clock, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function RecentAnnouncement() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const announcements = [
    {
      id: 1,
      image:
        "https://mehedi.appdevs.team/stripcard/public/backend/files/blog/5738b6fd-6f84-4fb9-b43f-4a60b2406301.webp",
      title: "Entrepreneurial Success with Virtual Credit Card Services",
      preview:
        "Are you an entrepreneur looking to diversify your business and boost revenue? In this blog, we explore how offering virt...",
      fullDescription:
        "Are you an entrepreneur looking to diversify your business and boost revenue? In this blog, we explore how offering virtual credit card services to your clients can be a game-changer. We discuss the opportunities, benefits, and strategies for entrepreneurs to leverage the virtual credit card trend and create a win-win scenario for their clients and their business.",
      date: "15-11-2024",
      tags: ["StripCard", "Online Payment", "Virtual Card"],
      categories: [
        { name: "Finance", count: 0 },
        { name: "Insurance", count: 1 },
        { name: "Help", count: 0 },
        { name: "Taxes", count: 0 },
        { name: "Credit Card", count: 2 },
      ],
    },
    {
      id: 2,
      image:
        "https://mehedi.appdevs.team/stripcard/public/backend/files/blog/56a5408b-0f2b-4eb0-9e56-004435a8170e.webp",
      title: "Entrepreneurial Success with Virtual Credit Card Services",
      preview:
        "In today’s digital age, online payments have become an integral part of our lives. But with convenience comes the need f...",
      fullDescription:
        "In today’s digital age, online payments have become an integral part of our lives. But with convenience comes the need for security. This blog explores the phenomenon of virtual credit cards, their growing popularity, and how they are revolutionizing online payments. We delve into the benefits of virtual credit cards, their unique features, and why they are considered the future of secure online transactions.",
      date: "10-11-2024",
      tags: ["Money", "Online", "StripCard", "Payment"],
      categories: [
        { name: "Finance", count: 0 },
        { name: "Insurance", count: 1 },
        { name: "Help", count: 0 },
        { name: "Taxes", count: 0 },
        { name: "Credit Card", count: 2 },
      ],
    },
    {
      id: 3,
      image:
        "https://mehedi.appdevs.team/stripcard/public/backend/files/blog/4ed4a526-d4e2-4132-82c5-5d846e044020.webp",
      title: "The Rise of Virtual Credit Cards: Transforming Online Payments",
      preview:
        "In today’s digital age, online payments have become an integral part of our lives. But with convenience comes the need f...",
      fullDescription:
        "In today’s digital age, online payments have become an integral part of our lives. But with convenience comes the need for security. This blog explores the phenomenon of virtual credit cards, their growing popularity, and how they are revolutionizing online payments. We delve into the benefits of virtual credit cards, their unique features, and why they are considered the future of secure online transactions.",
      date: "05-11-2024",
      tags: ["StripCard", "VirtualCard", "Appdevs"],
      categories: [
        { name: "Finance", count: 0 },
        { name: "Insurance", count: 1 },
        { name: "Help", count: 0 },
        { name: "Taxes", count: 0 },
        { name: "Credit Card", count: 2 },
      ],
    },
  ];

  return (
    <>
      <section className="relative pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Decorative blurred circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-10 md:left-20 w-64 h-64 md:w-72 md:h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-12 right-10 md:right-20 w-80 h-80 md:w-96 md:h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl -mt-4 md:-mt-6 lg:-mt-8">
          {/* Header - more compact */}
          <div className="text-center mb-6 md:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm shadow-lg shadow-blue-500/10 border border-blue-100 mx-auto mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs uppercase tracking-widest bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                Announcement
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900 leading-tight">
              Our Recent{" "}
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Announcements
              </span>
            </h2>
          </div>

          {/* Cards - changed md:grid-cols-3 → md:grid-cols-2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/75 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-200/10 border border-blue-100/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-300/20 hover:-translate-y-2 hover:border-blue-200/70 flex flex-col cursor-pointer"
                onClick={() => setSelectedAnnouncement(item)}
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-5 md:p-6 flex flex-col grow">
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2.5 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 mb-5 line-clamp-3 grow text-[15px] leading-relaxed">
                    {item.preview}
                  </p>
                  <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-slate-100/80">
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <Clock size={16} />
                      {item.date}
                    </div>
                    <span className="text-blue-600 font-semibold flex items-center gap-1.5 group-hover:gap-2 transition-all">
                      Read More
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white/95 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-blue-100/40">
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="cursor-pointer absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-gray-100 text-slate-700 hover:text-slate-900 transition-colors shadow-sm"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="p-6 md:p-10 lg:p-12">
              <div className="rounded-2xl overflow-hidden mb-6 shadow-lg shadow-blue-200/20">
                <Image
                  src={selectedAnnouncement.image}
                  alt={selectedAnnouncement.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="mb-7">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Clock size={16} />
                  {selectedAnnouncement.date}
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight bg-linear-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text">
                  {selectedAnnouncement.title}
                </h2>
              </div>

              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed mb-9">
                <p>{selectedAnnouncement.fullDescription}</p>
              </div>

              <div className="mb-9">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {selectedAnnouncement.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-medium border ${
                        cat.name === "Finance"
                          ? "bg-blue-50/80 text-blue-700 border-blue-200/60"
                          : cat.name === "Insurance"
                            ? "bg-purple-50/80 text-purple-700 border-purple-200/60"
                            : cat.name === "Help"
                              ? "bg-emerald-50/80 text-emerald-700 border-emerald-200/60"
                              : cat.name === "Taxes"
                                ? "bg-amber-50/80 text-amber-700 border-amber-200/60"
                                : "bg-rose-50/80 text-rose-700 border-rose-200/60"
                      } backdrop-blur-sm`}
                    >
                      {cat.name}{" "}
                      <span className="ml-1 opacity-80">({cat.count})</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAnnouncement.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-linear-to-r from-blue-50 to-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-indigo-700 font-medium rounded-xl transition-all border border-indigo-200/50 shadow-sm hover:shadow"
              >
                <ArrowLeft size={18} />
                Back to Announcements
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
