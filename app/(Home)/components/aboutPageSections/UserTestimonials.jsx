"use client";

import { Quote, Star } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aisha Patel",
      role: "Freelance Graphic Designer",
      image:
        "https://thumbs.dreamstime.com/b/young-asian-woman-holding-credit-card-using-smart-phone-shopping-online-business-technology-concept-online-payment-123093095.jpg",
      text: "We are at the forefront of revolutionizing the way people navigate the digital financial landscape. Our mission is clear: to provide users and entrepreneurs with a secure, efficient, and user-friendly platform for conducting online transactions through virtual credit cards.",
      rating: 5,
    },
    {
      name: "James Carter",
      role: "E-commerce Entrepreneur",
      image:
        "https://www.shutterstock.com/shutterstock/photos/2367985967/display_1500/stock-photo-bank-employee-smiling-young-african-american-man-sitting-in-office-at-desk-with-laptop-holding-2367985967.jpg",
      text: "As a small business owner, StripCard has been a game-changer. It allows me to offer convenient payment options to my clients while generating an extra revenue stream. The one-time-use codes provide peace of mind, knowing that my transactions are secure. StripCard is a win-win for both my clients and my business.",
      rating: 5,
    },
    {
      name: "Lena Moreau",
      role: "Digital Nomad & Content Creator",
      image:
        "https://www.outsideonline.com/wp-content/uploads/2018/02/26/rethink-your-commute_h.jpg",
      text: "Shopping online has never been this secure and straightforward. StripCard's unique codes make me feel confident about the safety of my transactions. It's like having an extra layer of protection. I can't imagine going back to using my regular card for online purchases. StripCard has won me over!",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-linear-to-r from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-200 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <Quote className="w-4 h-4 text-blue-600" />
            <span className="text-sm uppercase tracking-widest bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              What Our Users Are Saying
            </span>
          </div>

          {/* Main title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            Explore what our satisfied users have to say about{" "}
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              their experiences
            </span>{" "}
            with it.
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
            We are at the forefront of revolutionizing the way people navigate
            the digital financial landscape. Our mission is clear: to provide
            users and entrepreneurs with a secure, efficient, and user-friendly
            platform for conducting online transactions through virtual credit
            cards.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-linear-to-r from-slate-50 to-blue-50/30 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-200/50 overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 md:p-8 flex flex-col grow">
                {/* Quote icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text – grows to push footer down */}
                <blockquote className="text-slate-700 leading-relaxed text-sm md:text-base mb-6 grow">
                  &quot;{testimonial.text}&quot;
                </blockquote>

                {/* Author Info – always at bottom */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50 mt-auto">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-100 shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* Bottom CTA or stats */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                10,000+
              </p>
              <p className="text-xs md:text-sm text-slate-600 font-medium">
                Happy Users
              </p>
            </div>
            <div className="w-px h-12 bg-slate-300" />
            <div className="text-center">
              <div className="flex gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">
                4.9/5 Average Rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
