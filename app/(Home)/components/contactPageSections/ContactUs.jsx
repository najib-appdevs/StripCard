"use client";

import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onCaptchaChange = (token) => {
    setRecaptchaToken(token);
    console.log("reCAPTCHA token:", token);
  };

  const onCaptchaExpired = () => {
    setRecaptchaToken(null);
    console.log("reCAPTCHA expired");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    const payload = { ...formData, recaptchaToken };
    console.log("Form submitted with reCAPTCHA:", payload);

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setRecaptchaToken(null);
    if (recaptchaRef.current) recaptchaRef.current.reset();

    alert("Thank you! Your message has been sent.");
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left: Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 border border-blue-100/50">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
                Contact Us
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              <span className="text-slate-900">Feel Free To </span>
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
              <span className="text-slate-900"> With Us</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400 hover:border-slate-300"
                    placeholder="Enter Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400 hover:border-slate-300"
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400 hover:border-slate-300"
                    placeholder="Enter Phone"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400 hover:border-slate-300"
                    placeholder="Enter Subject"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-slate-900 placeholder-slate-400 hover:border-slate-300"
                  placeholder="Write your message here..."
                />
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-start">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onCaptchaChange}
                  onExpired={onCaptchaExpired}
                  theme="light"
                  size="normal"
                />
              </div>

              <button
                type="submit"
                className="group w-full px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>

          {/* Right: Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100/50">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Information
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              We&apos;d love to hear from you! If you have any questions or need
              assistance, please don&apos;t hesitate to get in touch with us
              using the following contact information:
            </p>

            <div className="space-y-5 md:space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base md:text-lg font-semibold text-slate-900 mb-0.5">
                    Mobile Number
                  </h4>
                  <a
                    href="tel:+11234567890"
                    className="text-slate-600 text-xs sm:text-sm md:text-[15px] leading-snug sm:leading-relaxed"
                  >
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4 p-4 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100/50 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base md:text-lg font-semibold text-slate-900 mb-0.5">
                    Address
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] leading-snug sm:leading-relaxed">
                    1234 Main Street City, State 56789 USA
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-linear-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100/50 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base md:text-lg font-semibold text-slate-900 mb-0.5">
                    Email Address
                  </h4>
                  <a
                    href="mailto:info@example.com"
                    className="text-slate-600 text-xs sm:text-sm md:text-[15px] leading-snug sm:leading-relaxed"
                  >
                    info@example.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
